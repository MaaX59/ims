import { React, useEffect, useState, useContext } from "react";
import AddCompanyItemForm from "../../../Components/Company/AddCompanyItemForm/AddCompanyItemForm";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import "./Purchases.css";
import AuthContext from "../../../context/AuthProvider";
import GetProjects from "../../../Components/Company/GetProjects";

const Purchases = () => {
  const { userInfo } = useContext(AuthContext);
  const company_id = userInfo.company_id;
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    getProjectsFunction();
  }, []);

  const getProjectsFunction = () => {
    GetProjects({ company_id, setProjectList });
  };

  return (
    <div className="app__purchases_page">
      <NavBar currentPage="purch" />
      <div className="app__purchases-content">
        <AddCompanyItemForm projectList={projectList} />
      </div>
    </div>
  );
};

export default Purchases;
