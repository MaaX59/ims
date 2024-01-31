import { React, useEffect, useState, useContext } from "react";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import "./SellItems.css";
import GetAllItems from "../../../Components/Company/Functions/GetAllItems";
import { AuthContext } from "../../../context/AuthProvider";
import FilteringData from "../../../Components/Company/Functions/FilteringData";

const SellItems = () => {
  const { userInfo } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const company_id = userInfo.company_id;

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllCompanyItems();
  }, []);

  const handleChange = (e) => {
    //convert input text to lower case
    let lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  const getAllCompanyItems = () => {
    GetAllItems({ company_id, setItems });
    console.log("getAllCompanyItems is triggered");
  };

  return (
    <div className="app__sell_items_page">
      <NavBar currentPage="sales" />
      <div className="app__sell_items-content">
        <div className="app__sell_items-content-search">
          <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput}
          />
        </div>
        <div className="app__sell_items-content-list">
          <FilteringData searchInput={searchInput} items={items} />
          {/* <table>
            {" "}
            <thead>
              <tr>
                <th>Name</th>
                <th>Purchases $</th>
                <th>Amount</th>
                <th>Project Name</th>
                <th>Date Added</th>
              </tr>{" "}
            </thead>
            {items &&
              items.map((item, index) => (
                <>
                  <tr key={index}></tr>
                  <td>{item.item_name}</td>
                  <td>{item.purchased_price && item.purchased_price + "$"}</td>
                  <td>{item.item_amount}</td>
                  <td>{item.project_name}</td>
                  <td>{item.date_of_creation}</td>
                </>
              ))}
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default SellItems;
