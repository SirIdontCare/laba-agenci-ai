# AI Agents — edycja 2 / program Laba

**Paweł Paruzel · 13.10.2026 · 12 lekcji · 36 sekcji warsztatowych**

Podstawa: [LP feedback implementation | LABA | PL_AI AGENTS - 2](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), dokument potwierdzony przez Pawła. Zachowujemy kolejność, nazwane zagadnienia i wymagane rezultaty. Trzy sekcje warsztatowe mogą grupować kilka ćwiczeń źródłowych; nie usuwają żadnego z nich.

Dostęp do modeli: **OpenRouter, klucz od Laba** — odrębna decyzja Pawła. Framework **Vercel AI SDK jest obowiązkowy**. Google Search grounding i Nano Banana 2 są nazwane oraz realizowane przez dopuszczone modele/adaptery; aktualizację nazw funkcji, np. maxSteps, opisuje [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md). Nie jest to potwierdzenie formalnej zmiany Google Docs przez organizatora.

## Lekcje

| Nr | Temat | Sprawdzany rezultat |
|---|---|---|
| 01 | [Od LLM do agenta](lekcja_01.md) | Chatbot Next.js przez AI SDK pod własnym linkiem. |
| 02 | [Inżynieria promptów](lekcja_02.md) | Persona, few-shot, JSON oraz test ataku i obrony. |
| 03 | [Narzędzia – ręce agenta](lekcja_03.md) | Search, Nano Banana 2 i vision w jednym agencie AI SDK. |
| 04 | [Pętla rozumowania (ReAct)](lekcja_04.md) | Osiem narzędzi, pętla z limitem i pięć źródeł na dashboardzie. |
| 05 | [Agent pamięta – baza danych SQL na Supabase](lekcja_05.md) | Rozmowy, profil i historia zapisane w Supabase. |
| 06 | [Agent zna twoją firmę: baza danych RAG z Supabase pgvector](lekcja_06.md) | Własna baza wiedzy z cytatami oraz reakcją na brak danych. |
| 07 | [Agent dla wielu osób: autentykacja i multi-user, izolacja danych](lekcja_07.md) | Email, Google OAuth oraz prywatne rozmowy wielu użytkowników. |
| 08 | [Agent wykonuje misje – scenariusze biznesowe](lekcja_08.md) | Poczta, raport, konkurencja oraz własna misja. |
| 09 | [Agent pracuje, gdy śpisz – cron jobs i webhooks](lekcja_09.md) | Zaplanowany briefing i reakcja na webhook z historią. |
| 10 | [Bezpieczeństwo i zabezpieczenia: AI prompt injection, AI red teaming](lekcja_10.md) | Trzy nazwane próby, filtr wyjścia i dwa niezależne limity. |
| 11 | [Agent jest produktem – landing page, monitoring, polish](lekcja_11.md) | Landing, pełne metryki, domena, PWA oraz przełącznik motywu. |
| 12 | [Prezentacje finałowe + warsztaty z feedbackiem](lekcja_12.md) | Demo, wzajemny test, poprawka i wdrożenie nowej wersji. |

## Zacznij tutaj

[START.md](START.md) → właściwa lekcja → polecenie do asystenta → test odbioru. Pracuj w jednym własnym projekcie Next.js. Nie nadpisuj materiałów kursowych kodem aplikacji.

Dodatki: [osiem narzędzi L04](NARZEDZIA_L04.md), [dane fikcyjne](data/README.md), [checklista prowadzącego](CHECKLISTA_PROWADZACEGO.md), [mapa pokrycia programu](MAPA_POKRYCIA.md), [źródła techniczne](ZRODLA.md).

## Wersje są rozdzielone

Ta wersja znajduje się na gałęzi `edycja-02-sylabus-laba`, w `edycja-02-laba`.
Poprzedni wariant rozszerzony pozostaje bez zmian na [edycja-02-openrouter](https://github.com/SirIdontCare/laba-agenci-ai/tree/edycja-02-openrouter/edycja-02) i dodatkowej gałęzi [edycja-03-kandydat-archiwum](https://github.com/SirIdontCare/laba-agenci-ai/tree/edycja-03-kandydat-archiwum/edycja-02), wskazującej commit `0635249851667ccc294345c31db755b9411c7c7b`. To kandydat do dalszej pracy, nie zatwierdzony program trzeciej edycji. Edycja 1 na `main` również pozostaje nietknięta.

## Zakres pakietu

To komplet instrukcji, slajdów i kryteriów odbioru **materiału szkoleniowego**, nie gotowa uruchomiona aplikacja uczestnika. Każdy warsztat oznacza oddzielnie: wykonano / błąd / nie uruchomiono. Do testów modeli potrzebny jest klucz Laba. Do próby OAuth i domeny potrzebne są uprawnione konta i adres testowy.

Nie ma obowiązkowego rankingu dwóch modeli, porównania kontekstu z RAG zamiast budowy RAG ani pilotażu zamiast finału. Techniczne zabezpieczenia nie mogą być usuwane dla ułatwienia ćwiczenia. Podane minuty są propozycją organizacji prowadzącego, a nie cytatem z potwierdzonego dokumentu. Ćwiczenia wymagane, lecz nieukończone, pozostają do dokończenia — nie stają się automatycznie opcjonalne.
