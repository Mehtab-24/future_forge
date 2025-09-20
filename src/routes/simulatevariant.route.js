const { Router } = require('express');
const { z } = require('zod');
const { generateText } = require('../services/gemini');

const router = Router();

const bodySchema = z.object({
  prompt: z.string().min(1, 'prompt is required'),
  variants: z.number().int().min(1).max(5).default(2),
  model: z.string().optional(),
});

router.post('/', async (req, res, next) => {
  try {
    const { prompt, variants, model } = bodySchema.parse(req.body);

    const promises = Array.from({ length: variants }, () => generateText(prompt, model));
    const outputs = await Promise.all(promises);

    res.json({
      variants: outputs.map((text, i) => ({ index: i + 1, text })),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;