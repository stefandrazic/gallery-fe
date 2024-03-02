import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const setLogin = (token) => {
    setAuthToken(token);
  };

  const setLogout = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, setLogin, setLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
