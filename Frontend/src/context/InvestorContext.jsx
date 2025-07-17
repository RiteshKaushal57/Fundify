// src/context/InvestorContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUserContext } from "./UserContext.jsx";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_Backend_URL ?? 'http://localhost:4000';

const InvestorContext = createContext();

export const InvestorContextProvider = ({ children }) => {
  const { isLogin, activeRoles } = useUserContext();

  const [investments, setInvestments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const isInvestor = isLogin && activeRoles.includes("Investor");

  // 🟢 Fetch Investments
  const fetchInvestorInvestments = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/investor/investments`, { withCredentials: true });
      setInvestments(res.data || []);
    } catch (err) {
      console.error("Failed to load investments", err);
      setInvestments([]);
    }
  };

  // 🟢 Fetch Stats
  const fetchInvestorStats = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/investor/stats`, { withCredentials: true });
      setStats(res.data || null);
    } catch (err) {
      console.error("Failed to load investor stats", err);
      setStats(null);
    }
  };

  useEffect(() => {
    if (isInvestor) {
      fetchInvestorInvestments();
      fetchInvestorStats();
    }
  }, [isInvestor]);

  return (
    <InvestorContext.Provider value={{
      isInvestor,
      investments,
      stats,
      fetchInvestorInvestments,
      fetchInvestorStats,
      loading
    }}>
      {children}
    </InvestorContext.Provider>
  );
};

export const useInvestorContext = () => useContext(InvestorContext);
