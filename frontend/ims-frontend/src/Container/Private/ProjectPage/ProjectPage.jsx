import { React, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectPage.css";
import AddItemForm from "../../../Components/Personal/AddItemForm/AddItemForm";
import UpdateItemForm from "../../../Components/Personal/UpdateItemForm/UpdateItemForm";
import axios from "axios";
import { server } from "../../../server";

const ProjectPage = () => {
  const id = useParams();

  const [items, setItems] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
  }, []);

  //get all items for project
  const getItems = async () => {
    try {
      const response = await axios.get(`${server}/getitems`);
      setItems(response.data);
    } catch (error) {
      console.log(`error fetching items`, error);
    }
  };

  //delete a single item
  const deleteItem = async (itemId) => {
    console.log(itemId);
    try {
      const response = await axios.delete(`${server}/delete_item/${itemId}`);
      if (response.status === 200) {
        getItems();
      }
    } catch (error) {
      console.log(`error deleting item`, error);
    }
  };

  // delete all items in the project, will run with deleteProject
  const deleteItems = async (projectid) => {
    try {
      const response = await axios.delete(
        `${server}/delete_items/${projectid}`
      );
      if (response.status === 200) {
      }
    } catch (error) {
      console.log(`error deleting items`, error);
    }
  };

  //delete the current project
  const deleteProject = async (project_id) => {
    console.log(project_id);
    try {
      const response = await axios.delete(
        `${server}/delete_project/${project_id}`
      );
      if (response.status === 200) {
        console.log("project deleted");
        navigate("/viewproject");
      }
    } catch (error) {
      console.log(`error deleting items`, error);
    }
  };

  //button press that changes state to update item
  const updateItem = (item) => {
    setItemToUpdate(item);
    setUpdate(!update);
  };

  return (
    <div className="app__projectpage">
      <FaArrowLeft
        className="goBackButton"
        title="Go back"
        size={20}
        onClick={() => navigate("/viewproject")}
      />
      <div className="app__projectpage-content">
        <h1>Manage Your Project</h1>

        <div className="app__projectpage-items">
          {items.length > 0 ? (
            items.map((item, index) =>
              item.item_projectid == id.id ? (
                <div className="app__projectpage-singleitem" key={index}>
                  <h3>Item:{item.item_name}</h3>
                  <h3>Description:{item.item_description}</h3>
                  <h3>Location:{item.item_location}</h3>
                  <h3>Amount:{item.item_amount}</h3>
                  <div className="app__projectpage-singleitem-buttons">
                    <button
                      className="update_button"
                      onClick={() => updateItem(item)}
                    >
                      {update ? "X" : "UPDATE"}
                    </button>
                    <button
                      className="remove_button"
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ) : null
            )
          ) : (
            <div className="app__projectpage-nosingleitem">
              <h1>This project currently has no items in it</h1>
            </div>
          )}
        </div>

        <div
          className="app__projectpage-content-additem"
          style={{ display: !update ? "flex" : "none" }}
        >
          <AddItemForm id={id.id} getItems={getItems} />
        </div>
        {update ? (
          <div className="app__projectpage-content-updateitem">
            <UpdateItemForm
              item={itemToUpdate}
              getItems={getItems}
              setUpdate={setUpdate}
            />
          </div>
        ) : null}

        <div className="app__projectpage-delete-project">
          <button
            className="remove_project"
            onClick={() => {
              deleteProject(id.id);
              deleteItems(id.id);
            }}
          >
            {" "}
            DELETE PROJECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
