import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },

    phone: { type: String },
    
    roles: {
      type: [String],
      enum: ["Investor", "Entrepreneur", "Banker", "Advisor", "Admin", "User"],
      required: true,
      default: ["User"],
    },
    aadhaarNumber: {
      type: String,
      unique: true,
    },
    panNumber: {
      type: String,
      unique: true,
    },
    aadhaarDocument: {
      type: String, // File path or URL
    },
    panDocument: {
      type: String, // File path or URL
    },
    isVerified: { type: Boolean, default: false },
    profileCompleted: { type: Boolean, default: false },
    kycStatus: { type: Boolean, default: false },
    city: { type: String },
    country: { type: String },
    state: { type: String },
    pincode: { type: String },
    provider: {
      type: String,
      enum: ["Google", "Facebook", "Email"],
      default: "Email",
    },
    profilePhoto: {
      type: String,
      default: "https://example.com/default-profile-photo.png",
    },
    // ADDED: Separate profiles for each role
    investorProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "investors",
    },
    entrepreneurProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "entrepreneurs",
    },
    bankerProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankers",
    },
    advisorProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "advisors",
    },
  },
  { timestamps: true }
);

userSchema.index(
  { phone: 1 },
  { unique: true, partialFilterExpression: { phone: { $ne: null } } }
);

const userModel = mongoose.models.users || mongoose.model("users", userSchema);
export default userModel;
