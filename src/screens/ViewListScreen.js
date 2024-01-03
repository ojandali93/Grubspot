import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { db } from '../api/firebase'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'
import { Trash2, AlertCircle, ChevronsLeft } from "react-native-feather"

const ViewListScreen = ({route}) => {
  const {item} = route.params

  const navigation = useNavigation()

  const [listPlaces, setListPlaces] = useState([])
  const [memberList, setMemberList] = useState([])

  useEffect(() => {
    grabPlaces()
    grabMembers()
  }, [])

  const grabPlaces = () => {
    const colRef = collection(db, 'Places')
    const q = query(colRef, where('listId','==',item.id))
    onSnapshot(q, (snapshot) => {
      let placesList = []
      snapshot.docs.forEach(doc => {
        placesList.push({data: doc.data(), id: doc.id})
      })
      setListPlaces(placesList)
    })
  }

  const grabMembers = () => {
    const colRef = collection(db, 'Members')
    const q = query(colRef, where('listId','==',item.id))
    onSnapshot(q, (snapshot) => {
      let memberList = []
      snapshot.docs.forEach(doc => {
        memberList.push({data: doc.data(), id: doc.id})
      })
      setMemberList(memberList)
    })
  }

  const deleteItemFromList = (placeId) => {
    const docRef = doc(db, 'Places', placeId)
    deleteDoc(docRef)
      .then((response) => {
        console.log('removed doc')
      })
      .catch((currentError) => {
        console.error(currentError)
      })
  }

  const displayPlaces = () => {
    return(
      <View>
        {
          listPlaces.map(place => {
            return(
              <View style={styles.place}>
                <View style={styles.headerContent}>
                  <Text style={styles.placeName}>{place.data.name}</Text>
                  <View style={styles.headerContent}>
                    {/* <Feather name="user" size={16} color="black" /> */}
                    {/* <Feather onPress={() => {deleteItemFromList(place.id)}} style={{marginLeft: 8}} name="user" size={16} color="black" /> */}
                    <Trash2 onPress={() => {deleteItemFromList(place.id)}} style={{marginLeft: 8}} stroke="black" fill="#fff" width={18} height={18} />
                  </View>
                </View>
                <View style={styles.content}>
                  <Image style={styles.placeImage} source={{uri: place.data.image}} />
                  <View style={styles.rightContant}>
                    <Text style={styles.address}>{place.data.address.street} </Text>
                    <Text style={styles.address}>{place.data.address.city}, {place.data.address.state} {place.data.address.zip_code} </Text>
                    <Text style={styles.phone}>Phone: {place.data.phone}</Text>
                    <View style={styles.content}>
                      <Text>{place.data.rating} / 5 | </Text>
                      <Text>{place.data.reviews} Reviews | </Text>
                      <Text>Pricing: {place.data.price} </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <ChevronsLeft style={{marginRight: 8}} stroke="blue" fill="#fff" width={24} height={24} />
          </TouchableOpacity>
          {/* <Text onPress={() => {navigation.goBack()}} style={[styles.headerText, {color: 'blue'}]}>{'<  '}</Text> */}
          <Text style={styles.headerText}>{item.data.name}</Text>
        </View>
        <TouchableOpacity onPress={() => {navigation.navigate('GroupInfoScreen', {list: item})}}>
          <AlertCircle stroke="black" fill="#fff" width={32} height={32} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        {
          listPlaces.length > 0
            ? displayPlaces()
            : <Text>No Places Found</Text>
        }
      </ScrollView>
      <View style={styles.addList}>
        <Text style={styles.addListButton} onPress={() => {navigation.navigate('AddPlacesScreen', {list: item})}}>Add A Place</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  place: {
    marginTop: 16,
    paddingHorizontal: 16
  },
  placeImage: {
    height: 100,
    width: 100,
    borderRadius: 8,
    overflow: 'hidden'
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  rightContant: {
    marginLeft: 16
  },
  address: {
    fontSize: 16,
    fontWeight: '600'
  },
  phone: {
    marginVertical: 6
  },
  scroll: {
    flex: 1
  },
  addList: {
    bottom: 0,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 10,
    paddingVertical: 16,
    backgroundColor: '#D10707',
  },
  addListButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
})

export default ViewListScreen
