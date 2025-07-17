import React, { useEffect, useState } from "react";
import {useAdvisorContext} from "../../context/AdvisorContext.jsx"
import { useUserContext } from "../../context/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_Backend_URL ?? "http://localhost:4000";

const EXPERTISE_OPTIONS = [
  "Finance", "Marketing", "Strategy", "Legal", "Technology", "Operations"
];
const SECTOR_OPTIONS = [
  "Tech", "Healthcare", "Real Estate", "Agriculture", "Education", "Retail"
];

const AdvisorRegister = ({ initialData = {} }) => {
  const { user } = useUserContext();
  const { createAdvisorProfile, fetchAdvisorProfile, advisorProfile } = useAdvisorContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: initialData.name || user?.name || "",
    email: user?.email || initialData.email || "",
    phone: user?.phone || initialData.phone || "",
    bio: "",
    expertise: "",
    sectorFocus: "",
    experience: "",
    linkedin: "",
    website: "",
    country: user?.country || "India",
    state: user?.state || "",
    city: user?.city || "",
    pincode: user?.pincode || "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Autofill from investor or entrepreneur profile if available
  useEffect(() => {
    const autofillFromOtherRoles = async () => {
      if (user?.roles?.includes("Investor")) {
        try {
          const res = await axios.get(`${BACKEND_URL}/investor/profile`, { withCredentials: true });
          const investor = res.data;
          setForm(prev => ({
            ...prev,
            name: investor.name || prev.name,
            email: investor.email || prev.email,
            phone: investor.phone || prev.phone,
            country: investor.country || prev.country,
            state: investor.state || prev.state,
            city: investor.city || prev.city,
            pincode: investor.pincode || prev.pincode,
          }));
        } catch {}
      }
      if (user?.roles?.includes("Entrepreneur")) {
        try {
          const res = await axios.get(`${BACKEND_URL}/entrepreneur/profile`, { withCredentials: true });
          const entrepreneur = res.data;
          setForm(prev => ({
            ...prev,
            name: entrepreneur.name || prev.name,
            email: entrepreneur.email || prev.email,
            phone: entrepreneur.phone || prev.phone,
            country: entrepreneur.country || prev.country,
            state: entrepreneur.state || prev.state,
            city: entrepreneur.city || prev.city,
            pincode: entrepreneur.pincode || prev.pincode,
          }));
        } catch {}
      }
    };
    autofillFromOtherRoles();
    // eslint-disable-next-line
  }, [user]);

  // Autofill if advisorProfile exists (edit mode)
  useEffect(() => {
    if (advisorProfile) {
      setForm(prev => ({
        ...prev,
        ...advisorProfile,
        expertise: Array.isArray(advisorProfile.expertise)
          ? advisorProfile.expertise.join(", ")
          : advisorProfile.expertise || "",
        sectorFocus: Array.isArray(advisorProfile.sectorFocus)
          ? advisorProfile.sectorFocus.join(", ")
          : advisorProfile.sectorFocus || "",
      }));
    }
  }, [advisorProfile]);

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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // Validate required fields
      if (
        !form.name ||
        !form.email ||
        !form.phone ||
        !form.bio ||
        !form.expertise ||
        !form.sectorFocus ||
        !form.experience
      ) {
        setMessage("All fields marked with * are required.");
        setLoading(false);
        return;
      }
      // Convert expertise and sectorFocus to arrays if needed
      const payload = {
        ...form,
        expertise: form.expertise.split(",").map(s => s.trim()),
        sectorFocus: form.sectorFocus.split(",").map(s => s.trim()),
      };
      const res = await createAdvisorProfile(payload);
      setMessage(res.message || "Profile submitted!");
      await fetchAdvisorProfile();
      navigate("/kyc");
    } catch (err) {
      setMessage(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Submission failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Advisor Registration</h2>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Name *</label>
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
        <label className="block mb-1 font-medium text-gray-700">Email *</label>
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
        <label className="block mb-1 font-medium text-gray-700">Phone *</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Bio *</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Expertise * <span className="text-xs text-gray-500">(comma separated)</span></label>
        <input
          type="text"
          name="expertise"
          value={form.expertise}
          onChange={handleChange}
          placeholder="e.g. Finance, Marketing"
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Sector Focus * <span className="text-xs text-gray-500">(comma separated)</span></label>
        <input
          type="text"
          name="sectorFocus"
          value={form.sectorFocus}
          onChange={handleChange}
          placeholder="e.g. Tech, Healthcare"
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Experience *</label>
        <input
          type="text"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">LinkedIn</label>
        <input
          type="url"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">Website</label>
        <input
          type="url"
          name="website"
          value={form.website}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      {/* Optional: Country/State/City/Pincode */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">State</label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
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
        />
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

export default AdvisorRegister;
