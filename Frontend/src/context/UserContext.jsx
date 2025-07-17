import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();
const BACKEND_URL = import.meta.env.VITE_Backend_URL

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [activeRoles, setActiveRoles] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/auth`, { withCredentials: true });
        if (res.data.user) {
          setUser(res.data.user);
          setIsLogin(true);
          setActiveRoles(res.data.user.roles || []);
        }
      } catch {
        setUser(null);
        setIsLogin(false);
        setActiveRoles([]);
      }
    };
    checkAuth();
  }, []);

  // Fetch user profile utility (for KYC refresh)
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/auth`, { withCredentials: true });
      setUser(res.data.user);
      setActiveRoles(res.data.user.roles || []);
    } catch {
      setUser(null);
      setActiveRoles([]);
    }
  };

  const registerUser = async (name, email, password, role) => {
    try {
      const axiosResponse = await axios.post(
        `${BACKEND_URL}/register`,
        { name, email, password, role },
        { withCredentials: true }
      );
      setUser(axiosResponse.data.user);
      setIsLogin(true);
      setActiveRoles(axiosResponse.data.user.roles || []);
      return { success: true, message: axiosResponse.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, message };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const axiosResponse = await axios.post(
        `${BACKEND_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(axiosResponse.data.user);
      setIsLogin(true);
      setActiveRoles(axiosResponse.data.user.roles || []);
      return { success: true, user: axiosResponse.data.user };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, message };
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(`${BACKEND_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
      setIsLogin(false);
      setActiveRoles([]);
    } catch (error) {
      console.error("Error logging out user:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isLogin,
      setIsLogin,
      activeRoles, // <-- array of roles
      setActiveRoles,
      fetchUserProfile,
      registerUser,
      loginUser,
      logoutUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
