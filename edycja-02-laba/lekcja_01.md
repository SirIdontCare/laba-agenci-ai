# Lekcja 01. Od LLM do agenta

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Chatbot Next.js przez AI SDK pod własnym linkiem.

## Zakres z potwierdzonego programu

- Czym jest agent AI w porównaniu z chatbotem i potokiem przetwarzania?
- Poziomy autonomii
- Demonstracja gotowego agenta w akcji
- Konfiguracja środowiska programistycznego
- Konfiguracja AI coding assistant: pisanie, modyfikowanie i debugowanie kodu
- Pierwsze wywołanie modelu Gemini przez Vercel AI SDK — chatbot od zera (Next.js)
- Deploy chatbota na Vercel — publiczny link w internecie

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 1. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Środowisko i asystent kodowania

**Zakres obowiązkowy · orientacyjnie 20 min.**

Prowadzący zaczyna od przygotowanego działającego agenta: cel → wywołanie narzędzia → wynik → odpowiedź. Pokazuje różnicę względem samego czatu i sztywnej sekwencji kroków. Na slajdzie jest makieta; demonstracja wymaga osobnej, uruchomionej aplikacji.
Uczestnik otwiera jeden katalog własnego projektu, sprawdza Node i Git, instaluje albo konfiguruje wybranego asystenta kodowania. Wspólna próba: zmień tytuł strony, uruchom ją, wywołaj kontrolowany błąd importu w kopii roboczej i poproś asystenta o diagnozę. Po naprawie sprawdź różnicę w plikach. Przygotowanie przed spotkaniem ułatwia start, lecz nie zastępuje ćwiczenia konfiguracji na L01.
Klucz OpenRouter od Laba wpisz lokalnie do .env.local, poza udostępnianym ekranem; nie podawaj go w prompcie. Wprowadzenie poziomów autonomii służy opisaniu, kto wybiera krok i kto zatwierdza skutek; skala ze slajdu jest pomocą prowadzącego, nie osobnym standardem sylabusa.

### Polecenie do asystenta

```text
Przeczytaj START.md. Skonfiguruj projekt Next.js i AI coding assistant. Pokaż jedną zmianę oraz kontrolowany błąd i naprawę. Nie odczytuj ani nie wypisuj sekretów.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Demo zawiera rzeczywiste narzędzie, nie wyłącznie tekst „wykonałem”.
- [ ] node --version i git --version działają; asystent widzi właściwy katalog.
- [ ] Zmiana strony działa; kontrolowany błąd został odtworzony i usunięty.

**Gotowe, gdy:** Środowisko działa; uczestnik wykonał zmianę i diagnozę błędu.

<a id="w2"></a>
## W2. Chatbot Next.js przez Vercel AI SDK

**Zakres obowiązkowy · orientacyjnie 25 min.**

Główna ścieżka jest obowiązkowo oparta na Vercel AI SDK i @openrouter/ai-sdk-provider. Czysty klient HTTP nie zalicza części AI SDK. Model tekstowy wybierz z dopuszczonej listy Laba; zachowaj model Gemini przez OpenRouter, jeżeli jest dostępny. To jawna zmiana dostępu do modeli zgodna z decyzją Pawła, opisana w REALIZACJA_TECHNICZNA.md.
Asystent tworzy Next.js App Router + TypeScript, serwerowy /api/chat oraz widok z historią bieżącej sesji, inputem, stanem pracy i błędu. Do streamText trafiają wiadomości sprawdzone przez backend. Interfejs odbiera rzeczywisty strumień odpowiedzi, nie animację gotowego tekstu. Wersje paczek mają być zgodne, dokładne i zapisane w lockfile po próbie prowadzącego.
Przed płatnym wywołaniem backend sprawdza dostęp i limity. Wczesny link służy fikcyjnym danym; pełne logowanie dojdzie w L07. Nie wystawiaj otwartego, nieograniczonego endpointu. Sekret nie ma prefiksu NEXT_PUBLIC_.

### Polecenie do asystenta

```text
Zbuduj czat Next.js: Vercel AI SDK, jawny provider OpenRouter, streamText i interfejs wiadomości. Klucz tylko na serwerze. Dodaj limit wejścia, dostęp i błędy.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Odpowiedź pojawia się przy odbieraniu kolejnych fragmentów.
- [ ] Pusty tekst, brak dostępu i niedostępny model mają czytelne stany.
- [ ] DevTools, HTML, JS i Git nie zawierają klucza OpenRouter.

**Gotowe, gdy:** Czat odpowiada strumieniowo; klucz nie trafia do przeglądarki.

<a id="w3"></a>
## W3. Deploy na Vercel

**Zakres obowiązkowy · orientacyjnie 20 min.**

Przed publikacją sprawdź .gitignore i staging; .env.local nie trafia do repo. Uczestnik zapisuje własny projekt w GitHub i importuje go do Vercel. Serwerowe zmienne trzeba skonfigurować także w hostingu — lokalny plik nie jest automatycznie konfiguracją wdrożenia.
Sprawdź link na nowym urządzeniu albo w czystej sesji. Dostęp do strony może być publiczny, natomiast użycie płatnego API wymaga kontroli. Nie testuj tylko strony głównej: wyślij wiadomość, odbierz streaming i wywołaj kontrolowany błąd. Zachowaj hash commita i URL. Sam build nie dowodzi działania modelu na hostingu.
Gdy sekret omyłkowo trafił do Git, unieważnij go u dostawcy; samo skasowanie pliku nie usuwa możliwości użycia. Nie zmieniaj starego repo kursu ani materiałów edycji 1.

### Polecenie do asystenta

```text
Sprawdź build i pliki commita. Wdróż aplikację na Vercel z serwerowymi zmiennymi i ochroną płatnych endpointów. Przetestuj URL poza lokalną sesją.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Build zakończony; pliki do publikacji bez sekretów.
- [ ] URL działa po wyłączeniu lokalnego serwera.
- [ ] Czat online odpowiada, a brak dostępu nie powoduje wywołania modelu.

**Gotowe, gdy:** Link działa bez lokalnego serwera; dostęp i streaming są sprawdzone.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
