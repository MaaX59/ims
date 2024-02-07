import { React, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import GetSalesForChart from "../Functions/GetSalesForChart";

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
  return;
};

export default Chart;
