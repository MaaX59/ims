import React from "react";
import "./DisplayProjects.css";

export const DisplayProjects = (projects) => {
  // console.log("projects.data", projects.data);
  return (
    <div className="app__display-projects">
      {projects.data.map((project, index) => (
        <div className="app__display-projects-singleproject" key={index}>
          <a href={`/company_project_page/${project.id}`} project={{ project }}>
            <h1>{project.project_name}</h1>
          </a>
        </div>
      ))}
    </div>
  );
};
