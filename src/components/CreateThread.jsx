import React from 'react';

export class CreateThread extends React.Component {
   state = {
      text: ''
   };

   render() {
      return (
         <form>
            <textarea
               placeholder="message goes here"
               value={this.state.text}
               onChange={event => this.setState({ text: event.target.value })}
            />
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
