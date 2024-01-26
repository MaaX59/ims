import { React, useState } from "react";
import axios from "axios";
import { server } from "../../../server";
import "./StartCompany.css";

const StartCompany = (props) => {
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");
  const [user_id, setUser_id] = useState(props.userId);
  console.log("props in start company -->", props);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${server}/create_company`, {
          companyName: companyName,
          password: password,
          confirmedPassword: confirmedPassword,
          userId: user_id,
        })
        .then((res) => {
          //the backend will check for errors before creating user
          //and also connect company id to user
          if (res.data === "Company created") {
            setCompanyName("");
            setPassword("");
            setConfirmedPassword("");
            props.setOpenStartCompany(!props.openStartCompany);
          } else if (res.data === "no pwd match") {
            setError("Password and Confirm password need to match!");
          } else if (res.data === "Name already exist") {
            setError("Name already exist");
          }
        });
    } catch (err) {
      console.log(`error creating company`, err);
    }
  };

  return (
    <div className="app__start_company">
      <div className="app__start_company-content">
        <div className="app__start_company-content-title">
          {" "}
          <h1>Create Company IMS</h1>
        </div>
        <div className="app__start_company-form">
          <form onSubmit={handleSubmit}>
            <div className="app_start_company-form-firstrow">
              <div className="input-container ic1">
                <input
                  id="companyName"
                  className="input"
                  type="text"
                  placeholder=" "
                  onChange={(event) => {
                    setCompanyName(event.target.value);
                  }}
                  required
                />

                <label for="companyName" className="placeholder">
                  Name of the Company*
                </label>
              </div>
            </div>
            <div className="app_start_company-id">
              <span>
                Name will not be used for login, an ID will be generated
              </span>
            </div>

            <div className="app_start_company-form-secondrow">
              <div className="input-container ic1">
                <input
                  id="password"
                  className="input"
                  type="password"
                  placeholder=" "
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  required
                />

                <label for="password" className="placeholder">
                  Password*
                </label>
              </div>

              <div className="input-container ic1">
                <input
                  id="confirm_password"
                  className="input"
                  type="password"
                  placeholder=" "
                  onChange={(event) => {
                    setConfirmedPassword(event.target.value);
                  }}
                  required
                />
                <label for="confirm_password" className="placeholder">
                  Confirm Password*
                </label>
                {error && error}
              </div>
            </div>
            <div className="form-required">* field is required</div>
            {
              <div>
                <span>{error && error}</span>
              </div>
            }

            <button type="submit" className="submit">
              Create
            </button>
          </form>
        </div>
      </div>{" "}
    </div>
  );
};

export default StartCompany;
