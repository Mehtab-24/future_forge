function tryJsonParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (e) {
    return { ok: false, error: e };
  }
}

function jsonRepair(text) {
  if (!text) return { ok: false, error: new Error('empty text') };
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    return { ok: false, error: new Error('no JSON object braces found') };
  }
  const slice = text.slice(start, end + 1);
  return tryJsonParse(slice);
}

module.exports = { tryJsonParse, jsonRepair };