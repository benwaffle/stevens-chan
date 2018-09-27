import React from 'react';

export class CreateThread extends React.Component {
   state = {
      text: '',
      open: false
   };

   render() {
      const { text, open } = this.state;
      return (
         <div className="sub">
            {open ? (
               <form className="create-thread">
                  <h2>Create a Thread</h2>
                  <textarea
                     placeholder="message goes here"
                     rows={10}
                     cols={40}
                     required
                     value={this.state.text}
                     onChange={event =>
                        this.setState({ text: event.target.value })
                     }
                  />
                  <br />
                  <button
                     onClick={e => {
                        e.preventDefault();
                        this.props.createThread(this.state.text);
                        this.setState({ text: '', open: false });
                     }}
                  >
                     Submit
                  </button>
               </form>
            ) : (
               <div
                  className="clickme"
                  onClick={() => this.setState({ open: true })}
               >
                  [Start a Thread]
               </div>
            )}
         </div>
      );
   }
}
