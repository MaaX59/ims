import axios from "axios";
import { server } from "../../../server";

const SoldItemToLog = async (body) => {
  try {
    await axios.post(`${server}/Sold_company_item_to_log`, body);
  } catch (error) {
    return error;
  }
};

export default SoldItemToLog;
