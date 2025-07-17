import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBusinessIdeas } from "../context/BusinessIdeaContext.jsx";

// Helper for industry icons
function getIndustryIcon(type) {
  switch(type) {
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

const BusinessIdeas = () => {
  const { ideas, loading } = useBusinessIdeas();
  const navigate = useNavigate();

  // Pagination state
  const [page, setPage] = useState(1);
  const ideasPerPage = 9;

  if (loading) return <div className="text-center py-20 text-xl">Loading business ideas...</div>;

  const totalPages = Math.ceil(ideas.length / ideasPerPage);
  const startIdx = (page - 1) * ideasPerPage;
  const ideasToShow = ideas.slice(startIdx, startIdx + ideasPerPage);

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Explore Inspiring Business Ideas
        </h1>
        <p className="text-lg text-gray-600">
          Handpicked ventures with real-world impact and growth potential.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {ideasToShow.map(idea => (
          <div
            key={idea._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 cursor-pointer border-t-4 border-blue-400 hover:border-blue-600 transform hover:-translate-y-1"
            onClick={() => navigate(`/business-ideas/${idea._id}`)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{getIndustryIcon(idea.industryType)}</span>
            </div>
            <h2 className="text-2xl font-bold mb-1 text-gray-800">{idea.projectName}</h2>
            <p className="text-gray-500 mb-2">{idea.tagline}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">{idea.industryType}</span>
              <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-1 rounded">INR {idea.totalFundsRaised}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">{idea.projectedOutcome}</p>
            <button className="mt-2 text-blue-600 hover:underline text-sm font-medium">See Details &rarr;</button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <button
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">{page} / {totalPages}</span>
          <button
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessIdeas;
