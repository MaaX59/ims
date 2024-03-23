import { React, useState, useContext } from "react";
import axios from "axios";
import { server } from "../../../server";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import "./ConnectCompany.css";
import NavBar from "../../../Components/Company/NavBar/NavBar";

const ConnectCompany = () => {
  const [company_id, setCompanyId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //get user info from context
  const { userInfo } = useContext(AuthContext);

  //on submit connect company
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${server}/connect_company`, {
          company_id: company_id,
          password: password,
          user_id: userInfo.id,
        })
        .then((res) => {
          if (res.data === "no match") {
            console.log("no match");
            setError("Wrong Password");
          } else if (res.data === "no company") {
            setError("No company with this id");
          } else if (res.data === "connected") {
            console.log("success");
            navigate("/dashboard");
          }
        });
    } catch (err) {
      console.log(`error creating company`, err);
    }
  };

  return (
    <div className="app__connect_company">
      <NavBar currentPage="dash" />
      <div className="app__connect_company_content">
        <div className="app__connect_company-content">
          <div className="app__connect_company-content-title">
            {" "}
            <h1>Connect to Company IMS</h1>
          </div>
          <div className="app__connect_company-form">
            <form onSubmit={handleSubmit}>
              <div className="app_connect_company-form-firstrow">
                <div className="input-container ic1">
                  <input
                    id="companyId"
                    className="input"
                    type="number"
                    placeholder=" "
                    onChange={(event) => {
                      setCompanyId(event.target.value);
                    }}
                    required
                  />

                  <label for="companyId" className="placeholder">
                    Company ID*
                  </label>
                </div>
              </div>

              <div className="app_connect_company-form-secondrow">
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
              </div>
              <div className="form-required">* field is required</div>
              {
                <div>
                  <span>{error && error}</span>
                </div>
              }

              <button type="submit" className="submit">
                Connect
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectCompany;
