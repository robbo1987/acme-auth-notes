import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {destroyNote} from './store';
import AddNote from './AddNote.react'

const Notes = ({ notes, auth, destroyNote }) => {
  console.log(auth);
  return (
    <div>
      <Link to="/home">Home</Link>
      <div>TODO - Ability of User to manage notes</div>
      <AddNote />
      <div>
        Here is a list of all user specific notes for {auth.username}
        <ul>
          {notes.map((note) => {
            return (
              <li key={note.id}>
                note: {note.text} <button onClick ={()=> destroyNote(note) }>Delete Note</button> 
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    destroyNote: (note) => dispatch(destroyNote(note)),
  };
};

export default connect((state) => state, mapDispatch)(Notes);
