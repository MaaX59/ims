import React from "react";
import "./Log.css";
import NavBar from "../../../Components/Company/NavBar/NavBar";

const Log = () => {
  return (
    <div className="app__log">
      <NavBar currentPage="log" />
      <div className="app__log-content"></div>
    </div>
  );
};

export default Log;
