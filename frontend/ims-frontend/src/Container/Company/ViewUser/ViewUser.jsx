import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { server } from "../../../server";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";

import "./ViewUser.css";

const ViewUser = () => {
  // useEffect(() => {
  //   findCompany();
  // }, []);

  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [companyId, setCompanyId] = useState(null);

  //get user info from context

  const { userInfo } = useContext(AuthContext);

  //find company connected to user
  // const findCompany = async () => {
  //   try {
  //     const response = await axios.get(`${server}/findcompany`);
  //     setCompanyId(response.data);
  //     getProjects();
  //     console.log("this is the company", response.data);
  //   } catch (error) {
  //     console.log(`error fetching company`, error);
  //   }
  // };
  //find company projects
  // const getProjects = async () => {
  //   try {
  //     const response = await axios.get(`${server}/getprojects/${companyId}`);
  //     console.log(response.data, "<-- company projects data");
  //     setProjectList(response.data);
  //     console.log("this is the projects", response.data);
  //   } catch (error) {
  //     console.log(`error fetching projects`, error);
  //   }
  // };

  return (
    <div className="app__view_user">
      <div className="app__view_user-content">
        <div className="app__view_user-title">
          <h1>Inventory Management System</h1>
          <h2>Welcome {userInfo.first_name}</h2>
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
              <h2>You are not connected to a company IMS </h2>
              <div className="app__view_user-noproject-options">
                <button
                  className="company_button"
                  onClick={() => navigate("/create_company")}
                >
                  Start company IMS
                </button>
                {/* <MdAddCircle
                  className="app__view_user-startcompany"
                  title="Start Company IMS "
                  size={25}
                  onClick={() => navigate("/newcompany")}
                /> */}

                <button onClick={() => navigate("/connect_company")}>
                  Connect to company IMS
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
