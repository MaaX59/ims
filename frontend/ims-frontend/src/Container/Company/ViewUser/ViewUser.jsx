import { React, useState, useEffect } from "react";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
import { server } from "../../../server";
import { useNavigate } from "react-router-dom";

import "./ViewUser.css";

const ViewUser = () => {
  useEffect(() => {
    findCompany();
  }, []);
  const [companyId, setCompanyId] = useState(null);
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const findCompany = async () => {
    try {
      const response = await axios.get(`${server}/findcompany`);
      setCompanyId(response.data);
      getProjects();
      console.log("this is the company", response.data);
    } catch (error) {
      console.log(`error fetching company`, error);
    }
  };
  const getProjects = async () => {
    try {
      const response = await axios.get(`${server}/getprojects/${companyId}`);
      setProjectList(response.data);
      console.log("this is the projects", response.data);
    } catch (error) {
      console.log(`error fetching projects`, error);
    }
  };

  return (
    <div className="app__view_user">
      <div className="app__view_user-content">
        <div className="app__view_user-title">
          <h1>Inventory Manegment System</h1>
        </div>
        <div className="app__view_user-projects">
          {companyId ? (
            projectList.map((project, index) => (
              <div className="app__view_user-singleproject" key={index}>
                {/* {console.log(project)} */}

                <a href={`/project/${project.id}`} project={{ project }}>
                  <h1>{project.project_name}</h1>
                </a>
              </div>
            ))
          ) : (
            <div className="app__view_user-noproject">
              <h1>You are not connected to a Company IMS </h1>
              <h1>Would you like to start one?</h1>
              <MdAddCircle
                className="app__view_user-startcompany"
                title="Start Company IMS "
                size={25}
                onClick={() => navigate("/newcompany")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
