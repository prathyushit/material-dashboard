import React, { createContext, useContext, useEffect, useState } from "react";

import { getItemFromLS } from "../config/storage";
import { performLogout } from "../config/authUtils";
import PropTypes from 'prop-types';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [initializing, setInitializing] = useState(true);

  const checkAuth = () => {
    const token = getItemFromLS("id_token");
    setIsAuthenticated(!!token);

    setInitializing(false);
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };
    window.addEventListener("storageChange", handleStorageChange);
    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    performLogout();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, initializing, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



AuthProvider.propTypes = {
  children: PropTypes.node, // `node` can be anything that can be rendered (numbers, strings, elements, etc.)
};


export const useAuth = () => useContext(AuthContext);
