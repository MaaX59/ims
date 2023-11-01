import { React, useState } from "react";
import "./Navbar.css";
import Hamburger from "hamburger-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="app__navbar">
      <div className="app__navbar-smallscreen">
        <Hamburger toggled={open} toggle={setOpen} />
        {open && (
          <div className="app__navbar-menu-popup slide-bottom">
            <ul className="app__navbar-menu-popup-links">
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
        )}
      </div>
      {/* <div className="app__navbar_links">
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
      </div> */}
    </div>
  );
};

export default Navbar;
