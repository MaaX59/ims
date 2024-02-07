import axios from "axios";
import { server } from "../../../server";

const GetSalesForChart = async (props) => {
  try {
    //first we get the data
    await axios.get(`${server}/get_sales/${props.company_id}`).then((res) => {
      //next we filter away everything that´s now date and profit and change the date to just year month and day = 10 chars
      const data = res.data.map(({ date, profit }) => ({
        date: date.toString().substr(0, 10),
        profit,
      }));

      //add up all profits for each day
      const tempObj = {};

      data.forEach(function (d) {
        if (tempObj.hasOwnProperty(d.date)) {
          tempObj[d.date] = tempObj[d.date] + d.profit;
        } else {
          tempObj[d.date] = d.profit;
        }
      });

      const newArr = [];

      for (var prop in tempObj) {
        newArr.push({ date: prop, profit: tempObj[prop] });
      }

      //send data to chart
      props.setSalesDataForChart(newArr);
    });
  } catch (err) {
    console.log("error while getting sales", err);
  }
};

export default GetSalesForChart;
