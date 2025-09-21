const { logger } = require('../utils/logger');

function getModelName() {
  return process.env.GEMINI_MODEL || 'gemini-2.5-flash';
}

async function getClient() {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    const err = new Error('GEMINI_API_KEY is not set; Gemini features disabled');
    err.status = 500;
    throw err;
  }
  return new GoogleGenerativeAI(key);
}

function getGenerationConfig(override = {}) {
  return {
    temperature: 0.2,
    maxOutputTokens: Number(process.env.MAX_OUTPUT_TOKENS) || 1024,
    ...override,
  };
}

function withTimeout(promise, ms) {
  const timeoutMs = Number(ms) || Number(process.env.REQUEST_TIMEOUT_MS) || 15000;
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`Request timed out after ${timeoutMs}ms`)), timeoutMs); })
  ]).finally(() => clearTimeout(timer));
}

async function generateOnce(prompt, genCfg = {}) {
  const client = await getClient();
  const model = client.getGenerativeModel({ model: getModelName() });
  const req = { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: getGenerationConfig(genCfg) };
  const result = await withTimeout(model.generateContent(req));
  return result.response.text();
}

async function generateStream(prompt, genCfg = {}, onDelta) {
  const client = await getClient();
  const model = client.getGenerativeModel({ model: getModelName() });
  const req = { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: getGenerationConfig(genCfg) };
  const stream = await withTimeout(model.generateContentStream(req));
  let buffer = '';
  for await (const item of stream.stream) {
    const delta = item.text();
    buffer += delta;
    onDelta?.(delta);
  }
  const aggregated = await stream.response;
  return aggregated.text() || buffer;
}

module.exports = { generateOnce, generateStream };