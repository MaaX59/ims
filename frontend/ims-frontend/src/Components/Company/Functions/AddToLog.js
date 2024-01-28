import axios from "axios";
import { server } from "../../../server";

const AddToLog = async (body) => {
  const stringToDb = "Company Project Created" + JSON.stringify(body);
  try {
    await axios.post(`${server}/add_company_project_to_log`, body);
  } catch (error) {
    return error;
  }
};

export default AddToLog;
