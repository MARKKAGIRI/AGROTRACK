const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { PrismaClient } = require('./generated/prisma/client')
const errorHandler = require('./middleware/errorHandler')


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Simple health check
app.get("/", (req, res) => {
  res.json({ message: "AgroTrack+ backend is running" });
});

// Quick DB check
app.get("/db-check", async (req, res) => {
  try {
    // Try to count users
    const count = await prisma.user.count();
    res.json({ message: "Database connected", users: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});


// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
