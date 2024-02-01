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

        <div className="form ">
          <div className="title">Sell item</div>
          <div className="input-container-company ic1">
            <input
              id="buyer_name"
              className="input"
              type="text"
              placeholder=" "
              onChange={(event) => {
                // setProject_name(event.target.value);
              }}
              required
            />

            <label for="buyer_name" className="placeholder">
              Name of buyer*
            </label>
          </div>
          <div className="input-container-company ic2">
            <input
              id="sell_price"
              className="input"
              type="text"
              placeholder=" "
              onChange={(event) => {
                // setSell_price(event.target.value);
              }}
              required
            />

            <label for="sell_price" className="placeholder">
              Sell price per item*
            </label>
          </div>
          <div className="input-container-company ic2">
            <input
              id="sell_amount"
              className="input"
              type="number"
              placeholder=" "
              onChange={(event) => {
                // setSell_amount(event.target.value);
              }}
              required
            />

            <label for="sell_amount" className="placeholder">
              Amount of items sold*
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellSingleItem;
