import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_Backend_URL ?? 'http://localhost:4000';

const EntrepreneurContext = createContext();

export const EntrepreneurContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [myIdeas, setMyIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch business ideas
  const fetchMyBusinessIdeas = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/entrepreneur/ideas`, {
        withCredentials: true,
      });
      setMyIdeas(res.data || []);
    } catch (error) {
      console.error("Failed to fetch ideas", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete business idea by ID
  const deleteIdea = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/entrepreneur/ideas/${id}`, {
        withCredentials: true,
      });
      // Refetch after deletion
      fetchMyBusinessIdeas();
    } catch (err) {
      console.error("Failed to delete idea", err);
    }
  };

  const registerEntrepreneur = async (data) => {
    return axios.post(`${BACKEND_URL}/entrepreneur/register`, data, {
      withCredentials: true,
    });
  };

  useEffect(() => {
    fetchMyBusinessIdeas();
  }, []);

  return (
    <EntrepreneurContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        setLoading,
        registerEntrepreneur,
        myIdeas,
        fetchMyBusinessIdeas,
        deleteIdea
      }}
    >
      {children}
    </EntrepreneurContext.Provider>
  );
};

export const useEntrepreneurContext = () => useContext(EntrepreneurContext);
