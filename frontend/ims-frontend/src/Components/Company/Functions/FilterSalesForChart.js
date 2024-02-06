import GetSales from "./GetSalesForChart";
import { useEffect, useState } from "react";

export const FilterSalesForChart = (props) => {
  const company_id = props.company_id;
  const [sales, setSales] = useState();

  useEffect(() => {
    findSales();
  });
  const findSales = () => {
    GetSales({ company_id, setSales });
  };
};
