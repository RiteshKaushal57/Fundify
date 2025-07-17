// src/components/Investor/InvestorRegister.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_Backend_URL ?? "http://localhost:4000";

const INVESTMENT_FOCUS_OPTIONS = [
  "Tech",
  "Healthcare",
  "Real Estate",
  "Agriculture",
  "Education",
];

const RISK_APPETITE_OPTIONS = ["Low", "Medium", "High"];

const INVESTMENT_RANGE_OPTIONS = [
  "₹1L - ₹5L",
  "₹5L - ₹10L",
  "₹10L - ₹50L",
  "₹50L+",
];

const InvestorRegister = () => {
  const { user } = useUserContext();
  const [form, setForm] = useState({
    name: "",
    email: user?.email || "",
    password: "",
    phone: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
    investmentFocus: "",
    investmentRange: "",
    riskAppetite: "",
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setForm(prev => ({ ...prev, email: user?.email || "" }));
  }, [user]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/location/states`)
      .then(res => setStates(res.data))
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    if (form.state) {
      axios.get(`${BACKEND_URL}/location/cities?state_id=${form.state}`)
        .then(res => setCities(res.data))
        .catch(() => setCities([]));
    } else {
      setCities([]);
    }
  }, [form.state]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (
      !form.name ||
      !form.email ||
      (!user && !form.password) ||
      !form.phone ||
      !form.state ||
      !form.city ||
      !form.pincode ||
      !form.investmentFocus ||
      !form.investmentRange ||
      !form.riskAppetite
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const payload = {
      ...form,
      investmentFocus: [form.investmentFocus],
      investmentRange: form.investmentRange,
      riskAppetite: form.riskAppetite,
    };
    if (user) {
      delete payload.password;
    }

    try {
      await axios.post(`${BACKEND_URL}/investor/register`, payload, { withCredentials: true });
      setMessage("Registration successful!");
      setForm({
        name: "",
        email: user?.email || "",
        password: "",
        phone: "",
        country: "India",
        state: "",
        city: "",
        pincode: "",
        investmentFocus: "",
        investmentRange: "",
        riskAppetite: "",
      });
      toast.success("Registration successful!");
      navigate('/kyc');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Investor Registration</h2>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          readOnly={!!user}
          tabIndex={!!user ? -1 : 0}
          className={`w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 ${user ? "text-gray-400" : ""}`}
          required
        />
      </div>
      {!user && (
        <div>
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      )}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">State</label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Pincode</label>
        <input
          type="text"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Investment Focus</label>
        <select
          name="investmentFocus"
          value={form.investmentFocus}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        >
          <option value="">Select Focus</option>
          {INVESTMENT_FOCUS_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Investment Range</label>
        <select
          name="investmentRange"
          value={form.investmentRange}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        >
          <option value="">Select Range</option>
          {INVESTMENT_RANGE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Risk Appetite</label>
        <select
          name="riskAppetite"
          value={form.riskAppetite}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        >
          <option value="">Select Risk Appetite</option>
          {RISK_APPETITE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
      >
        {loading ? "Registering..." : "Register as Investor"}
      </button>
      {message && (
        <p className="text-center mt-2 text-green-600">{message}</p>
      )}
      {error && (
        <p className="text-center mt-2 text-red-600">{error}</p>
      )}
    </form>
  );
};

export default InvestorRegister;
