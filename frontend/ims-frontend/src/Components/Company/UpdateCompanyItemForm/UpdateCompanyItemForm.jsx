import { React, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../../server";

const UpdateCompanyItemForm = (props) => {
  const itemsToUpdate = props.item;

  useEffect(() => {
    setItem_name(itemsToUpdate.item_name);
    setItem_description(itemsToUpdate.item_description);
    setItem_location(itemsToUpdate.item_location);
    setItem_amount(itemsToUpdate.item_amount);
    setProject_id(itemsToUpdate.project_id);
    setItem_id(itemsToUpdate.id);
    ifInStock(itemsToUpdate.in_stock);
    setPurchased_from(itemsToUpdate.purchased_from);
    setPurchased_price(itemsToUpdate.purchased_price);
    setNotes(itemsToUpdate.notes);
  }, []);

  const ifInStock = (prop) => {
    console.log(prop);
    if (prop === 1) {
      setInStock(true);
    } else {
      setInStock(false);
    }
  };

  const [item_id, setItem_id] = useState();
  const [item_name, setItem_name] = useState("");
  const [item_description, setItem_description] = useState("");
  const [item_location, setItem_location] = useState("");
  const [purchased_from, setPurchased_from] = useState("");
  const [purchased_price, setPurchased_price] = useState();
  const [in_stock, setInStock] = useState();
  const [notes, setNotes] = useState("");
  const [item_amount, setItem_amount] = useState();
  const [project_id, setProject_id] = useState();

  const updateItem = async () => {
    console.log(
      "updated items",
      item_id,
      item_name,
      item_description,
      item_location,
      item_amount,
      project_id,
      notes,
      in_stock,
      purchased_price,
      purchased_from
    );
    await axios
      .put(`${server}/update_company_item/${item_id}`, {
        item_name: item_name,
        item_description: item_description,
        item_location: item_location,
        item_amount: item_amount,
        project_id: project_id,
        notes: notes,
        in_stock: in_stock,
        purchased_price: purchased_price,
        purchased_from: purchased_from,
      })
      .then(() => {
        props.getItems();
        props.setUpdate(false);
      });

    setItem_id("");
    setItem_name("");
    setItem_description("");
    setItem_location("");
    setPurchased_from("");
    setPurchased_price(null);
    setInStock(false);
    setNotes("");
    setItem_amount(null);
    setProject_id(null);
  };

  return (
    <div className="app__add-company_item_form">
      <div className="title">Update item</div>
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
            value={in_stock}
            defaultChecked={in_stock}
            onChange={(event) => {
              setInStock(!in_stock);
            }}
          />
          <label>In stock?</label>
        </div>

        <div
          className="input-container ic1"
          style={{ visibility: !in_stock ? "hidden" : "visible" }}
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
      <button type="text" className="submit" onClick={updateItem}>
        Update
      </button>
    </div>
  );
};

export default UpdateCompanyItemForm;
