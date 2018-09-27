import firebase from './firebase';
import 'firebase/firestore';
import _ from 'lodash';
import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import { CreateThread } from './components/CreateThread';
import Thread from './components/Thread';

class App extends Component {
   state = {
      threads: [],
      page: 0
   };

   constructor(props) {
      super(props);
      this.db = firebase.firestore();
      this.db.settings({ timestampsInSnapshots: true });
   }

   createThread(text, image = null) {
      if (text === '')
         return;
      const id = uuid();
      this.db
         .collection('threads')
         .doc(id)
         .set({
            id,
            text,
            image,
            createdAt: new Date()
         });
   }

   createReply(thread, text) {
      const id = uuid();
      this.db
         .collection('threads')
         .doc(thread.id)
         .set({
            ...thread,
            createdAt: new Date(), // jk this is updatedAt
            replies: [
               ...(thread.replies || []),
               {
                  createdAt: new Date(),
                  id,
                  text
               }
            ]
         }, { merge: true })
   }

   componentWillMount() {
      firebase
         .firestore()
         .collection('threads')
         .onSnapshot(doc => {
            this.setState(state => {
               const threads = _.keyBy(state.threads, x => x.id);
               doc.docChanges().forEach(({ type, doc }) => {
                  if (type === 'added' || type === 'modified')
                     threads[doc.data().id] = {
                        ...doc.data(),
                        createdAt: doc.data().createdAt.toDate()
                     };
                  else if (type === 'removed') delete threads[doc.data().id];
               });
               return {
                  threads: _.sortBy(
                     Object.values(threads),
                     v => v.createdAt
                  ).reverse()
               };
            });
         });
   }

   render() {
      const { threads } = this.state;
      return (
         <div className="App">
            <h1>stevens-chan</h1>
            <CreateThread createThread={this.createThread.bind(this)} />
            {this.state.page < Math.ceil(this.state.threads.length / 10)
            && <button onClick={() => this.setState(state => ({ page: state.page+1 }))}>Next page</button>}

            {this.state.page > 0
            && <button onClick={() => this.setState(state => ({ page: state.page-1 }))}>Prev page</button>}

            {threads.slice(this.state.page*10, this.state.page*10+10).map(e => (
               <Thread key={e.id} data={e} createReply={this.createReply.bind(this)} />
            ))}
         </div>
      );
   }
}

export default App;
