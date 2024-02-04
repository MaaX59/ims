import axios from "axios";
import { server } from "../../../server";

const AddSales = async (props) => {
  const body = props;
  try {
    await axios.post(`${server}/add_sales`, body);
  } catch (error) {
    return error;
  }
};

export default AddSales;
