/*app.js*/
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const PORT = parseInt(process.env.PORT || '4000');
const app = express();


// Function to get a random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Endpoint to roll dice with customizable number of sides and dice
app.get('/rolldice', (req, res) => {
  const sides = parseInt(req.query.sides) || 6;
  const dice = parseInt(req.query.dice) || 1;
  const results = [];

  for (let i = 0; i < dice; i++) {
    results.push(getRandomNumber(1, sides));
  }

  res.json({ results });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
