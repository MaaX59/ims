import { React, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import "./Log.css";
import NavBar from "../../../Components/Company/NavBar/NavBar";
import axios from "axios";
import { server } from "../../../server";

const Log = () => {
  const { userInfo } = useContext(AuthContext);
  const [log, setLog] = useState(null);
  useEffect(() => {
    GetLog();
  }, []);

  const GetLog = async () => {
    const company_id = userInfo.company_id;
    try {
      await axios.get(`${server}/get_log/${company_id}`).then((res) => {
        const data = res.data;
        setLog(data);
      });
    } catch (err) {
      console.log("error getting log", err);
    }
  };

  return (
    <div className="app__log">
      <NavBar currentPage="log" />
      <div className="app__log-content">
        <table className="app__log_table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
            </tr>
          </thead>
          {!log ? (
            <span>No Log To Display</span>
          ) : (
            log.map((entry, index) => (
              <>
                <tr key={index}></tr>
                <td>{entry.date}</td>
                <td>{entry.string}</td>
              </>
            ))
          )}
        </table>
      </div>
    </div>
  );
};

export default Log;
