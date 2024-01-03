import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { db } from '../api/firebase'
import { useNavigation } from '@react-navigation/native'

const MemberComponent = (props) => {
  const {memberId, members} = props
  const navigation = useNavigation()

  const [listMember, setListmember] = useState([])

  useEffect(() => {
    grabMember()
  }, [])

  const grabMember = () => {
    const colRef = collection(db, 'Profiles')
    const q = query(colRef, where('user_id', '==', memberId))
    onSnapshot(q, snapshot => {
      let listMembers = []
      snapshot.docs.forEach(doc => {
        listMembers.push({data: doc.data(), id: doc.id})
      })
      setListmember(listMembers)
    })
  }

  const removeUser = () => {
    members.map(member => {
      member.data.userId === memberId 
        ? deleteMember(member)
        : null
    })
  }

  const deleteMember = (member: any) => {
    console.log(member.id)
    const docRef = doc(db, 'Members', member.id)
    deleteDoc(docRef)
      .then((response) => {
        console.log('deleted doc')
      })
      .then((currentError) => {
        console.error(currentError)
      })
  }

  return (
    <View>
      {
        listMember.map(member => {
          return(
            <View style={{marginTop: 16}}>
              <View style={styles.row}>
                <Text style={styles.username}>{member.data.username}</Text>
                <View style={styles.row}>
                  {
                    member.data.status === 'member'
                    ? <Text onPress={() => {removeUser()}} style={{color: 'red'}}>Remove  </Text>
                    : null
                  }
                  <Text>({member.data.status})</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text>{member.data.email}</Text>
                <Text>{member.data.location}</Text>
              </View>
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default MemberComponent
