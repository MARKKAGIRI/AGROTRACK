const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized", message: err.message });
        }

        req.user = decoded;
        next();
      });
    } else {
      return res.status(401).json({ error: "Unauthorized or missing token" });
    }
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const adminAuthorisation = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Admin role is required to carry out this operation" });
  }

  next(); 
};

module.exports = {tokenValidator, adminAuthorisation};
