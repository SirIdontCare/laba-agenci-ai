import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
const digest = value => createHash('sha256').update(value, 'utf8').digest();
export function validBearer(header, secret) {
  if (typeof secret !== 'string' || secret.trim().length < 16 || typeof header !== 'string' || header.length > 8192) return false;
  return timingSafeEqual(digest(header), digest(`Bearer ${secret}`));
}
/** Sandbox protocol: HMAC-SHA256(timestamp + '.' + rawBody), hex signature. */
export function verifyWebhook({ rawBody, timestamp, signature, secret, nowSeconds = Math.floor(Date.now()/1000), toleranceSeconds = 300 }) {
  if (typeof secret !== 'string' || secret.trim().length < 16 || typeof rawBody !== 'string' || Buffer.byteLength(rawBody) > 65536) return false;
  if (typeof timestamp !== 'string' || !/^\d{10}$/.test(timestamp) || typeof signature !== 'string' || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  if (!Number.isFinite(nowSeconds) || !Number.isFinite(toleranceSeconds) || toleranceSeconds < 0 || toleranceSeconds > 300) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > toleranceSeconds) return false;
  const expected = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest();
  return timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}
/** A narrow validator for the course schema, NOT a general JSON Schema engine. */
export function validateTriage(value, { messageId, allowedSourceIds = [] } = {}) {
  const errors = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { valid: false, errors: ['object_required'] };
  const fields = ['message_id','category','priority','draft','needs_review','missing_data','sources'];
  for (const field of fields) if (!Object.hasOwn(value, field)) errors.push(`missing:${field}`);
  for (const field of Object.keys(value)) if (!fields.includes(field)) errors.push(`unexpected:${field}`);
  if (typeof value.message_id !== 'string' || !value.message_id.length || value.message_id.length > 100) errors.push('message_id');
  if (messageId !== undefined && value.message_id !== messageId) errors.push('wrong_message_id');
  if (!['sales','support','billing','unknown'].includes(value.category)) errors.push('category');
  if (!['normal','high'].includes(value.priority)) errors.push('priority');
  if (typeof value.draft !== 'string' || value.draft.length > 4000) errors.push('draft');
  if (typeof value.needs_review !== 'boolean') errors.push('needs_review');
  for (const field of ['missing_data','sources']) {
    if (!Array.isArray(value[field]) || value[field].length > 10 || value[field].some(x => typeof x !== 'string' || !x.length || x.length > 200)) errors.push(field);
  }
  if (Array.isArray(value.missing_data) && value.missing_data.length && value.needs_review !== true) errors.push('missing_requires_review');
  if (Array.isArray(value.sources) && value.sources.some(id => !allowedSourceIds.includes(id))) errors.push('unknown_source');
  return { valid: errors.length === 0, errors };
}
/** Unknown costs stay unknown. Success requires a separate quality decision. */
export function summarizeRuns(runs) {
  let knownCost = 0, unknownCosts = 0, correct = 0;
  for (const run of runs) {
    if (typeof run.cost_usd === 'number' && Number.isFinite(run.cost_usd) && run.cost_usd >= 0) knownCost += run.cost_usd;
    else unknownCosts++;
    if (run.correct === true) correct++;
  }
  return { attempts: runs.length, correct, known_cost_usd: knownCost, unknown_costs: unknownCosts,
    cost_per_correct: correct && !unknownCosts ? knownCost/correct : null };
}
