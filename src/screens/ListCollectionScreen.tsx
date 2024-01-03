import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { auth, db } from '../api/firebase';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { User } from "react-native-feather"
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';

export const ListCollectionScreen = () => {
  const navigation = useNavigation();

  const [memberList, setMemberList] = useState([]);
  const [listCollection, setListCollection] = useState([]);

  useEffect(() => {
    auth.currentUser === null
      ? goToLoginPage()
      : grabMemberList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null
        ? goToLoginPage()
        : grabMemberList();
    });
    return unsubscribe;
  }, [navigation]);

  const goToLoginPage = () => {
    navigation.navigate('LoginScreen');
  };

  const grabMemberList = () => {
    const colRef = collection(db, 'Members');
    const q = query(colRef, where('userId', '==', auth.currentUser?.uid));
    onSnapshot(q, snapshot => {
      let members: any = [];
      snapshot.docs.forEach(doc => {
        members.push({ data: doc.data(), id: doc.id });
      });
      console.log(members.length);
      setMemberList(members);
      members.length > 0
        ? grabLists(members)
        : null;
    });
  };

  const grabLists = (members: any) => {
    let lists: any = [];
    members.map((member: any) => {
      const docRef = doc(db, 'Lists', member.data.listId);
      getDoc(docRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            console.log(docSnapshot.data());
            setListCollection(listCollection => [...listCollection, { data: docSnapshot.data(), id: docSnapshot.id }]);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    });
    // console.log('list count: ', lists.length)
    setListCollection(lists);
  };

  const displayCollections = () => {
    return (
      <View>
        {listCollection.map((list: any) => {
          return (
            <TouchableOpacity style={styles.listContainer} onPress={() => { navigation.navigate('ViewListScreen', {item: list})}}>
              <View style={styles.listItemTop}>
                <Text style={styles.listName}>{list.data.name}</Text>
                <Text style={styles.listName}>{list.data.member_count} Members</Text>
              </View>
              <View style={styles.listItemTop}>
                <Text style={styles.listDescription}>{list.data.description}</Text>
                <Text style={styles.listDescription}>{list.data.list_count} Spots</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/grubspotLogo2.png')} />
        </View>
        <TouchableOpacity onPress={() => {navigation.navigate('ProfileScreen')}} style={styles.logoContainer}>
          <User stroke="black" fill="#fff" width={32} height={32} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        {listCollection.length > 0
          ? displayCollections()
          : <Text>No List FOund</Text>}
      </ScrollView>
      <View style={styles.addList}>
        <Text style={styles.addListButton} onPress={() => { navigation.navigate('AddListScreen'); }}>Add List</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'grey',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 100,
    height: 35
  },
  scroll: {
    flex: 1
  },
  addList: {
    bottom: 0,
    left: 0,
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
  listContainer: {
    width: Dimensions.get('window').width,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    backgroundColor: 'white'
  },
  listName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  listItemTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listDescription: {

  }
})