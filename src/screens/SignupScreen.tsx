import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { auth, db } from '../api/firebase'
import { useNavigation } from '@react-navigation/native'
import { addDoc, collection } from 'firebase/firestore'

const deviceWidth = Dimensions.get('window').width

const SignupScreen = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [location, setLocation] = useState('')

  const signupUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user.uid)
        createProfile(userCredentials.user.uid)
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
  }

  const createProfile = (userId: any) => {
    const userData = {
      username,
      email,
      name,
      location,
      user_id: userId,
    }
    const collectionRef = collection(db, 'Profiles')
    addDoc(collectionRef, userData)
      .then((response) => {
        console.log('profile created')
        setEmail('')
        setName('')
        setUsername('')
        setPassword('')
        setVerify('')
        setLocation('')
        navigation.navigate('ListCollectionScreen')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <View style={styles.content}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/grubspotLogo2.png')} />
      </View>
      <View style={styles.investmentPairContainerFull}>
        <View style={styles.singleInvestmentMetric}>
          <View style={styles.inputContainerSplit}>
            <View style={styles.splitInput}>
              <Text>Username:</Text>
              <TextInput 
                style={styles.inputSplit}
                value={username}
                returnKeyType='done'
                placeholder={'Chipotle...'}
                onChangeText={(value) => {setUsername(value)}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.investmentPairContainerFull}>
        <View style={styles.singleInvestmentMetric}>
          <View style={styles.inputContainerSplit}>
            <View style={styles.splitInput}>
              <Text>Email:</Text>
              <TextInput 
                style={styles.inputSplit}
                value={email}
                returnKeyType='done'
                placeholder={'Chipotle...'}
                onChangeText={(value) => {setEmail(value)}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.investmentPairContainerFull}>
        <View style={styles.singleInvestmentMetric}>
          <View style={styles.inputContainerSplit}>
            <View style={styles.splitInput}>
              <Text>Name:</Text>
              <TextInput 
                style={styles.inputSplit}
                value={name}
                returnKeyType='done'
                placeholder={'Chipotle...'}
                onChangeText={(value) => {setName(value)}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.investmentPairContainerFull}>
        <View style={styles.singleInvestmentMetric}>
          <View style={styles.inputContainerSplit}>
            <View style={styles.splitInput}>
              <Text>Location:</Text>
              <TextInput 
                style={styles.inputSplit}
                value={location}
                returnKeyType='done'
                placeholder={'Chipotle...'}
                onChangeText={(value) => {setLocation(value)}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.investmentPairContainerFull}>
        <View style={styles.singleInvestmentMetric}>
          <View style={styles.inputContainerSplit}>
            <View style={styles.splitInput}>
              <Text>Password:</Text>
              <TextInput 
                style={styles.inputSplit}
                placeholder='*********'
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => {setPassword(text)}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.investmentPairContainerFull}>
        <View style={styles.singleInvestmentMetric}>
          <View style={styles.inputContainerSplit}>
            <View style={styles.splitInput}>
              <Text>Confirm Password:</Text>
              <TextInput 
                style={styles.inputSplit}
                placeholder='*********'
                secureTextEntry={true}
                value={verify}
                onChangeText={(text) => {setVerify(text)}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.addToList}>
        <Text style={styles.addListButton} onPress={() => {signupUser()}}>Signup</Text>
      </View>
      <View style={{marginTop: 16}}>
        <Text>Have an account: <Text style={{color: 'blue'}} onPress={() => {navigation.navigate('LoginScreen')}}>Login</Text></Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16
  },
  logo: {
    width: 225,
    height: 82,
  },
  investmentPairContainerFull: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 12
  },
  singleInvestmentMetric: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'lightgrey'
  },
  inputText: {
    fontSize: 17,
    fontWeight: '500'
  },
  splitInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputSplit: {
    fontSize: 17,
    width: deviceWidth - 75,
    paddingLeft: 2,
    marginLeft: 8,
    fontWeight: '500'
  },
  forgotContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  addToList: {
    width: '80%',
    borderRadius: 10,
    marginTop: 12,
    paddingVertical: 12,
    backgroundColor: '#D10707',
  },
  addListButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
})

export default SignupScreen
