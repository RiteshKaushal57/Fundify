import mongoose from "mongoose";

const advisoryQuerySchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String }, // will be added by advisor
  askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // optional
  businessIdea: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessIdea', required: true },
}, { timestamps: true });

const AdvisoryQueryModel = mongoose.models.AdvisoryQuery || mongoose.model('AdvisoryQuery', advisoryQuerySchema);

export default AdvisoryQueryModel;
