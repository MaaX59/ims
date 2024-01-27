import { React, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import "./CompanyProjectPage.css";
import axios from "axios";
import { server } from "../../../server";
import AddCompanyItemForm from "../../../Components/Company/AddCompanyItemForm/AddCompanyItemForm";
import UpdateCompanyItemForm from "../../../Components/Company/UpdateCompanyItemForm/UpdateCompanyItemForm";
import NavBar from "../../../Components/Company/NavBar/NavBar";

export const CompanyProjectPage = () => {
  const project_id = useParams();

  const [companyItems, setCompanyItems] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
  }, []);

  //get all items for project
  const getItems = async () => {
    // console.log("project id -->", project_id.id);
    try {
      const response = await axios.get(
        `${server}/get_company_items/${project_id.id}`
      );
      setCompanyItems(response.data);
    } catch (error) {
      console.log(`error fetching items`, error);
    }
  };

  //delete a single item
  const deleteItem = async (itemId) => {
    // console.log(itemId);
    try {
      const response = await axios.delete(
        `${server}/delete_company_item/${itemId}`
      );
      if (response.status === 200) {
        getItems();
      }
    } catch (error) {
      console.log(`error deleting item`, error);
    }
  };

  // delete all items in the project, will run with deleteProject
  const deleteItems = async (project_id) => {
    try {
      const response = await axios.delete(
        `${server}/delete_company_items/${project_id.id}`
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
        `${server}/delete_company_project/${project_id.id}`
      );
      if (response.status === 200) {
        console.log("project deleted");
        navigate("/viewuser");
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
    <div className="app__company_project_page">
      <NavBar currentPage="inv" />
      <div className="app__company_project_page-content">
        <h1>Manage Project</h1>

        <div className="app__company_project_page-items">
          {companyItems.length > 0 ? (
            companyItems.map((item, index) => (
              <div className="app__company_project_page-singleitem" key={index}>
                <h3>Item:{item.item_name}</h3>
                <h3>Description:{item.item_description}</h3>
                <h3>Location:{item.item_location}</h3>
                <h3>Amount:{item.item_amount}</h3>
                <div className="app__company_project_page-singleitem-buttons">
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
            ))
          ) : (
            <div className="app__projectpage-nosingleitem">
              <h1>This project currently has no items in it</h1>
            </div>
          )}
        </div>

        {/*    Add items
        
        <div
          className="app__company_project_page-content-additem"
          style={{ display: !update ? "flex" : "none" }}
        >
          <AddCompanyItemForm id={project_id.id} getItems={getItems} />
        </div> */}

        {update ? (
          <div className="app__company_project_page-content-updateitem">
            <UpdateCompanyItemForm
              item={itemToUpdate}
              getItems={getItems}
              setUpdate={setUpdate}
            />
          </div>
        ) : null}

        <div className="app__company_project_page-delete-project">
          <button
            className="remove_project"
            onClick={() => {
              deleteProject(project_id);
              deleteItems(project_id);
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

export default CompanyProjectPage;
