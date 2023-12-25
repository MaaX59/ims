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
          <div className="app_createuser-form-firstrow">
            <div className="input-container ic1">
              <input
                id="firstname"
                className="input"
                type="text"
                placeholder=" "
                onChange={(event) => {
                  // setProject_name(event.target.value);
                }}
                required
              />

              <label for="firstname" className="placeholder">
                First Name*
              </label>
            </div>

            <div className="input-container ic1">
              <input
                id="lastname"
                className="input"
                type="text"
                placeholder=" "
                onChange={(event) => {
                  // setProject_description(event.target.value);
                }}
              />
              <label for="lastname" className="placeholder">
                Last Name*
              </label>
            </div>
          </div>

          <div className="app_createuser-form-secondrow">
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
                Email*
              </label>
            </div>
            <div className="input-container ic1">
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
                Password*
              </label>
            </div>
          </div>

          <div className="app_createuser-form-thirdrow">
            <div className="input-container ic1">
              <input
                id="company_id"
                className="input"
                type="number"
                placeholder=" "
                onChange={(event) => {
                  // setProject_name(event.target.value);
                }}
                required
              />

              <label for="company_id" className="placeholder">
                Company ID
              </label>
            </div>

            <div className="input-container ic1">
              <input
                id="company_password"
                className="input"
                type="password"
                placeholder=" "
                onChange={(event) => {
                  // setProject_description(event.target.value);
                }}
              />
              <label for="company_password" className="placeholder">
                Company Password
              </label>
            </div>
          </div>

          <button type="submit" className="submit">
            Create
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default Createuser;
