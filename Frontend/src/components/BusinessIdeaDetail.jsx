import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useBusinessIdeas } from "../context/BusinessIdeaContext.jsx";
import { useUserContext } from "../context/UserContext.jsx";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_Backend_URL ?? "http://localhost:4000";

// Helper for industry icons
function getIndustryIcon(type) {
  switch (type) {
    case "FinTech": return "💸";
    case "EdTech": return "📚";
    case "HealthTech": return "🩺";
    case "AgriTech": return "🌱";
    case "GreenTech": return "♻️";
    case "PropTech/Real Estate": return "🏢";
    case "PetTech/Marketplace": return "🐾";
    case "EV/InfraTech": return "⚡";
    default: return "🚀";
  }
}

const BusinessIdeaDetail = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { getBusinessIdeaById } = useBusinessIdeas();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  const [queries, setQueries] = useState([]);
  const [newQuery, setNewQuery] = useState("");
  const [replyMap, setReplyMap] = useState({});
  const [replyLoading, setReplyLoading] = useState({});
  const [queryLoading, setQueryLoading] = useState(false);

  const isAdvisor = user?.roles?.includes("Advisor");
  const isInvestor = user?.roles?.includes("Investor");

  // Investment Flow
  const [showInvestForm, setShowInvestForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [investLoading, setInvestLoading] = useState(false);

  useEffect(() => {
    const fetchIdea = async () => {
      setLoading(true);
      const res = await getBusinessIdeaById(id);
      if (res.success) setIdea(res.idea);
      setLoading(false);
      fetchQueries();
    };
    fetchIdea();
  }, [id, getBusinessIdeaById]);

  const fetchQueries = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/queries/${id}`, {
        withCredentials: true,
      });
      setQueries(res.data.queries || []);
    } catch (err) {
      console.error("Error fetching queries:", err);
    }
  };

  const handlePostQuery = async () => {
    if (!newQuery.trim()) return;
    setQueryLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/queries/${id}`, { question: newQuery }, { withCredentials: true });
      setNewQuery("");
      fetchQueries();
    } catch (err) {
      console.error("Failed to post query:", err);
      alert("Error posting your question");
    } finally {
      setQueryLoading(false);
    }
  };

  const handleReplySubmit = async (queryId) => {
    const answer = replyMap[queryId];
    if (!answer || !answer.trim()) return;

    setReplyLoading(prev => ({ ...prev, [queryId]: true }));
    try {
      await axios.post(`${BACKEND_URL}/advisor/queries/${queryId}/answer`, 
        { answer }, 
        { withCredentials: true }
      );

      setReplyMap((prev) => ({ ...prev, [queryId]: "" }));
      await fetchQueries();
    } catch (err) {
      console.error("Error submitting reply:", err);
      alert("Error submitting reply");
    } finally {
      setReplyLoading(prev => ({ ...prev, [queryId]: false }));
    }
  };

  const handleInvest = async () => {
    if (!amount || isNaN(amount)) return alert("Please enter a valid amount.");
    setInvestLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/invest`, {
        businessIdeaId: idea._id,
        amount: parseInt(amount),
      }, { withCredentials: true });

      alert("Investment successful! 🎉");
      setAmount("");
      setShowInvestForm(false);
    } catch (err) {
      console.error("Investment failed:", err);
      alert(err.response?.data?.message || "Investment failed.");
    } finally {
      setInvestLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-xl">Loading idea details...</div>;
  if (!idea) return <div className="text-center py-20 text-xl">Business idea not found.</div>;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="bg-white p-8 max-w-5xl mx-auto">
        <Link to="/invest" className="text-blue-500 hover:underline mb-6 inline-block text-sm font-medium">
          &larr; Back to All Ideas
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl">{getIndustryIcon(idea.industryType)}</span>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{idea.projectName}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                {idea.industryType}
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                INR {idea.totalFundsRaised}
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-xl text-gray-600 mb-4">{idea.tagline}</h2>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 rounded-lg px-4 py-3">
            <span className="block text-green-700 font-semibold mb-1">Projected Outcome</span>
            <span className="text-gray-800">{idea.projectedOutcome}</span>
          </div>
          <div className="bg-gray-50 rounded-lg px-4 py-3">
            <span className="block text-gray-500 font-semibold mb-1">Funding Ask</span>
            <span className="text-gray-800">{idea.fundingAsk}</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <Detail label="Problem" value={idea.problem} />
          <Detail label="Solution" value={idea.solution} />
          <Detail label="Market" value={idea.market} />
          <Detail label="Product" value={idea.product} />
          <Detail label="Business Model" value={idea.businessModel} />
          <Detail label="Go To Market" value={idea.goToMarket} />
          <Detail label="Competition" value={idea.competition} />
          <Detail label="Traction" value={idea.traction} />
          <Detail label="Team" value={idea.team} />
          <Detail label="Financials" value={idea.financials} />
          <Detail label="Vision" value={idea.vision} />
          <Detail label="Contact" value={idea.contact} />
        </div>

        {/* Invest Section */}
        <div className="mt-8">
          {isInvestor ? (
            <>
              {!showInvestForm ? (
                <button
                  onClick={() => setShowInvestForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md"
                >
                  🚀 Invest in this Business
                </button>
              ) : (
                <div className="bg-white border mt-4 p-4 rounded shadow max-w-sm">
                  <h3 className="font-semibold mb-2">💰 Enter Investment Amount</h3>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border p-2 rounded mb-3"
                    placeholder="Enter amount in ₹"
                  />
                  <div className="flex gap-4">
                    <button
                      disabled={investLoading}
                      onClick={handleInvest}
                      className="bg-green-600 text-white px-4 py-1 rounded"
                    >
                      {investLoading ? "Processing..." : "Invest"}
                    </button>
                    <button
                      onClick={() => setShowInvestForm(false)}
                      className="bg-gray-300 text-black px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="relative group inline-block">
              <button
                className="bg-gray-300 text-gray-600 px-6 py-2 rounded-md shadow cursor-not-allowed"
                disabled
              >
                🚫 Invest in this Business
              </button>
              <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none z-10">
                You are not registered as an Investor
              </span>
            </div>
          )}
        </div>

        {/* Q&A Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Have Questions? Ask an Advisor</h3>

          <div className="mb-4">
            <textarea
              className="w-full border rounded p-3 resize-none"
              rows="3"
              placeholder="Type your question here..."
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
            />
            <button
              onClick={handlePostQuery}
              disabled={queryLoading}
              className="bg-indigo-600 text-white px-5 py-2 mt-2 rounded-md"
            >
              {queryLoading ? "Posting..." : "Submit Query"}
            </button>
          </div>

          {/* Display all queries */}
          <div className="space-y-5">
            {queries.length === 0 ? (
              <p className="text-gray-500 text-sm">No questions asked yet.</p>
            ) : (
              queries.map((q) => (
                <div key={q._id} className="border border-gray-200 p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <p className="mb-1"><b className="text-gray-800">{q.askedBy?.name || "User"}:</b> {q.question}</p>
                      {q.answer && (
                        <p className="mt-1 text-green-700 text-sm">
                          <b>Answer ({q.answeredBy?.name || "Advisor"}):</b> {q.answer}
                        </p>
                      )}
                    </div>
                    {isAdvisor && !q.answer && (
                      <button
                        className="text-sm text-indigo-600 hover:underline"
                        onClick={() => setReplyMap(prev => ({ ...prev, [q._id]: "" }))}
                      >
                        Reply
                      </button>
                    )}
                  </div>

                  {isAdvisor && !q.answer && replyMap.hasOwnProperty(q._id) && (
                    <div className="mt-3">
                      <textarea
                        value={replyMap[q._id]}
                        onChange={(e) => setReplyMap(prev => ({ ...prev, [q._id]: e.target.value }))}
                        rows="2"
                        className="w-full border rounded p-2 mb-2"
                        placeholder="Type your reply..."
                      />
                      <button
                        onClick={() => handleReplySubmit(q._id)}
                        disabled={replyLoading[q._id]}
                        className="px-4 py-1 text-sm bg-indigo-600 text-white rounded"
                      >
                        {replyLoading[q._id] ? "Posting..." : "Submit Reply"}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <span className="block font-semibold mb-1">{label}</span>
    <span className="text-base text-gray-800 whitespace-pre-wrap">{value}</span>
  </div>
);

export default BusinessIdeaDetail;
