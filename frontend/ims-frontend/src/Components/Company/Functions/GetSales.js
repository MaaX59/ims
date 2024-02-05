import axios from "axios";
import { server } from "../../../server";

const GetSales = async (props) => {
  try {
    await axios
      .get(`${server}/get_all_company_items/${props.company_id}`)
      .then((res) => {
        props.setSales(res.data);
      });
  } catch (err) {
    console.log("error while getting sales", err);
  }
};

export default GetSales;
