function butterflyPrompt(intake, oneChange, schemaText) {
  return `
You are an expert "butterfly effect" simulator.
Return only valid JSON matching the schema below. Do not include any prose, backticks, or code fences outside JSON.

Schema:
${schemaText}

Requirements:
- Start from the baseline simulation structure.
- Apply this single change: ${JSON.stringify(oneChange)}
- Include a deltas[] array describing concrete differences in milestones/risks/goals.
- Keep field names exactly as specified.

Inputs:
${JSON.stringify(intake, null, 2)}

Output:
Return only the JSON object. No additional text.
`.trim();
}

module.exports = { butterflyPrompt };