# AI Agents 02 — od gotowego AI do własnego systemu

**Paweł Paruzel / Laba · OpenRouter · 12 spotkań × 120 minut · 36 warsztatów**

Nie budujemy kolejnego czatu tylko po to, żeby mieć własny czat. Budujemy **Mission Desk**: aplikację, która przyjmuje zadanie, korzysta z uprawnionych danych, przygotowuje wynik, pokazuje dowody i zatrzymuje się przed działaniem wymagającym zgody. Nazwa jest robocza, nie narzucony branding.

Gotowe aplikacje AI mogą już oferować wyszukiwanie, pliki, pamięć i narzędzia. Nie udajemy, że tego nie ma. Na kursie porównujemy gotowe rozwiązanie z własnym systemem na tym samym zadaniu. Własny system musi uzasadnić swój sens: integracją z konkretnym procesem, kontrolą danych, powtarzalnością lub mierzalnym wynikiem. Czasem najlepsza decyzja brzmi: nie buduj.

## Start

1. [START.md](START.md) — przygotowanie i pierwsze polecenie.
2. [KONTRAKT_TECHNICZNY.md](KONTRAKT_TECHNICZNY.md) — wspólna architektura, bezpieczeństwo, modele i testy.
3. [LABA_OPENROUTER.md](LABA_OPENROUTER.md) — klucze i organizacja dostępu.
4. Otwórz odpowiedni plik `lekcja_XX/WY.md`. Rozwijaj jeden projekt w `workspace/moj-agent`, nie osobną aplikację do każdego ćwiczenia.

## Mapa pracy

| Lekcja | Trzy warsztaty | Namacalny efekt |
|---|---|---|
| 01 Fundament | [W1](lekcja_01/W1.md) środowisko i baseline · [W2](lekcja_01/W2.md) OpenRouter i wynik · [W3](lekcja_01/W3.md) bezpieczny deploy | Własny link i pierwszy dowód działania |
| 02 Instrukcje | [W1](lekcja_02/W1.md) kontrakt · [W2](lekcja_02/W2.md) JSON i reguły · [W3](lekcja_02/W3.md) test A/B modeli | Porównanie jakości, nie konkurs długich promptów |
| 03 Narzędzia | [W1](lekcja_03/W1.md) search i własne tools · [W2](lekcja_03/W2.md) vision + grafika · [W3](lekcja_03/W3.md) wspólny agent | Wynik z danych, pliku i narzędzi |
| 04 ReAct | [W1](lekcja_04/W1.md) ograniczona pętla · [W2](lekcja_04/W2.md) misja podróży · [W3](lekcja_04/W3.md) awarie i STOP | Przebieg zadania widoczny w osi czasu |
| 05 Pamięć | [W1](lekcja_05/W1.md) bezpieczna baza · [W2](lekcja_05/W2.md) historia · [W3](lekcja_05/W3.md) kontrolowana pamięć | Kontynuacja po odświeżeniu i prawo do zapomnienia |
| 06 Wiedza | [W1](lekcja_06/W1.md) kontekst kontra RAG · [W2](lekcja_06/W2.md) ingestia i retrieval · [W3](lekcja_06/W3.md) cytaty i braki | Odpowiedź 490, nie archiwalne 440 |
| 07 Dostęp | [W1](lekcja_07/W1.md) wielu użytkowników · [W2](lekcja_07/W2.md) test A/B RLS · [W3](lekcja_07/W3.md) onboarding i OAuth | Oddzielne dane dwóch użytkowników |
| 08 Misje | [W1](lekcja_08/W1.md) poczta i szkice · [W2](lekcja_08/W2.md) raport i konkurencja · [W3](lekcja_08/W3.md) własny proces + zgoda | Zadanie w systemie, nie tylko odpowiedź w czacie |
| 09 Automatyka | [W1](lekcja_09/W1.md) wykonawca zadań · [W2](lekcja_09/W2.md) cron · [W3](lekcja_09/W3.md) webhook i duplikaty | Jedno zdarzenie, jeden kontrolowany skutek |
| 10 Bezpieczeństwo | [W1](lekcja_10/W1.md) red team · [W2](lekcja_10/W2.md) naprawa · [W3](lekcja_10/W3.md) budżet i panel | Dowody obrony oraz opis pozostałych ryzyk |
| 11 Produkt | [W1](lekcja_11/W1.md) pierwsza wartość · [W2](lekcja_11/W2.md) jakość i koszt · [W3](lekcja_11/W3.md) UX i mobile | Produkt zrozumiały bez tłumaczenia autora |
| 12 Finał | [W1](lekcja_12/W1.md) test w parach · [W2](lekcja_12/W2.md) poprawka · [W3](lekcja_12/W3.md) pilotaż | Demo, wynik testu i plan dalszej pracy |

## Jak nie utknąć

Każdy warsztat ma zakres **CORE**, testy odbioru, ścieżkę ratunkową i **STRETCH**. CORE wystarcza do przejścia dalej. STRETCH nie jest obowiązkową pracą domową. Po każdej lekcji zapisz działający commit i własny checkpoint. Prowadzący przygotowuje sprawdzone checkpointy przed kursem — ten pakiet nie udaje, że już je wdrożono.

## Co zawiera repo

Instrukcje dla uczestnika i asystenta kodowania, fikcyjne dane, schema wyniku, pomocniczy klient OpenRouter, preflight i testy offline. To nie jest kompletna gotowa aplikacja po L12. Aplikację uczestnik buduje z asystentem w trakcie ćwiczeń.

`npm test` sprawdza pomocniczy kod na kontrolowanych odpowiedziach, a nie jakość prawdziwego modelu. `npm run preflight` sprawdza konfigurację i katalog modeli. Wywołania płatne uruchamia dopiero `npm run live`. Brak klucza Laba oznacza, że nie da się potwierdzić limitów konta ani działania modeli na tym kluczu.

Materiały przygotowane 11.10.2026. Nie zmieniono plików edycji 1. Źródła techniczne: [MODELE_I_ZRODLA.md](MODELE_I_ZRODLA.md). Różnice względem prezentacji: [MAPA_SLAJDOW.md](MAPA_SLAJDOW.md).
