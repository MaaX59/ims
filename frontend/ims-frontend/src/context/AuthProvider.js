import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../server";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [tokenState, setTokenState] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authenticateUser();
  }, []);

  const setToken = (token) => {
    localStorage.setItem("authToken", token);
    setTokenState(token);
  };
  const authenticateUser = async () => {
    const gotToken = localStorage.getItem("authToken");
    console.log("This is the token from the user function", gotToken);
    if (gotToken) {
      try {
        const { data } = await axios.get(`${server}/verify`, {
          headers: { authorization: gotToken },
          body: {
            token: gotToken,
          },
        });
        console.log("response from verify route", data);
        setUserInfo(data.user);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("There was an error on the authenticate user", err);
        setUserInfo(null);
        setIsLoggedIn(false);
      }
    } else {
      setUserInfo(null);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        tokenState,
        setToken,
        userInfo,
        setTokenState,
        setUserInfo,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
