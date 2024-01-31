import { React } from "react";

function FilteringData(props) {
  console.log(props.items);
  //create a new array by filtering the original array

  const filteredData = props.items.filter((el) => {
    //if no input the return the original
    console.log("EL?", el);
    console.log("props.searchInput?", props.searchInput);
    if (props.searchInput === "") {
      console.log(el);
      return el;
    }
    //return the item which contains the user searchInput
    else {
      return el.item_name.includes(props.searchInput && props.searchInput);
    }
  });
  return (
    <table>
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
      {filteredData.map((item, index) => (
        <>
          <tr key={index}></tr>
          <td>{item.item_name}</td>
          <td>{item.purchased_price && item.purchased_price + "$"}</td>
          <td>{item.item_amount}</td>
          <td>{item.project_name}</td>
          <td>{item.date_of_creation}</td>
        </>
      ))}
    </table>
  );
}

export default FilteringData;
