import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const setAuth = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthToken(token);
    setUser(user);
  };

  const setLogout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const change = () => {
    setChanged(!changed);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuth,
        setLogout,
        user,
        setUser,
        change,
        changed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
