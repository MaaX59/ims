import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectPage.css";
import Navbar from "../Navbar/Navbar";
import GetProjectById from "../../Components/GetProjectById";
import AddItemForm from "../../Components/AddItemForm/AddItemForm"

const ProjectPage = () => {
  const id = useParams();
  const [items, setItems] = useState([]);
  

  // useEffect(() => {
  //  GetProjectById();
  // }, []);
  console.log("id on project page",id.id)
  

  return (
    <div className="app__projectpage">
      <Navbar />
      <div className="app__projectpage-content">
        <h1>Manage Your Project</h1>
        {/* <h1>{params}</h1> */}
        <div className="app__projectpage-content-additem">
        <h1>Add Item</h1>
        <AddItemForm id={id.id}/>
        
      </div>
      </div>
    </div>
  );
};

export default ProjectPage;
