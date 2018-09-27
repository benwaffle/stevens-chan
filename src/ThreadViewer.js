import React, { Component } from 'react';

class ThreadViewer extends Component {
   render() {
      return <div>{JSON.stringify(this.props)}</div>;
   }
}

export default ThreadViewer;
