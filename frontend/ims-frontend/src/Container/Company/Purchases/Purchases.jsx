import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import AddCompanyItemForm from "../../../Components/Company/AddCompanyItemForm/AddCompanyItemForm";
import UpdateCompanyItemForm from "../../../Components/Company/UpdateCompanyItemForm/UpdateCompanyItemForm";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import "./Purchases.css";

const Purchases = () => {
  return (
    <div className="app__purchases_page">
      <NavBar currentPage="purch" />
      <div className="app__purchases-content"></div>
    </div>
  );
};

export default Purchases;
