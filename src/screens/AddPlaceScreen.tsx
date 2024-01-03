import React, { useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { YELP_API_KEY } from '../api/authentication'
import axios from 'axios'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../api/firebase'
import { useNavigation } from '@react-navigation/native'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const AddPlaceScreen = ({route}) => {
  const {list} = route.params

  const navigation = useNavigation()

  const [place, setPlace] = useState('')
  const [location, setLocation] = useState('')
  const [placesResults, setPlacesResults] = useState([])

  const searchPlaces = () => {
    searchYelp()
      .then(data => {
        console.log('Yelp data:', data.businesses);
        setPlacesResults(data.businesses)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const searchYelp = async () => {
    const apiKey = YELP_API_KEY;
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    const query = {
      term: place,
      location: location,
    };
  
    try {
      const response = await axios.get(yelpUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: query,
      });
  
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Yelp:', error);
    }
  };

  const addPlaceToList = (place: any) => {
    const colRef = collection(db, 'Places')
    const docData = {
      name: place.name,
      address: {
        street: place.location.address1,
        city: place.location.city,
        state: place.location.state, 
        country: place.location.country,
        zip_code: place.location.zip_code
      },
      id: place.id,
      url: place.url,
      image: place.image_url,
      price: place.price,
      rating: place.rating,
      reviews: place.review_count,
      phone: place.display_phone,
      listId: list.id
    }
    addDoc(colRef, docData)
      .then(response => {
        console.log('place added')
        navigation.navigate('ViewListScreen', {item: list})
      })
      .catch(error => {
        console.error(error)
      })
  }

  const displayBusinesses = () => {
    return(
      <View>
        {
          placesResults.map(currentPlace => {
            return(
              <View style={styles.place}>
                <Text style={styles.placeName}>{currentPlace.name}</Text>
                <View style={styles.content}>
                  <Image style={styles.placeImage} source={{uri: currentPlace.image_url}} />
                  <View style={styles.rightContant}>
                    <Text style={styles.address}>{currentPlace.location.address1} </Text>
                    <Text style={styles.address}>{currentPlace.location.city}, {currentPlace.location.state} {currentPlace.location.zip_code} </Text>
                    <Text style={styles.phone}>Phone: {currentPlace.phone}</Text>
                    <View style={styles.content}>
                      <Text>{currentPlace.rating} / 5 | </Text>
                      <Text>{currentPlace.review_count} Reviews | </Text>
                      <Text>Pricing: {currentPlace.price} </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.addToList}>
                  <Text style={styles.addListButton} onPress={() => {addPlaceToList(currentPlace)}}>Add To List</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Place</Text>
      </View>
      <View style={styles.investmentPairContainerFull}>
        <View style={styles.singleInvestmentMetric}>
          <View style={styles.inputContainerSplit}>
            <View style={styles.splitInput}>
              <Text>Place:</Text>
              <TextInput 
                style={styles.inputSplit}
                value={place}
                returnKeyType='done'
                placeholder={'Chipotle...'}
                onChangeText={(value) => {setPlace(value)}}
              />
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.singleInvestmentMetric}>
          <View style={styles.inputContainerSplit}>
            <View style={styles.splitInput}>
              <Text>Location:</Text>
              <TextInput 
                style={styles.inputSplit}
                value={location}
                returnKeyType='done'
                placeholder={'Brea, CA...'}
                onChangeText={(value) => {setLocation(value)}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.addList}>
        <Text style={styles.addToListButton} onPress={() => {searchPlaces()}}>Search</Text>
      </View>
      <ScrollView style={styles.scroll}>
        {
          placesResults.length > 0
            ? displayBusinesses()
            : <View style={styles.noResultContainer}><Text style={styles.noResultText}>No Results</Text></View>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
    width: '48%',
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
  addToList: {
    width: '100%',
    borderRadius: 15,
    marginTop: 12,
    paddingVertical: 12,
    backgroundColor: '#D10707',
  },
  addToListButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  addList: {
    width: Dimensions.get('window').width - 12,
    marginLeft: 6,
    borderRadius: 15,
    paddingVertical: 12,
    backgroundColor: '#D10707',
  },
  addListButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  noResultContainer: {
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 24
  },
  noResultText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  scroll: {
    height: Dimensions.get('window').height - 180,
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
})

export default AddPlaceScreen
