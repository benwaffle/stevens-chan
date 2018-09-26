import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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

ReactDOM.render(<App firebase={firebase} />, document.getElementById('root'));
registerServiceWorker();
