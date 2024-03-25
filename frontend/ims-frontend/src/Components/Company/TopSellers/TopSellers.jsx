import { React, useEffect, useContext, useState } from "react";
import "./TopSellers.css";
import axios from "axios";
import { server } from "../../../server";
import { AuthContext } from "../../../context/AuthProvider";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TopSellers = () => {
  const { userInfo } = useContext(AuthContext);
  const company_id = userInfo.company_id;

  const [topSellers, setTopSellers] = useState(null);

  useEffect(() => {
    GetSellerData();
  }, []);

  const GetSellerData = async () => {
    try {
      //first we get the data
      await axios.get(`${server}/get_sales/${company_id}`).then((res) => {
        const data = res.data.map(
          ({ sold_by_user_name, profit, items_sold }) => ({
            sold_by_user_name: sold_by_user_name,
            profit: profit * items_sold,
          })
        );
        console.table("data", data);
        //add up profits
        const tempObj = {};

        data.forEach(function (d) {
          if (tempObj.hasOwnProperty(d.sold_by_user_name)) {
            tempObj[d.sold_by_user_name] =
              tempObj[d.sold_by_user_name] + d.profit;
          } else {
            tempObj[d.sold_by_user_name] = d.profit;
          }
        });

        const newArr = [];

        for (var prop in tempObj) {
          newArr.push({ sold_by_user_name: prop, profit: tempObj[prop] });
        }
        console.table(newArr);
        setTopSellers(newArr);
      });
    } catch (err) {
      console.log("error while getting top sellers", err);
    }
  };

  return (
    <ResponsiveContainer width={500} height={200}>
      <BarChart
        width={300}
        height={150}
        data={topSellers}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="sold_by_user_name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="profit" fill="darkred" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopSellers;
