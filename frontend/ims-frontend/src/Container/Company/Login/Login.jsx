import { React, useState } from "react";
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
          <button type="submit" className="submit">
            Login
          </button>
          <button type="text" className="create-user">
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
