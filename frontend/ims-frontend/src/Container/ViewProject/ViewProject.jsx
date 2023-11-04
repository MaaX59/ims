import React from "react";
import "./ViewProject.css";
import Navbar from "../Navbar/Navbar";

const ViewProject = () => {
  return (
    <div className="app__viewproject">
      <Navbar />
      <div className="app__viewproject-content">
        <h1>View projects</h1>
      </div>
    </div>
  );
};

export default ViewProject;
