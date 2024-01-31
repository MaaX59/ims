import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SellSingleItem.css";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import GetSingleItemByID from "../../../Components/Company/Functions/GetSingleItemByID";

const SellSingleItem = () => {
  const params = useParams();
  const item_id = params.id;
  const [item, setItem] = useState(null);

  useEffect(() => {
    getAllItem();
  }, []);

  const getAllItem = () => {
    GetSingleItemByID({ item_id, setItem });
    console.log("getAllItem is triggered", item_id);
  };

  return (
    <div className="app__sell_single_items_page">
      <NavBar currentPage="sales" />
      <div className="app__sell_single_items-content">
        <span>Item name {item && item.item_name} </span>
        <span>Item amount {item && item.item_amount}</span>
        <span>Item purchased price {item && item.purchased_price}</span>
      </div>
    </div>
  );
};

export default SellSingleItem;
