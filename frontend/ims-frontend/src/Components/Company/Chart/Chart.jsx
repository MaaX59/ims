import { React, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import GetSalesForChart from "../Functions/GetSalesForChart";
import "./Chart.css";

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Chart = () => {
  const { userInfo } = useContext(AuthContext);
  const company_id = userInfo.company_id;
  const [salesDataForChart, setSalesDataForChart] = useState(null);

  useEffect(() => {
    FindChartData();
  }, []);

  const FindChartData = () => {
    GetSalesForChart({ setSalesDataForChart, company_id });
  };
  console.table(salesDataForChart);

  return (
    <ResponsiveContainer width={800} height={400}>
      <AreaChart data={salesDataForChart}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <Area dataKey="profit" stroke="#2451B7" fill="url(#color)" />

        <XAxis dataKey="date" axisLine={false} tickLine={false} />

        <YAxis
          dataKey="profit"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `€ ${number.toFixed(0)}`}
        />

        <Tooltip constent={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
const CustomTooltip = ({ active, payload, lable }) => {
  if (active) {
    return (
      <div className="chart_tooltip">
        <h4>{lable}</h4>
      </div>
    );
  }
  return null;
};
export default Chart;
