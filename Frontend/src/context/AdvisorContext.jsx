// src/context/AdvisorContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";

const AdvisorContext = createContext();

const BACKEND_URL = import.meta.env.VITE_Backend_URL ?? 'http://localhost:4000';

export const AdvisorContextProvider = ({ children }) => {
  const { isLogin, activeRoles } = useUserContext();

  // Advisor-specific state
  const [advisorProfile, setAdvisorProfile] = useState(null);
  const [advisorQueries, setAdvisorQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Utility: Check if user is advisor
  const isAdvisor = isLogin && activeRoles.includes("Advisor");

  // Fetch advisor profile
  const fetchAdvisorProfile = useCallback(async () => {
    if (!isAdvisor) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/advisor/profile`, { withCredentials: true });
      setAdvisorProfile(res.data.advisorProfile);
    } catch (e) {
      setAdvisorProfile(null);
    } finally {
      setLoading(false);
    }
  }, [isAdvisor]);

  // Fetch advisor queries
  const fetchAdvisorQueries = useCallback(async () => {
    if (!isAdvisor) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/advisor/queries`, { withCredentials: true });
      setAdvisorQueries(res.data.queries || []);
    } catch (e) {
      setAdvisorQueries([]);
    } finally {
      setLoading(false);
    }
  }, [isAdvisor]);

  // Effect: Fetch profile on mount if advisor
  useEffect(() => {
    if (isAdvisor) {
      fetchAdvisorProfile();
      fetchAdvisorQueries();
    }
  }, [isAdvisor, fetchAdvisorProfile, fetchAdvisorQueries]);

  return (
    <AdvisorContext.Provider value={{
      advisorProfile,
      setAdvisorProfile,
      advisorQueries,
      setAdvisorQueries,
      fetchAdvisorProfile,
      fetchAdvisorQueries,
      loading,
      isAdvisor,
    }}>
      {children}
    </AdvisorContext.Provider>
  );
};

export const useAdvisorContext = () => useContext(AdvisorContext);
