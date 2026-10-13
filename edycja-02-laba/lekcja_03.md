# Lekcja 03. Narzędzia – ręce agenta

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Search, Nano Banana 2 i vision w jednym agencie AI SDK.

## Zakres z potwierdzonego programu

- Mechanizm wywoływania funkcji: jak model widzi narzędzia
- Google Search grounding — agent szuka w internecie
- Vercel AI SDK: typowane narzędzia, streamText, generateText, structured output
- Implementacja: Google Search, Nano Banana 2, analiza zdjęć i screenshotów (Vision)
- Multi-tool agent — wiele narzędzi na jednym endpoincie

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 3. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Function calling i wyszukiwanie

**Zakres obowiązkowy · orientacyjnie 20 min.**

Omów nazwany w programie Google Search grounding: model korzysta z pobranych wyników, a nie wyłącznie z wiedzy zapisanej w wagach. Realizacja przechodzi przez OpenRouter. Dla zgodnego modelu Gemini sprawdź obsługę natywnego wyszukiwania. Inny silnik pluginu web jest funkcjonalnym zamiennikiem, nie wolno go podpisywać „Google Search”. W rejestrze próby zapisz model, silnik i dostęp na kluczu Laba.
W AI SDK tool ma nazwę, opis, inputSchema i execute. Backend waliduje argumenty i wykonuje żądanie, a wynik wraca do modelu. Asystent nie powinien dostać fetchAnyUrl, dowolnego SQL ani poleceń shell. Wyszukiwanie uruchamiaj tylko, kiedy zadanie wymaga internetu.
Zapytaj o aktualny publiczny fakt. Zweryfikuj przynajmniej jedno twierdzenie w źródle. UI pokazuje URL i datę z metadanych; brak źródła lub nieobsługiwany tryb nie może skutkować wymyślonym cytatem. Bibliografia techniczna jest w ZRODLA.md.

### Polecenie do asystenta

```text
W AI SDK zdefiniuj typowane narzędzie wyszukiwania przez OpenRouter. Pokaż wywołanie, sprawdzone argumenty, wynik i źródła. Odróżnij native Google grounding od innego silnika.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Widać faktyczne wywołanie funkcji i wynik zwrócony do modelu.
- [ ] Źródło jest otwieralne i wspiera sprawdzane twierdzenie.
- [ ] Brak wyników oraz niepoprawne argumenty dają kontrolowany błąd.

**Gotowe, gdy:** Narzędzie działa; odpowiedź ma rzeczywiste źródło i datę pobrania.

<a id="w2"></a>
## W2. Nano Banana 2 i Vision

**Zakres obowiązkowy · orientacyjnie 25 min.**

Źródło Laba wymienia Nano Banana 2, nie dowolny generator. Katalog OpenRouter opisuje go jako Gemini 3.1 Flash Image Preview; kandydat ID do próby: google/gemini-3.1-flash-image-preview. Potwierdzenie wpisu w katalogu nie dowodzi dostępu na kluczu Laba. Brak modelu oznacza brak wykonanej próby, a nie zaliczenie innym modelem bez uzgodnienia.
Vision: dodaj własny testowy obraz ze znaną liczbą i napisem. Zweryfikuj wynik odczytu; nieczytelny fragment oznacz jako brak. Dodaj upload oraz wklejenie screenshota. Na serwerze sprawdzaj MIME, rzeczywisty format i limit rozmiaru; nie przyjmuj dowolnego URL do wewnętrznego fetch.
Generacja: zleć prostą ilustrację własnego briefu, pokaż faktycznie zwrócone dane obrazu i umożliw pobranie. Oddziel obsługę obrazu na wejściu od obrazu na wyjściu. Obie funkcje są obowiązkowe; nie przenoś grafiki do bonusu z powodu braku dostępu.

### Polecenie do asystenta

```text
Dodaj Vision i generowanie Nano Banana 2 przez OpenRouter. Analiza oraz generacja mają osobne modele i kontrakty. Sprawdź typ i rozmiar pliku, odczyt liczb i zwrócony obraz.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Screenshot został przeanalizowany z kontrolą napisu i liczby.
- [ ] Nano Banana 2 zwrócił obraz; pobrany plik się otwiera.
- [ ] Za duży plik, odmowa i brak obrazu są obsłużone.

**Gotowe, gdy:** Analiza i wygenerowany obraz działają; model jest nazwany zgodnie z próbą.

<a id="w3"></a>
## W3. Multi-tool na jednym endpoincie

**Zakres obowiązkowy · orientacyjnie 25 min.**

Zbuduj jeden endpoint agenta, który dysponuje nazwanymi narzędziami. Wspólny UI pokazuje wiadomości i zdarzenia wykonania. Osobne niskopoziomowe serwisy obrazu czy wyszukiwania mogą pozostać adapterami, lecz użytkownik nie musi ręcznie wybierać oddzielnej aplikacji do każdego typu zadania.
Użyj streamText dla odpowiedzi czatu, generateText dla zakończonego podsumowania i structured output dla metadanych wyniku. Potwierdź obecność oraz wykonanie tych mechanizmów; HTTP helper nie zastępuje wymaganego frameworka.
Testy: zwykłe powitanie bez tools; publiczny research; analiza załączonego screena; nowa grafika; nieznany tool; niepoprawny input. Nie wysyłaj wiadomości ani nie dokonuj zakupów. Bezpieczny, typowany tool lokalny można dołożyć jako demonstrację, ale pełny katalog ośmiu funkcji jest zadaniem L04.

### Polecenie do asystenta

```text
Połącz narzędzia na /api/agent przez AI SDK. Użyj streamText, generateText i structured output. Pokaż wybór narzędzia oraz bezpieczne błędy; nie twórz trzech odrębnych agentów.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Jedna ścieżka /api/agent dobiera właściwe narzędzie.
- [ ] streamText działa strumieniowo; generateText i schema mają własny test.
- [ ] Błędne wywołanie jest odrzucone; nie ma nieograniczonego wykonania kodu.

**Gotowe, gdy:** Jeden endpoint obsługuje narzędzia, streaming i wynik strukturalny.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
