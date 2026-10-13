# Lekcja 04. Pętla rozumowania (ReAct)

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Osiem narzędzi, pętla z limitem i pięć źródeł na dashboardzie.

## Zakres z potwierdzonego programu

- Wzorzec ReAct: decyzje krok po kroku
- Zarządzanie stanem między krokami
- 8 nowych narzędzi API: pogoda, waluty, święta, Wikipedia, kalkulator, czas, notatki, diagnostyka
- Agent ReAct: maxSteps, obsługa błędów i limity iteracji
- Asystent podróży: dane z 5 źródeł i dashboard z live data

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 4. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Osiem narzędzi: pełny zestaw

**Zakres obowiązkowy · orientacyjnie 25 min.**

Obowiązkowy zestaw nie jest katalogiem do swobodnego wyboru. Zaimplementuj: getWeather, getExchangeRate, getHolidays, searchWikipedia, calculate, getTime, notes (zapis i odczyt w jednym narzędziu) i diagnostics. Szczegółowe kontrakty i źródła propozycji są w NARZEDZIA_L04.md.
Pogoda, waluty, święta, Wikipedia i czas mają pięć rozróżnialnych zewnętrznych źródeł. Kalkulator to deterministyczna funkcja, notatki to własna usługa, diagnostyka raportuje bezpieczny stan — nie są trzema dodatkowymi zewnętrznymi dostawcami. Narzędzie notatek przed L05 może działać w kontrolowanej pamięci sesji, jawnie nietrwałej; trwałość dochodzi z Supabase.
Każde narzędzie ma typowane wejście, wynik, źródło lub informację „lokalne”, timeout i przewidywalny błąd. Kalkulator nie wykonuje eval; diagnostyka nie wypisuje sekretów. Gdy API nie działa, test awarii nie zalicza testu live. Nie skracaj listy funkcji w celu zmieszczenia lekcji.

### Polecenie do asystenta

```text
Dodaj 8 typowanych tools: pogoda, waluty, święta, Wikipedia, kalkulator, czas, notatki i diagnostyka. Każde ma execute, walidację oraz test wyniku i błędu.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] W rejestrze jest komplet ośmiu usług zgodnych z nazwami sylabusa.
- [ ] Każda ma test poprawny i negatywny; wyniki nie są wpisane z góry.
- [ ] Wywołania sieciowe używają stałych, dozwolonych serwisów.

**Gotowe, gdy:** Osiem nazwanych narzędzi ma implementację i zapisane wyniki testów.

<a id="w2"></a>
## W2. ReAct: stan, limit i obsługa błędów

**Zakres obowiązkowy · orientacyjnie 20 min.**

Pętla: cel → decyzja → wykonanie narzędzia → obserwacja → aktualizacja stanu. Nowa decyzja korzysta z wyniku poprzedniej, nie z wymyślonego śladu. Zachowaj poprawne powiązanie identyfikatorów tool calls i wyników.
Nazwany w sylabusie maxSteps pozostaje limitem kroków. API biblioteki może używać stopWhen i funkcji kontroli liczby kroków — mapowanie do zainstalowanej wersji trzeba zapisać i sprawdzić. Nie instaluj starego SDK tylko po to, aby przywrócić nazwę parametru. Przykład z dokumentacji AI SDK 6: stopWhen: stepCountIs(N); nie mieszaj go bez sprawdzenia z inną wersją.
Stan obejmuje run_id, cel, wykonane narzędzia, źródła, błędy i powód końca. Testowy adapter stale żądający kolejnego kroku musi zatrzymać się przy N. Powtórz próbę przy mniejszym limicie. Obsłuż awarię i brak postępu; nie ukrywaj ich jako sukces. Timeout i liczba narzędzi są dodatkowymi kontrolami, nie zamiennikami limitu iteracji.

### Polecenie do asystenta

```text
Dodaj pętlę ReAct w AI SDK. Udokumentuj odpowiednik maxSteps w użytej wersji. Zachowuj stan, licz kroki i tool calls oddzielnie; testuj limit, timeout i błąd narzędzia.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Wynik narzędzia wpływa na kolejny krok.
- [ ] Przy limicie N nie wykonuje się krok N+1.
- [ ] 404, timeout, zły format i STOP dają jawny status.

**Gotowe, gdy:** Agent wykorzystuje wynik poprzedniego kroku i zatrzymuje się na limicie.

<a id="w3"></a>
## W3. Podróż: pięć źródeł i dashboard live

**Zakres obowiązkowy · orientacyjnie 25 min.**

Przykład prowadzącego: dwa miasta, ten sam termin w zasięgu prognozy. Agent dobiera wywołania: pogoda; kurs do wspólnej waluty; święta kraju; kontekst miejsca z Wikipedii; czas w strefie. Pięć źródeł oznacza pięć identyfikowalnych serwisów/dokumentów, nie pięć powtórzeń jednego żądania ani liczbę miast. Konkretne API są propozycją techniczną w NARZEDZIA_L04.md.
Zbuduj /dashboard z pięcioma kartami danych, nazwą i adresem źródła, datą informacji oraz fetched_at. Dodaj odświeżenie i czytelne oznaczenie cache/błędu. Oś wykonania agenta może być obok, ale sama oś /runs nie zastępuje dashboardu danych.
Próba live wymaga faktycznych odpowiedzi wszystkich pięciu źródeł. REPLAY lub fixture mogą ratować demonstrację awarii, ale nie są dowodem aktualnych danych. Brak świąt w przedziale to poprawny pusty wynik; termin poza prognozą to brak prognozy. Nie rezerwuj podróży, nie podawaj zmyślonych cen noclegu.

### Polecenie do asystenta

```text
Zbuduj asystenta podróży: pogoda, waluty, święta, Wikipedia i czas z 5 odrębnych źródeł. Dodaj dashboard live, źródła i fetched_at. Testuj odświeżenie oraz awarię.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Pięć odrębnych source_id ma odpowiedzi z wywołań live.
- [ ] Dashboard pokazuje wartości, jednostki, źródła i czas pobrania.
- [ ] Odświeżenie wykonuje kontrolowany odczyt; awaria źródła daje błąd/partial.

**Gotowe, gdy:** Dashboard pokazuje pięć rzeczywistych źródeł; awaria nie daje fikcyjnych danych.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
