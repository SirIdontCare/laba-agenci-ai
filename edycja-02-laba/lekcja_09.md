# Lekcja 09. Agent pracuje, gdy śpisz – cron jobs i webhooks

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Zaplanowany briefing i reakcja na webhook z historią.

## Zakres z potwierdzonego programu

- Agent pasywny a działanie bez rozmowy
- Cron jako uruchomienie o zadanej porze
- Webhook jako reakcja na zdarzenie
- /api/cron/morning: pogoda, waluty, podsumowanie i zapis w Supabase
- Cron na Vercel: vercel.json i deploy
- /api/webhook: zdarzenia, analiza i reakcja
- /briefings: dashboard i historia automatycznych raportów

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 9. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Morning briefing i zapis w Supabase

**Zakres obowiązkowy · orientacyjnie 20 min.**

Endpoint uruchamia misję bez otwartego interfejsu czatu. Konfiguracja zawiera uprawnionego właściciela, lokalizację, walutę i strefę czasu. Dane pobierają istniejące narzędzia L04. generateText tworzy krótkie podsumowanie dnia na podstawie wyników.
Tabela briefings ma id, owner_id, created_at, datę danych, źródła, content, status oraz trigger. Nie zapisuj pustego raportu jako sukcesu, gdy źródła nie odpowiedziały. Obowiązuje ochrona dostępu również do wyzwalacza; nie umieszczaj sekretu w URL.
Najpierw ręcznie uruchom kontrolowane wywołanie i potwierdź rekord. Ten test jest manual_test, a nie dowód działania harmonogramu. Prawdziwy cron dodamy w W2. Zadanie musi mieścić się w limitach wykonawcy; nie uruchamiaj niekontrolowanego zadania w tle po zakończeniu requestu.

### Polecenie do asystenta

```text
Dodaj /api/cron/morning: pogoda i waluty, podsumowanie przez AI SDK, zapis do briefings w Supabase. Oddziel źródła, daty i wynik błędu. Dostęp sprawdzaj przed kosztem.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Pogoda i waluty pochodzą z realnych źródeł, z datami.
- [ ] Podsumowanie zostało zapisane w briefings dla właściwej osoby.
- [ ] Brak uprawnienia i awaria źródła mają kontrolowany wynik.

**Gotowe, gdy:** Wywołanie endpointu tworzy rzeczywisty briefing zapisany w bazie.

<a id="w2"></a>
## W2. Cron job na Vercel

**Zakres obowiązkowy · orientacyjnie 20 min.**

Dodaj sekcję crons do vercel.json z path i schedule. Przykład 0 7 * * * oznacza 07:00 UTC; godzina w Polsce zależy od zmiany czasu. To konkretna konfiguracja przykładowa, nie wymóg źródła o dokładnej godzinie zajęć. Sprawdź częstotliwość i precyzję dozwoloną przez plan.
Serwer wymaga poprawnego Authorization z CRON_SECRET. Gdy sekret nie jest skonfigurowany, endpoint odmawia wykonania. Nie dopuszczaj wariantu „nikt nie zna adresu”. Sekret hostingu ustaw poza nagraniem. Wdróż kod i potwierdź obecność harmonogramu w projekcie.
Test ręczny dowodzi działania ścieżki, lecz nie scheduler. Dla testu planowego zachowaj actual_started_at, identyfikator wywołania i rekord briefingu. Do czasu wystąpienia zdarzenia status tej próby pozostaje OCZEKUJE. Zabezpiecz to samo okno zadania przed przypadkowym dubletem; nie rozsyłaj prawdziwych raportów do klientów w ćwiczeniu.

### Polecenie do asystenta

```text
Skonfiguruj cron Vercel dla /api/cron/morning. Wymagaj CRON_SECRET i użyj jawnej strefy UTC. Zapisz manual test oraz rzeczywiste planowe wywołanie oddzielnie.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Bez poprawnego sekretu nie ma generacji ani zapisu.
- [ ] Harmonogram po deployu jest widoczny.
- [ ] Faktyczne planowe wywołanie ma zapis trigger=cron; w oczekiwaniu nie wpisuj PASS.

**Gotowe, gdy:** Harmonogram jest wdrożony, a planowe wywołanie ma dowód w bazie i logu.

<a id="w3"></a>
## W3. Webhook i strona /briefings

**Zakres obowiązkowy · orientacyjnie 25 min.**

Webhook to żądanie od zewnętrznego nadawcy, a nie odliczanie czasu. Ustal testowy format: event_id, type i data. Obsłuż feedback lub alert. Zanim uruchomisz model, zweryfikuj nadawcę i strukturę. Sekret/podpis jest środkiem technicznym ochrony ćwiczenia; program nie wymaga budowania uniwersalnej bramki integracyjnej.
Przygotuj kontrolowanego nadawcę testowego, wyślij poprawne zdarzenie i zapisz analizę w tabeli zdarzeń/briefingów. Owner pochodzi z konfiguracji uwierzytelnionego nadawcy. Duplikat event_id nie powinien tworzyć drugiej reakcji. Awaria ma jawny status.
Strona /briefings pokazuje listę od najnowszych, datę, źródło wyzwolenia (cron/webhook/test), status oraz szczegóły raportu. Każdy widzi własne dane. To obowiązkowy dashboard historii, nie tylko rekord w Table Editor. Nie przedstawiaj sandboxowego webhooka jako istniejącej integracji z systemem firmy.

### Polecenie do asystenta

```text
Dodaj chroniony /api/webhook oraz /briefings. Zdarzenie testowe uruchamia analizę i zapis. Lista pokazuje datę, wyzwalacz i status; sprawdź dostęp oraz duplikat.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Poprawne zdarzenie daje analizę i zapis; zły podpis/token jest odrzucony.
- [ ] /briefings pokazuje historię i otwiera szczegół raportu.
- [ ] Duplikat nie tworzy drugiego skutku; obce konto nie widzi raportów.

**Gotowe, gdy:** Webhook wywołuje reakcję, a historia pokazuje raporty crona i zdarzenia.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
