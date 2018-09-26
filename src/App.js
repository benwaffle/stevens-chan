import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import './App.css';
import { v4 as uuid } from 'uuid';
import { CreateThread } from './CreateThread';

class App extends Component {
  state = {
    threads: {}
  }

  constructor(props) {
    super(props)
    this.db = firebase.firestore()
    this.db.settings({timestampsInSnapshots: true})
  }

  createThread(text, image = null) {
    const id = uuid()
    this.db.collection('threads').doc(id).set({
      id,
      text,
      image,
      createdAt: new Date()
    })
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
        <pre>{JSON.stringify(this.state.threads, null, 2)}</pre>
        <CreateThread createThread={this.createThread} />
      </div>
    );
  }
}

export default App;
