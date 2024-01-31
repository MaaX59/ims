import axios from "axios";
import { server } from "../../../server";

const GetAllItems = async (props) => {
  try {
    console.log("company id in get items", props.company_id);
    await axios
      .get(`${server}/get_all_company_items/${props.company_id}`)
      .then((res) => {
        console.log(res.data, "<-- company items data");
        props.setItems(res.data);
      });
  } catch (error) {
    return error;
  }
};
export default GetAllItems;
