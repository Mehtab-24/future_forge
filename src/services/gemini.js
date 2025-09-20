const { GoogleGenerativeAI } = require('@google/generative-ai');
const { logger } = require('../utils/logger');

let genAI;

/**
 * Lazily initializes and returns the GoogleGenerativeAI client.
 */
function getGeminiClient() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const msg = 'GEMINI_API_KEY is not set; Gemini features are disabled';
      logger.warn(msg);
      const err = new Error(msg);
      err.status = 500;
      throw err;
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * Generates text for a given prompt using the specified model.
 */
async function generateText(prompt, modelName = 'gemini-1.5-flash') {
  const client = getGeminiClient();
  const model = client.getGenerativeModel({ model: modelName });
  const result = await model.generateContent([{ text: prompt }]);
  return result.response.text();
}

module.exports = { getGeminiClient, generateText };