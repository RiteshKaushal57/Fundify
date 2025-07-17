import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BusinessIdeaContext = createContext();
const BACKEND_URL = import.meta.env.VITE_Backend_URL ?? 'http://localhost:4000';

export const BusinessIdeaProvider = ({ children }) => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);

    // Fetch all business ideas on mount
    useEffect(() => {
        allBusinessIdeas();
        // eslint-disable-next-line
    }, []);

    // Fetch all business ideas
    const allBusinessIdeas = async () => {
        setLoading(true);
        try {
            const axiosResponse = await axios.get(`${BACKEND_URL}/business-ideas`);
            setIdeas(axiosResponse.data)
            return { success: true, ideas: axiosResponse.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch business ideas. Please try again.';
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Fetch a business idea by ID
    const getBusinessIdeaById = async (id) => {
        try {
            const axiosResponse = await axios.get(`${BACKEND_URL}/business-ideas/${id}`);
            return { success: true, idea: axiosResponse.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch business idea. Please try again.';
            return { success: false, message };
        }
    };

    /**
     * Post a new business idea (for entrepreneurs only)
     * @param {Object} ideaData - The business idea data
     * @param {string} [token] - Optional JWT token if using header-based auth
     */
    const postBusinessIdea = async (ideaData, token) => {
        setPosting(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // Required for cookie-based auth
            };
            // If using JWT in header, add Authorization header
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            const axiosResponse = await axios.post(
                `${BACKEND_URL}/business-ideas`,
                ideaData,
                config
            );
            // Optionally refresh the list after posting
            await allBusinessIdeas();
            return { success: true, idea: axiosResponse.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to post business idea. Please try again.';
            return { success: false, message };
        } finally {
            setPosting(false);
        }
    };

    return (
        <BusinessIdeaContext.Provider value={{
            ideas,
            loading,
            posting,
            allBusinessIdeas,
            getBusinessIdeaById,
            postBusinessIdea
        }}>
            {children}
        </BusinessIdeaContext.Provider>
    );
};

export const useBusinessIdeas = () => useContext(BusinessIdeaContext);
