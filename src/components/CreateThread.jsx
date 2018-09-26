import React from 'react';

export class CreateThread extends React.Component {
   state = {
      text: ''
   };

   render() {
      return (
         <form className="create-thread">
            <h1>Create a Thread</h1>
            <textarea
               placeholder="message goes here"
               rows={10}
               cols={40}
               value={this.state.text}
               onChange={event => this.setState({ text: event.target.value })}
            />
            <br/>
            <button
               onClick={e => {
                  e.preventDefault();
                  this.props.createThread(this.state.text);
               }}
            >
               Submit
            </button>
         </form>
      );
   }
}
