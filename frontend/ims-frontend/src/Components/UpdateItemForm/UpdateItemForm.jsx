import { React, useState, useEffect } from "react";
import "./UpdateItemForm.css";
import axios from "axios";
import { server } from "../../server";

const UpdateItemForm = (props) => {
  useEffect(() => {
    setItem_projectid(props.id);
  }, []);

  const [item_name, setItem_name] = useState("");
  const [item_description, setItem_description] = useState("");
  const [item_location, setItem_location] = useState("");
  const [item_amount, setItem_amount] = useState();
  const [item_projectid, setItem_projectid] = useState();

  const updateItem = () => {
    console.log(
      "updated items",
      item_name,
      item_description,
      item_location,
      item_amount,
      item_projectid
    );
    axios
      .put(`${server}/update/${props.id}`, {
        item_name: item_name,
        item_description: item_description,
        item_location: item_location,
        item_amount: item_amount,
        item_projectid: item_projectid,
      })
      .then(() => {
        props.getItems();
      })
      
      setItem_name("");
      setItem_description("");
      setItem_location("");
      setItem_amount("");
  };

  return (
    <div className="form">
      <div className="title">Update an item!</div>
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

      <div className="input-container ic2">
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

      <div className="input-container ic2">
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
      <div className="form-required"> * field is required</div>
      <button type="text" className="submit" onClick={updateItem}>
        Update
      </button>
    </div>
  );
};

export default UpdateItemForm;
