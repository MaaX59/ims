import React from "react";
import "./DisplayProjects.css";
import { useNavigate } from "react-router-dom";

export const DisplayProjects = (projects) => {
  const navigate = useNavigate();
  // console.log("projects.data", projects.data);
  return (
    <div className="app__display-projects">
      {projects.data.map((project, index) => (
        <div
          className="app__display-projects-singleproject"
          key={index}
          onClick={() => {
            navigate(`/company_project_page/${project.id}`);
          }}
        >
          <h1>{project.project_name}</h1>
        </div>
      ))}
    </div>
  );
};
