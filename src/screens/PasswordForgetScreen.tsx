import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import { auth } from '../api/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const deviceWidth = Dimensions.get('window').width

const PasswordForgetScreen = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')

  const sentResetEmail = () => {
    sendPasswordResetEmail(auth, email.toLowerCase())
      .then(response => {
        console.log('send reset email')
        navigation.navigate('LoginScreen')
      })
      .catch(currentError => {
        console.error(currentError)
      })
  }

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Password Reset</Text>
      </View>
      <View style={styles.message}>
        <Text style={styles.messageText}>If you forgot your password, confirm you email below and receive a password reset email. Check your email within the next few minutes and reset your password and enjoy Grubspot.</Text>
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
                placeholder={'john@gmail.com'}
                onChangeText={(value) => {setEmail(value)}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.addToList}>
        <Text style={styles.addListButton} onPress={() => {sentResetEmail()}}>Send Passord Reset Email</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 32
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 16
  },
  messageText: {
    textAlign: 'center',
    marginBottom: 16
  },
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
    width: '60%',
    height: 60,
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

export default PasswordForgetScreen
