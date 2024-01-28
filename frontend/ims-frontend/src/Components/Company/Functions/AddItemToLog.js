import axios from "axios";
import { server } from "../../../server";

const AddItemToLog = async (body) => {
  try {
    await axios.post(`${server}/add_company_item_to_log`, body);
  } catch (error) {
    return error;
  }
};

export default AddItemToLog;
