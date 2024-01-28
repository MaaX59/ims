import axios from "axios";
import { server } from "../../../server";

const DeleteItemToLog = async (body) => {
  console.log("item to be deleted and added to log", body);
  try {
    await axios.delete(`${server}/delete_company_item_to_log`, body);
  } catch (error) {
    return error;
  }
};

export default DeleteItemToLog;
