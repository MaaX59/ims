import { React, useEffect, useContext, useState } from "react";
import axios from "axios";
import { server } from "../../../server";
import { AuthContext } from "../../../context/AuthProvider";
import {
  PieChart,
  Tooltip,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";

import "./MostSoldItems.css";

const MostSoldItems = () => {
  const { userInfo } = useContext(AuthContext);
  const company_id = userInfo.company_id;

  const [mostSoldItems, setMostSoldItems] = useState();

  useEffect(() => {
    GetSellerData();
  }, []);

  const GetSellerData = async () => {
    try {
      //first we get the data
      await axios.get(`${server}/get_sales/${company_id}`).then((res) => {
        const data = res.data.map(({ item_name, items_sold }) => ({
          item_name: item_name,
          items_sold: items_sold,
        }));

        //add up items
        const tempObj = {};

        data.forEach(function (d) {
          if (tempObj.hasOwnProperty(d.item_name)) {
            tempObj[d.item_name] = tempObj[d.item_name] + d.items_sold;
          } else {
            tempObj[d.item_name] = d.items_sold;
          }
        });

        const newArr = [];

        for (var prop in tempObj) {
          newArr.push({ item_name: prop, items_sold: tempObj[prop] });
        }
        //sort by highest first, then choose 5 highest
        newArr.sort((a, b) => b.items_sold - a.items_sold);
        const shortArr = newArr.slice(0, 5);

        setMostSoldItems(shortArr);
      });
    } catch (err) {
      console.log("error while getting top sellers", err);
    }
  };
  const COLORS = ["#2b020f", "#2b022b", "#04061f", "#090f4a", "#964006"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div>
      {mostSoldItems && (
        <ResponsiveContainer
          width={280}
          height={280}
          style={{ lineheight: "1rem" }}
        >
          <PieChart width={300} height={300}>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={mostSoldItems}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="items_sold"
            >
              {mostSoldItems.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
const CustomTooltip = ({ active, payload, lable }) => {
  if (active && payload && payload.length) {
    // console.log(payload[0].payload.date, "payload");

    // convert date to string
    const item = payload[0].payload.item_name;

    return (
      <div className="chart_tooltip">
        {/* <h4>{`${payload[0].value}`}</h4> */}
        <h4> {item.slice(0, 15) + ".."} </h4>
      </div>
    );
  }
  return null;
};
export default MostSoldItems;
