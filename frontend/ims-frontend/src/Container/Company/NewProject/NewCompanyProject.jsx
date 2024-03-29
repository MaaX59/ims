import { React, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { FaArrowLeft } from "react-icons/fa";
import "./NewCompanyProject.css";
import axios from "axios";
import { server } from "../../../server";
import { useNavigate } from "react-router-dom";

const NewCompanyProject = () => {
  const [project_name, setProject_name] = useState("");
  const [project_description, setProject_description] = useState("");

  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const createProject = () => {
    console.log(project_name);
    console.log("user info -->", userInfo);

    axios
      .post(`${server}/create_company_project`, {
        project_name: project_name,
        project_description: project_description,
        company_id: userInfo.company_id,
      })
      .then(() => {
        navigate("/viewuser");
      });
  };

  return (
    <div className="form">
      <FaArrowLeft
        className="goBackButton"
        title="Go back"
        size={20}
        onClick={() => navigate("/viewuser")}
      />

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

export default NewCompanyProject;
