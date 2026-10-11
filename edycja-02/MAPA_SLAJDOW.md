# Mapa warsztatów do prezentacji edycji 2

Punkt odniesienia: `AI_Agents_Edycja_02.pptx`, 167 slajdów. Ten plik opisuje świadome różnice; nie oznacza, że PowerPoint został już zmieniony. Oryginalna grafika i plik prezentacji pozostają nietknięte.

| Moduł | Slajdy | Warsztaty w nowej wersji |
|---|---|---|
| Otwarcie | 1–6 | Jeden projekt + baseline gotowego AI, OpenRouter zamiast bezpośredniego Gemini |
| 01 Fundament | 7–19 | W1 środowisko/baseline, W2 pierwszy wynik, W3 deploy |
| 02 Instrukcje | 20–32 | W1 kontrakt, W2 schema, W3 A/B modeli z testem injection i holdout |
| 03 Narzędzia | 33–45 | W1 OpenRouter web, W2 vision/grafika, W3 własne tools |
| 04 ReAct | 46–58 | W1 pętla, W2 podróż, W3 awarie/STOP i widoczny przebieg |
| 05 Pamięć | 59–71 | W1 minimalny Auth + RLS, W2 historia, W3 pamięć kontrolowana |
| 06 RAG | 72–84 | W1 kontekst kontra RAG, W2 ingestia, W3 cytaty/braki |
| 07 Dostęp | 85–97 | W1 pełne konta, W2 bezpośrednie testy izolacji, W3 onboarding/OAuth |
| 08 Misje | 98–110 | W1 poczta, W2 raport i konkurencja, W3 własny proces + approval |
| 09 Automatyka | 111–123 | W1 runner, W2 cron, W3 podpisany webhook/deduplikacja/briefingi |
| 10 Bezpieczeństwo | 124–136 | W1 test ataku, W2 regresja/naprawa, W3 budżet i panel |
| 11 Produkt | 137–149 | W1 pierwsza wartość, W2 jakość/koszt, W3 UX/mobile |
| 12 Finał | 150–162 | W1 demo/test w parach, W2 poprawka, W3 pilotaż |
| Zakończenie | 163–167 | Checklista i źródła uzupełnione dokumentacją OpenRouter |

## Konkretne miejsca do aktualizacji w slajdach

- Slajd 5: „Gemini + AI SDK” → „OpenRouter + AI SDK / adapter HTTP”. Konta/klucz Gemini nie są wymaganiem ścieżki głównej.
- Slajd 9: „Gemini API” → „OpenRouter → dopuszczony model”. Klucz nadal wyłącznie na backendzie.
- Slajd 13 oraz notatki L01: polecenie Next.js + OpenRouter i konfiguracja `OPENROUTER_API_KEY`. Wymagane role modeli z `.env.example`.
- Slajd 39: Google Search grounding → jawnie uruchamiany web search przez OpenRouter z metadanymi cytatów. Nie tylko zmiana etykiety: zmienia się adapter i koszt.
- Slajd 95: Google OAuth pozostaje poprawnym tematem LOGOWANIA. Nie zamieniaj go na OpenRouter. W nowym CORE priorytetem jest onboarding; OAuth jest rozszerzeniem po działającym email/password.
- Slajd 165 oraz notatki źródłowe: uzupełnić/zastąpić źródła Google jako głównego API dokumentacją OpenRouter. Sprawdzić również notatki dotyczące modeli, embeddingów, nazw funkcji SDK i kluczy.

## Świadome zmiany dydaktyczne

L01 zawiera pomiar punktu odniesienia; L02 rozszerza testy o porównanie modeli; L05 wprowadza minimum autentykacji wcześniej, ponieważ RLS potrzebuje tożsamości. L07 rozwija ten fundament, nie powtarza deployu. W L06 porównanie kontekstu z RAG przeciwdziała budowaniu zbędnej infrastruktury. W L08 zatwierdzanie działania daje konkretny skutek w sandboxie. Finał pracuje w parach, żeby każda osoba miała czas na test.

Zakres 12 modułów pozostaje. Treść prowadzącego powinna być zsynchronizowana z tą mapą przed zajęciami; nie pokazuj jednocześnie starych instrukcji Gemini i nowych instrukcji OpenRouter.
