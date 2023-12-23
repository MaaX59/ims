import React from "react";
import "./Createuser.css";

const Createuser = () => {
  return (
    <div className="app__createuser">
      <div className="app__createuser-content">
        <div className="app__createuser-form">
          <div className="app__createuser-form-title">
            {" "}
            <h1>Create User</h1>
          </div>
          <div className="input-container ic1">
            <input
              id="email"
              className="input"
              type="email"
              placeholder=" "
              onChange={(event) => {
                // setProject_name(event.target.value);
              }}
              required
            />

            <label for="email" className="placeholder">
              Email
            </label>
          </div>
          <div className="input-container ic2">
            <input
              id="project-description"
              className="input"
              type="password"
              placeholder=" "
              onChange={(event) => {
                // setProject_description(event.target.value);
              }}
            />
            <label for="password" className="placeholder">
              Password
            </label>
          </div>

          <button type="submit" className="submit">
            Login
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default Createuser;
