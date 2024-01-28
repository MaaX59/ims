import React from "react";
import "./ManageIMS.css";
import NavBar from "../../../Components/Company/NavBar/NavBar";

const ManageIMS = () => {
  return (
    <div className="app__manage">
      <NavBar currentPage="ims" />
      <div className="app__manage-content"></div>
    </div>
  );
};

export default ManageIMS;
