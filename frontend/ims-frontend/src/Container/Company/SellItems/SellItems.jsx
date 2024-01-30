import { React, useEffect, useState, useContext } from "react";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import "./SellItems.css";
import GetAllItems from "../../../Components/Company/Functions/GetAllItems";
import { AuthContext } from "../../../context/AuthProvider";

const SellItems = () => {
  const { userInfo } = useContext(AuthContext);
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(GetAllItems(userInfo.company_id));
  }, []);

  return (
    <div className="app__sell_items_page">
      <NavBar currentPage="sales" />
      <div className="app__sell_items-content"></div>
    </div>
  );
};

export default SellItems;
