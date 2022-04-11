import React, { useReducer } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Notes = ({ notes, auth }) => {
  console.log(auth);
  return (
    <div>
      <Link to="/home">Home</Link>
      <div>TODO - Ability of User to manage notes</div>
      <div>
        Here is a list of all user specific notes for {auth.username}
        <ul>
          {notes.map((note) => {
            return <li>note: {note.text}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default connect((state) => state)(Notes);
