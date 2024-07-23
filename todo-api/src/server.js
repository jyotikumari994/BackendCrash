const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Custom validation middleware
const validateRequestBody = (req, res, next) => {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;

  // Validate each field
  if (typeof ID !== 'number') {
    return res.status(400).send('bad request. some data is incorrect.');
  }
  if (typeof Name !== 'string') {
    return res.status(400).send('bad request. some data is incorrect.');
  }
  if (typeof Rating !== 'number') {
    return res.status(400).send('bad request. some data is incorrect.');
  }
  if (typeof Description !== 'string') {
    return res.status(400).send('bad request. some data is incorrect.');
  }
  if (typeof Genre !== 'string') {
    return res.status(400).send('bad request. some data is incorrect.');
  }
  if (!Array.isArray(Cast) || !Cast.every(c => typeof c === 'string')) {
    return res.status(400).send('bad request. some data is incorrect.');
  }

  // If all checks pass, proceed to the next middleware/route handler
  next();
};

// POST route
app.post('/', validateRequestBody, (req, res) => {
  res.status(200).send('data received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
