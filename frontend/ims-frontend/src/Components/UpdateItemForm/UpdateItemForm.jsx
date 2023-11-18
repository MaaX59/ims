import { React, useState, useEffect } from "react";
import "./UpdateItemForm.css";
import axios from "axios";
import { server } from "../../server";

const UpdateItemForm = (props) => {
  const itemsToUpdate = props.item;

  useEffect(() => {
    setItem_name(itemsToUpdate.item_name);
    setItem_description(itemsToUpdate.item_description);
    setItem_location(itemsToUpdate.item_location);
    setItem_amount(itemsToUpdate.item_amount);
    setItem_projectid(itemsToUpdate.item_projectid);
    setItemid(itemsToUpdate.id);
  }, []);

  const [item_id, setItemid] = useState();
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
      .put(`${server}/update/${item_id}`, {
        item_name: item_name,
        item_description: item_description,
        item_location: item_location,
        item_amount: item_amount,
        item_projectid: item_projectid,
      })
      .then(() => {
        props.getItems();
        props.setUpdate(false);
      });

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
          placeholder={itemsToUpdate ? itemsToUpdate.item_name : null}
          onChange={(event) => {
            setItem_name(event.target.value);
          }}
          required
        />

        <label for="item-name" className="update-placeholder">
          Item Name*
        </label>
      </div>
      <div className="input-container ic2">
        <input
          id="item-description"
          className="input"
          type="text"
          value={item_description}
          placeholder={itemsToUpdate ? itemsToUpdate.item_description : null}
          onChange={(event) => {
            setItem_description(event.target.value);
          }}
        />

        <label for="item-description" className="update-placeholder">
          Item description
        </label>
      </div>

      <div className="input-container ic2">
        <input
          id="item-location"
          className="input"
          type="text"
          value={item_location}
          placeholder={itemsToUpdate ? itemsToUpdate.item_location : null}
          onChange={(event) => {
            setItem_location(event.target.value);
          }}
        />
        <label for="item-location" className="update-placeholder">
          Item Location
        </label>
      </div>

      <div className="input-container ic2">
        <input
          id="item-amount"
          className="input"
          type="number"
          value={item_amount}
          placeholder={itemsToUpdate ? itemsToUpdate.item_amount : null}
          min="1"
          onChange={(event) => {
            setItem_amount(event.target.value);
          }}
          required
        />
        <label for="item-amount" className="update-placeholder">
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
