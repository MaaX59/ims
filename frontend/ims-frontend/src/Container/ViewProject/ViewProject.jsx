import { React, useState, useEffect } from "react";
import "./ViewProject.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { server } from "../../server";
import { Link } from "react-router-dom";

const ViewProject = () => {
  useEffect(() => {
    getProjects();
  }, []);

  const [projectList, setProjectList] = useState([]);

  const getProjects = async () => {
    try {
      const response = await axios.get(`${server}/getprojectlist`);
      setProjectList(response.data);
      console.log("this is the projects", response.data);
    } catch (error) {
      console.log(`error fetching projects`, error);
    }
  };

  return (
    <div className="app__viewproject">
      <Navbar />
      <div className="app__viewproject-content">
        <div className="app__viewproject-title">
          <h1>View projects</h1>
        </div>
        <div className="app__viewproject-projects">
          {projectList.length > 0 ? (
            projectList.map((project) => (
              <div className="app__viewproject-singleproject">
                <Link to={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
                  <h1>{project.project_name}</h1>
                </Link>
              </div>
            ))
          ) : (
            <div className="app__viewproject-noproject">
              <h1>There are no projects to display</h1>
              <button>
                <a href="/newproject">Start Project</a>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
