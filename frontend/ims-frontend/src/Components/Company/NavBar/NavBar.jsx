import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import * as Icon from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";

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
        <Link
          to="/dashboard"
          className="link"
          style={{
            background: currentPage.currentPage === "dash" ? "black" : null,
          }}
        >
          <div className="app__navbar_options-single-dash">
            {" "}
            <Icon.FaChartBar /> <span>Dashboard</span>
          </div>
        </Link>

        <div
          className="app__navbar_options-single-inv link"
          style={{
            background: currentPage.currentPage === "inv" ? "black" : null,
          }}
          onClick={() => navigate(`/inventory/${userInfo.company_id}`)}
        >
          <Icon.FaBox /> <span>Inventory</span>
        </div>

        <Link
          to="/sales"
          className="link"
          style={{
            background: currentPage.currentPage === "sales" ? "black" : null,
          }}
        >
          <div className="app__navbar_options-single-sales">
            <Icon.FaAngleDoubleUp /> <span>Sales</span>
          </div>
        </Link>

        <Link
          to="/purchases"
          className="link"
          style={{
            background: currentPage.currentPage === "purch" ? "black" : null,
          }}
        >
          <div className="app__navbar_options-single-purch">
            <Icon.FaAngleDoubleDown /> <span>Purchases</span>
          </div>
        </Link>

        <Link
          to="/customers"
          className="link"
          style={{
            background: currentPage.currentPage === "cust" ? "black" : null,
          }}
        >
          <div className="app__navbar_options-single-cust">
            <Icon.FaPeopleArrows /> <span>Customers</span>
          </div>
        </Link>

        <Link
          to="/log"
          className="link"
          style={{
            background: currentPage.currentPage === "log" ? "black" : null,
          }}
        >
          {" "}
          <div className="app__navbar_options-single-log">
            <Icon.FaList /> <span>Log</span>
          </div>
        </Link>

        <Link
          to="/manage_ims"
          className="link"
          style={{
            background: currentPage.currentPage === "ims" ? "black" : null,
          }}
        >
          <div className="app__navbar_options-single-ims">
            {" "}
            <Icon.FaDatabase />
            <span>Manage IMS</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
