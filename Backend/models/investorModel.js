import mongoose from "mongoose";
const investorSchema  = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  investmentFocus: [{ type: String, enum: ["Tech", "Healthcare", "Real Estate", "Agriculture", "Education"] }],
  investmentRange: {
    min: { type: Number, min: 0 },
    max: { type: Number, min: 0 },
  },
  pastInvestments: [{ company: String, amount: Number, year: Number }],
  riskAppetite: { type: String, enum: ["Low", "Medium", "High"] },
}, { timestamps: true });

const investorModel = mongoose.models.investors || mongoose.model("investors", investorSchema );
export default investorModel;
