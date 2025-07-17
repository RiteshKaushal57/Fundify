import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../context/UserContext'; // <-- Import context

const BACKEND_URL = import.meta.env.VITE_Backend_URL ?? "http://localhost:4000";

const KYCForm = () => {
    const [form, setForm] = useState({
        panNumber: "",
        aadhaarNumber: "",
    });
    const [panFile, setPanFile] = useState(null);
    const [aadhaarFile, setAadhaarFile] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [kycStatus, setKycStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setUser } = useUserContext(); // <-- Get setUser

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setMessage("");
        setKycStatus(null);
    };

    const handleFileChange = (e) => {
        if (e.target.name === "panDocument") setPanFile(e.target.files[0]);
        if (e.target.name === "aadhaarDocument") setAadhaarFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        setKycStatus(null);

        try {
            // 1. Upload documents to GCS
            const uploadData = new FormData();
            if (panFile) uploadData.append("panDocument", panFile);
            if (aadhaarFile) uploadData.append("aadhaarDocument", aadhaarFile);

            const uploadRes = await axios.post(
                `${BACKEND_URL}/upload-documents`,
                uploadData,
                { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
            );

            // 2. Submit KYC with document URLs
            const kycPayload = {
                panNumber: form.panNumber,
                aadhaarNumber: form.aadhaarNumber,
                panDocument: uploadRes.data.panUrl,
                aadhaarDocument: uploadRes.data.aadhaarUrl,
            };

            const res = await axios.post(
                `${BACKEND_URL}/kyc`,
                kycPayload,
                { withCredentials: true }
            );

            setMessage(res.data.message);
            if (typeof res.data.user?.kycStatus === "boolean") {
                setKycStatus(res.data.user.kycStatus);

                // --- UPDATE USER CONTEXT HERE ---
                setUser(res.data.user);

                if (res.data.user.kycStatus === true) {
                    setTimeout(() => navigate("/invest"), 1500);
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "KYC submission failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Complete Your KYC</h2>
            <div className="mb-3">
                <label className="block mb-1 font-medium">PAN Number</label>
                <input
                    type="text"
                    name="panNumber"
                    value={form.panNumber}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    className="w-full border px-2 py-1 rounded"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block mb-1 font-medium">Aadhaar Number</label>
                <input
                    type="text"
                    name="aadhaarNumber"
                    value={form.aadhaarNumber}
                    onChange={handleChange}
                    placeholder="123456789012"
                    className="w-full border px-2 py-1 rounded"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block mb-1 font-medium">PAN Document (PDF/Image)</label>
                <input
                    type="file"
                    name="panDocument"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block mb-1 font-medium">Aadhaar Document (PDF/Image)</label>
                <input
                    type="file"
                    name="aadhaarDocument"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-black text-white rounded font-semibold"
            >
                {loading ? "Submitting..." : "Submit KYC"}
            </button>
            {message && <div className="mt-3 text-green-700">{message}</div>}
            {error && <div className="mt-3 text-red-700">{error}</div>}
            {kycStatus !== null && (
                <div className={`mt-3 font-semibold ${kycStatus ? "text-green-700" : "text-red-700"}`}>
                    KYC Status: {kycStatus ? "✅ Approved" : "❌ Rejected"}
                </div>
            )}
            {kycStatus === true && (
                <div className="mt-2 text-blue-700">Redirecting to invest page...</div>
            )}
        </form>
    );
};

export default KYCForm;
