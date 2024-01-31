import axios from "axios";
import { server } from "../../../server";
const GetSingleItemByID = async (props) => {
  console.log("props in get single item by id ", props.item_id);
  try {
    const item_id = props.item_id;
    await axios
      .get(`${server}/get_single_item_by_id/${item_id}`)
      .then((res) => {
        console.log(res.data, "<-- get_single_item_by_id data");
        const data = res.data;

        props.setItem(data);
      });
  } catch (error) {
    return error;
  }
};

export default GetSingleItemByID;
