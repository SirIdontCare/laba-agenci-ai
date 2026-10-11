# Raport weryfikacji — 11.10.2026

## Wykonano

Przygotowano 36 oddzielnych warsztatów w 12 modułach. Materiały mają własny katalog `edycja-02` i gałąź `edycja-02-openrouter`; nie zastępują pierwszej edycji.

Uruchomiono `npm test` dla pomocniczego kodu w środowisku Node.js **22.16.0**. Wynik: **35 testów, 35 PASS, 0 FAIL, 0 skipped**. Wszystkie odpowiedzi dostawcy w tych testach były kontrolowanymi fixture — nie wykonano płatnych wywołań.

Sprawdzane obszary: stały endpoint OpenRouter, brak klucza i błędny profil, limity wejścia/wyjścia, błędy HTTP i JSON, odmowa/ucięcie, wymaganie obsługi parametrów, osobny katalog embeddingów, brak ujawniania sekretu w błędach, anulowanie, porównanie Bearer, podpis webhooka i okno czasowe, walidacja triage/source_id oraz agregacja kosztów z brakami. Zbiory development i holdout mają rozłączne identyfikatory.

Porównano nową strukturę z dostarczoną prezentacją 167 slajdów i sporządzono MAPA_SLAJDOW.md. PowerPoint nie został w tym kroku zmieniony. Dane testowe zachowują fikcyjne ceny Start 490/Zespół 990 i archiwum 440.

## Nie wykonano — wymagane przed prowadzeniem kursu

- Wywołania modeli na kluczu Laba: **NOT RUN**, klucz nie został udostępniony.
- Próby tools, JSON, web search, vision, grafiki i embeddingów na koncie Laba: **NOT RUN**. Katalog/dokumentacja nie zastępują próby dostępu i billing.
- Migracja SQL i testy RLS w rzeczywistym Supabase: **NOT RUN**. W repo jest wzorzec pierwszych tabel, nie uruchomiona baza.
- Pełna aplikacja Next.js, build, deploy, cron i testy dwóch kont: **NOT RUN**. To przedmiot warsztatów; pakiet nie zawiera gotowej aplikacji końcowej ani udawanych checkpointów.
- Próba czasowa z osobą na poziomie grupy oraz równoczesne użycie przez całą grupę: **NOT RUN**.

Prowadzący powinien przed zajęciami przygotować sprawdzony starter, lockfile oraz checkpointy i wykonać checklistę Laba. `npm run check` służy do ponownego sprawdzenia kompletności i lokalnych linków po pobraniu. `npm run preflight` nie generuje odpowiedzi. `npm run live` uruchamia jeden krótki test tekstu i może kosztować.

## Interpretacja

35/35 dotyczy wyłącznie testowanego pomocniczego kodu, NIE jakości modeli, bezpieczeństwa pełnej aplikacji ani gotowości produkcyjnej systemu uczestnika. Zmiana modelu, kodu lub konfiguracji wymaga ponownego testu właściwego zakresu.
