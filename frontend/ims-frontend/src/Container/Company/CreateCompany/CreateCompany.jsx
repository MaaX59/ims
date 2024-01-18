import { React, useState } from "react";
import axios from "axios";
import { server } from "../../../server";
import "./CreateCompany.css";
import { useNavigate } from "react-router-dom";

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [userId, setUserId] = useState("");

  const [error, setError] = useState("");
  const [pwdMismatch, setPwdMismatch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //need to get user from context

    try {
      await axios
        .post(`${server}/create_company`, {
          companyName: companyName,
          password: password,
          confirmedPassword: confirmedPassword,
          userId: userId,
        })
        .then((res) => {
          //the backend will check for errors before creating user
          if (res.data === "Company created") {
            setCompanyName("");
            setPassword("");
            setConfirmedPassword("");
            setUserId("");
            navigate("/viewuser");
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
    <div className="app__create_company">
      <div className="app__create_company-content">
        <div className="app__create_company-content-title">
          {" "}
          <h1>Create Company IMS</h1>
        </div>
        <div className="app__create_company-form">
          <form onSubmit={handleSubmit}>
            <div className="app_create_company-form-firstrow">
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
            <div className="app_create_company-id">
              <span>
                Name will not be used for login, an ID will be generated
              </span>
            </div>

            <div className="app_create_company-form-secondrow">
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
                {pwdMismatch && <h3>Passwords do not match</h3>}
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

export default CreateCompany;
