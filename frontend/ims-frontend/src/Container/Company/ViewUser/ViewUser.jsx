import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { server } from "../../../server";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import { MdAddCircle } from "react-icons/md";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import "./ViewUser.css";
import { DisplayProjects } from "../../../Components/Company/DisplayProjects/DisplayProjects";

const ViewUser = () => {
  useEffect(() => {
    findCompany();
  }, []);

  const navigate = useNavigate();

  const [projectList, setProjectList] = useState([]);
  const [company, setCompany] = useState(null);

  //get user info from context

  const { userInfo } = useContext(AuthContext);

  //find company connected to user
  const findCompany = async () => {
    try {
      const company_id = userInfo.company_id;
      console.log("company id-->", company_id);
      await axios.get(`${server}/find_company/${company_id}`).then((res) => {
        setCompany(res.data[0]);
        // getProjects();
        // console.log("this is the company", res.data[0]);
        // console.log("this is the company", company);

        getProjects();
      });
    } catch (error) {
      console.log(`error fetching company`, error);
    }
  };

  //find company projects
  const getProjects = async () => {
    console.log("get projects function is triggered");
    try {
      const company_id = userInfo.company_id;
      console.log("company id in get projects", company_id);
      await axios
        .get(`${server}/get_company_projects/${company_id}`)
        .then((res) => {
          console.log(res.data, "<-- company projects data");
          setProjectList(res.data);
          console.log("this is the projects", res.data);
        });
    } catch (error) {
      console.log(`error fetching projects`, error);
    }
  };

  return (
    <div className="app__view_user">
      <NavBar currentPage="dash" />
      <div className="app__view_user-content">
        <div className="app__view_user-title">
          <h1>Inventory Management System</h1>
          <h2>Welcome {userInfo.first_name}</h2>
        </div>
        <div className="app__view_user-company">
          {company ? (
            <div className="app__view_user-company-connected">
              <span>You are connected to {company.company_name}</span>{" "}
            </div>
          ) : (
            <div className="app__view_user-nocompany">
              <h2>You are not connected to a company IMS </h2>
              <div className="app__view_user-nocompany-options">
                <button
                  className="company_button"
                  onClick={() => navigate("/create_company")}
                >
                  Start company IMS
                </button>
                <button onClick={() => navigate("/connect_company")}>
                  Connect to company IMS
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="app__view_user-projects-create">
          <span>Create a project</span>
          <MdAddCircle
            className="app__viewproject-startproject"
            title="Add Project"
            size={25}
            onClick={() => navigate("/new_company_project")}
          />
        </div>

        <div className="app__view_user-projects">
          {projectList.length > 0 ? (
            <DisplayProjects data={projectList} />
          ) : (
            <div className="app__view_user-noprojects">
              <h1>There are no projects to display</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
