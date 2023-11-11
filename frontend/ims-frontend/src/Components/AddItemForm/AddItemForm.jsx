import { React, useState, useEffect } from "react";
import "./AddItemForm.css";
import axios from "axios";
import { server } from "../../server";

const AddItemForm = (props) => {
  // console.log("props", props.id);

  useEffect(() => {
    setItem_projectid(props.id);
  }, []);

  const [item_name, setItem_name] = useState("");
  const [item_description, setItem_description] = useState("");
  const [item_location, setItem_location] = useState("");
  const [item_amount, setItem_amount] = useState();
  const [item_projectid, setItem_projectid] = useState();

  const addItem = () => {
    console.log(
      "added items",
      item_name,
      item_description,
      item_location,
      item_amount,
      item_projectid
    );
    axios
      .post(`${server}/add_item`, {
        item_name: item_name,
        item_description: item_description,
        item_location: item_location,
        item_amount: item_amount,
        item_projectid: item_projectid,
      })
      .then(() => {
        console.log("sending item info to backend");
      });
  };

  return (
    <div className="form">
      <div className="title">Add an item!</div>
      <div className="input-container ic1">
        <input
          id="item-name"
          className="input"
          type="text"
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
      <div className="input-container ic2">
        <input
          id="item-description"
          className="input"
          type="text"
          placeholder=" "
          onChange={(event) => {
            setItem_description(event.target.value);
          }}
        />

        <label for="item-description" className="placeholder">
          Item description
        </label>
      </div>

      <div className="input-container ic2">
        <input
          id="item-location"
          className="input"
          type="text"
          placeholder=" "
          onChange={(event) => {
            setItem_location(event.target.value);
          }}
        />
        <label for="item-location" className="placeholder">
          Item Location
        </label>
      </div>

      <div className="input-container ic2">
        <input
          id="item-amount"
          className="input"
          type="number"
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
      <div className="form-required"> * field is required</div>
      <button type="text" className="submit" onClick={addItem}>
        Create
      </button>
    </div>
  );
};

export default AddItemForm;
