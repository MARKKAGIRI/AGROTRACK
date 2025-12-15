exports.handleChat = async (req, res) => {
  const { message, userId } = req.body;

  if (!message || !userId) {
    return res.status(400).json({
      error: "message and userId are required"
    });
  }

  // For now: no AI, no DB, no ML
  return res.json({
    reply: `I received your question: "${message}". I'm preparing to analyze your farm data.`
  });
};
