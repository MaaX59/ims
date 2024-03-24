import { React, useEffect, useContext, useState } from "react";
import "./TopSellers.css";
import axios from "axios";
import { server } from "../../../server";
import { AuthContext } from "../../../context/AuthProvider";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState(null);
  useEffect(() => {
    GetSellerData();
  }, []);
  const { userInfo } = useContext(AuthContext);
  const company_id = userInfo.company_id;

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
        console.table(data);
        //add up profits
        const tempObj = {};

        data.forEach(function (d) {
          if (tempObj.hasOwnProperty(d.name)) {
            tempObj[d.name] = tempObj[d.name] + d.profit;
          } else {
            tempObj[d.name] = d.profit;
          }
        });

        const newArr = [];

        for (var prop in tempObj) {
          newArr.push({ name: prop, profit: tempObj[prop] });
        }
        console.table(newArr);
        setTopSellers(newArr);
      });
    } catch (err) {
      console.log("error while getting sales", err);
    }
  };

  return <div>TopSellers</div>;
};

export default TopSellers;
