import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCST4Wm6AmfCNyf6fxW6C-Re0oSZ6EbLyM",
  authDomain: "electron-53f9e.firebaseapp.com",
  databaseURL: "https://electron-53f9e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "electron-53f9e",
  storageBucket: "electron-53f9e.appspot.com",
  messagingSenderId: "16577598998",
  appId: "1:16577598998:web:824571d4fb8feb50b40737",
  measurementId: "G-1WCRFGS1G5"
};

export default firebase.initializeApp(config).firestore();
