import { React, useEffect, useState, useContext } from "react";
import "./Inventory.css";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import { DisplayProjects } from "../../../Components/Company/DisplayProjects/DisplayProjects";
import { MdAddCircle } from "react-icons/md";
import CreateProject from "../../../Components/Company/CreateProject/CreateProject";
import { AuthContext } from "../../../context/AuthProvider";
import GetProjects from "../../../Components/Company/Functions/GetProjects";

const Inventory = () => {
  const { userInfo } = useContext(AuthContext);
  const company_id = userInfo.company_id;
  // console.log("page:inv, company Id -->", company_id);

  const [projectList, setProjectList] = useState([]);
  const [openCreateProject, setOpenCreateProject] = useState(false);

  useEffect(() => {
    getProjectsFunction();
  }, []);

  const getProjectsFunction = () => {
    GetProjects({ company_id, setProjectList });
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
              getProjectsFunction={getProjectsFunction}
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
