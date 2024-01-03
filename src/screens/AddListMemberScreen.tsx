import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { db } from '../api/firebase'
import { useNavigation } from '@react-navigation/native'

const AddListMemberScreen = ({route}) => {
  const {list} = route.params

  const navigation = useNavigation()

  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    searchForUsers()
  }, [search])

  const searchForUsers = () => {
    const colRef = collection(db, 'Profiles')
    const q = query(colRef, where('username','==',search))
    onSnapshot(q, snapshot => {
      let members: any = [];
      snapshot.docs.forEach(doc => {
        members.push({ data: doc.data(), id: doc.id });
      });
      console.log(members.length);
      setUsers(members);
    });
  }

  const addMemberToList = (user: any) => {
    const colRef = collection(db, 'Members')
    addDoc(colRef, {
      dateAdded: new Date(),
      listId: list.id,
      status: 'member',
      userId: user.data.user_id
    })
      .then((response) => {
        console.log('member added')
        navigation.navigate('ViewListScreen', {item: list})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const displayUsers = () => {
    return(
      <View>
        {
          users.map(user => {
            return(
              <View>
                <Text>{user.data.username}</Text>
                <Text>{user.data.name}</Text>
                <Text>{user.data.email}</Text>
                <Text onPress={() => {addMemberToList(user)}}>Add User To List</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  return (
    <View>
      <Text>Add a member</Text>
      <View>
        <Text>User:</Text>
        <TextInput 
          placeholder='username...'
          value={search}
          onChangeText={(text) => {setSearch(text)}}
        />
      </View>
      {
        users.length > 0
          ? displayUsers()
          : <Text>No Users Found</Text>
      }
    </View>
  )
}

export default AddListMemberScreen
