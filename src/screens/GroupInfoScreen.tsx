import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { db } from '../api/firebase'
import MemberComponent from '../components/MemberComponent'
import { useNavigation } from '@react-navigation/native'
import { ChevronsLeft, ChevronsRight } from 'react-native-feather'

const GroupInfoScreen = ({route}) => {
  const {list} = route.params
  const navigation = useNavigation()

  const [members, setMembers] = useState([])

  useEffect(() => {
    grabMembers()
  }, [])

  const grabMembers = () => {
    const colRef = collection(db, 'Members')
    const q = query(colRef, where('listId', '==', list.id))
    onSnapshot(q, snapshot => {
      let listMembers = []
      snapshot.docs.forEach(doc => {
        listMembers.push({data: doc.data(), id: doc.id})
      })
      setMembers(listMembers)
    })
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <ChevronsLeft style={{marginRight: 8}} stroke="blue" fill="#fff" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{list.data.name}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text>{list.data.description}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.membersHeader}>
          <Text style={{fontWeight: 600}}>Members: </Text>
          <Text onPress={() => {navigation.navigate('AddMemberScreen', {list: list})}} style={{fontWeight: 600, color: 'blue'}}>Add Member</Text>
        </View>
        {
          members.map(member => {
            return(
              <View>
                <MemberComponent memberId={member.data.userId} members={members}/>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  descriptionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
  },
  memberHeaderContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
  },
  membersHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default GroupInfoScreen
