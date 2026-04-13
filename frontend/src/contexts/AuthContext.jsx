import React, { createContext, useEffect, useState } from 'react';
import {getUserProfile} from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('jwt'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then(res => setUser(res.data))
      .catch(() => {
        // If token is invalid, clear it
        localStorage.removeItem('jwt');
        setToken(null);
        setUser(null);
      });
    
    // Optionally: fetch user profile using token
    // For now we don't fetch; user can be set during login
  }, []);

  const login = (jwtToken, userData) => {
    localStorage.setItem('jwt', jwtToken);
    setToken(jwtToken);
    if (userData) setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

