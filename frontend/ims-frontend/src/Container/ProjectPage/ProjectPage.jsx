import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectPage.css";
import Navbar from "../Navbar/Navbar";
import GetProjectById from "../../Components/GetProjectById";
import AddItemForm from "../../Components/AddItemForm/AddItemForm";
import axios from "axios";
import { server } from "../../server";

const ProjectPage = () => {
  const id = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const response = await axios.get(`${server}/getitems`, {id:id} );
      setItems(response.data);
      console.log("this is the items", response.data);
    } catch (error) {
      console.log(`error fetching items`, error);
    }
  };

  console.log("id on project page", id.id);

  return (
    <div className="app__projectpage">
      <Navbar />
      <div className="app__projectpage-content">
        <h1>Manage Your Project</h1>
        {/* <h1>{params}</h1> */}
        <div className="app__projectpage-items">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div className="app__projectpage-singleitem" key={index}>            
                  <h3>Item:{item.item_name}</h3>
                  <h3>Description:{item.item_description}</h3>
                  <h3>Location:{item.item_location}</h3>
                  <h3>Amount:{item.item_amount}</h3>

                
              </div>
            ))
          ) : (
            <div className="app__projectpage-singleitem">
              <h1>There are no projects to display</h1>
            </div>)}
        </div>
        <div className="app__projectpage-content-additem">
          <AddItemForm id={id.id} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
