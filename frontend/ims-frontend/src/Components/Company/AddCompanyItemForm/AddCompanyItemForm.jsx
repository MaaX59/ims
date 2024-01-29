import { React, useState, useEffect, useContext } from "react";
import "./AddCompanyItemForm.css";
import axios from "axios";
import { server } from "../../../server";
import { AuthContext } from "../../../context/AuthProvider";
import AddItemToLog from "../Functions/AddItemToLog";

const AddCompanyItemForm = (props) => {
  const { userInfo } = useContext(AuthContext);
  const projectList = props.projectList;

  useEffect(() => {
    console.log(projectList);
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
  const added_by_user = userInfo.id;
  const company_id = userInfo.company_id;

  const addItem = async () => {
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
      company_id,
      "project id?",
      project_id
    );
    try {
      const body = {
        item_name: item_name,
        item_description: item_description,
        item_location: item_location,
        purchased_price: purchased_price,
        purchased_from: purchased_from,
        inStock: inStock,
        notes: notes,
        item_amount: item_amount,
        project_id: project_id,
        company_id: JSON.stringify(company_id),
        added_by_user: JSON.stringify(added_by_user),
      };
      await axios.post(`${server}/add_company_item`, body).then(() => {
        AddItemToLog(body);
      });
    } catch (err) {
      console.log(err);
    }

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
      <div className="">
        <label for="project">Choose a project:</label>
        <select
          id="project"
          name="project"
          onChange={(event) => setProject_id(event.target.value)}
        >
          {/* dosen´t work!! */}
          {/* setProject_id(event.target.value) */}
          {projectList.map((project, index) => (
            <option key={index} value={project.id}>
              {project.project_name}{" "}
            </option>
          ))}
        </select>
      </div>
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
            Vendor name or ID
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
            Price per item
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
