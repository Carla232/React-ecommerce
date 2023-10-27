import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem("isAuthenticated")));
  
  const login = ({ emailOrUsername, password }) => {
    const user = { emailOrUsername, password };
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };
  
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
