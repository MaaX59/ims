import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectPage.css";
import Navbar from "../Navbar/Navbar";
import GetProjectById from "../../Components/GetProjectById";

const ProjectPage = () => {
  const params = useParams();
  const [items, setItems] = useState(GetProjectById());

  // useEffect(() => {
  //  const items = GetProjectById(params);
  // }, []);
  console.log("items",items);

  return (
    <div className="app__projectpage">
      <Navbar />
      <div className="app__projectpage-content">
        <h1>Manage Your Project</h1>
        {/* <h1>{project.project_name}</h1> */}
      </div>
    </div>
  );
};

export default ProjectPage;
