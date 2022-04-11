import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Notes = ({ notes }) => {
  console.log("notes", notes);
  return (
    <div>
      <Link to="/home">Home</Link>
      <div>TODO - Ability of User to manage notes</div>
      <div>
        Here is a list of all notes, not user specific:
        <ul>
          {notes.map((note) => {
            return (
              <li>
                note id: {note.id} note: {note.txt}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default connect((state) => state)(Notes);
