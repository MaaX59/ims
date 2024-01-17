import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import "./Login.css";
import AuthContext from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userToLogin = { email, password };
      const response = await axios.post(
        `${server}/login`,
        userToLogin
        // JSON.stringify({ email, password })
        // {
        //   headers: { "Content-Type": "application/json" },
        //   withCredentials: true,
        // }
      );
      console.log(response.data);
      if (response.data === "no match") {
        console.log(response.data);
        setError("Incorrect password");
      } else if (response.data === "fail") {
        console.log(response.data);
        setError("Something went wrong");
      } else if (response.data === "no email") {
        console.log(response.data);
        setError("This email dosen´t exist");
      } else {
        console.log("token -->", response.data.token);
        const token = response?.data?.token;
        setAuth(token);
        setEmail("");
        setPassword("");
        navigate("/viewuser");
      }
    } catch (err) {
      console.log(err, "error loggin in");
    }
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
            {
              <div>
                <span>{error && error}</span>
              </div>
            }

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
