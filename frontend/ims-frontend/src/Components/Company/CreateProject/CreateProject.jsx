import { React, useState } from "react";
import axios from "axios";
import { server } from "../../../server";
import "./CreateProject.css";
import AddToLog from "../Functions/AddToLog";

const CreateProject = (props) => {
  const [project_name, setProject_name] = useState("");
  const [project_description, setProject_description] = useState("");

  const createProject = async () => {
    // console.log(project_name);
    // console.log("user info -->", props.userId);
    const body = {
      project_name: project_name,
      project_description: project_description,
      company_id: props.userInfo.company_id,
      created_by_user_id: props.userInfo.id,
    };

    await axios.post(`${server}/create_company_project`, body).then((res) => {
      props.getProjectsFunction();
      props.setOpenCreateProject(!props.openCreateProject);

      AddToLog(body);
    });
  };
  return (
    <div className="form create-project">
      <div className="title">Start Project</div>
      <div className="input-container-company ic1">
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
      <div className="input-container-company ic2">
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

export default CreateProject;
