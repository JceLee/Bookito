import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyB12lo5h6HnQVSeRqpUdsQDVIjrk7XblFM",
  authDomain: "lookup-91667.firebaseapp.com",
  databaseURL: "https://lookup-91667.firebaseio.com",
  projectId: "lookup-91667",
  storageBucket: "lookup-91667.appspot.com",
  messagingSenderId: "780648292032",
  appId: "1:780648292032:web:e3f073a4f4e27de6545725",
  measurementId: "G-1725NCPMFS",
});

export const firebaseOrigin = firebase;
export const firebaseStore = firebase.firestore();
export const firebaseAuth = firebase.auth();
export const firebaseDate = firebase.database();
export const firebaseStorage = firebase.storage();
