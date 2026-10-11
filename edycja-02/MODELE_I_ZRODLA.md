# Modele i dokumentacja — 11.10.2026

## Nie zamrażamy nazw modeli w 36 instrukcjach

Laba przekazuje listę dopuszczonych identyfikatorów i limity. Konfiguracja jest serwerowa, w jednym miejscu. Zmiana modelu nie wymaga przepisywania warsztatu, ale WYMAGA ponownego testu kontraktu.

| Profil | Wymagane możliwości | Jak wybieramy |
|---|---|---|
| fast | tekst, od L02 JSON Schema, od L03 tools | Najtańszy w dopuszczonej puli, który przechodzi testy procesu |
| quality | ten sam wymagany kontrakt co fast | Lepszy wynik na tej samej próbce uzasadniający dodatkowy koszt |
| vision | obraz na wejściu i tekst na wyjściu | Odczyt własnej planszy, braki i kontrola liczb |
| image | obraz na wyjściu | Faktycznie zwrócony plik, limit kosztu, obsługa odmowy |
| embedding | endpoint embeddingów, ustalone wymiary | Poprawny wektor i zgodność z indeksem pgvector |

Dwa profile mogą wskazywać ten sam model. Popularność nie zastępuje testu. Nie przyjmujemy, że każdy model ma tools, search, JSON i obrazy jednocześnie. Wyszukiwanie może być dodatkową usługą/parametrem, a nie zdolnością włączoną w każdym modelu.

`npm run preflight` sprawdza obecność konfiguracji i katalog. `npm run live` wykonuje jedną krótką generację tekstu. Osobna próba prowadzącego musi objąć JSON, tools, vision, image, embeddings, search, limity oraz równoczesne użycie w grupie. Wpis w katalogu nie potwierdza środków, limitów i dostępności na konkretnym kluczu.

## Źródła pierwotne

**OR-MODELS — katalog modeli i możliwości**
https://openrouter.ai/docs/api/api-reference/models/list-all-models-and-their-properties
Endpoint: `GET https://openrouter.ai/api/v1/models`. Sprawdzaj `id`, `architecture.input_modalities`, `architecture.output_modalities`, `supported_parameters` i `pricing`.

**OR-JSON — Structured Outputs**
https://openrouter.ai/docs/guides/features/structured-outputs
Wspierane modele; `response_format` z JSON Schema, `strict` i `provider.require_parameters`. Format nie dowodzi prawdziwości danych.

**OR-TOOLS — Tool Calling**
https://openrouter.ai/docs/guides/features/tool-calling
Model proponuje wywołanie, aplikacja wykonuje narzędzie i zwraca wynik z identyfikatorem wywołania. Backend nie deleguje autoryzacji modelowi.

**OR-WEB — Web Search**
https://openrouter.ai/docs/guides/features/plugins/web-search
Plugin `web`, parametry i koszty, metadane cytowania. Koszt search może być dodatkowy także przy modelu oznaczonym free. Nie używamy starej konfiguracji Google grounding jako uniwersalnej konfiguracji OpenRouter.

**OR-IMAGE — Image Generation**
https://openrouter.ai/docs/guides/overview/multimodal/image-generation
Rozróżnienie obrazów wejściowych i generowanych, modalności oraz format odpowiedzi. Sprawdź model i rzeczywistą odpowiedź na koncie Laba.

**OR-EMBED — Embeddings**
https://openrouter.ai/docs/api/api-reference/embeddings/submit-an-embedding-request
https://openrouter.ai/docs/api/api-reference/embeddings/list-embeddings-models
Endpointy: `POST /api/v1/embeddings` i `GET /api/v1/embeddings/models`. Wybierz wspierany model i sprawdź wymiar przed utworzeniem indeksu.

**OR-KEYS — Management API Keys**
https://openrouter.ai/docs/guides/overview/auth/management-api-keys
Klucze zarządzające i klucze inferencji to różne uprawnienia. Administrator może tworzyć oddzielne klucze z limitami. Zarządzającego klucza nie dajemy kursantom.

**OR-PRIVACY — Data Collection**
https://openrouter.ai/docs/guides/privacy/data-collection
Sprawdź zasady OpenRouter oraz faktycznych dostawców modelu i ustawienia routingu. Nie obiecuj jednolitej retencji ani zgodności z regulacjami na podstawie samego dostawcy bramki.

**AI-SDK — jawny provider OpenRouter i kontrola pętli**
https://github.com/OpenRouterTeam/ai-sdk-provider
https://ai-sdk.dev/docs/agents/loop-control
https://ai-sdk.dev/docs/migration-guides/migration-guide-6-0
W odczytanej dokumentacji providera: aktualna linia dla AI SDK 7 wymaga Node 22+; linia 2.9.1 służy AI SDK 6. Dla AI SDK 6 dokumentacja używa `stepCountIs`. Sprawdzaj faktyczne eksporty zainstalowanej wersji; nie mieszaj przykładów z różnych generacji. Narzędzia pomocnicze pakietu celowo nie mają zależności npm.

**RLS — Supabase**
https://supabase.com/docs/guides/database/postgres/row-level-security
https://supabase.com/docs/guides/ai/rag-with-permissions
RLS + grants + testy allow/deny dla każdej operacji. Ochrona retrieval przed przekazaniem danych modelowi. Zwykły klient użytkownika nie używa klucza administracyjnego.

**HOST — Vercel plans**
https://vercel.com/docs/plans/hobby
Dobierz plan do użycia, w szczególności przed wdrożeniem biznesowym. Szkoleniowy link nie oznacza darmowej infrastruktury dla dowolnego produktu.

**CRON — harmonogram i zabezpieczenia**
https://vercel.com/docs/cron-jobs
https://vercel.com/docs/cron-jobs/manage-cron-jobs
https://vercel.com/docs/cron-jobs/usage-and-pricing
Cron Vercel używa UTC. Aktualne ograniczenia planu obejmują częstotliwość i dokładność; Hobby nie jest harmonogramem gwarantującym precyzję do minuty. `CRON_SECRET` sprawdzamy przed uruchomieniem misji.

**OWASP — obrona aplikacji LLM**
https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html
Instrukcja systemowa i blacklisty nie zastępują granic narzędzi, dostępu i zatwierdzania skutków.

## Pochodzenie materiału

Struktura 12 modułów i punkt odniesienia: dostarczona prezentacja `AI_Agents_Edycja_02.pptx`, 167 slajdów, oraz wcześniejszy sylabus Stream 2. Ceny i scenariusze danych fikcyjnych zachowują konwencję pakietu prezentacji. Nowe elementy — OpenRouter, baseline gotowego AI, A/B, uczciwe porównanie kontekstu/RAG, approval, idempotencja i testy — są autorską aktualizacją warsztatów zgodnie z nowym poleceniem użytkownika. Nie są cytatem z zatwierdzonego sylabusa organizatora.
