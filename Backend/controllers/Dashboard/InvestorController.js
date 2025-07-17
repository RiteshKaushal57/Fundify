import Investment from "../../models/investment.js";
import BusinessIdeaModel  from "../../models/businessIdeaModel.js";

export const getInvestorInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ investor: req.user._id })
      .populate('business'); // populate business details
    res.status(200).json(investments);
  } catch (error) {
    console.error("Error fetching investor investments:", error);
    res.status(500).json({ message: "Failed to fetch investments" });
  }
};

// ✅ Feature 6: Get investor dashboard stats
export const getInvestorStats = async (req, res) => {
  try {
    const investments = await Investment.find({ investor: req.user._id }).populate("business");

    const totalAmountInvested = investments.reduce((acc, inv) => acc + inv.amount, 0);
    const numberOfBusinesses = investments.length;

    // Count top sectors
    const sectorMap = {};
    investments.forEach(inv => {
      const sector = inv.business?.industryType ?? "Unknown";
      sectorMap[sector] = (sectorMap[sector] || 0) + 1;
    });

    const topSectors = Object.entries(sectorMap)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])
      .slice(0, 3);

    res.status(200).json({
      totalAmountInvested,
      numberOfBusinesses,
      topSectors,
    });
  } catch (error) {
    console.error("Error fetching investor stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};