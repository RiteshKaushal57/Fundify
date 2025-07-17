import Investment from '../models/investment.js'

export const investInBusiness = async (req, res) => {
  try {
    const { businessIdeaId, amount } = req.body;
    const userId = req.user._id;

    if (!amount || !businessIdeaId) {
      return res.status(400).json({ success: false, message: "Amount and Business ID are required." });
    }

    const newInvestment = await Investment.create({
      investor: userId,
      business: businessIdeaId, // make sure you use correct field name as per model
      amount
    });

    res.status(201).json({ success: true, investment: newInvestment });
  } catch (error) {
    console.error("Investment error:", error);
    res.status(500).json({ success: false, message: "Could not process investment." });
  }
};
