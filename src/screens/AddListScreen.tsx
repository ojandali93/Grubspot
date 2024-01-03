import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import { auth, db } from '../api/firebase'
import { useNavigation } from '@react-navigation/native'

const deviceWidth = Dimensions.get('window').width

const AddListScreen = () => {
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [displayPubilc, setDisplayPubilc] = useState(true)

  const addNewList = () => {
    const colRef = collection(db, 'Lists')
    addDoc(colRef, {
      name: name,
      description: description,
      displayPublic: displayPubilc,
      createdBy: auth.currentUser?.uid,
      createdAt: new Date()
    })
      .then((response) => {
        console.log(response.id)
        addNewMember(response.id)

      })
      .catch((error) => {
        console.error(error)
      })
  }

  const addNewMember = (listId: any) => {
    const colRef = collection(db, 'Members')
    addDoc(colRef, {
      userId: auth.currentUser?.uid,
      listId: listId,
      status: 'admin',
      dateAdded: new Date()
    })
      .then((response) => {
        navigation.navigate('ListCollectionScreen')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerText}>Create New List</Text>
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
                placeholder={'...'}
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
              <Text>Description:</Text>
              <TextInput 
                style={styles.inputSplit}
                value={description}
                returnKeyType='done'
                placeholder={'...'}
                onChangeText={(value) => {setDescription(value)}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.addList}>
        <Text style={styles.addToListButton} onPress={() => {addNewList()}}>Create List</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerTop: {
    display: 'flex',
    flexDirection: 'row'
  },
  header: {
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    paddingHorizontal: 16
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
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
  scroll: {
    height: Dimensions.get('window').height - 150,
  },
  addList: {
    position: 'absolute',
    top: Dimensions.get('window').height - 80,
    width: Dimensions.get('window').width - 12,
    marginLeft: 6,
    borderRadius: 10,
    paddingVertical: 16,
    backgroundColor: '#D10707',
  },
  addToListButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
})

export default AddListScreen
