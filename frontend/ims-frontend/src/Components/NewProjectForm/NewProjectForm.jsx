import { React, useState } from "react";
import "./NewProjectForm.css";
import axios from "axios";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";

const NewProjectForm = () => {
  const [project_name, setProject_name] = useState("");
  const [project_description, setProject_description] = useState("");

  const navigate = useNavigate();

  const createProject = () => {
    console.log(project_name);
    axios
      .post(`${server}/create_project`, {
        project_name: project_name,
        project_description: project_description,
      })
      .then(() => {
        navigate("/viewproject");
      });
  };

  return (
    <div className="form">
      <div className="title">Start Project</div>
      <div className="subtitle">Let's create a new project!</div>
      <div className="input-container ic1">
        <input
          id="project-name"
          className="input"
          type="text"
          placeholder=" "
          onChange={(event) => {
            setProject_name(event.target.value);
          }}
          required
        />

        <label for="project-name" className="placeholder">
          Project Name*
        </label>
      </div>
      <div className="input-container ic2">
        <input
          id="project-description"
          className="input"
          type="text"
          placeholder=" "
          onChange={(event) => {
            setProject_description(event.target.value);
          }}
        />

        <label for="project-description" className="placeholder">
          Description
        </label>
      </div>
      <div className="form-required"> * field is required</div>

      <button type="text" className="submit" onClick={createProject}>
        Create
      </button>
    </div>
  );
};

export default NewProjectForm;
