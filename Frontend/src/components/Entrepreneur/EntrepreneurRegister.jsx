import React, { useEffect, useState } from "react";
import { useEntrepreneurContext } from "../../context/entreContext.jsx";
import { useUserContext } from "../../context/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_Backend_URL ?? "http://localhost:4000";

const BUSINESS_CATEGORIES = [
  "Tech", "Healthcare", "Real Estate", "Agriculture", "Education", "Retail"
];

const EntrepreneurRegister = ({ initialData = {} }) => {
  const { user } = useUserContext();
  const { registerEntrepreneur, fetchEntrepreneurProfile } = useEntrepreneurContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: initialData.name || "",
    email: user?.email || initialData.email || "",
    phone: initialData.phone || "",
    country: "India",
    state: "",
    city: "",
    district: "",
    pincode: "",
    businessCategory: "",

  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🚨 Autofill from investor profile if available
  useEffect(() => {
    const autofillFromInvestor = async () => {
      if (user?.roles?.includes("Investor")) {
        try {
          const res = await axios.get(`${BACKEND_URL}/investor/profile`, { withCredentials: true });
          const investor = res.data;

          // 🚨 Only set fields that exist in both forms
          setForm(prev => ({
            ...prev,
            name: investor.name || prev.name,
            email: investor.email || prev.email,
            phone: investor.phone || prev.phone,
            country: investor.country || prev.country,
            state: investor.state || prev.state,
            city: investor.city || prev.city,
            district: investor.district || prev.district,
            pincode: investor.pincode || prev.pincode,
          }));

        } catch (err) {
          // Optionally handle error
        }
      }
    };
    autofillFromInvestor();
    // eslint-disable-next-line
  }, [user]);

  // Fetch states on mount
  useEffect(() => {
    axios.get(`${BACKEND_URL}/location/states`)
      .then(res => setStates(res.data))
      .catch(() => setStates([]));
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (form.state) {
      axios.get(`${BACKEND_URL}/location/cities?state_id=${form.state}`)
        .then(res => setCities(res.data))
        .catch(() => setCities([]));
    } else {
      setCities([]);
    }
  }, [form.state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    await registerEntrepreneur(form);
    await fetchUserProfile();
    try {
      if (
        !form.name ||
        !form.email ||
        !form.phone ||
        !form.state ||
        !form.city ||
        !form.pincode ||
        !form.businessCategory
      ) {
        setMessage("All fields are required.");
        setLoading(false);
        return;
      }

      // Send as JSON, not FormData
      const res = await registerEntrepreneur(form);
      setMessage(res.data.message || "Profile submitted!");
      navigate("/kyc");
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Submission failed."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Entrepreneur Registration</h2>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Name</label>
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
        <label className="block mb-1 font-medium text-gray-700">Business Category</label>
        <select
          name="businessCategory"
          value={form.businessCategory}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        >
          <option value="">Select Category</option>
          {BUSINESS_CATEGORIES.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
      >
        {loading ? "Submitting..." : "Submit Profile"}
      </button>
      {message && (
        <p className={`text-center mt-2 ${message.includes("fail") ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default EntrepreneurRegister;
