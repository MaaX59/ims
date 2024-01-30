import React from "react";
import axios from "axios";
import { server } from "../../../server";

const GetAllItems = async (props) => {
  console.log("get projects function is triggered, userinfo-->", props);
  try {
    // console.log("company id in get projects", company_id);
    await axios.get(`${server}/get_company_items/${company_id}`).then((res) => {
      // console.log(res.data, "<-- company projects data");
      const data = res.data;

      props.setProjectList(data);
      //   console.log("this is the projects", res.data);
    });
  } catch (error) {
    return error;
  }
};
export default GetAllItems;
