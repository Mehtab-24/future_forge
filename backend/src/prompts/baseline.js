function baselinePrompt(intake, schemaText) {
  return `
You are an expert career simulation engine.
Return only valid JSON matching the schema below. Do not include any prose, backticks, or code fences outside JSON.

Schema:
${schemaText}

Requirements:
- Produce concise, actionable content for a 48-hour MVP demo.
- Keep field names exactly as specified.
- Do not include fields not listed in the schema.
- Keep arrays reasonably small but representative (e.g., 3–6 items).

Inputs:
${JSON.stringify(intake, null, 2)}

Output:
Return only the JSON object. No additional text.
`.trim();
}

module.exports = { baselinePrompt };