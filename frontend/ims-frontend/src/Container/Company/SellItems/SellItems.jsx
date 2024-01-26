import { React, useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import AddCompanyItemForm from "../../../Components/Company/AddCompanyItemForm/AddCompanyItemForm";
import UpdateCompanyItemForm from "../../../Components/Company/UpdateCompanyItemForm/UpdateCompanyItemForm";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import "./SellItems.css";

const SellItems = () => {
  return (
    <div className="app__sell_items_page">
      <NavBar currentPage="sales" />
      <div className="app__sell_items-content"></div>
    </div>
  );
};

export default SellItems;
