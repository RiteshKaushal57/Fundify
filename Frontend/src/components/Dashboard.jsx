import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useInvestorContext } from "../context/InvestorContext";
import { useEntrepreneurContext } from "../context/entreContext";
import { useAdvisorContext } from "../context/AdvisorContext";
import axios from "axios";


// SVG ICONS
const dashboardicon = (
  <svg className="w-6 h-6" aria-hidden="true">
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
    />
  </svg>
);
const overviewicon = (
  <svg className="w-6 h-6" aria-hidden="true">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z"
    />
  </svg>
);
const chaticon = (
  <svg className="w-6 h-6" aria-hidden="true">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
    />
  </svg>
);
const advisoricon = (
  <svg className="w-6 h-6" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path stroke="currentColor" strokeWidth="2" d="M12 8v4l3 2" />
  </svg>
);

// Role tab definitions
const roleTabs = [
  { name: "Investor", icon: dashboardicon, registerPath: "/investor/register" },
  { name: "Entrepreneur", icon: overviewicon, registerPath: "/entrepreneur/register" },
  { name: "Banker", icon: chaticon, registerPath: "/banker/register" },
  { name: "Advisor", icon: advisoricon, registerPath: "/advisor/register" },
];

// Investor Panel
const InvestorPanel = () => {
  const { investments, stats, isInvestor } = useInvestorContext();
  if (!isInvestor) return <p>Not registered as Investor</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Investor Dashboard</h2>
      {stats ? (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <p><b>Total Invested:</b> ₹{stats.totalAmountInvested}</p>
          <p><b>Businesses:</b> {stats.numberOfBusinesses}</p>
          <p><b>Top Sectors:</b> {stats.topSectors.join(", ")}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-6">Stats not available</p>
      )}
      <h3 className="text-lg font-semibold mb-2">Your Investments</h3>
      {investments.length > 0 ? (
        <ul className="space-y-2">
          {investments.map((inv) => (
            <li key={inv._id} className="border p-3 rounded">
              <div className="font-bold">{inv.business?.projectName || "Unnamed Project"}</div>
              <div>Amount Invested: ₹{inv.amount}</div>
              {/* <div>Status: {inv.status}</div> */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">You have not invested in any businesses yet.</p>
      )}
    </div>
  );
};

// Entrepreneur Panel
const EntrepreneurPanel = () => {
  const navigate = useNavigate();
  const { myIdeas, loading, deleteIdea } = useEntrepreneurContext();

  const handleAddIdea = () => {
    navigate("/postIdea");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Entrepreneur Dashboard</h2>
        {myIdeas.length > 0 && (
          <button
            onClick={handleAddIdea}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            + Add Business Idea
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : myIdeas.length > 0 ? (
        <ul>
          {myIdeas.map((biz) => (
            <li key={biz._id} className="mb-2 p-3 border rounded flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{biz.projectName}</h3>
                <p className="text-sm text-gray-500">{biz.tagline}</p>
              </div>
              <div>
                <button className="text-blue-500 mx-2" onClick={() => alert("Edit Coming Soon")}>Edit</button>
                <button className="text-red-500 mx-2" onClick={() => deleteIdea(biz._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <p>You have not posted any businesses yet.</p>
          <button
            onClick={handleAddIdea}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md"
          >
            + Add Your First Business Idea
          </button>
        </div>
      )}
    </div>
  );
};

// // Banker Panel
// const BankerPanel = () => (
//   <div>
//     <h2 className="text-xl font-bold mb-4">Banker Dashboard</h2>
//     <p>Post and manage loan offers here.</p>
//   </div>
// );

// ✅ Advisor Panel showing answered queries
const AdvisorPanel = () => {
  const {
    advisorQueries,
    fetchAdvisorQueries,
    isAdvisor,
    loading
  } = useAdvisorContext();

  const [editingMap, setEditingMap] = useState({});
  const [editTextMap, setEditTextMap] = useState({});

  const BACKEND_URL = import.meta.env.VITE_Backend_URL ?? "http://localhost:4000";

  const handleEdit = (id, currentAnswer) => {
    setEditingMap(prev => ({ ...prev, [id]: true }));
    setEditTextMap(prev => ({ ...prev, [id]: currentAnswer }));
  };

  const handleCancel = (id) => {
    setEditingMap(prev => ({ ...prev, [id]: false }));
    setEditTextMap(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`${BACKEND_URL}/advisor/queries/${id}`, {
        answer: editTextMap[id],
      }, { withCredentials: true });
      setEditingMap(prev => ({ ...prev, [id]: false }));
      await fetchAdvisorQueries();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this answer?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/advisor/queries/${id}`, {
        withCredentials: true,
      });
      await fetchAdvisorQueries();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Deletion failed");
    }
  };

  if (!isAdvisor) return <p>You are not registered as an advisor.</p>;

  const answered = advisorQueries.filter((q) => q.answer);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Advisor Dashboard</h2>

      {loading ? (
        <p>Loading queries...</p>
      ) : answered.length === 0 ? (
        <p className="text-gray-500">You have not answered any queries yet.</p>
      ) : (
        <div className="space-y-4">
          {answered.map((query) => {
            const isEditing = editingMap[query._id];
            return (
              <div key={query._id} className="border rounded p-4 shadow-sm">
                <h3 className="font-semibold text-indigo-600 mb-2">
                  <Link to={`/business-ideas/${query.businessIdea?._id}`}>
                    {query.businessIdea?.projectName || "View Idea"}
                  </Link>
                </h3>

                <p><strong>Q:</strong> {query.question}</p>

                {!isEditing ? (
                  <>
                    <p className="text-green-700 mt-1"><strong>A:</strong> {query.answer}</p>
                    <div className="flex gap-3 mt-2">
                      <button
                        className="text-sm text-indigo-600 hover:underline"
                        onClick={() => handleEdit(query._id, query.answer)}
                      >Edit</button>
                      <button
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => handleDelete(query._id)}
                      >Delete</button>
                    </div>
                  </>
                ) : (
                  <div className="mt-2">
                    <textarea
                      className="w-full border p-2 rounded mb-2"
                      rows="2"
                      value={editTextMap[query._id]}
                      onChange={(e) =>
                        setEditTextMap(prev => ({
                          ...prev,
                          [query._id]: e.target.value,
                        }))
                      }
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(query._id)}
                        className="px-4 py-1 bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleCancel(query._id)}
                        className="px-4 py-1 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-1">
                  Asked by: {query.askedBy?.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


const Dashboard = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const userRoles = user?.roles || [];
  const defaultTabIdx = roleTabs.findIndex(tab => userRoles.includes(tab.name)) || 0;
  const [activeTab, setActiveTab] = useState(roleTabs[defaultTabIdx]?.name || roleTabs[0].name);

  const renderTabPanel = (role) => {
    if (!userRoles.includes(role)) {
      const tab = roleTabs.find(t => t.name === role);
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="mb-4">You have not registered as a <b>{role}</b>.</p>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded"
            onClick={() => navigate(tab.registerPath)}
          >
            Register as {role}
          </button>
        </div>
      );
    }

    switch (role) {
      case "Investor": return <InvestorPanel />;
      case "Entrepreneur": return <EntrepreneurPanel />;
      case "Banker": return <BankerPanel />;
      case "Advisor": return <AdvisorPanel />;
      default: return <div>Unknown role</div>;
    }
  };

  return (
    <div className="flex min-h-screen py-16 px-6 md:px-20">
      <div className="md:w-64 w-20 border-r border-gray-300 pt-4 flex flex-col bg-white">
        <div className="mb-8 flex flex-col items-center">
          <p className="font-semibold">{user?.name || "User"}</p>
          <p className="text-xs text-gray-400 text-center px-2">{userRoles.join(", ")}</p>
        </div>
        {roleTabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center w-full py-3 px-4 gap-3 text-left ${
              activeTab === tab.name
                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                : "hover:bg-gray-100/90 border-white text-gray-700"
            }`}
          >
            {tab.icon}
            <span className="md:block hidden">{tab.name}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 p-6">{renderTabPanel(activeTab)}</div>
    </div>
  );
};

export default Dashboard;
