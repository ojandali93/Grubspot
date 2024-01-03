import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../api/firebase'

const deviceWidth = Dimensions.get('window').width

const LoginScreen = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const logInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log('logged in')
        navigation.navigate('ListCollectionScreen')
      })
      .catch((error) => {
        console.error(error)
        throw error
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
      <TouchableOpacity onPress={() => {navigation.navigate('PasswordForgotScreen')}} style={styles.forgotContainer}>
        <Text style={{color: 'blue'}}>Forgot Password</Text>
      </TouchableOpacity>
      <View style={styles.addToList}>
        <Text style={styles.addListButton} onPress={() => {logInUser()}}>Login</Text>
      </View>
      <View style={{marginTop: 16}}>
        <Text>Create an account: <Text style={{color: 'blue'}} onPress={() => {navigation.navigate('SignupScreen')}}>Signup</Text></Text>
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

export default LoginScreen
