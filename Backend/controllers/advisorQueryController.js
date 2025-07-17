import AdvisoryQuery from "../models/advisorQueryModel.js"

// POST /queries/:businessId
export const postQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const { businessId } = req.params;

    const query = new AdvisoryQuery({
      question,
      askedBy: req.user._id,
      businessIdea: businessId,
    });

    await query.save();
    res.status(201).json({ message: "Query posted successfully", query });
  } catch (err) {
    console.error("Error posting query:", err);
    res.status(500).json({ message: "Failed to post query" });
  }
};

// GET /queries/:businessId
export const getQueriesForBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    const queries = await AdvisoryQuery.find({ businessIdea: businessId })
      .populate("askedBy", "name")
      .populate("answeredBy", "name"); // ✅ very important!

    res.status(200).json({ queries });
  } catch (err) {
    console.error("Error fetching queries:", err);
    res.status(500).json({ message: "Failed to get queries" });
  }
};


// GET /advisor/queries (assign later to advisor dashboard)
export const getUnansweredQueries = async (req, res) => {
  try {
    const queries = await AdvisoryQuery.find({ answer: { $exists: false } });
    res.status(200).json({ queries });
  } catch (err) {
    console.error("Error fetching advisor queries:", err);
    res.status(500).json({ message: "Failed to fetch advisor questions" });
  }
};

// POST /advisor/queries/:id/answer
export const postAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    const query = await AdvisoryQuery.findByIdAndUpdate(
      id,
      {
        answer,
        answeredBy: req.user._id,
      },
      { new: true }
    );

    res.status(200).json({ message: "Answer submitted", query });
  } catch (err) {
    console.error("Error answering query:", err);
    res.status(500).json({ message: "Failed to submit answer" });
  }
};
