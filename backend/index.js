const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { PrismaClient } = require('./generated/prisma')
const errorHandler = require('./middleware/errorHandler')


const app = express();
const prisma = new PrismaClient();

app.use(cors()); 
app.use(express.json());


app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/farms', require('./routes/farmRoutes'));
app.use('/api/cropCycle', require('./routes/cropCycleRoutes'));

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
