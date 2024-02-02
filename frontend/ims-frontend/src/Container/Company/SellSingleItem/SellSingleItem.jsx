import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SellSingleItem.css";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import GetSingleItemByID from "../../../Components/Company/Functions/GetSingleItemByID";
import SoldItemToLog from "../../../Components/Company/Functions/SoldItemToLog";
import axios from "axios";
import { server } from "../../../server";

const SellSingleItem = () => {
  const params = useParams();
  const item_id = params.id;
  const [item, setItem] = useState(null);

  const [sell_price, setSell_price] = useState(null);
  const [amount_sold, setAmount_sold] = useState(null);
  const [buyer_name, setBuyer_name] = useState("");
  const [buyer_street_name, setBuyer_street_name] = useState("");
  const [buyer_street_num, setBuyer_street_num] = useState(null);
  const [buyer_city, setBuyer_city] = useState("");
  const [buyer_country, setBuyer_country] = useState("");
  const [amount_left, setAmount_left] = useState();

  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    getAllItem();
  }, []);

  const getAllItem = () => {
    GetSingleItemByID({ item_id, setItem });
    console.log("getAllItem is triggered", item_id);
  };

  const checkAmount = (amountSold) => {
    //check if we are trying to sell more items then we have
    if (amountSold > item.item_amount) {
      console.log("amount too high", amountSold, item.item_amount);
      setOpenError(true);
    } else {
      setOpenError(false);
      setAmount_sold(amountSold);
      setAmount_left(item.item_amount - amountSold);
      // let amountLeft = item.item_amount - amountSold;
      // console.log(amountLeft);
    }
  };
  const handleSubmit = async () => {
    //first check if we are selling all or just some of our stock
    if (amount_sold < item.item_amount) {
      //if we are selling only part of out stock we update the existing item,
      try {
        console.log("amount left", amount_left);
        await axios
          .put(`${server}/update_company_item_sales/${item_id}`, {
            amount_left: amount_left,
          })
          .then(() => {
            //add to log, then navigate to dashboard
            const body = {
              item_id: item_id,
              item_name: item.item_name,
              sold_to: buyer_name,
              profit: sell_price - item.purchased_price,
              item_name: item.item_name,
            };
            SoldItemToLog();
            console.log("sales, item updated");
          });
      } catch (err) {
        console.log("error while updateing item in sales", err);
      }
    } else {
      //if we are selling all our stock we need to delete the item
      try {
        await axios
          .delete(`${server}/delete_company_item/${item_id}`)
          .then(() => {
            //add to log, then navigate to dashboard
          });
      } catch (err) {
        console.log("error while deleting item in sales", err);
      }
    }
  };

  return (
    <div className="app__sell_single_items_page">
      <NavBar currentPage="sales" />
      <div className="app__sell_single_items-content">
        <span>Item name {item && item.item_name} </span>
        <span>Item amount {item && item.item_amount}</span>
        <span>Item purchased price {item && item.purchased_price}</span>

        <div className="form">
          <div className="title">Sell item</div>
          <div className="form-2inRow">
            <div className="input-container-company ic1">
              <input
                id="sell_amount"
                className="input"
                type="number"
                placeholder=" "
                onChange={(event) => {
                  checkAmount(event.target.value);
                }}
                style={{ color: openError ? "red" : "white" }}
                required
              />

              <label for="sell_amount" className="placeholder">
                Amount of items sold*
              </label>
            </div>
            <div className="input-container-company ic1">
              <input
                id="sell_price"
                className="input"
                type="text"
                placeholder=" "
                onChange={(event) => {
                  setSell_price(event.target.value);
                }}
                required
              />

              <label for="sell_price" className="placeholder">
                Sell price per item*
              </label>
            </div>
          </div>
          {
            <div
              className="app_sales_error"
              style={{ visibility: openError ? "visible" : "hidden" }}
            >
              <span>
                ERROR - Items sold can not be higher then inventory amount
              </span>
            </div>
          }

          <div>
            {" "}
            <span>Adress of buyer</span>{" "}
          </div>

          <div className="input-container-sales ic1">
            <input
              id="shipping_info_name"
              className="input"
              type="text"
              placeholder=" "
              onChange={(event) => {
                setBuyer_name(event.target.value);
              }}
              required
            />

            <label for="shipping_info_name" className="placeholder">
              Name of buyer*
            </label>
          </div>

          <div className="form-2inRow">
            <div className="input-container-company ic2">
              <input
                id="shipping_info_street"
                className="input"
                type="number"
                placeholder=" "
                onChange={(event) => {
                  setBuyer_street_name(event.target.value);
                }}
              />

              <label for="shipping_info_street" className="placeholder">
                Street name
              </label>
            </div>
            <div className="input-container-company ic2">
              <input
                id="shipping_info_number"
                className="input"
                type="number"
                placeholder=" "
                onChange={(event) => {
                  setBuyer_street_num(event.target.value);
                }}
              />

              <label for="shipping_info_number" className="placeholder">
                Street number
              </label>
            </div>
          </div>

          <div className="form-2inRow">
            <div className="input-container-company ic2">
              <input
                id="shipping_info_street"
                className="input"
                type="number"
                placeholder=" "
                onChange={(event) => {
                  setBuyer_city(event.target.value);
                }}
              />

              <label for="shipping_info_street" className="placeholder">
                City
              </label>
            </div>
            <div className="input-container-company ic2">
              <input
                id="shipping_info_number"
                className="input"
                type="number"
                placeholder=" "
                onChange={(event) => {
                  setBuyer_country(event.target.value);
                }}
              />

              <label for="shipping_info_number" className="placeholder">
                Country
              </label>
            </div>
          </div>
          <div className="form-required"> * field is required</div>
          <button className="submit" onClick={handleSubmit}>
            {" "}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellSingleItem;
