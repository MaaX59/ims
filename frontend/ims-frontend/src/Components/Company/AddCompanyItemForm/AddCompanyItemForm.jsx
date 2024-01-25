import { React, useState, useEffect } from "react";
import "./AddCompanyItemForm.css";
import axios from "axios";
import { server } from "../../../server";

const AddCompanyItemForm = (props) => {
  useEffect(() => {
    setProject_id(props.id);
  }, []);

  const [item_name, setItem_name] = useState("");
  const [item_description, setItem_description] = useState("");
  const [item_location, setItem_location] = useState("");
  const [purchased_from, setPurchased_from] = useState("");
  const [purchased_price, setPurchased_price] = useState();
  const [inStock, setInStock] = useState(false);
  const [notes, setNotes] = useState("");
  const [item_amount, setItem_amount] = useState();
  const [project_id, setProject_id] = useState();

  const addItem = () => {
    console.log(
      "added item",
      item_name,
      item_description,
      item_location,
      purchased_from,
      purchased_price,
      inStock,
      notes,
      item_amount,
      project_id
    );
    axios
      .post(`${server}/add_company_item`, {
        item_name: item_name,
        item_description: item_description,
        item_location: item_location,
        purchased_price: purchased_price,
        purchased_from: purchased_from,
        inStock: inStock,
        notes: notes,
        item_amount: item_amount,
        project_id: project_id,
      })
      .then(() => {
        props.getItems();
      });

    setItem_name("");
    setItem_description("");
    setItem_location("");
    setItem_amount("");
    setInStock(false);
    setNotes("");
    setPurchased_from("");
    setPurchased_price();
  };

  return (
    <div className="app__add-company_item_form">
      <div className="title">Add an item</div>
      <div className="form-2inRow">
        <div className="input-container ic1">
          <input
            id="item-name"
            className="input"
            type="text"
            value={item_name}
            placeholder=" "
            onChange={(event) => {
              setItem_name(event.target.value);
            }}
            required
          />

          <label for="item-name" className="placeholder">
            Item Name*
          </label>
        </div>
        <div className="input-container ic1">
          <input
            id="item-amount"
            className="input"
            type="number"
            value={item_amount}
            placeholder=" "
            min="1"
            onChange={(event) => {
              setItem_amount(event.target.value);
            }}
            required
          />
          <label for="item-amount" className="placeholder">
            Amount*
          </label>
        </div>
      </div>

      <div className="form-2inRow">
        <div className="input-container ic1">
          <input
            id="purchased_from"
            className="input"
            type="text"
            value={purchased_from}
            placeholder=" "
            onChange={(event) => {
              setPurchased_from(event.target.value);
            }}
          />

          <label for="purchased_from" className="placeholder">
            Vendor item was purchased from
          </label>
        </div>

        <div className="input-container ic1">
          <input
            id="purchased_price"
            className="input"
            type="number"
            value={purchased_price}
            placeholder=" "
            min="1"
            onChange={(event) => {
              setPurchased_price(event.target.value);
            }}
          />
          <label for="purchased_price" className="placeholder">
            Purchase price
          </label>
        </div>
      </div>

      <div className="input-container ic2">
        <input
          id="item-description"
          className="input"
          type="text"
          value={item_description}
          placeholder=" "
          onChange={(event) => {
            setItem_description(event.target.value);
          }}
        />

        <label for="item-description" className="placeholder">
          Item description
        </label>
      </div>

      <div className="form-2inRow">
        <div className="checkbox">
          <input
            id="inStock"
            className="input-checkbox"
            type="checkbox"
            value={inStock}
            onChange={(event) => {
              setInStock(!inStock);
            }}
          />
          <label>In stock?</label>
        </div>

        <div
          className="input-container ic1"
          style={{ visibility: !inStock ? "hidden" : "visible" }}
        >
          <input
            id="item-location"
            className="input"
            type="text"
            value={item_location}
            placeholder=" "
            onChange={(event) => {
              setItem_location(event.target.value);
            }}
          />
          <label for="item-location" className="placeholder">
            Item Location
          </label>
        </div>
      </div>

      <div className="input-container ic2">
        <input
          id="notes"
          className="input"
          type="text"
          value={notes}
          placeholder=" "
          onChange={(event) => {
            setNotes(event.target.value);
          }}
        />

        <label for="notes" className="placeholder">
          Notes
        </label>
      </div>

      <div className="company-form-required"> * field is required</div>
      <button type="text" className="submit" onClick={addItem}>
        Create
      </button>
    </div>
  );
};

export default AddCompanyItemForm;