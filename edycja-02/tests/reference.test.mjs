import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { complete, listModels } from '../reference/openrouter.mjs';
import { validBearer, verifyWebhook, validateTriage, summarizeRuns } from '../reference/guards.mjs';
const env={OPENROUTER_API_KEY:'test-only-not-a-real-key',OPENROUTER_MODEL_FAST:'course/test-fast',OPENROUTER_MODEL_QUALITY:'course/test-quality'};
const goodPayload={model:'course/test-fast',choices:[{finish_reason:'stop',message:{content:'GOTOWE'}}],usage:{prompt_tokens:10,completion_tokens:2,cost:0.0001}};
const respond=data=>async()=>new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});
const call=(extra={})=>complete({env,messages:[{role:'user',content:'Test'}],fetchImpl:respond(goodPayload),...extra});
const triage={message_id:'DEV01',category:'sales',priority:'normal',draft:'Start: 490 PLN netto.',needs_review:false,missing_data:[],sources:['cennik_01']};
const context={messageId:'DEV01',allowedSourceIds:['cennik_01']};

test('HTTP adapter keeps key in header and uses fixed OpenRouter endpoint',async()=>{
 let sent;
 const result=await call({fetchImpl:async(url,options)=>{sent={url,options};return respond(goodPayload)();}});
 assert.equal(sent.url,'https://openrouter.ai/api/v1/chat/completions');
 assert.equal(sent.options.headers.Authorization,`Bearer ${env.OPENROUTER_API_KEY}`);
 assert.equal(sent.options.redirect,'error');
 assert.ok(!sent.options.body.includes(env.OPENROUTER_API_KEY));
 assert.equal(result.actual_model,'course/test-fast');
 assert.equal(result.cost_usd,0.0001);
});
test('missing key fails before network',async()=>{
 let calls=0;await assert.rejects(call({env:{OPENROUTER_MODEL_FAST:'test'},fetchImpl:async()=>{calls++;}}),{code:'MISSING_API_KEY'});assert.equal(calls,0);
});
test('arbitrary profile is rejected',()=>assert.rejects(call({profile:'http://internal'}),{code:'PROFILE_NOT_ALLOWED'}));
test('empty input is rejected',()=>assert.rejects(call({messages:[{role:'user',content:''}]}),{code:'INPUT_LIMIT'}));
test('oversized input is rejected',()=>assert.rejects(call({messages:[{role:'user',content:'x'.repeat(32001)}]}),{code:'INPUT_LIMIT'}));
test('tool messages require separate tool loop, not text helper',()=>assert.rejects(call({messages:[{role:'tool',content:'x'}]}),{code:'INVALID_MESSAGES'}));
test('output bound is enforced',()=>assert.rejects(call({maxOutputTokens:90000}),{code:'INVALID_OUTPUT_LIMIT'}));
test('provider HTTP error does not echo body or secret',async()=>{
 await assert.rejects(call({fetchImpl:async()=>new Response(env.OPENROUTER_API_KEY,{status:401})}),e=>e.code==='PROVIDER_HTTP_ERROR'&&e.status===401&&!e.message.includes(env.OPENROUTER_API_KEY));
});
test('invalid provider JSON is explicit',()=>assert.rejects(call({fetchImpl:async()=>new Response('not-json',{status:200})}),{code:'INVALID_PROVIDER_JSON'}));
test('HTTP 200 with error body is not success',()=>assert.rejects(call({fetchImpl:respond({error:{message:'denied'}})}),{code:'PROVIDER_RESPONSE_ERROR'}));
test('truncated response is not success',()=>assert.rejects(call({fetchImpl:respond({choices:[{finish_reason:'length',message:{content:'partial'}}]})}),{code:'TRUNCATED_RESPONSE'}));
test('refusal is not parsed as business answer',()=>assert.rejects(call({fetchImpl:respond({choices:[{finish_reason:'stop',message:{refusal:'no'}}]})}),{code:'MODEL_REFUSAL'}));
test('unknown cost remains null',async()=>{const r=await call({fetchImpl:respond({...goodPayload,usage:{}})});assert.equal(r.cost_usd,null);assert.equal(r.cost_source,'UNKNOWN');});
test('structured output requires provider parameter support',async()=>{
 let body;const schema={type:'object',properties:{},required:[],additionalProperties:false};
 await call({responseSchema:schema,fetchImpl:async(u,o)=>{body=JSON.parse(o.body);return respond(goodPayload)();}});
 assert.equal(body.provider.require_parameters,true);assert.equal(body.response_format.json_schema.strict,true);
});
test('embeddings catalog uses its own endpoint',async()=>{
 let url;await listModels({env,embeddings:true,fetchImpl:async u=>{url=u;return respond({data:[]})();}});assert.ok(url.endsWith('/embeddings/models'));
});
test('network error is scrubbed',()=>assert.rejects(call({fetchImpl:async()=>{throw new Error(env.OPENROUTER_API_KEY);}}),{code:'NETWORK_ERROR'}));
test('cancelled operation is explicit',async()=>{
 const controller=new AbortController();controller.abort();await assert.rejects(call({signal:controller.signal,fetchImpl:async(u,o)=>{o.signal.throwIfAborted();}}),{code:'CANCELLED'});
});
test('bearer fails closed if env is absent',()=>{assert.equal(validBearer('Bearer undefined',undefined),false);assert.equal(validBearer('Bearer x','x'),false);});
test('bearer accepts only exact long secret',()=>{const s='test-secret-0123456789';assert.ok(validBearer(`Bearer ${s}`,s));assert.equal(validBearer(`Bearer ${s}bad`,s),false);});
const secret='sandbox-secret-0123456789', timestamp='1791738000', rawBody='{"event_id":"event_demo_001"}';
const signature=createHmac('sha256',secret).update(`${timestamp}.${rawBody}`).digest('hex');
const webhook={rawBody,timestamp,signature,secret,nowSeconds:Number(timestamp)};
test('correct webhook signature accepted',()=>assert.equal(verifyWebhook(webhook),true));
test('tampered webhook body rejected',()=>assert.equal(verifyWebhook({...webhook,rawBody:rawBody+' '}),false));
test('old webhook rejected',()=>assert.equal(verifyWebhook({...webhook,nowSeconds:Number(timestamp)+301}),false));
test('malformed signature rejected',()=>assert.equal(verifyWebhook({...webhook,signature:'bad'}),false));
test('missing webhook secret rejected',()=>assert.equal(verifyWebhook({...webhook,secret:undefined}),false));
test('oversized webhook rejected',()=>assert.equal(verifyWebhook({...webhook,rawBody:'a'.repeat(65537)}),false));
test('valid triage accepted',()=>assert.equal(validateTriage(triage,context).valid,true));
test('invented source rejected',()=>assert.equal(validateTriage({...triage,sources:['invented']},context).valid,false));
test('missing data requires review',()=>assert.equal(validateTriage({...triage,missing_data:['VAT']},context).valid,false));
test('unexpected fields rejected',()=>assert.equal(validateTriage({...triage,send:true},context).valid,false));
test('wrong message id rejected',()=>assert.equal(validateTriage({...triage,message_id:'B'},context).valid,false));
test('unknown costs do not produce false zero metric',()=>assert.equal(summarizeRuns([{correct:true,cost_usd:null}]).cost_per_correct,null));
test('cost includes failed attempts',()=>assert.equal(summarizeRuns([{correct:true,cost_usd:0.1},{correct:false,cost_usd:0.2}]).cost_per_correct,0.1+0.2));
test('zero correct outcomes yield N/A',()=>assert.equal(summarizeRuns([{correct:false,cost_usd:0.1}]).cost_per_correct,null));
test('fixture has disjoint development and holdout ids',async()=>{
 const data=JSON.parse(await readFile(new URL('../data/fixtures.json',import.meta.url),'utf8'));
 const ids=[...data.development,...data.holdout].map(x=>x.id);
 assert.equal(data.development.length,5);assert.equal(data.holdout.length,5);assert.equal(new Set(ids).size,10);assert.equal(data.rag_tests.length,6);
});
test('schema and narrow validator use the same fields',async()=>{
 const schema=JSON.parse(await readFile(new URL('../schemas/triage.schema.json',import.meta.url),'utf8'));
 assert.deepEqual(schema.required.toSorted(),Object.keys(triage).toSorted());assert.equal(schema.additionalProperties,false);
});
