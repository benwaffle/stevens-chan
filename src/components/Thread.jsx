import React, { Component } from 'react';

class Thread extends Component {
   render() {
      const { data } = this.props;
      return (
         <div className="thread">
            <div className="time">{data.createdAt.toString()}</div>
            <div className="split">
               {data.image && <img src={data.image} alt="garbage" />}
               <pre>{data.text}</pre>
            </div>
         </div>
      );
   }
}

export default Thread;
