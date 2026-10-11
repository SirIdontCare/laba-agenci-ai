import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const required = ['README.md','START.md','AGENTS.md','KONTRAKT_TECHNICZNY.md','LABA_OPENROUTER.md','DLA_PROWADZACEGO.md','MODELE_I_ZRODLA.md','MAPA_SLAJDOW.md','ROZSZERZENIA.md','data/fixtures.json','schemas/triage.schema.json','reference/openrouter.mjs','reference/guards.mjs','reference/schema.sql'];
for (let n=1;n<=12;n++) for (let w=1;w<=3;w++) required.push(`lekcja_${String(n).padStart(2,'0')}/W${w}.md`);
const errors=[];
for(const path of required) {
  try {
    await access(new URL(path, root));
    if(path.endsWith('.md')) {
      const text = await readFile(new URL(path,root),'utf8');
      for(const match of text.matchAll(/\]\(([^)]+)\)/g)) {
        const link=match[1];
        if(/^(https?:|mailto:|#)/.test(link)) continue;
        try { await access(new URL(link.split('#')[0], new URL(path,root))); }
        catch { errors.push(`${path}: broken link ${link}`); }
      }
    }
  } catch { errors.push(`missing ${path}`); }
}
try {
  const data=JSON.parse(await readFile(new URL('data/fixtures.json',root),'utf8'));
  const ids=[...data.development,...data.holdout].map(x=>x.id);
  if(new Set(ids).size!==ids.length) errors.push('duplicate test ids');
  if(data.development.length!==5 || data.holdout.length!==5) errors.push('expected 5 dev + 5 holdout');
  if(data.rag_tests.length!==6) errors.push('expected 6 RAG tests');
} catch { errors.push('invalid fixtures'); }
console.log(`Root: ${fileURLToPath(root)}\nWorkshops expected: 36\nFiles checked: ${required.length}`);
if(errors.length) { console.log(errors.join('\n')); process.exitCode=1; }
else console.log('PASS: required files and local Markdown links. Not a test of models, DB or deployed app.');
