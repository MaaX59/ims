import "./NewProject.css";
import React from "react";
import Navbar from "../Navbar/Navbar";

const NewProject = () => {
  return (
    <div className="app__newproject">
      <Navbar />
      <div className="app__newproject-content">
        <div className="title">Start Project</div>
        <div className="subtitle">Let's create a new project!</div>
        <div className="input-container ic1">
          <input
            id="project-name"
            className="input"
            type="text"
            placeholder=" "
          />
          <div className="cut"></div>
          <label for="project-name" className="placeholder">
            Project Name
          </label>
        </div>
        <div className="input-container ic2">
          <input
            id="project-description"
            className="input"
            type="text"
            placeholder=" "
          />
          <div className="cut"></div>
          <label for="project-description" className="placeholder">
            Description
          </label>
        </div>
        <button type="text" className="submit">
          Create
        </button>
      </div>
    </div>
  );
};

export default NewProject;
