import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import "./Login.css";

const Login = () => {
  return (
    <div className="app__login">
      <div className="app__login-content">
        <div className="app__login-content-title">
          <h1>Login</h1>
        </div>
        <div className="app__login-content-form">
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

          <div className="app__login-buttons">
            <button type="submit" className="submit-login">
              Login
            </button>
            <Link to="/create-user">
              <button type="text" className="submit-createuser">
                Create User
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
