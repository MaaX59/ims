import { React, useEffect, useState, useContext } from "react";
import "./Inventory.css";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import { useParams } from "react-router-dom";
import getProjects from "../../../Components/Company/GetProjects";
import { DisplayProjects } from "../../../Components/Company/DisplayProjects/DisplayProjects";
import { MdAddCircle } from "react-icons/md";
import CreateProject from "../../../Components/Company/CreateProject/CreateProject";
import AuthContext from "../../../context/AuthProvider";
import axios from "axios";
import { server } from "../../../server";

const Inventory = () => {
  const company_id = useParams();
  const { userInfo } = useContext(AuthContext);
  // console.log("page:inv, company Id -->", company_id);

  const [projectList, setProjectList] = useState([]);
  const [openCreateProject, setOpenCreateProject] = useState(false);

  useEffect(() => {
    getProjects(company_id);
    // console.log(getProjects(company_id));
    // setProjectList(getProjects(company_id));
    // updateProjectList();
  }, []);

  // const get_projects = () => {
  //   console.log(getProjects(company_id));
  //   // const projects= getProjects(company_id)
  //   // setProjectList(projects)
  // };

  // const updateProjectList = () => {
  //   console.log("update project list");
  //   setProjectList(getProjects(company_id));
  // };

  const getProjects = async (companyId) => {
    console.log(
      "get projects function is triggered, userinfo-->",
      companyId.id
    );
    try {
      const company_id = companyId.id;
      console.log("company id in get projects", company_id);
      await axios
        .get(`${server}/get_company_projects/${company_id}`)
        .then((res) => {
          console.log(res.data, "<-- company projects data");
          setProjectList(res.data);
          console.log(projectList, "<-- company projects data");
          console.log("this is the projects", res.data);
        });
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="app__inventory">
      <NavBar currentPage="inv" />
      <div className="app__inventory-content">
        <div className="app__view_user-projects-create">
          <span>Create a project</span>
          <MdAddCircle
            className="app__viewproject-startproject"
            title="Add Project"
            size={25}
            onClick={() => setOpenCreateProject(!openCreateProject)}
          />
        </div>
        <div className="app__inventory-create-project">
          {openCreateProject ? (
            <CreateProject
              openCreateProject={openCreateProject}
              setOpenCreateProject={setOpenCreateProject}
              userInfo={userInfo}
              // updateProjectList={updateProjectList}
            />
          ) : null}
        </div>
        <div className="app__inventory-projects">
          {projectList.length > 0 ? (
            <DisplayProjects data={projectList} />
          ) : (
            <div className="app__inventory-noprojects">
              <h1>There are no projects to display</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
