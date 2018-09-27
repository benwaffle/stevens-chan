import React, { Component } from 'react';
import firebase from './firebase';
import 'firebase/firestore';
import _ from 'lodash';

class ThreadViewer extends Component {
   state = {
      doc: null,
      replies: []
   }

   constructor(props) {
      super(props);
      this.db = firebase.firestore();
      this.db.settings({ timestampsInSnapshots: true });
   }

   componentWillMount() {
      console.log(this.props.match.params.threadId)
      this.db
         .collection('threads')
         .doc(this.props.match.params.threadId)
         .collection('replies')
         .onSnapshot(doc => {
            this.setState(state => {
               const replies = state.replies;
               doc.docChanges().forEach(({ type, doc }) => {
                  if (type === 'added' || type === 'modified')
                     replies[doc.data().id] = {
                        ...doc.data(),
                        createdAt: doc.data().createdAt.toDate()
                     };
                  else if (type === 'removed')
                     delete replies[doc.data().id];
               });
               return {
                  replies: _.sortBy(
                     Object.values(replies),
                     v => v.createdAt
                  ).reverse()
               };
            })
         })
   }

   render() {
      return <div>
      {JSON.stringify(this.state, null, 3)}
      </div>;
   }
}

export default ThreadViewer;
