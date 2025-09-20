const { Router } = require('express');
const { z } = require('zod');
const { generateText } = require('../services/gemini');

const router = Router();

const bodySchema = z.object({
  prompt: z.string().min(1, 'prompt is required'),
  model: z.string().optional(), // e.g., "gemini-1.5-pro" if you want to switch
});

router.post('/', async (req, res, next) => {
  try {
    const { prompt, model } = bodySchema.parse(req.body);
    const text = await generateText(prompt, model);
    res.json({ text });
  } catch (err) {
    next(err);
  }
});

module.exports = router;