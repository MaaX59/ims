import React, { useState, useEffect } from "react";
import { server } from "../../server";
import axios from "axios";

const GetProjectById = ({id}) => {

    const [items, setItems] = useState([]);
    useEffect(() => {
        fetchItemsFromDb();
      }, []);

    const fetchItemsFromDb = async () => {
        try {
          const response = await axios.get(`${server}/projects/:id`);
          setItems(response.data);
          console.log("this is the item list", response.data);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };


  return items;
}

export default GetProjectById;