import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import 'firebase/firestore';
import './App.css';

class App extends Component {
  state = {
    n: 0,
    name: 'none'
  }

  componentWillMount() {
    firebase.firestore().collection('name').doc('name').onSnapshot((doc) => {
      this.setState(state => ({
        name: doc.data().name
      }))
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to {this.state.name} {this.state.n}</h1>
          <button onClick={() => {
            this.setState(state => ({n: state.n+1}))
          }}>inc</button>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
