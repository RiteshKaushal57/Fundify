import advisorModel from '../models/advisorModel.js';
import userModel from '../models/userModel.js';
import AdvisoryQuery from '../models/advisorQueryModel.js';

// POST or PUT /api/advisor/profile
export const upsertAdvisorProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Destructure advisor fields from request body
    const { bio, expertise, sectorFocus, experience, linkedin, website } = req.body;

    // Find if advisor profile already exists
    let advisorProfile = await advisorModel.findOne({ user: userId });

    if (advisorProfile) {
      // Update existing profile
      advisorProfile.bio = bio;
      advisorProfile.expertise = expertise;
      advisorProfile.sectorFocus = sectorFocus;
      advisorProfile.experience = experience;
      advisorProfile.linkedin = linkedin;
      advisorProfile.website = website;
      await advisorProfile.save();
    } else {
      // Create new advisor profile
      advisorProfile = await advisorModel.create({
        user: userId,
        bio,
        expertise,
        sectorFocus,
        experience,
        linkedin,
        website,
      });
      // Link profile to user
      await userModel.findByIdAndUpdate(userId, { advisorProfile: advisorProfile._id });
    }

    res.status(200).json({
      success: true,
      advisorProfile,
      message: "Advisor profile saved successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// GET /api/advisor/profile
export const getAdvisorProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const advisorProfile = await advisorModel.findOne({ user: userId });
    if (!advisorProfile) {
      return res.status(404).json({ success: false, message: "Advisor profile not found." });
    }
    res.status(200).json({ success: true, advisorProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


export const getAdvisorQueries = async (req, res) => {
  try {
    const AdvisoryQuery = (await import("../models/advisorQueryModel.js")).default;

    const queries = await AdvisoryQuery.find({answeredBy: req.user._id})
      .populate("businessIdea", "projectName")
      .populate("askedBy", "name")
      .populate("businessIdea", "projectName")

    res.status(200).json({ success: true, queries });
  } catch (err) {
    console.error("Error fetching advisor queries:", err);
    res.status(500).json({ success: false, message: "Failed to fetch queries" });
  }
};


export const answerAdvisorQuery = async (req, res) => {
  try {
    const AdvisoryQuery = (await import("../models/advisorQueryModel.js")).default;

    const { id } = req.params;
    const { answer } = req.body;

    if (!answer || !answer.trim()) {
      return res.status(400).json({ success: false, message: "Answer cannot be empty." });
    }

    const updated = await AdvisoryQuery.findByIdAndUpdate(
      id,
      {
        answer,
        answeredBy: req.user._id,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Query not found." });
    }

    res.status(200).json({
      success: true,
      message: "Query answered successfully",
      query: updated
    });
  } catch (err) {
    console.error("Error answering advisor query:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// PATCH /advisor/queries/:id → Edit Answer
export const updateAdvisorAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    const query = await AdvisoryQuery.findById(id);
    if (!query) return res.status(404).json({ success: false, message: "Query not found" });

    if (!query.answeredBy || query.answeredBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    query.answer = answer;
    await query.save();

    res.status(200).json({ success: true, message: "Answer updated", query });
  } catch (error) {
    console.error("Update answer error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// DELETE /advisor/queries/:id → Delete Answer
export const deleteAdvisorAnswer = async (req, res) => {
  try {
    const { id } = req.params;

    const query = await AdvisoryQuery.findById(id);
    if (!query) return res.status(404).json({ success: false, message: "Query not found" });

    if (!query.answeredBy || query.answeredBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    query.answer = undefined;
    query.answeredBy = undefined;
    await query.save();

    res.status(200).json({ success: true, message: "Answer deleted" });
  } catch (error) {
    console.error("Delete answer error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};