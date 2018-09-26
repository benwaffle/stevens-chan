import React, { Component } from 'react';
import firebase from 'firebase';
import Thread from './components/Thread';
import _ from 'lodash';
import 'firebase/firestore';
import './App.css';
import { v4 as uuid } from 'uuid';
import { CreateThread } from './components/CreateThread';

class App extends Component {
   state = {
      threads: []
   };

   createThread(text, image = null) {
      const id = uuid();
      firebase
         .firestore()
         .collection('threads')
         .doc(id)
         .set({
            id,
            text,
            image,
            createdAt: new Date()
         });
   }

   componentWillMount() {
      firebase
         .firestore()
         .collection('threads')
         .onSnapshot(doc => {
            this.setState(state => {
               const threads = state.threads;
               doc.docChanges().forEach(({ type, doc }) => {
                  if (type === 'added' || type === 'modified')
                     threads[doc.data().id] = doc.data();
                  else if (type === 'removed') delete threads[doc.data().id];
               });
               return {
                  threads: _.sortBy(
                     Object.values(threads),
                     v => new Date(v.createdAt)
                  ).reverse()
               };
            });
         });
   }

   render() {
      const { threads } = this.state;
      return (
         <div className="App">
            <CreateThread createThread={this.createThread} />
            {threads.map(e => (
               <Thread key={e.id} data={e} />
            ))}
         </div>
      );
   }
}

export default App;
