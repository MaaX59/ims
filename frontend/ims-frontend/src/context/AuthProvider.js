import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [tokenState, setTokenState] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setToken = (token) => {
    localStorage.setItem("authToken", token);
    setTokenState(token);
  };

  return (
    <AuthContext.Provider
      value={{ tokenState, setToken, userInfo, setTokenState, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
