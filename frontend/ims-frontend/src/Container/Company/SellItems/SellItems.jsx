import { React, useEffect, useState, useContext } from "react";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import "./SellItems.css";
import GetAllItems from "../../../Components/Company/Functions/GetAllItems";
import { AuthContext } from "../../../context/AuthProvider";

const SellItems = () => {
  const { userInfo } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const company_id = userInfo.company_id;

  useEffect(() => {
    getAllCompanyItems();
  }, []);

  const getAllCompanyItems = () => {
    GetAllItems({ company_id, setItems });
    console.log("getAllCompanyItems is triggered");
  };

  return (
    <div className="app__sell_items_page">
      <NavBar currentPage="sales" />
      <div className="app__sell_items-content">
        {items &&
          items.map((item, index) => (
            <div className="app__sell_items-content-singleitem" key={index}>
              {console.log(items)}
              <span>{item.item_name} </span>
              <span>{item.purchased_price} </span>
              <span>{item.item_amount}$ </span>
              <span>{item.project_name} </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SellItems;
