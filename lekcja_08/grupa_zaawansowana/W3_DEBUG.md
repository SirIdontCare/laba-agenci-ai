# Grupa Zaawansowana — Moduł 3: Debugowanie bez AI

> 🔒 **Wymagane wejście:** zaliczony Moduł 2A (opis przepływu w README).

## O co chodzi

Do tej pory, kiedy coś nie działało, kopiowałeś błąd do AI i mówiłeś „napraw to". Szybkie — ale nic się nie uczyłeś, a przy trudniejszych błędach AI zaczyna zgadywać w kółko.

W tym module **łapiesz błędy sam**. Dostajesz gotowy projekt `debug_agent` z **trzema zasadzonymi błędami** i trzema technikami, żeby je znaleźć: czytanie **stack trace**, `console.log` i **debugger w VS Code**. AI odkładasz na bok — użyjesz go dopiero na końcu, do sprawdzenia.

## Cel

Po tym module:
- umiesz przeczytać **stack trace** i wskazać `plik:linia`, gdzie pęka kod,
- umiesz podejrzeć wartość zmiennej przez `console.log`,
- umiesz postawić **breakpoint** w VS Code i przejść kod krok po kroku,
- masz **6 zielonych testów** i potrafisz w jednym zdaniu powiedzieć, **dlaczego** każdy błąd występował.

## Zdobądź projekt

Prowadzący udostępnił repo **`debug_agent`** (link na priv / na kanale). Pobierz go i otwórz w VS Code:
- albo **sklonuj**: `git clone <link-od-prowadzącego>`
- albo pobierz ZIP z GitHuba (przycisk **Code → Download ZIP**) i rozpakuj.

Otwórz folder w VS Code i w terminalu uruchom:
```bash
npm test
```
Zobaczysz **4 czerwone testy**. Zaczynamy polowanie.

> ⛔ **Nie zmieniasz `tools.test.js`** — testy mówią, jak ma być. Poprawiasz tylko `tools.js`.
> 🤖 **Nie każ AI naprawić za Ciebie.** Najpierw znajdź i zrozum sam — inaczej ten moduł nie ma sensu.

## Błąd 1 — czytaj stack trace (technika: stack trace)

Test `initials: radzi sobie z podwojna spacja` nie tylko nie przechodzi — on **wywala się z błędem**. W wyniku `npm test` znajdź linijkę:
```
TypeError: Cannot read properties of undefined (reading 'toUpperCase')
    at ... tools.js:XX
```
- **Przeczytaj komunikat:** „nie mogę odczytać `toUpperCase` z `undefined`" — czyli coś, co miało być tekstem, jest `undefined`.
- **Przeczytaj adres:** `tools.js:XX` mówi Ci **dokładną linię**. Otwórz ją.
- **Zastanów się:** dla wejścia `"Anna  Nowak"` (dwie spacje) `split(" ")` tworzy pusty kawałek `""` — a `""[0]` to `undefined`.
- **Napraw** funkcję `initials` tak, żeby radziła sobie z pustymi kawałkami. Uruchom `npm test` — ten błąd znika.

## Błąd 2 — podejrzyj wartość (technika: `console.log`)

Testy `grossFromNet` twierdzą, że 100 zł netto + 23% VAT = **123 zł**, a coś zwraca inną liczbę. Tu nie ma crasha — jest **zła matematyka**. Podejrzyj, co się liczy:
```js
export function grossFromNet(net, vatPercent) {
  console.log("net:", net, "vatPercent:", vatPercent, "wynik:", net + net * vatPercent);
  return net + net * vatPercent;
}
```
Uruchom `npm test` i spójrz na wypisaną wartość. Zobaczysz, że `vatPercent` (23) jest traktowany jak **23 razy**, a nie **23 procent**. Popraw wzór, żeby procent był procentem. **Usuń `console.log`** po naprawie.

## Błąd 3 — przejdź kod krok po kroku (technika: debugger VS Code)

Test `truncate: tekst rowny limitowi NIE jest skracany` oczekuje, że `"hello"` (5 znaków) przy limicie 5 **zostaje bez zmian**. Ustaw **breakpoint** i zobacz, którędy idzie kod:
1. Otwórz `tools.js`, kliknij **po lewej od numeru linii** z `if (text.length < max)` — pojawi się czerwona kropka (breakpoint).
2. Otwórz panel **Run and Debug** (`Ctrl+Shift+D`) → **„JavaScript Debug Terminal"**.
3. W tym terminalu uruchom `npm test`. Wykonanie **zatrzyma się** na breakpoincie.
4. Najedź na `text.length` i `max` — zobaczysz `5` i `5`. Warunek `5 < 5` to **fałsz**, więc kod „przelatuje" do skracania, choć nie powinien.
5. Popraw warunek tak, żeby tekst **równy** limitowi też był uznany za „wystarczająco krótki".

## ✅ Samo-weryfikacja (Twój dowód „done")

```bash
npm test
```
**Oczekiwany wynik:** `# pass 6`, `# fail 0`. Wszystko zielone, przy niezmienionym `tools.test.js`.

## 🤖 Sprawdź się sam przez AI (zanim wyślesz prowadzącemu)

Wklej do wtyczki AI swój naprawiony `tools.js` + krótki opis, dlaczego każdy błąd występował:

> *„Jestem na Module 3 (debug). Naprawiłem 3 błędy w tym pliku: [wklej tools.js]. Oto moje wyjaśnienia przyczyn: [3 zdania]. Oceń wg rubryki — PASS/FAIL + jedno zdanie:*
> *1. Czy wszystkie 3 błędy są naprawione poprawnie (a nie obejściem, które psuje inne przypadki)?*
> *2. Czy `tools.test.js` pozostał niezmieniony?*
> *3. Czy moje wyjaśnienia przyczyn są trafne (pusty fragment po splitcie / procent liczony jak krotność / warunek < zamiast <=)?"*

## Jak oddać

Wrzuć naprawiony projekt do **swojego repo z GitHuba** — najprościej jako **folder `debug_agent/`** w tym samym repo, którego używasz od Modułu 1:
```bash
git add debug_agent
git commit -m "Modul 3: naprawione 3 bledy w narzedziach agenta"
git push
```
Następnie wyślij **w DM do prowadzącego**:
1. **link do repo**,
2. **3 zdania** — po jednym na każdy błąd: co było źle i dlaczego.

## 🚀 Idź dalej (nieobowiązkowe)

Debugowanie to mięsień — rośnie tylko od powtórzeń:

1. **Pomyśl jak tester:** co się stanie, gdy do `grossFromNet` wpadnie `0` osób? A gdy do `truncate` trafi pusty tekst `""`? Sprawdź w praktyce i zastanów się, czy funkcja powinna się przed tym bronić.
2. **Zepsuj własnego agenta — świadomie:** w swojej kopii projektu skasuj celowo jeden przecinek albo nawias w `route.ts`. Uruchom `npm run dev`, **przeczytaj błąd**, zlokalizuj linię i napraw. Potem cofnij przez `git restore`. To najlepszy trening przed prawdziwą awarią.
3. **Poznaj debugger głębiej:** postaw breakpoint i użyj przycisków **Step Over** (przeskocz linię) i **Step Into** (wejdź do środka funkcji). Zobacz, jak panel **Variables** pokazuje wartości na żywo — bez ani jednego `console.log`.
4. **Napisz własny test:** utwórz plik `moje.test.js` obok i napisz w nim jeden test sprawdzający funkcję z `tools.js` (wzoruj się na `tools.test.js`). Uruchom `node --test moje.test.js`.

## Gdzie przekroczyłeś próg zaawansowania

Właśnie naprawiłeś trzy błędy, których nie napisałeś, **nie prosząc AI o gotowca** — czytając komunikat, podglądając wartości i zatrzymując kod na breakpoincie. To jest dokładnie to, co odróżnia kogoś, kto „umie kliknąć w AI", od kogoś, komu można powierzyć projekt. W następnym module złożysz to wszystko razem: dołożysz do swojego agenta prawdziwą funkcję — ręcznie.
