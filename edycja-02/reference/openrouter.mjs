/** Server-side reference helper, not a complete application or authorization layer. */
const BASE = 'https://openrouter.ai/api/v1';
export class OpenRouterError extends Error {
  constructor(code, status = null) {
    super(code); this.name = 'OpenRouterError'; this.code = code; this.status = status;
  }
}
function keyFrom(env) {
  const key = env.OPENROUTER_API_KEY?.trim();
  if (!key) throw new OpenRouterError('MISSING_API_KEY');
  return key;
}
async function request(path, { env = process.env, fetchImpl = fetch, body, signal, timeoutMs = 20000, publicRead = false } = {}) {
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 120000) throw new OpenRouterError('INVALID_TIMEOUT');
  const key = publicRead ? env.OPENROUTER_API_KEY?.trim() : keyFrom(env);
  const headers = { Accept: 'application/json' };
  if (key) headers.Authorization = `Bearer ${key}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const deadline = AbortSignal.timeout(timeoutMs);
  const combined = signal ? AbortSignal.any([signal, deadline]) : deadline;
  try {
    const response = await fetchImpl(`${BASE}${path}`, {
      method: body === undefined ? 'GET' : 'POST', headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      redirect: 'error', signal: combined,
    });
    if (!response.ok) throw new OpenRouterError('PROVIDER_HTTP_ERROR', response.status);
    let payload;
    try { payload = await response.json(); }
    catch { throw new OpenRouterError('INVALID_PROVIDER_JSON'); }
    if (!payload || typeof payload !== 'object' || payload.error) throw new OpenRouterError('PROVIDER_RESPONSE_ERROR');
    return payload;
  } catch (error) {
    if (error instanceof OpenRouterError) throw error;
    if (signal?.aborted) throw new OpenRouterError('CANCELLED');
    if (deadline.aborted) throw new OpenRouterError('TIMEOUT');
    // Do not forward provider error bodies, request headers or secrets.
    throw new OpenRouterError('NETWORK_ERROR');
  }
}
export async function listModels({ embeddings = false, ...options } = {}) {
  const payload = await request(embeddings ? '/embeddings/models' : '/models', { ...options, publicRead: !embeddings });
  if (!Array.isArray(payload.data)) throw new OpenRouterError('INVALID_CATALOG');
  return payload.data;
}
export async function complete({ messages, profile = 'fast', responseSchema, maxOutputTokens = 256, ...options }) {
  const env = options.env ?? process.env;
  const roles = { fast: 'OPENROUTER_MODEL_FAST', quality: 'OPENROUTER_MODEL_QUALITY' };
  if (!Object.hasOwn(roles, profile)) throw new OpenRouterError('PROFILE_NOT_ALLOWED');
  const model = env[roles[profile]]?.trim();
  if (!model) throw new OpenRouterError('MISSING_MODEL');
  if (!Number.isInteger(maxOutputTokens) || maxOutputTokens < 1 || maxOutputTokens > 2048) throw new OpenRouterError('INVALID_OUTPUT_LIMIT');
  if (!Array.isArray(messages) || !messages.length || messages.length > 30) throw new OpenRouterError('INVALID_MESSAGES');
  let length = 0;
  for (const item of messages) {
    if (!item || !['system', 'user', 'assistant'].includes(item.role) || typeof item.content !== 'string') throw new OpenRouterError('INVALID_MESSAGES');
    length += item.content.length;
  }
  if (!length || length > 32000) throw new OpenRouterError('INPUT_LIMIT');
  const body = { model, messages: messages.map(({role, content}) => ({role, content})), stream: false, max_tokens: maxOutputTokens };
  if (responseSchema) {
    body.response_format = { type: 'json_schema', json_schema: { name: 'course_result', strict: true, schema: responseSchema } };
    body.provider = { require_parameters: true };
  }
  const payload = await request('/chat/completions', { ...options, env, body });
  const choice = payload.choices?.[0];
  if (choice?.message?.refusal) throw new OpenRouterError('MODEL_REFUSAL');
  if (choice?.finish_reason === 'length') throw new OpenRouterError('TRUNCATED_RESPONSE');
  if (choice?.finish_reason !== 'stop') throw new OpenRouterError('UNEXPECTED_FINISH_REASON');
  if (typeof choice?.message?.content !== 'string' || !choice.message.content.trim()) throw new OpenRouterError('EMPTY_RESPONSE');
  const usage = payload.usage ?? {};
  const numberOrNull = value => typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;
  return {
    text: choice.message.content, requested_model: model,
    actual_model: typeof payload.model === 'string' ? payload.model : null,
    input_tokens: numberOrNull(usage.prompt_tokens), output_tokens: numberOrNull(usage.completion_tokens),
    cost_usd: numberOrNull(usage.cost),
    cost_source: numberOrNull(usage.cost) === null ? 'UNKNOWN' : 'PROVIDER',
  };
}
