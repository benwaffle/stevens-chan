import React from 'react';

export class CreateThread extends React.Component {
   constructor(props) {
      super(props);
      this.fileInput = React.createRef();
   }

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
                     value={text}
                     onChange={event =>
                        this.setState({ text: event.target.value })
                     }
                  />
                  <br />
                  <input type="file" name="fuck" accept="image/*" ref={this.fileInput} />
                  <button
                     onClick={e => {
                        e.preventDefault();
                        const file = this.fileInput.current.files[0];

                        const cont = (imageUrl = '') => {
                          this.props.createThread(text, imageUrl);
                          this.setState({ text: '', open: false });
                        }

                        if (file) {
                          const fr = new FileReader();
                          fr.onload = () => {
                            cont(fr.result.toString());
                          }
                          fr.readAsDataURL(file)
                        } else {
                          cont();
                        }
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
