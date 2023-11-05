import { React, useState, useEffect } from "react";
import "./ViewProject.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { server } from "../../server";

const ViewProject = () => {

  useEffect(() => {
    getProjects();
  }, []);

  const [projectList, setProjectList] = useState([]);

  const getProjects = async () => {
    try{
      
      const response = await axios.get(`${server}/getprojectlist`)
       setProjectList(response.data) ;
       console.log("this is the projects", response.data)
       
  

    }catch (error){
      console.log(`error fetching projects`, error)
    }}
 


  return (
    <div className="app__viewproject">
      <Navbar />
      <div className="app__viewproject-title">
        <h1>View projects</h1>
      </div>
      <div className="app__viewproject-projects">
      



      </div>
    </div>
  );
}

export default ViewProject;
