# ⭐ EXTRA 2: Panuj nad kosztami agenta

> ⭐ **Moduł ponadprogramowy** — nieobowiązkowy. Nie jest wymagany do ukończenia Grupy Zaawansowanej.
> 🔒 **Wymagane wejście:** zaliczony Moduł 2A (musisz umieć znaleźć rzeczy w kodzie).

## O co chodzi

Twój agent kosztuje pieniądze przy **każdej** wiadomości. Dopóki działa na darmowym limicie, tego nie czujesz — ale w prawdziwym projekcie to pierwsza rzecz, o którą zapyta osoba płacąca rachunki.

Ten moduł to **audyt kosztów własnego agenta**: gdzie ucieka kasa, które przełączniki są drogie i jak postawić bezpieczniki. To jedna z tych umiejętności, które odróżniają hobbystę od kogoś, komu można powierzyć system produkcyjny.

> 💡 Klasyczna wpadka: ktoś zostawia włączoną płatną funkcję „na chwilę do testów", a potem zapomina. Rachunek przychodzi na koniec miesiąca.

## Cel

Po tym module:
- wiesz, **który model** napędza Twojego agenta i czy to najtańsza sensowna opcja,
- wiesz, gdzie w kodzie siedzą **płatne przełączniki** i czy któryś jest włączony na stałe,
- masz **limit kroków** chroniący przed pętlą, która mieli zapytania w nieskończoność,
- rozumiesz, dlaczego długa rozmowa kosztuje więcej niż krótka.

## Kroki

### 1. Ustal, jakim modelem myśli Twój agent
Wyszukaj w projekcie (`Ctrl+Shift+F`):
```
google(
```
Zapisz sobie, **jaki model** jest podany. Modele różnią się ceną nawet kilkunastokrotnie — `flash-lite` jest wielokrotnie tańszy niż `pro`.

Sprawdź, czy ten sam model jest **wszędzie** — częsty błąd to jeden zapomniany endpoint na drogim modelu.

### 2. Znajdź płatne przełączniki
Wyszukaj:
```
useSearchGrounding
```
**Search Grounding** (wyszukiwanie w Google) to najdroższa funkcja w tym stacku. Sprawdź, jak jest ustawiony:

| Co widzisz | Werdykt |
|---|---|
| `useSearchGrounding: true` | 🔴 **źle** — włączony na stałe, mieli kasę przy każdym zapytaniu |
| `useSearchGrounding: process.env.ENABLE_SEARCH_GROUNDING === 'true'` | 🟢 **dobrze** — sterowany przełącznikiem, domyślnie wyłączony |

Jeśli masz wersję czerwoną — **popraw ją** (umiesz to od Modułu 4: gałąź, zmiana, commit).

### 3. Sprawdź, co masz realnie włączone
Otwórz `.env.local` i przejrzyj listę zmiennych. Czy jest tam `ENABLE_SEARCH_GROUNDING=true`? Jeśli tak i nie testujesz właśnie wyszukiwania — **usuń tę linię**.

> 🛑 Pamiętaj z Modułu 1: `.env.local` nigdy nie trafia do repo.

### 4. Postaw bezpiecznik na pętlę
Wyszukaj w projekcie:
```
maxSteps
```
(albo `stopWhen` / `stepCountIs`)

To limit, ile razy agent może „pomyśleć i użyć narzędzia" w jednej odpowiedzi. Bez limitu agent w pętli potrafi wykonać dziesiątki płatnych zapytań na jedno pytanie użytkownika.

Sprawdź, czy limit istnieje **w każdym** endpointcie, który wywołuje model. Rozsądna wartość na naukę: **3–5**.

### 5. Zajrzyj na licznik
Wejdź do [Google AI Studio](https://aistudio.google.com) i znajdź swoje zużycie. Zobacz na własne oczy, ile zapytań zjadł Twój agent podczas kursu. To urealnia całą sprawę.

### 6. Zrozum, dlaczego długa rozmowa kosztuje więcej
Model płatny jest od **tokenów** (kawałków tekstu) — i to zarówno tych, które wysyłasz, jak i tych, które dostajesz.

Haczyk: przy każdej kolejnej wiadomości wysyłasz **całą dotychczasową rozmowę**, żeby agent pamiętał kontekst. Czyli 20. wiadomość w wątku kosztuje wielokrotnie więcej niż pierwsza.

Znajdź w kodzie miejsce, gdzie do modelu przekazywane są `messages` — to jest właśnie ta rosnąca kula śniegowa.

## ✅ Samo-weryfikacja (Twój dowód „done")

Utwórz w swoim repo plik **`KOSZTY.md`** i wypełnij go **konkretami ze swojego projektu**:

```markdown
# Audyt kosztów mojego agenta

## Model
- Używany model: ...
- Czy ten sam wszędzie? tak / nie (gdzie się różni: ...)

## Search Grounding (płatne)
- Znaleziony w: plik:linia
- Ustawienie: na sztywno `true` / sterowany zmienną
- Czy włączony w .env.local: tak / nie

## Ochrona przed pętlą
- Limit kroków: ... (plik:linia)
- Czy jest w każdym endpointcie: tak / nie

## Co poprawiłem
- ...
```

## 🤖 Sprawdź się sam przez AI

> *„Zrobiłem audyt kosztów mojego agenta. Oto mój KOSZTY.md: [wklej] oraz fragment konfiguracji modelu: [wklej].*
> *Oceń wg rubryki — PASS/FAIL + jedno zdanie:*
> *1. Czy wskazałem konkretne `plik:linia`, a nie ogólniki?*
> *2. Czy Search Grounding jest sterowany zmienną środowiskową, a nie `true` na sztywno?*
> *3. Czy limit kroków istnieje i ma rozsądną wartość?*
> *4. Czy przeoczyłem jakieś inne źródło kosztów w tym kodzie?"*

## Jak oddać

```bash
git add KOSZTY.md
git commit -m "Extra 2: audyt kosztow agenta"
git push
```
Wyślij **w DM do prowadzącego**: link do repo + zdanie „Extra 2 gotowe".

## 🚀 Idź dalej (nieobowiązkowe)

1. **Ogranicz długość wiadomości** — dodaj walidację, która odrzuca zapytania dłuższe niż np. 2000 znaków.
2. **Przycinaj historię** — wysyłaj do modelu tylko ostatnie 10 wiadomości zamiast całej rozmowy. Zobacz, jak zmienia się zachowanie agenta.
3. **Zaloguj zużycie** — przy każdej odpowiedzi wypisz w konsoli serwera, ile tokenów zużyto (SDK zwraca tę informację).

## Gdzie przekroczyłeś próg

Umiesz teraz spojrzeć na cudzy projekt AI i w kilka minut odpowiedzieć na pytanie, które pada w każdej firmie: **„ile to będzie kosztować i gdzie nam ucieka?"**. To jest myślenie inżyniera odpowiedzialnego za system, a nie osoby, która „coś tam zbudowała".
