import React, { Component } from 'react';
import moment from 'moment';

class Thread extends Component {
   render() {
      const { data } = this.props;
      return (
         <div className="thread">
            <div className="time">{moment(data.createdAt).fromNow()}</div>
            <div className="split">
               {data.image && <img src={data.image} alt="garbage" />}
               <pre>{data.text}</pre>
            </div>
            <div className="replies">
              {(data.replies || []).map(reply =>
                <div key={reply.id} className="reply">
                  {reply.text}
                </div>
              )}
            </div>
         </div>
      );
   }
}

export default Thread;
