import { React, useState, useEffect, useContext } from "react";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import { AuthContext } from "../../../context/AuthProvider";
import "./Dashboard.css";
import StartCompany from "../../../Components/Company/StartCompany/StartCompany";

const Dashboard = () => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [openStartCompany, setOpenStartCompany] = useState(false);

  useEffect(() => {
    console.log("user from context", userInfo);
    findCompany();
  }, []);

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
      });
    } catch (error) {
      console.log(`error fetching company`, error);
    }
  };

  return (
    <div className="app__dashboard">
      <NavBar currentPage="dash" />
      <div className="app__dashboard-content">
        <div className="app__dashboard-title">
          <h1>Inventory Management System</h1>
          <h2>Welcome {userInfo.first_name}</h2>
        </div>
        {!openStartCompany ? (
          <div className="app__dashboard-company">
            {company ? (
              <div className="app__dashboard-company-connected">
                <span>You are connected to {company.company_name}</span>{" "}
              </div>
            ) : (
              <div className="app__dashboard-nocompany">
                <h2>You are not connected to a company IMS </h2>
                <div className="app__dashboard-nocompany-options">
                  <button
                    className="company_button"
                    onClick={() => setOpenStartCompany(!openStartCompany)}
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
        ) : (
          <StartCompany
            openStartCompany={openStartCompany}
            setOpenStartCompany={setOpenStartCompany}
            userId={userInfo.id}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
