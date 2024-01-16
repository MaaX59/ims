import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import "./Login.css";
import AuthContext from "../../../context/AuthProvider";

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/login`,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err, "error loggin in");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="app__login">
      <div className="app__login-content">
        <div className="app__login-content-title">
          <h1>Login</h1>
        </div>
        <div className="app__login-content-form">
          <form onSubmit={handleSubmit}>
            <div className="input-container ic1">
              <input
                id="email"
                className="input"
                type="email"
                placeholder=" "
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />

              <label for="email" className="placeholder">
                Email*
              </label>
            </div>
            <div className="input-container ic2">
              <input
                id="project-description"
                className="input"
                type="password"
                placeholder=" "
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <label for="password" className="placeholder">
                Password*
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
