import entrepreneurModel from '../models/entrepreneurModel.js';
import userModel from '../models/userModel.js';
import BusinessIdeaModel from '../models/businessIdeaModel.js';

export const registerEntrepreneur = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User authentication failed. Please log in again." });
    }

    const { businessCategory } = req.body;

    // Check if entrepreneur profile already exists for this user
    const existingProfile = await entrepreneurModel.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Entrepreneur profile already exists." });
    }

    // Create entrepreneur profile
    const entrepreneur = new entrepreneurModel({
      user: userId,
      businessCategory,
      isApproved: false,
    });
    await entrepreneur.save();

    // Add "Entrepreneur" role to user if not already present
    await userModel.updateOne(
      { _id: userId, roles: { $ne: "Entrepreneur" } },
      { $push: { roles: "Entrepreneur" } }
    );

    res.status(201).json({ message: "Entrepreneur profile created. Await admin approval." });
  } catch (error) {
    console.error("Error in entrepreneur registration:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// ✅ controller
export const getMyBusinessIdeas = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    // ⬇️ Log the incoming user ID
    console.log("👉 [getMyBusinessIdeas] userId:", userId);

    const ideas = await BusinessIdeaModel.find({ entrepreneur: userId });

    console.log(`✅ Found ${ideas.length} business idea(s) for user ${userId}`);

    res.status(200).json(ideas);
  } catch (error) {
    console.error("[❌ ERROR] getMyBusinessIdeas:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBusinessIdea = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id || req.user._id;

  try {
    const idea = await BusinessIdeaModel.findOneAndUpdate(
      { _id: id, entrepreneur: userId },
      req.body,
      { new: true }
    );

    if (!idea) {
      return res.status(404).json({ message: "Idea not found or unauthorized" });
    }

    res.status(200).json({ message: "Idea updated", idea });
  } catch (error) {
    console.error("Error updating idea:", error);
    res.status(500).json({ message: "Failed to update idea" });
  }
};

export const deleteBusinessIdea = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id || req.user._id;

  try {
    const deleted = await BusinessIdeaModel.findOneAndDelete({
      _id: id,
      entrepreneur: userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Idea not found or unauthorized" });
    }

    res.status(200).json({ message: "Business idea deleted successfully" });
  } catch (error) {
    console.error("Error deleting idea:", error);
    res.status(500).json({ message: "Failed to delete idea" });
  }
};
