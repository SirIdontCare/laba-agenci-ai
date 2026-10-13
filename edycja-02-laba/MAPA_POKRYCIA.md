# Mapa pokrycia potwierdzonego programu Laba

Wersja materiałów: **13.10.2026 / LABA_SYLABUS**. Źródło nadrzędne: [LP feedback implementation | LABA | PL_AI AGENTS - 2](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), potwierdzone przez Pawła. Poniżej skrót 73 punktów kontrolnych programu; dokładne brzmienie źródłowe pozostaje w Google Docs.

**12 tematów, 36 sekcji warsztatowych, 168 slajdów.** Kolumna „PPTX” podaje pozycję w nowej prezentacji głównej — po dodaniu BIO i ujednoliceniu stopek. BIO to pozycja 2. Osobne pliki lekcyjne zachowują numery z pliku głównego.

Mapa potwierdza obecność zakresu w slajdach, notatkach i instrukcjach. **Nie jest raportem wykonania ćwiczeń, testem kont Laba ani zatwierdzeniem technicznych zamienników przez organizatora.** Każde wymagane ćwiczenie ma własne kryteria odbioru, które uczestnik wykonuje na swojej aplikacji.

## Jawne różnice techniczne

OpenRouter pozostaje zleconym przez Pawła kanałem dostępu. AI SDK nie jest opcjonalny. Gemini, natywne Google Search i Nano Banana 2 pozostają nazwane; brak dostępu wymaga próby/uzgodnienia, nie cichego zaliczenia innej funkcji. `maxSteps` zachowuje znaczenie limitu iteracji, a aktualny odpowiednik API jest opisany w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md). Kontrole RLS, zgody na skutki, testy i minuty to jawny sposób realizacji, nie dopisane cytaty ze źródła.

## 01. Od LLM do agenta

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L01-01 | Czym jest agent AI w porównaniu z chatbotem i potokiem przetwarzania? | 9 | [W1](lekcja_01.md#w1) |
| L01-02 | Poziomy autonomii | 11 | [W1](lekcja_01.md#w1) |
| L01-03 | Demonstracja gotowego agenta w akcji | 12 | [W1](lekcja_01.md#w1) |
| L01-04 | Konfiguracja środowiska programistycznego | 14 | [W1](lekcja_01.md#w1) |
| L01-05 | Konfiguracja AI coding assistant: pisanie, modyfikowanie i debugowanie kodu | 13–14 | [W1](lekcja_01.md#w1) |
| L01-06 | Pierwsze wywołanie modelu Gemini przez Vercel AI SDK — chatbot od zera (Next.js) | 16 | [W2](lekcja_01.md#w2) |
| L01-07 | Deploy chatbota na Vercel — publiczny link w internecie | 18 | [W3](lekcja_01.md#w3) |

## 02. Inżynieria promptów

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L02-01 | Łańcuch myślenia, uczenie z przykładów i strukturalny format JSON | 24–26 | [W1](lekcja_02.md#w1) |
| L02-02 | Wpływ instrukcji na zachowanie agenta | 23, 27 | [W1](lekcja_02.md#w1) |
| L02-03 | Projektowanie instrukcji: persona, zasady, format wyjściowy | 27 | [W1](lekcja_02.md#w1) |
| L02-04 | Wymuszanie schematu JSON | 25, 29 | [W2](lekcja_02.md#w2) |
| L02-05 | Atak i obrona przed wstrzykiwaniem promptów | 28, 31 | [W3](lekcja_02.md#w3) |

## 03. Narzędzia – ręce agenta

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L03-01 | Mechanizm wywoływania funkcji: jak model widzi narzędzia | 35–36, 40 | [W1](lekcja_03.md#w1) |
| L03-02 | Google Search grounding — agent szuka w internecie | 37–38, 40 | [W1](lekcja_03.md#w1) |
| L03-03 | Vercel AI SDK: typowane narzędzia, streamText, generateText, structured output | 35, 44 | [W3](lekcja_03.md#w3) |
| L03-04 | Implementacja: Google Search, Nano Banana 2, analiza zdjęć i screenshotów (Vision) | 37, 40, 42 | [W2](lekcja_03.md#w2) |
| L03-05 | Multi-tool agent — wiele narzędzi na jednym endpoincie | 44 | [W3](lekcja_03.md#w3) |

## 04. Pętla rozumowania (ReAct)

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L04-01 | Wzorzec ReAct: decyzje krok po kroku | 48, 55 | [W2](lekcja_04.md#w2) |
| L04-02 | Zarządzanie stanem między krokami | 54–55 | [W2](lekcja_04.md#w2) |
| L04-03 | 8 nowych narzędzi API: pogoda, waluty, święta, Wikipedia, kalkulator, czas, notatki, diagnostyka | 50, 53 | [W1](lekcja_04.md#w1) |
| L04-04 | Agent ReAct: maxSteps, obsługa błędów i limity iteracji | 52, 55–56 | [W2](lekcja_04.md#w2) |
| L04-05 | Asystent podróży: dane z 5 źródeł i dashboard z live data | 49, 51, 57 | [W3](lekcja_04.md#w3) |

## 05. Agent pamięta – baza danych SQL na Supabase

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L05-01 | Dlaczego agent zapomina? RAM a baza danych | 61 | [W1](lekcja_05.md#w1) |
| L05-02 | Supabase — baza PostgreSQL w chmurze | 62, 66 | [W1](lekcja_05.md#w1) |
| L05-03 | Demo: prowadzący zakłada projekt Supabase na żywo | 66 | [W1](lekcja_05.md#w1) |
| L05-04 | Dashboard: New Project i Create Table | 66 | [W1](lekcja_05.md#w1) |
| L05-05 | Zapis rozmów w Supabase — pamięć przetrwa F5 | 68 | [W2](lekcja_05.md#w2) |
| L05-06 | Personalizacja: user_profiles i preferencje JSONB | 63, 70 | [W3](lekcja_05.md#w3) |
| L05-07 | Lista rozmów /history | 64, 68 | [W2](lekcja_05.md#w2) |

## 06. Agent zna twoją firmę: baza danych RAG z Supabase pgvector

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L06-01 | RAG: wyszukaj → dołącz → odpowiedz z faktów | 74–75 | [W1](lekcja_06.md#w1) |
| L06-02 | Embeddingi i wyszukiwanie znaczenia | 75, 79 | [W1](lekcja_06.md#w1) |
| L06-03 | Supabase pgvector: Extensions → Enable | 79 | [W1](lekcja_06.md#w1) |
| L06-04 | Włączenie pgvector w Dashboardzie i zapytanie SQL | 79 | [W1](lekcja_06.md#w1) |
| L06-05 | /upload: tekst → chunki → embeddingi → Supabase | 76, 81 | [W2](lekcja_06.md#w2) |
| L06-06 | searchKnowledge — wyszukiwanie w bazie firmy | 82–83 | [W3](lekcja_06.md#w3) |
| L06-07 | Cytowanie źródeł i odmowa, gdy brakuje danych | 77–78, 83–84 | [W3](lekcja_06.md#w3) |

## 07. Agent dla wielu osób: autentykacja i multi-user, izolacja danych

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L07-01 | Dlaczego logowanie? Prywatność, personalizacja, bezpieczeństwo | 87 | [W1](lekcja_07.md#w1) |
| L07-02 | Supabase Auth — logowanie i konta użytkowników | 88–89, 92 | [W1](lekcja_07.md#w1) |
| L07-03 | Multi-tenancy — jeden agent, wielu użytkowników, izolowane dane | 88–90, 94 | [W2](lekcja_07.md#w2) |
| L07-04 | /login: e-mail i hasło (Supabase Auth) | 92 | [W1](lekcja_07.md#w1) |
| L07-05 | Prywatne rozmowy: izolacja danych per user | 90–91, 94 | [W2](lekcja_07.md#w2) |
| L07-06 | Personalizacja: powitanie po imieniu i preferencje per user | 94 | [W2](lekcja_07.md#w2) |
| L07-07 | Google OAuth: logowanie, imię i avatar | 95–96 | [W3](lekcja_07.md#w3) |

## 08. Agent wykonuje misje – scenariusze biznesowe

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L08-01 | Od pytań do misji — agent jako pracownik | 100 | [W1](lekcja_08.md#w1) |
| L08-02 | Projektowanie misji: cel → narzędzia → format → prompt | 101 | [W3](lekcja_08.md#w3) |
| L08-03 | 3 gotowe scenariusze i 1 własny | 102, 105, 107, 109 | [W3](lekcja_08.md#w3) |
| L08-04 | E-mail triage: 5 maili, kategorie, priorytety i drafty | 104–105 | [W1](lekcja_08.md#w1) |
| L08-05 | Generator raportów: research, analiza, sekcje i źródła | 106–107 | [W2](lekcja_08.md#w2) |
| L08-06 | Analiza konkurencji: 3 firmy, tabela i rekomendacja | 107 | [W2](lekcja_08.md#w2) |
| L08-07 | Własny scenariusz pracy lub życia | 109 | [W3](lekcja_08.md#w3) |

## 09. Agent pracuje, gdy śpisz – cron jobs i webhooks

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L09-01 | Agent pasywny a działanie bez rozmowy | 113 | [W1](lekcja_09.md#w1) |
| L09-02 | Cron jako uruchomienie o zadanej porze | 113–115, 120 | [W2](lekcja_09.md#w2) |
| L09-03 | Webhook jako reakcja na zdarzenie | 113, 121–122 | [W3](lekcja_09.md#w3) |
| L09-04 | /api/cron/morning: pogoda, waluty, podsumowanie i zapis w Supabase | 118 | [W1](lekcja_09.md#w1) |
| L09-05 | Cron na Vercel: vercel.json i deploy | 115, 120 | [W2](lekcja_09.md#w2) |
| L09-06 | /api/webhook: zdarzenia, analiza i reakcja | 121–122 | [W3](lekcja_09.md#w3) |
| L09-07 | /briefings: dashboard i historia automatycznych raportów | 116, 122 | [W3](lekcja_09.md#w3) |

## 10. Bezpieczeństwo i zabezpieczenia: AI prompt injection, AI red teaming

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L10-01 | Zagrożenia: wstrzykiwanie promptów, wyciek danych, eksplozja kosztów | 126–127 | [W1](lekcja_10.md#w1) |
| L10-02 | Zabezpieczenia agenta | 128, 133–135 | [W2](lekcja_10.md#w2) |
| L10-03 | Red teaming: indirect injection, prompt extraction, data exfiltration | 126, 131–132 | [W1](lekcja_10.md#w1) |
| L10-04 | Obrona wielowarstwowa: walidacja inputu, filtr outputu, 50 msg/h per user | 128, 130, 133 | [W2](lekcja_10.md#w2) |
| L10-05 | Budżet: api_usage w Supabase i 10k tokenów/dzień per user | 130, 134–135 | [W3](lekcja_10.md#w3) |
| L10-06 | /admin/security: logi, alerty i top użytkownicy | 129, 135 | [W3](lekcja_10.md#w3) |

## 11. Agent jest produktem – landing page, monitoring, polish

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L11-01 | Od projektu do produktu: landing, domena i monitoring | 139–140 | [W1](lekcja_11.md#w1) |
| L11-02 | Landing dla niezalogowanych: nazwa, opis i CTA „Zacznij za darmo” | 141, 144 | [W1](lekcja_11.md#w1) |
| L11-03 | /admin/dashboard: wykresy Recharts, użytkownicy, rozmowy, tokeny i koszty | 142, 145–146 | [W2](lekcja_11.md#w2) |
| L11-04 | Custom domain na Vercel: CNAME i SSL | 147–148 | [W3](lekcja_11.md#w3) |
| L11-05 | Polish: og:image, favicon, PWA manifest i przełącznik ciemny/jasny | 147–148 | [W3](lekcja_11.md#w3) |

## 12. Prezentacje finałowe + warsztaty z feedbackiem

| ID | Punkt programu — skrót | PPTX | Instrukcja |
|---|---|---|---|
| L12-01 | Podsumowanie drogi od chatbota do produktu | 152 | [W1](lekcja_12.md#w1) |
| L12-02 | Kierunki: MCP, multi-agent, Voice AI, Stripe i własny produkt | 160, 162 | [W1](lekcja_12.md#w1) |
| L12-03 | Prezentacja agenta: demo, funkcja, własny scenariusz i refleksja | 153–154, 157 | [W1](lekcja_12.md#w1) |
| L12-04 | Feedback w parach według checklisty i karta feedbacku | 155–156, 159 | [W2](lekcja_12.md#w2) |
| L12-05 | Quick fix: jeden błąd z feedbacku, AI assistant i deploy | 158, 161 | [W3](lekcja_12.md#w3) |

## Co przywrócono z mapy rozbieżności v2

AI SDK i streaming; pokaz gotowego agenta i konfiguracja L01; nazwa CoT; komplet ośmiu narzędzi i pięciu źródeł z dashboardem live; Supabase Dashboard; Google OAuth z imieniem/avatarem; trzy klasy ataków, filtrowanie wyjścia i 50/h; api_usage z 10k/dzień; panel z logami, alertami i top użytkowników; Recharts z czterema metrykami; domena/SSL; og:image, favicon, manifest i jasny/ciemny motyw; oddzielne demo, feedback i quick fix.

Wariant A/B modeli, porównania kontekstu/RAG, rozbudowane approval oraz obowiązkowy pilotaż nie wypierają sylabusa. Pozostały w niezmienionej poprzedniej wersji, zachowanej jako kandydat do przyszłej edycji. Sześciu ustaleń wycofanych w mapie v2 nie przywracano jako wymagań: nie dopisano gwarancji JSON, trzech kont, prawdziwych danych/trzech screenshotów, trzech zablokowanych ataków, poprawki w 15 minut ani obowiązkowego RL.

Źródłowy Google Docs, wcześniejsze PPTX/PDF i gałąź edycja-02-openrouter nie zostały nadpisane. Jest to nowa, osobna wersja materiału.
