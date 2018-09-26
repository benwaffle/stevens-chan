import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import 'firebase/firestore';
import './App.css';

class App extends Component {
  state = {
    threads: {}
  }

  componentWillMount() {
    firebase.firestore().collection('threads').onSnapshot((doc) => {
      this.setState(state => {
        const threads = state.threads
        doc.docChanges().map(({ type, doc }) => {
          if (type === 'added' || type === 'modified')
            threads[doc.data().id] = doc.data()
          else if (type === 'removed')
            delete threads[doc.data().id]
        })
        return { threads }
      })
    })
  }

  render() {
    return (
      <div className="App">
        {JSON.stringify(this.state.threads)}
      </div>
    );
  }
}

export default App;
