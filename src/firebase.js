import firebase from 'firebase/app';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCkk-kUwzR991iffcUn1Cvmob1zX5xvU3E",
  authDomain: "stevens-chan.firebaseapp.com",
  databaseURL: "https://stevens-chan.firebaseio.com",
  projectId: "stevens-chan",
  storageBucket: "stevens-chan.appspot.com",
  messagingSenderId: "130729936142"
});

export default firebase