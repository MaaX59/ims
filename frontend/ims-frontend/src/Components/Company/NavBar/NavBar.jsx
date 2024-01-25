import React from "react";
import "./NavBar.css";
import * as Icon from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="app__navbar">
      <div className="app__navbar_title">
        <span>IMS</span>
      </div>
      <div className="app__navbar_options">
        <Link to="/dashboard" className="link">
          <div className="app__navbar_options-single-dash">
            {" "}
            <Icon.FaChartBar /> <span>Dashboard</span>
          </div>
        </Link>

        <Link to="/inventory" className="link">
          <div className="app__navbar_options-single-inv">
            <Icon.FaBox /> <span>Inventory</span>
          </div>
        </Link>

        <Link to="/sales" className="link">
          <div className="app__navbar_options-single-sales">
            <Icon.FaAngleDoubleUp /> <span>Sales</span>
          </div>
        </Link>

        <Link to="/purchases" className="link">
          <div className="app__navbar_options-single-purch">
            <Icon.FaAngleDoubleDown /> <span>Purchases</span>
          </div>
        </Link>

        <Link to="/customers" className="link">
          <div className="app__navbar_options-single-cust">
            <Icon.FaPeopleArrows /> <span>Customers</span>
          </div>
        </Link>

        <Link to="/log" className="link">
          {" "}
          <div className="app__navbar_options-single-log">
            <Icon.FaList /> <span>Log</span>
          </div>
        </Link>

        <Link to="/manage_ims" className="link">
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
