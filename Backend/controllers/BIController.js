import businessIdeaModel from '../models/businessIdeaModel.js';

export const allBusinessIdeas = async (req, res) => {
  try {
    const businessIdeas = await businessIdeaModel.find();
    res.status(200).json(businessIdeas);
  } catch (error) {
    console.error('Error fetching business ideas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getBusinessIdeaById = async (req, res) => {
  const { id } = req.params;
  try {
    const businessIdea = await businessIdeaModel.findById(id);
    if (!businessIdea) {
      return res.status(404).json({ message: 'Business idea not found' });
    }
    res.status(200).json(businessIdea);
  } catch (error) {
    console.error('Error fetching business idea:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createBusinessIdea = async (req, res) => {
  try {
    // ⬇️ LOG the authenticated user info to ensure it includes user id
    console.log("👉 [createBusinessIdea] req.user =", req.user);

    const newBusinessIdea = new businessIdeaModel({
      ...req.body,
      entrepreneur: req.user._id || req.user.id, // Confirm this matches the user model's _id
    });

    await newBusinessIdea.save();

    res.status(201).json(newBusinessIdea);
  } catch (error) {
    console.error("[❌ ERROR] createBusinessIdea:", error.message);
    res.status(400).json({ message: error.message });
  }
};
