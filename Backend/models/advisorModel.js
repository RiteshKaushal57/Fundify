import mongoose from "mongoose";

const advisorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    bio: { type: String, required: true },
    expertise: [{ type: String }], // e.g., ["Finance", "Marketing"]
    sectorFocus: [{ type: String }], // e.g., ["FinTech", "EdTech"]
    experience: { type: String }, // e.g., "10 years in startup mentoring"
  },
  { timestamps: true }
);

const advisorModel =
  mongoose.models.advisors || mongoose.model("advisors", advisorSchema);
export default advisorModel;
