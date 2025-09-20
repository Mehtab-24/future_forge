require('dotenv').config();
const express = require('express');
const {GenerativeLanguageClient} = require('@google/genai');

const app = express();
app.use(express.json());

// Initialize Gemini client
const client = new GenerativeLanguageClient({
  apiKey: process.env.GEMINI_API_KEY,
});

// Import routes
const simulateRoute = require('./routes/simulate');
const simulateVariantRoute = require('./routes/simulatevariant');

app.use('/api/simulate', simulateRoute(client));
app.use('/api/simulate-variant', simulateVariantRoute(client));

// Health check
app.get('/health', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
