import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="app__navbar">
      <div className="app__navbar_title">
        <span>IMS</span>
      </div>
      <div className="app__navbar_options">
        Dashboard Inventory Purchases Sales Customers Log Manage IMS
      </div>
    </div>
  );
};

export default NavBar;
