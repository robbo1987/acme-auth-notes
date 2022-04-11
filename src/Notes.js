import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Notes = ({ notes,auth }) => {
  const userNotes = notes.filter(note => note.userId === auth.id)
  console.log(userNotes)
  return (
    <div>
      <Link to="/home">Home</Link>
      <div>TODO - Ability of User to manage notes</div>
      <div>
        Here is a list of all user specific notes:
        <ul>
          {userNotes.map((note) => {
            return (
              <li key={note.id}>
                note id: {note.id} note.userId: {note.userId} note: {note.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default connect((state) => state)(Notes);
