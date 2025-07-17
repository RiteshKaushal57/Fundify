import mongoose from "mongoose";
const entrepreneurSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  businessCategory: { type: String },
}, { timestamps: true });

const entrepreneurModel = mongoose.models.entrepreneurs || mongoose.model("entrepreneurs", entrepreneurSchema);
export default entrepreneurModel;
