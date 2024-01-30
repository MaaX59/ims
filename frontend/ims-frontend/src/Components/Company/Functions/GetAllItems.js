import axios from "axios";
import { server } from "../../../server";

const GetAllItems = async (props) => {
  try {
    console.log("company id in get items", props);
    await axios.get(`${server}/get_company_items/${props}`).then((res) => {
      console.log(res.data, "<-- company items data");

      return res.data;
      //   console.log("this is the projects", res.data);
    });
  } catch (error) {
    return error;
  }
};
export default GetAllItems;
