import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import * as Icon from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const NavBar = (currentPage) => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log("current page", currentPage.currentPage);
  // console.log("userinfo", userInfo.company_id);
  return (
    <div className="app__navbar">
      <div className="app__navbar_title">
        <span>IMS</span>
      </div>
      <div className="app__navbar_options">
        <div
          className="app__navbar_options-single-dash link"
          style={{
            background: currentPage.currentPage === "dash" ? "black" : null,
          }}
          onClick={() => navigate(`/dashboard`)}
        >
          {" "}
          <Icon.FaChartBar /> <span>Dashboard</span>
        </div>

        <div
          className="app__navbar_options-single-inv link"
          style={{
            background: currentPage.currentPage === "inv" ? "black" : null,
          }}
          onClick={() => navigate(`/inventory/${userInfo.company_id}`)}
        >
          <Icon.FaBox /> <span>Inventory</span>
        </div>

        <div
          className="app__navbar_options-single-sales link "
          style={{
            background: currentPage.currentPage === "sales" ? "black" : null,
          }}
          onClick={() => navigate(`/sales`)}
        >
          <Icon.FaAngleDoubleUp /> <span>Sales</span>
        </div>

        <div
          className="app__navbar_options-single-purch link"
          style={{
            background: currentPage.currentPage === "purch" ? "black" : null,
          }}
          onClick={() => navigate(`/purchases`)}
        >
          <Icon.FaAngleDoubleDown /> <span>Purchases</span>
        </div>

        <div
          className="app__navbar_options-single-cust link"
          style={{
            background: currentPage.currentPage === "cust" ? "black" : null,
          }}
          onClick={() => navigate(`/customers`)}
        >
          <Icon.FaPeopleArrows /> <span>Customers</span>
        </div>

        <div
          className="app__navbar_options-single-log link"
          style={{
            background: currentPage.currentPage === "log" ? "black" : null,
          }}
          onClick={() => navigate(`/log`)}
        >
          <Icon.FaList /> <span>Log</span>
        </div>

        <div
          className="app__navbar_options-single-ims link"
          style={{
            background: currentPage.currentPage === "ims" ? "black" : null,
          }}
          onClick={() => navigate(`/manage`)}
        >
          <Icon.FaDatabase />
          <span>Manage IMS</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
