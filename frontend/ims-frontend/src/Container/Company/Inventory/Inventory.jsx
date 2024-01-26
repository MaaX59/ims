import React from "react";
import "./Inventory.css";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import { useParams } from "react-router-dom";

const Inventory = () => {
  const company_id = useParams();
  console.log("page:inv, company Id -->", company_id);
  return (
    <div className="app__inventory">
      <NavBar currentPage="dash" />
    </div>
  );
};

export default Inventory;
