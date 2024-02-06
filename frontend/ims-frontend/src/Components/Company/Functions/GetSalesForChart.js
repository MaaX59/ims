import axios from "axios";
import { server } from "../../../server";

const GetSalesForChart = async (props) => {
  try {
    await axios
      .get(`${server}/get_all_company_items/${props.company_id}`)
      .then((res) => {
        console.log("res.data");
        const data = res.data.map(({ date, profit }) => ({ date, profit }));
        console.log(" new array", data);
        props.setSalesDataForChart(data);
      });
  } catch (err) {
    console.log("error while getting sales", err);
  }
};

export default GetSalesForChart;
