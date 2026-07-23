# Grupa Zaawansowana — Moduł 2B: Elementarz kodu (rozgrzewka przed debugowaniem)

> 🔒 **Wymagane wejście:** zaliczony Moduł 2A.
> ⏱️ **~30 minut. Nic nie oddajesz** — to rozgrzewka, nie zadanie.

## O co chodzi

W Module 2A **znajdowałeś** kod — wiesz już, gdzie co leży. W Module 3 będziesz go **poprawiał**. Między jednym a drugim jest przepaść: żeby coś naprawić, musisz rozumieć, **co robi pojedyncza linijka**.

Kurs główny nigdy nie uczył składni — bo nie musiał, AI pisało wszystko. Ten moduł zasypuje tę dziurę. **Nie będziesz nic pisał.** Nauczysz się tylko *czytać*.

> 💡 Kod to nie magiczne zaklęcia. To zestaw kilku powtarzalnych klocków. Poznasz je w 30 minut i nagle 90% kodu przestaje wyglądać groźnie.

## Klocek 1: linia to instrukcja

Kod czyta się **z góry na dół**, linia po linii — jak przepis kulinarny. Komputer wykonuje jedną, potem następną.

```js
// To jest komentarz — komputer go ignoruje, to notatka dla ludzi.
```

## Klocek 2: zmienna — pudełko z nazwą

```js
const imie = "Anna";
const wiek = 34;
```
`const` mówi „tworzę pudełko", `imie` to nazwa pudełka, `=` wkłada do niego wartość.

Wartości bywają różnych rodzajów:
| Zapis | Co to |
|---|---|
| `"Anna"` | **tekst** (zawsze w cudzysłowie) |
| `34` | **liczba** (bez cudzysłowu) |
| `true` / `false` | **prawda / fałsz** |
| `[1, 2, 3]` | **lista** (w kwadratowych nawiasach) |
| `{ imie: "Anna" }` | **obiekt** — zestaw nazwanych pól |

> `const` = pudełko, którego już nie zmienisz. `let` = pudełko, które można zmienić. Na razie wystarczy Ci ta różnica.

## Klocek 3: funkcja — maszynka wejście → wyjście

Funkcja to przepis, który coś **przyjmuje** i coś **oddaje**.

```js
export function grossFromNet(net, vatPercent) {
  return net + net * (vatPercent / 100);
}
```
Czytaj to tak:
- `function grossFromNet` — nazywam maszynkę `grossFromNet`,
- `(net, vatPercent)` — maszynka przyjmuje **dwie rzeczy** (to *parametry*),
- `{ ... }` — klamry obejmują **wnętrze** maszynki,
- `return` — to, co maszynka **oddaje na wyjściu**.

Gdy ktoś ją **wywoła**: `grossFromNet(100, 23)` → do `net` wpada `100`, do `vatPercent` wpada `23`, a maszynka odda `123`.

> 🔑 **`return` to najważniejsze słowo w kodzie.** Mówi: „skończ i oddaj TO". Jak funkcja nie ma `return`, nie oddaje nic.

## Klocek 4: kropka — „sięgnij do środka"

```js
text.length          // długość tekstu
part.toUpperCase()   // ten tekst DUŻYMI literami
```
Kropka znaczy „weź coś **z** tej rzeczy".
- Bez nawiasów (`text.length`) → sięgasz po **właściwość** (gotową informację).
- Z nawiasami (`part.toUpperCase()`) → **wywołujesz akcję** na tej rzeczy.

Nawiasy `()` zawsze znaczą: **„wykonaj to teraz"**.

## Klocek 5: `if` — rozwidlenie drogi

```js
if (text.length <= max) {
  return text;
}
return text.slice(0, max) + "...";
```
Czytaj: *„JEŚLI długość tekstu jest mniejsza lub równa `max` — oddaj tekst bez zmian. W przeciwnym razie — oddaj skrócony."*

Warunki, które spotkasz najczęściej:
| Zapis | Znaczy |
|---|---|
| `<` `>` | mniejsze / większe |
| `<=` `>=` | mniejsze lub równe / większe lub równe |
| `===` | **równe** (uwaga: trzy znaki równości!) |
| `!==` | różne |

> ⚠️ Zapamiętaj `<` vs `<=` — jeden znak różnicy potrafi być całym błędem. Zobaczysz to na własne oczy w Module 3.

## Klocek 6: łańcuch operacji

```js
return fullName
  .split(" ")
  .map((part) => part[0].toUpperCase())
  .join("");
```
Wygląda strasznie, ale to po prostu **taśma produkcyjna** — czytaj z góry na dół:
1. `fullName` — weź imię i nazwisko, np. `"Anna Nowak"`,
2. `.split(" ")` — **potnij po spacji** → `["Anna", "Nowak"]`,
3. `.map(...)` — **zrób coś z każdym kawałkiem** → weź pierwszą literę (`part[0]`) dużą → `["A", "N"]`,
4. `.join("")` — **sklej z powrotem** → `"AN"`.

Każda kropka to kolejna stacja na taśmie. Tyle.

## 🏋️ Ćwiczenie (dla siebie, nic nie oddajesz)

Otwórz plik `tools.js` z projektu `debug_agent` (ten sam, którego użyjesz w Module 3) i **opisz własnymi słowami**, co robi każda z trzech funkcji. Nie naprawiaj — tylko czytaj.

Dla każdej odpowiedz sobie:
1. Co ta funkcja **przyjmuje**?
2. Co **oddaje** (`return`)?
3. Co się dzieje **po drodze**?

## ✅ Sprawdź się (samodzielnie)

Umiesz odpowiedzieć bez zaglądania w górę?
- Co robi `return`?
- Czym różni się `text.length` od `text.toUpperCase()`?
- Co znaczy `<=`?
- Co robi `.split(" ")`?

Jeśli tak — **jesteś gotowy na Moduł 3.**

## 🤖 Jeśli coś nie klika

Twoja wtyczka AI jest teraz idealnym korepetytorem. Zamiast prosić o naprawę, pytaj o **wyjaśnienie**:

> *„Wytłumacz mi tę linijkę kodu tak, jakbym nigdy nie programował, krok po kroku: [wklej linijkę]"*

To jest dobre użycie AI w tej ścieżce — uczysz się, zamiast oddawać robotę.

## Dlaczego to jest ważne

Od tego momentu kod przestaje być ścianą tekstu, a staje się czymś, co **da się przeczytać**. Nie musisz umieć pisać, żeby rozumieć — a rozumienie to całe zaawansowanie. W następnym module wykorzystasz to, żeby znaleźć i naprawić trzy prawdziwe błędy.
