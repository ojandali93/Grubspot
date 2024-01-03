import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../api/firebase'
import { deleteUser, signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { ChevronsLeft } from 'react-native-feather'

const ProfileScreen = () => {
  const navigation = useNavigation()

  const [profile, setProfile] = useState([])
  const [deletingAccount, setDeletingAccount] = useState(false)
  const [confirmEmail, setConfirmEmail] = useState('')

  useEffect(() => {
    grabProfile()
  }, [])

  const grabProfile = () => {
    const colRef = collection(db, 'Profiles')
    const q = query(colRef, where('user_id','==', auth.currentUser?.uid))
    onSnapshot(q, snapshot => {
      let profiles = []
      snapshot.docs.forEach(doc => {
        profiles.push({data: doc.data(), id: doc.id})
      })
      setProfile(profiles[0])
    })
  }

  const signOutUser = () => {
    signOut(auth)
      .then((response) => {
        console.log('signedout');
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteUserAccount = () => {
    setDeletingAccount(true)
  }

  const confirmDeleteAccount = () => {
    console.log(auth.currentUser.email)
    confirmEmail === auth.currentUser?.email
      ? deleteTheAccount()
      : console.log('dont delete')
  }

  const deleteTheAccount = () => {
    deleteUser(auth.currentUser)
      .then((response) => {
        console.log('user deleted')
        setDeletingAccount(false)
        navigation.navigate('LoginScreen')
      })
      .catch((currentError) => {
        console.error(currentError)
      })
  }

  const displayUserInfo = () => {
    return(
      <View style={styles.content}>
        <View style={styles.row}>
          <Text>Username:</Text>
          <Text>{profile.data.username}</Text>
        </View>
        <View style={styles.row}>
          <Text>Name:</Text>
          <Text>{profile.data.name}</Text>
        </View>
        <View style={styles.row}>
          <Text>Email:</Text>
          <Text>{profile.data.email}</Text>
        </View>
        <View style={styles.row}>
          <Text>Location:</Text>
          <Text>{profile.data.location}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.fullContent}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <ChevronsLeft style={{marginRight: 8}} stroke="blue" fill="#fff" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.navigation}>
        {
          profile.data
            ? displayUserInfo()
            : <Text>Profile Unknown</Text>
        }
        <View>
          <TouchableOpacity onPress={() => {signOutUser()}} style={styles.bottomRow}>
            <Text style={{color: 'blue', fontWeight: 'bold'}}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {deleteUserAccount()}} style={styles.bottomRow}>
            <Text style={{color: 'red', fontWeight: 'bold'}}>DeleteAccount</Text>
          </TouchableOpacity>
          <View>
            {
              deletingAccount === true 
                ? <View>
                    <View style={styles.singleInvestmentMetric}>
                      <View style={styles.inputContainerSplit}>
                        <View style={styles.splitInput}>
                          <Text>Confirm Email:</Text>
                          <TextInput 
                            style={styles.inputSplit}
                            value={confirmEmail}
                            returnKeyType='done'
                            placeholder={'john@doe.com'}
                            onChangeText={(value) => {setConfirmEmail(value)}}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.addList}>
                      <Text style={styles.addToListButton} onPress={() => {confirmDeleteAccount()}}>Delete Account</Text>
                    </View>
                  </View>
                : null
            }
          </View>
          {/* <View style={styles.bottomRow}>
            <Text>Privacy Policy</Text>
            <Text>Terms Of Service</Text>
            <Text>Cookies</Text>
          </View> */}
          <View style={styles.column}>
            <Text style={styles.legal}>grubspotllc@gmail.com</Text>
            <Text style={styles.legal}>2023 - 2024 Grubspot. All Rights Reserved.</Text>
            <Text style={styles.legal}>Version 1.0.1</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fullContent: {
    flex: 1,
  },
  header: {
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    paddingHorizontal: 16
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBlockColor: 'lightgrey',
    borderBottomWidth: 2
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16
  },
  navigation: {
    height: '94%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bottomRow: {
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopColor: 'grey',
    borderTopWidth: 2
  },
  column: {
    width: '100%',
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 16,
    borderTopColor: 'grey',
    borderTopWidth: 2
  },
  legal: {
    textAlign: 'center'
  },
  singleInvestmentMetric: {
    width: Dimensions.get('window').width - 32,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: 'lightgrey',
    marginLeft: 16
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
    width: Dimensions.get('window').width - 75,
    paddingLeft: 2,
    marginLeft: 8,
    fontWeight: '500'
  },
  addList: {
    width: Dimensions.get('window').width - 32,
    marginLeft: 16,
    borderRadius: 15,
    paddingVertical: 12,
    backgroundColor: '#D10707',
    marginBottom: 16
  },
  addToListButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
})

export default ProfileScreen
