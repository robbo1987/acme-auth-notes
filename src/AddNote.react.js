import React from "react";
import { connect } from "react-redux";

import { addNote } from "./store";

class AddNote extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  render() {
    const { text} = this.state;
    return (
      <div>
        <h1>Add a New Note!</h1>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          this.props.add(
            this.state.text
          ); this.setState({text:''})
          
        }}
      >
        <input
          placeholder="add new note"
          value={text}
          onChange={(ev) => this.setState({ text: ev.target.value })}
        />
        <button type="submit" disabled={!text}>
          Submit
        </button>
      </form>
      </div>
    );
  }
}

export default connect(null, (dispatch) => {
  return {
    add: (text) => {
      dispatch(addNote(text));
    },
  };
})(AddNote);