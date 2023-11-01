import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="app__navbar">
      <div className="app__navbar_links">
        <ul>
          <li>
            <a href="/">Homepage</a>
          </li>
          <li>
            <a href="/viewproject">View Projects</a>
          </li>
          <li>
            <a href="/newproject">Start Project</a>
          </li>
          <li>
            <a href="/additem">Add Items</a>
          </li>
        </ul>
      </div>
     
    </div>
  );
};

export default Navbar;
