import axios from "axios";
import { server } from "../../../server";

const AddCompanyProjectToLog = async (body) => {
  try {
    await axios.post(`${server}/add_company_project_to_log`, body);
  } catch (error) {
    return error;
  }
};

export default AddCompanyProjectToLog;
