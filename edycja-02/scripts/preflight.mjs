import { listModels, complete } from '../reference/openrouter.mjs';
const env = process.env;
const live = process.argv.includes('--live');
const roles = ['fast','quality','vision','image','embedding'];
let failed = false;
console.log('PREFLIGHT — katalog i konfiguracja; nie test gotowej aplikacji.');
console.log(`API key configured: ${Boolean(env.OPENROUTER_API_KEY?.trim())}`);
if (!env.OPENROUTER_API_KEY?.trim()) { failed = true; console.log('STOP: brak klucza inference Laba.'); }
let chat = [], embedding = [];
try { chat = await listModels(); }
catch (e) { failed = true; console.log(`Catalog text: ${e.code ?? 'ERROR'}`); }
if (env.OPENROUTER_MODEL_EMBEDDING?.trim() && env.OPENROUTER_API_KEY?.trim()) {
  try { embedding = await listModels({ embeddings: true }); }
  catch (e) { failed = true; console.log(`Catalog embedding: ${e.code ?? 'ERROR'}`); }
}
for (const role of roles) {
  const id = env[`OPENROUTER_MODEL_${role.toUpperCase()}`]?.trim();
  if (!id) {
    console.log(`${role}: ${role === 'fast' ? 'FAIL' : 'TODO przed odpowiednią lekcją'} — brak modelu`);
    if (role === 'fast') failed = true;
    continue;
  }
  const model = (role === 'embedding' ? embedding : chat).find(m => m.id === id);
  if (!model) { failed = true; console.log(`${role}: FAIL — identyfikator niepotwierdzony w katalogu`); continue; }
  const input = model.architecture?.input_modalities ?? [];
  const output = model.architecture?.output_modalities ?? [];
  const needed = role === 'vision' ? input.includes('image') : role === 'image' ? output.includes('image') : true;
  if (!needed) failed = true;
  console.log(`${role}: ${needed ? 'CATALOG OK' : 'FAIL modalności'} | ${id}`);
  if (role === 'fast' || role === 'quality') {
    const params = model.supported_parameters ?? [];
    console.log(`  tools=${params.includes('tools')}; structured_outputs=${params.includes('structured_outputs')}; response_format=${params.includes('response_format')}`);
    console.log('  Sam parametr w katalogu nie zastępuje próby na kluczu Laba.');
  }
}
if (!live) {
  console.log('LIVE: NOT RUN. Bez generacji. npm run live wykona JEDNO krótkie płatne zapytanie po ustaleniu limitu klucza.');
} else if (failed) {
  console.log('LIVE: NOT RUN — popraw konfigurację.');
} else {
  console.log('LIVE: jedna generacja, profil fast, limit 256 tokenów; bez automatycznego retry.');
  try {
    const result = await complete({ messages: [{role:'user', content:'Odpowiedz jednym słowem: GOTOWE.'}], maxOutputTokens: 256 });
    console.log(JSON.stringify({ status: 'RESPONSE_RECEIVED', requested_model: result.requested_model, actual_model: result.actual_model,
      input_tokens: result.input_tokens, output_tokens: result.output_tokens, cost_usd: result.cost_usd,
      cost_source: result.cost_source, nonempty_text: result.text.length > 0 }, null, 2));
    console.log('To nie jest zaliczenie JSON/tools/vision/image/embedding ani pełnego kursu.');
  } catch (e) { failed = true; console.log(`LIVE FAIL: ${e.code ?? 'ERROR'}; HTTP=${e.status ?? 'n/a'}. Bez surowej odpowiedzi dostawcy.`); }
}
process.exitCode = failed ? 1 : 0;
