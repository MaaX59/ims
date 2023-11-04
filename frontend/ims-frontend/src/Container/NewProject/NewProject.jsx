import "./NewProject.css";
import React from "react";
import Navbar from "../Navbar/Navbar";
import NewProjectForm from "../../Components/NewProjectForm/NewProjectForm";

const NewProject = () => {
  return (
    <div className="app__newproject">
      <Navbar />
      <NewProjectForm />
    </div>
  );
};

export default NewProject;
