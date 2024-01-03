import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeApp, getApps, getApp} from 'firebase/app';
import {
  DocumentData,
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';

import Authentication from './authentication';

const firebaseConfigProduction = {
  apiKey: Authentication.API_KEY_FIREBASE,
  authDomain: Authentication.AUTH_DOMAIN_FIREBASE,
  projectId: Authentication.PROJECT_ID_FIREBASE,
  storageBucket: Authentication.STORAGE_BUCKETS_FIREBASE,
  messagingSenderId: Authentication.MESSAGING_SENDER_ID,
  appId: Authentication.APP_ID,
  measurementId: Authentication.MEASUREMENT_ID,
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfigProduction);
} else {
  firebaseApp = getApp();
}

const db = getFirestore();

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const storage = getStorage(firebaseApp);

export {
  db,
  auth,
  firebaseApp,
  storage
};
