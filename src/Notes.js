import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Notes = ({ notes,auth }) => {
 
  return (
    <div>
      <Link to="/home">Home</Link>
      <div>TODO - Ability of User to manage notes</div>
      <div>
        Here is a list of all user specific notes:
     
          
      </div>
    </div>
  );
};

export default connect((state) => state)(Notes);
