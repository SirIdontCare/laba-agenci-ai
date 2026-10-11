# Start — najpierw dostęp, potem budowanie

## Przed spotkaniem

Zainstaluj aktualne wspierane Node.js 22+ oraz Git. Wybierz jednego asystenta kodowania; nie zmieniaj go w połowie ćwiczenia. Przygotuj konta GitHub i Vercel. Supabase jest potrzebny od L05. Klucz OpenRouter i dozwolone modele przekazuje Laba; abonament aplikacji czatowej nie jest kluczem API.

Pobierz repo z gałęzi `edycja-02-openrouter`, rozpakuj ZIP i otwórz katalog `edycja-02`. Nie otwieraj starych `lekcja_01`–`lekcja_12` w katalogu nadrzędnym jako instrukcji drugiej edycji.

W katalogu `edycja-02`:

```bash
node --version
git --version
npm test
```

Narzędzia kontrolne pakietu nie wymagają `npm install`. Nie jest to instalacja aplikacji Next.js — powstaje ona osobno w L01.

Skopiuj `.env.example` jako `.env.local` w edytorze plików. Wklej klucz lokalnie, przy wyłączonym udostępnianiu ekranu. Nie wysyłaj `.env.local` do czatu ani prowadzącego. Uzupełnij identyfikatory modeli zaakceptowane przez Laba. Następnie:

```bash
npm run preflight
```

Preflight odczytuje publiczny katalog modeli, nie wykonuje generacji. Sam wpis w katalogu nie dowodzi dostępu na Twoim kluczu. Po zgodzie na koszt i ustaleniu niskiego limitu klucza:

```bash
npm run live
```

To jedno krótkie wywołanie modelu, nie bezpłatny test. Wynik zapisujesz bez sekretów. Brak klucza → STOP dla testu live; możesz pracować na danych fikcyjnych i testach offline. Nigdy nie oznaczaj tego jako działające połączenie z modelem.

## Pierwsze polecenie do asystenta

```text
Przeczytaj AGENTS.md, KONTRAKT_TECHNICZNY.md i lekcja_01/W1.md. Pracuj tylko w workspace/moj-agent. Nie czytaj ani nie wypisuj zawartości .env.local. Sprawdź obecność wymaganych zmiennych bez ich wartości. Najpierw pokaż plan i test odbioru. Nie buduj całego kursu naraz. Nie modyfikuj edycji 1.
```

## Folder aplikacji

Materiały i projekt rozdzielamy. Asystent tworzy `workspace/moj-agent`, tam znajduje się `package.json` aplikacji i tam wykonujesz jej `npm run dev`. W katalogu kursu `npm test` dotyczy narzędzi kursu; w aplikacji dotyczy testów aplikacji. Zawsze sprawdzaj bieżący katalog. Po założeniu aplikacji skonfiguruj jej własne `.env.local` — plik katalogu nadrzędnego nie jest automatycznie konfiguracją Next.js.

## Gdy pojawia się błąd

401: konfiguracja lub dostęp. 402: środki lub limit. 429: limit częstości; nie klikaj ponownie w pętli. 400: parametry/schema/model. 5xx: dostawca; pokaż kontrolowany błąd. Te kody są wskazówkami, nie pełną diagnozą.

Do pomocy podaj: numer warsztatu, oczekiwany rezultat, krok odtworzenia, bezpieczny komunikat, ostatnią zmianę i wynik testu. Bez tokenów, nagłówków Authorization i prywatnych danych.
