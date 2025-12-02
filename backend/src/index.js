const app = require('./app');

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});