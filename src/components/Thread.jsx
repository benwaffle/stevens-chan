import React, { Component } from 'react';
import moment from 'moment';

class Thread extends Component {
   state = {
      commentText: '',
      bigboi: false
   };

   render() {
      const { data } = this.props;
      const { bigboi } = this.state;
      return (
         <div className="thread">
            <div className="time">{moment(data.createdAt).fromNow()}</div>
            <div className="split">
               {data.image && (
                  <img
                     src={data.image}
                     onClick={() => this.setState({ bigboi: !bigboi })}
                     style={{
                        width: !bigboi ? '10em' : '80%',
                        height: !bigboi ? '10em' : '80%'
                     }}
                     alt="garbage"
                  />
               )}
               <pre>{data.text}</pre>
            </div>
            <div className="replies">
              {(data.replies || []).map(reply => (
                 <div key={reply.id} className="reply">
                    {reply.text}
                 </div>
              ))}
              <div>
                <form onSubmit={e => {
                  e.preventDefault()
                  this.props.createReply(data, this.state.commentText)
                  this.setState({ commentText: '' })
                }}>
                  <input
                    required
                    placeholder="comment"
                    value={this.state.commentText}
                    onChange={e => this.setState({commentText: e.target.value})}
                  />
                  <button>Submit</button>
                </form>
              </div>
            </div>
         </div>
      );
   }
}

export default Thread;
