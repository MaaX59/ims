import React from "react";
import { Link } from "react-router-dom";
import "./Start.css";

const Start = () => {
  return (
    <div className="app__start">
      <Link to="/viewproject">
        <div className="app__start-private">
          <h1>Private</h1>
          <h2>No Login Required</h2>
        </div>
      </Link>
      <Link to="/login">
        <div className="app__start-company">
          <h1>Company</h1>
          <h2>Login Required</h2>
        </div>
      </Link>
    </div>
  );
};

export default Start;
