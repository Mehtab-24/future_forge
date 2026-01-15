const OpenAI = require('openai');
const logger = require('../utils/logger');

// This client will be configured to talk to OpenRouter
let openAIClient;

function getClient() {
  if (openAIClient) return openAIClient;

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    const err = new Error('OPENROUTER_API_KEY is not set');
    err.status = 500;
    throw err;
  }

  openAIClient = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
  });

  return openAIClient;
}

/**
 * Generates a response from a free model on OpenRouter.
 * @param {string} prompt The user's prompt.
 * @returns {Promise<string>} The AI's response text.
 */
async function generateOnce(prompt) {
  const client = getClient();

  try {
    const response = await client.chat.completions.create({
      // You can choose any free model from the OpenRouter docs.
      // Nous: Capybara 7B is a good free option.
      model: "nousresearch/nous-capybara-7b:free",
      messages: [
        { role: 'user', content: prompt }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    logger.error('OpenRouter API call failed:', error);
    throw new Error('Failed to get response from AI model');
  }
}

// Note: Streaming is more complex to adapt quickly, so we are focusing on the generateOnce function for your deadline.
// The generateStream function below is a placeholder and will not work without further modification.
async function generateStream() {
  logger.warn('generateStream is not implemented for OpenRouter in this quick setup.');
  throw new Error('Streaming not implemented.');
}

module.exports = { generateOnce, generateStream };