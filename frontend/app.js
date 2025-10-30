const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch'); // required for making requests to Flask backend

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('templates'));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Handle form submission (send to Flask)
app.post('/submit', async (req, res) => {
  const formData = {
    name: req.body.name,
    password: req.body.password
  };

  // ✅ Dynamically pick backend URL (local or Docker)
  const backendURL = process.env.BACKEND_URL || 'http://localhost:5000/submit';

  try {
    const response = await fetch(backendURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    res.send(`
      <h3>Response from Flask Backend:</h3>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Password:</strong> ${data.password}</p>
    `);
  } catch (error) {
    console.error('Error connecting to Flask backend:', error);
    res.status(500).send('<h3>❌ Failed to connect to Flask backend.</h3>');
  }
});

// Start the frontend server
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Frontend running on http://localhost:${PORT}`));
