import axios from "axios";
import { server } from "../../../server";

const GetSalesForChart = async (props) => {
  try {
    //first we get the data
    await axios.get(`${server}/get_sales/${props.company_id}`).then((res) => {
      //next we filter away everything that´s now date and profit and change the date to just year month and day = 10 chars
      const data = res.data.map(({ date, profit }) => ({
        date: date.substr(0, 10),
        profit,
      }));

      props.setSalesDataForChart(data);
    });
  } catch (err) {
    console.log("error while getting sales", err);
  }
};

export default GetSalesForChart;
