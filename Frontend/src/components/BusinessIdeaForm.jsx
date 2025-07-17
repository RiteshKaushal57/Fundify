import React, { useState } from "react";
import { useBusinessIdeas } from "../context/BusinessIdeaContext";
// import { useAuth } from "../context/AuthContext"; // Uncomment if you use JWT in header

const industryOptions = [
  "FinTech", "HealthTech", "EdTech", "AgriTech", "E-Commerce",
  "SaaS", "Manufacturing", "Retail", "GreenTech", "Logistics", "Other"
];

const initialForm = {
  projectName: "",
  tagline: "",
  problem: "",
  solution: "",
  market: "",
  product: "",
  businessModel: "",
  goToMarket: "",
  competition: "",
  traction: "",
  team: "",
  financials: "",
  fundingAsk: "",
  vision: "",
  contact: "",
  industryType: "",
  projectedOutcome: "",
  totalFundsRaised: "",
};

export default function BusinessIdeaForm() {
  const [form, setForm] = useState(initialForm);
  const { postBusinessIdea, posting } = useBusinessIdeas();
  // const { token } = useAuth(); // If you use JWT in header
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    // const result = await postBusinessIdea(form, token); // If using JWT in header
    const result = await postBusinessIdea(form); // If using cookie auth
    if (result.success) {
      setMessage({ type: "success", text: "Business idea submitted!" });
      setForm(initialForm);
    } else {
      setMessage({ type: "error", text: result.message });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-5"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Submit Your Business Idea
      </h2>

      {message && (
        <div className={`p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message.text}
        </div>
      )}

      <div>
        <label className="block font-semibold mb-1">Project Name</label>
        <input
          name="projectName"
          value={form.projectName}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Tagline</label>
        <input
          name="tagline"
          value={form.tagline}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Problem</label>
        <textarea
          name="problem"
          value={form.problem}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Solution</label>
        <textarea
          name="solution"
          value={form.solution}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Market</label>
        <textarea
          name="market"
          value={form.market}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Product</label>
        <textarea
          name="product"
          value={form.product}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Business Model</label>
        <textarea
          name="businessModel"
          value={form.businessModel}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Go To Market</label>
        <textarea
          name="goToMarket"
          value={form.goToMarket}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Competition</label>
        <textarea
          name="competition"
          value={form.competition}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Traction</label>
        <textarea
          name="traction"
          value={form.traction}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Team</label>
        <textarea
          name="team"
          value={form.team}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Financials</label>
        <textarea
          name="financials"
          value={form.financials}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Funding Ask</label>
        <input
          name="fundingAsk"
          value={form.fundingAsk}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Vision</label>
        <textarea
          name="vision"
          value={form.vision}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Contact</label>
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Industry Type</label>
        <select
          name="industryType"
          value={form.industryType}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Select Industry</option>
          {industryOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Projected Outcome</label>
        <input
          name="projectedOutcome"
          value={form.projectedOutcome}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Total Funds Raised (in INR or USD)</label>
        <input
          name="totalFundsRaised"
          type="number"
          min="0"
          value={form.totalFundsRaised}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        className={`w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition ${posting ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={posting}
      >
        {posting ? "Submitting..." : "Submit Idea"}
      </button>
    </form>
  );
}
