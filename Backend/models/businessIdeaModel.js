import mongoose from "mongoose";

const businessIdeaSchema = new mongoose.Schema(
  {
    entrepreneur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    projectName: { type: String, required: true },
    tagline: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    market: { type: String, required: true },
    product: { type: String, required: true },
    businessModel: { type: String, required: true },
    goToMarket: { type: String, required: true },
    competition: { type: String, required: true },
    traction: { type: String, required: true },
    team: { type: String, required: true },
    financials: { type: String, required: true },
    fundingAsk: { type: String, required: true },
    vision: { type: String, required: true },
    contact: { type: String, required: true },
    // New fields:
    industryType: { type: String, required: true }, // e.g., FinTech, HealthTech, etc.
    projectedOutcome: { type: String, required: true }, // e.g., "20% IRR in 3 years", "Market leader by 2027"
    totalFundsRaised: { type: Number, required: true }, // e.g., 5000000 (in INR or USD)
  },
  {
    timestamps: true,
  }
);

const BusinessIdeaModel =
  mongoose.models.BusinessIdea ||
  mongoose.model("BusinessIdea", businessIdeaSchema);

export default BusinessIdeaModel;
