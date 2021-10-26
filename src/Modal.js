import React from 'react';
import './Modal.css';



const Choosen = {
    PLAYER1: 'player1',
    PLAYER2: 'player2',
  };

class Modal extends React.Component{

    state = {
        checked: null,
    }

    handleChange = ({ target }) => {

        const { name, value, type, checked } = target;
       this.setState({ [name]: type === 'checkbox' ? checked : value })
      };

      handleSubmit = evt => {
        evt.preventDefault();

        this.props.onSubmit(this.state.checked);
      };
    
    render() {
        return (
          <form className="modal">
              <h2>Choose player</h2>
            <label>
            PLAYER1
         <input
              type="radio"
              name="player"
              value={Choosen.PLAYER1}
              onChange={this.handleChange}
            />
        </label>
          <label>
          PLAYER2
          <input
              type="radio"
              name="player"
              value={Choosen.PLAYER2}
              onChange={this.handleChange}
            />
        </label>
        <button type="submit" >Enter</button>
          </form>
        );
      }

}
export default Modal;