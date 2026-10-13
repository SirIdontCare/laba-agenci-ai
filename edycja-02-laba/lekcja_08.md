# Lekcja 08. Agent wykonuje misje – scenariusze biznesowe

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Poczta, raport, konkurencja oraz własna misja.

## Zakres z potwierdzonego programu

- Od pytań do misji — agent jako pracownik
- Projektowanie misji: cel → narzędzia → format → prompt
- 3 gotowe scenariusze i 1 własny
- E-mail triage: 5 maili, kategorie, priorytety i drafty
- Generator raportów: research, analiza, sekcje i źródła
- Analiza konkurencji: 3 firmy, tabela i rekomendacja
- Własny scenariusz pracy lub życia

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 8. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Triage pięciu wiadomości

**Zakres obowiązkowy · orientacyjnie 20 min.**

Misja ma cel, narzędzia, format i prompt. Załaduj pięć fikcyjnych wiadomości: zapytanie o cenę, problem logowania, pytanie o płatność, niejasna prośba i prośba z wstrzykniętą instrukcją. Każda ma własne ID, kategorię, priorytet i draft odpowiedzi.
Kryteria priorytetu zapisuje autor procesu; nie oceniaj potrzeby klienta według elegancji jego języka. Brak informacji o płatności nie daje prawa do potwierdzenia przelewu. W wiadomości o cenie użyj właściwego źródła. Oznacz braki wymagające kontroli.
Strona /email-triage pokazuje kolejkę i umożliwia skopiowanie szkicu. Wklejenie maili zgodnie z sylabusem nie wymaga integracji Gmail i nie oznacza wysyłki. Wyniki zapisuj dla właściciela. W razie błędu jednej wiadomości nie gub wyników pozostałych i nie podpisuj serii pełnym sukcesem.

### Polecenie do asystenta

```text
Dodaj /email-triage: 5 maili → kategoria, priorytet i szkic odpowiedzi. Użyj AI SDK i wiedzy ze źródeł. Zachowaj właściciela danych; niczego automatycznie nie wysyłaj.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Pięć wejść ma pięć identyfikowalnych wyników.
- [ ] Kategorie, priorytety i szkice są widoczne i sprawdzone.
- [ ] Brak informacji jest jawny; nie nastąpiła automatyczna wysyłka.

**Gotowe, gdy:** Każdy z pięciu maili ma kategorię, priorytet i szkic albo jawny błąd.

<a id="w2"></a>
## W2. Raport oraz porównanie trzech firm

**Zakres obowiązkowy · orientacyjnie 30 min.**

Ten plik obejmuje dwa nazwane warsztaty sylabusa. A: użytkownik podaje temat; agent szuka informacji, analizuje je i zwraca raport: podsumowanie, fakty, analiza, wnioski i źródła. Użyj wyszukiwania z L03 oraz generateText. Fakty i wnioski mają być rozróżnione.
B: użytkownik podaje trzy firmy oraz wspólne kryteria. Agent pobiera informacje i tworzy tabelę porównawczą, a następnie rekomendację wynikającą z tych kryteriów. Brak cennika to brak danych, nie zero. Każda istotna wartość ma źródło i datę sprawdzenia. Nie kopiuj oczekiwanej rekomendacji do promptu testowanego modelu.
Fikcyjne firmy służą jednostkowym testom tabeli. Zaliczenie warsztatu researchu wymaga także rzeczywistego pobrania publicznych informacji; nie przedstawiaj fixture jako wyszukiwania. OpenRouter jest zatwierdzonym przez Pawła kanałem modeli; silnik search zapisujemy zgodnie z faktycznym użyciem. Dostęp do danych konkurentów ogranicz do legalnie dostępnych publicznych źródeł.

### Polecenie do asystenta

```text
Dodaj dwa presety: raport z internetowego researchu oraz analizę 3 firm. Wymagaj sekcji, źródeł, tych samych kryteriów i uzasadnionej rekomendacji. Nie zgaduj brakujących cen.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Raport zawiera sekcje, wnioski i faktyczne źródła.
- [ ] Tabela obejmuje trzy firmy i jednolite kryteria.
- [ ] Rekomendacja wynika z danych; brak potwierdzenia nie jest zastępowany domysłem.

**Gotowe, gdy:** Działają oba scenariusze: raport i tabela trzech firm z rekomendacją.

<a id="w3"></a>
## W3. Twój własny scenariusz

**Zakres obowiązkowy · orientacyjnie 25 min.**

Uczestnik wybiera zadanie przydatne w swojej pracy albo życiu. Nie wymuszamy kolejnego ogólnego czatu. Przykłady: porównanie ofert na podstawie danych, podsumowanie własnych notatek, przygotowanie briefu lub raport z określonego źródła.
Opisz input, cel, narzędzia, format odpowiedzi, odbiorcę i zakazane działania. Dołącz scenariusz do tego samego silnika aplikacji, nie twórz osobnego projektu. Przetestuj wykonanie z pełnymi danymi oraz brakującym elementem. Zapisz wynik, zakres ręcznej kontroli i ograniczenie.
Obowiązkiem jest własny scenariusz, a nie konkretna implementacja workflow zatwierdzania. Gdy zadanie miałoby zapisywać dane lub kontaktować się z innymi, użyj sandboxa i świadomej zgody człowieka; nie wyłączaj ochrony. Zaawansowane stany approval i porównanie modeli pozostają w zachowanym wariancie rozwojowym, aby nie wypierać trzech obiecanych scenariuszy.

### Polecenie do asystenta

```text
Dodaj mój scenariusz do istniejącej aplikacji. Zapisz cel, dostępne narzędzia, format i prompt. Zbuduj wynik i przetestuj normalny przypadek oraz brak danych.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Opis zawiera cel → narzędzia → format → prompt.
- [ ] Własna misja daje wynik w istniejącej aplikacji.
- [ ] Brak danych i niedozwolone działanie są obsłużone.

**Gotowe, gdy:** Własna misja działa od wejścia do sprawdzonego rezultatu.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
