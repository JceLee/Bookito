import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyB12lo5h6HnQVSeRqpUdsQDVIjrk7XblFM",
    authDomain: "lookup-91667.firebaseapp.com",
    databaseURL: "https://lookup-91667.firebaseio.com",
    projectId: "lookup-91667",
    storageBucket: "lookup-91667.appspot.com",
    messagingSenderId: "780648292032",
    appId: "1:780648292032:web:e3f073a4f4e27de6545725",
    measurementId: "G-1725NCPMFS"
};


firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

export default firestore;

// const db = firebase.firestore()
//
// export const getDesignerList = () => {
//     return db.collection('designers').get();
// }
