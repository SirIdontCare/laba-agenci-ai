# Grupa Zaawansowana — Moduł 4: Capstone — zmiana bez generatora

> 🔒 **Wymagane wejście:** zaliczone Moduły 1–3.

## O co chodzi

To jest finał. Składasz wszystko razem: **VS Code** (M0), **git + GitHub** (M1), **czytanie kodu** (M2) i **debugowanie** (M3) — żeby zrobić rzecz, której przez cały kurs nie robiłeś: **dodać do swojego agenta nową funkcję, pisząc kod ręcznie.**

Reguła: **nie każesz AI wygenerować całości.** Autouzupełnianie wtyczki może podpowiadać Ci pojedyncze linie, ale **to Ty piszesz to narzędzie i rozumiesz każdy jego fragment.** Na koniec robisz to jak inżynier w zespole: na osobnej gałęzi (branch) i przez **Pull Request**.

## Cel

Po tym module:
- dodałeś do agenta **nowe narzędzie**, pisząc je samodzielnie,
- agent faktycznie go używa (widać to w przeglądarce),
- zrobiłeś to na **osobnej gałęzi** i przez **Pull Request** na GitHubie,
- potrafisz opisać w PR, **co** dodałeś i **jak** to działa,
- **wdrożyłeś swojego zaawansowanego agenta** jako osobny projekt na Vercelu — masz go pod własnym adresem w internecie.

## Zadanie: narzędzie „Podziel rachunek"

Dodasz agentowi narzędzie `splitBill`, które dzieli rachunek na osoby (z opcjonalnym napiwkiem). Po zmianie agent powinien poprawnie odpowiedzieć na: *„Podziel 240 zł na 4 osoby z napiwkiem 10%"*.

> 💡 Chcesz własny pomysł zamiast dzielenia rachunku (np. przelicznik walut offline, kalkulator BMI, licznik słów)? Śmiało — byle miał tę samą strukturę narzędzia i realnie coś liczył. Reszta instrukcji zostaje taka sama.

### 1. Załóż gałąź na swoją zmianę
```bash
git checkout -b feature/split-bill
```
Od teraz pracujesz „na boku", nie ruszając głównej wersji.

### 2. Znajdź, gdzie mieszkają narzędzia
Otwórz `app/api/chat/route.ts` (umiesz to z Modułu 2A). Znajdź obiekt `tools: { ... }` — to tam siedzą kalkulator, data/czas itd. **Przeczytaj narzędzie `calculator`** — będzie Twoim wzorem. Zwróć uwagę na jego trzy części:
- `description` — kiedy agent ma go użyć,
- `inputSchema` — jakie dane przyjmuje (zod),
- `execute` — co robi i co zwraca.

### 3. Napisz narzędzie `splitBill` — ręcznie
Dopisz do obiektu `tools` nowe narzędzie. Szkielet poniżej — ale **`execute` piszesz sam** (to jest sedno modułu):
```js
splitBill: tool({
  description: "Dzieli kwotę rachunku na osoby, z opcjonalnym napiwkiem w procentach.",
  inputSchema: z.object({
    total: z.number().describe("Łączna kwota rachunku"),
    people: z.number().describe("Liczba osób"),
    tipPercent: z.number().optional().describe("Napiwek w procentach, np. 10"),
  }),
  execute: async ({ total, people, tipPercent = 0 }) => {
    // TODO (Twoja robota):
    // 1. Zabezpiecz się przed dzieleniem przez zero (people <= 0).
    // 2. Dolicz napiwek do kwoty.
    // 3. Policz kwotę na osobę.
    // 4. Zwróć obiekt, np. { total, people, tipPercent, perPerson }.
  },
}),
```
Nie potrzebujesz nowych importów — `tool` i `z` są już w tym pliku.

### 4. Uruchom i przetestuj w przeglądarce
```bash
npm run dev
```
Wejdź na stronę czatu i zapytaj: **„Podziel 240 zł na 4 osoby z napiwkiem 10%"**.
Oczekiwana odpowiedź: 240 + 10% = 264, na 4 osoby = **66 zł/os.** Jeśli agent liczy dobrze — działa.

> Jeśli coś nie gra — wróć do Modułu 3: przeczytaj błąd, wrzuć `console.log` do `execute`, znajdź przyczynę. **Sam.**

### 5. Zacommituj zmianę na gałęzi
```bash
git add .
git commit -m "Dodane narzedzie splitBill: dzielenie rachunku z napiwkiem"
```

### 6. Wypchnij gałąź i otwórz Pull Request
```bash
git push -u origin feature/split-bill
```
Wejdź na swoje repo na GitHubie — pojawi się żółty pasek **„Compare & pull request"**. Kliknij go i **napisz opis PR** (własnymi słowami):
- **Co** dodałeś (narzędzie splitBill),
- **Jak** działa (co przyjmuje, co zwraca, jak liczy napiwek),
- **Jak przetestowałeś** (jakie pytanie zadałeś agentowi i co odpowiedział).

Kliknij **Create pull request**, a potem **Merge pull request** → **Confirm merge**.

### 7. Wdróż swojego zaawansowanego agenta — na WŁASNY projekt Vercel

Twoja zmiana jest w gałęzi głównej. Czas wypuścić ją do internetu — jako **drugiego, niezależnego agenta**, obok Twojej wersji kursowej.

> 🛑 **Absolutnie kluczowe:** tworzysz **NOWY projekt** na Vercelu z **nowego repo**. Nie otwierasz istniejącego projektu kursowego i nie przepinasz go na inne repo — inaczej nadpiszesz swojego kursowego agenta.

1. Wejdź na [vercel.com](https://vercel.com) → **Add New… → Project**.
2. Z listy repozytoriów wybierz **swoje nowe repo** (`moj-agent-zaawansowany`), nie kursowe. Kliknij **Import**.
3. **Zanim klikniesz Deploy**, rozwiń **Environment Variables** i dodaj **wszystkie** zmienne ze swojego lokalnego `.env.local`:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY   → Twój klucz z AI Studio
   NEXT_PUBLIC_SUPABASE_URL       → URL NOWEJ bazy (nie kursowej!)
   NEXT_PUBLIC_SUPABASE_ANON_KEY  → anon key NOWEJ bazy
   ```
   > 💡 To jest moment, w którym rozumiesz, po co istnieje `.env.local`: plik **nigdy** nie trafił do repo (blokuje go `.gitignore`), więc serwer produkcyjny **nie zna** Twoich kluczy, dopóki sam mu ich nie podasz. Tak działa to w każdej prawdziwej firmie.
4. Kliknij **Deploy** i poczekaj (~1–2 min).
5. Dostajesz publiczny adres typu `moj-agent-zaawansowany.vercel.app`. **Otwórz go i przetestuj narzędzie**: *„Podziel 240 zł na 4 osoby z napiwkiem 10%"*.

> ⚠️ Jeśli na produkcji wyskakuje błąd, a lokalnie działało — w 9 na 10 przypadków to **brakująca zmienna środowiskowa**. Vercel → Twój projekt → **Settings → Environment Variables**, uzupełnij i zrób **Redeploy**. Logi błędów znajdziesz w zakładce **Logs** (przyda się Moduł 3!).

Od teraz każdy `git push` do gałęzi głównej **automatycznie przebuduje** tę wersję. Twój kursowy agent stoi na osobnym projekcie i osobnym repo — nic mu się nie stanie.

## ✅ Samo-weryfikacja (Twój dowód „done")

- Agent lokalnie poprawnie dzieli rachunek (66 zł/os. dla przykładu wyżej).
- Na GitHubie masz **zmergowany Pull Request** z sensownym opisem.
- Zmiana jest w gałęzi głównej repo.
- **Agent działa pod własnym adresem `.vercel.app`** — i jest to **inny projekt** niż Twój kursowy.
- Wersja produkcyjna korzysta z **nowej bazy**, nie kursowej.

## 🤖 Sprawdź się sam przez AI (zanim wyślesz prowadzącemu)

Wklej do wtyczki AI swój kod narzędzia + opis PR:

> *„Jestem na Module 4 (capstone). Dodałem ręcznie narzędzie do agenta. Oto kod: [wklej splitBill] i opis PR: [wklej]. Oceń wg rubryki — PASS/FAIL + jedno zdanie:*
> *1. Czy narzędzie ma poprawny `inputSchema` (zod) i sensowny `description`?*
> *2. Czy `execute` liczy poprawnie (napiwek + podział) i zabezpiecza dzielenie przez zero?*
> *3. Czy opis PR własnymi słowami wyjaśnia, co i jak działa (a nie wygląda na wygenerowany w całości)?*
> *4. Czy wdrożyłem to jako OSOBNY projekt na Vercelu, ze zmiennymi środowiskowymi NOWEJ bazy — nie ruszając projektu kursowego?"*

## Jak oddać

Wyślij **w DM do prowadzącego**:
1. **link do repo**,
2. **link do zmergowanego Pull Requesta**,
3. **link do działającego agenta** (`…vercel.app`),
4. jedno zdanie: „Moduł 4 (capstone) gotowy".

## 🚀 Idź dalej (nieobowiązkowe)

Masz już pełną pętlę inżyniera — teraz ją pogłębiaj:

1. **Broń się przed złymi danymi:** co zrobi Twoje narzędzie, gdy ktoś poda `people: 0` albo kwotę ujemną? Dopisz walidację i zwróć czytelny komunikat błędu zamiast dziwnej liczby.
2. **Drugie narzędzie, tym razem bez szkieletu:** wymyśl własne (przelicznik jednostek, licznik słów, generator sluga) i napisz je **od zera**, wzorując się wyłącznie na istniejących. Osobna gałąź, osobny PR.
3. **Test do własnego kodu:** wyciągnij logikę liczenia do osobnej funkcji i napisz do niej test (technika z Modułu 3). Kod, który ma test, to kod, któremu ufasz.
4. **Popraw opis agenta:** dopracuj `description` swojego narzędzia i sprawdź, czy agent zaczyna trafniej decydować, kiedy go użyć. To jest inżynieria promptów spotykająca się z kodem.
5. **Posprzątaj historię:** przejrzyj `git log --oneline` całej ścieżki. Czy z samych opisów commitów da się zrozumieć, co robiłeś? Jeśli nie — wiesz już, jak pisać je lepiej.

## Gratulacje — skończyłeś Grupę Zaawansowaną 🎉

Przeszedłeś drogę od „wklejam prompty, AI buduje" do:
- pracy w prawdziwym IDE,
- wersjonowania i współpracy przez git + GitHub + Pull Requesty,
- czytania cudzego kodu i wskazywania palcem, gdzie co jest,
- łapania i naprawiania błędów bez podpowiadacza,
- napisania własnej funkcji **ręcznie**,
- **wdrożenia jej na produkcję** — masz teraz **drugiego, własnego agenta w internecie**, pod swoim adresem, na swojej bazie.

To nie jest już „użytkownik AI". To ktoś, kto panuje nad swoim projektem — od pierwszej linijki kodu po działający serwis.

## Chcesz więcej? → 🐍 Ścieżka Pythona — POZIOM WYŻEJ

Skończenie Modułów 0–4 to **pełne ukończenie Grupy Zaawansowanej**. Ścieżka Pythona to **osobne, jeszcze wyższe piętro** — już nie część tej ścieżki, tylko krok ponad nią: drugi język, prawdziwy backend i frameworki agentowe.

Trzy moduły, każdy budujący na poprzednim:

| # | Moduł | Co zrobisz | Trudność |
|---|---|---|---|
| **1** | [Twój agent na backendzie w Pythonie](W5_PYTHON_BACKEND.md) | rozdzielisz agenta na frontend (Next.js) i mózg (FastAPI) | 🟢 |
| **2** | [Pydantic AI](W6_PYDANTIC_AI.md) | agent zwróci **zwalidowany obiekt** zamiast tekstu — `pydantic` to `zod`, który już znasz | 🟡 |
| **3** | [LangGraph](W7_LANGGRAPH.md) | wyciągniesz **pętlę ReAct z Lekcji 4** na wierzch i narysujesz ją jako graf | 🔴 |

> Nie czujesz się na siłach? **Nie musisz.** Ukończenie Modułu 4 to komplet. Ścieżkę Pythona możesz też **przerwać na dowolnym module** — nawet sam Moduł 1 daje Ci działający backend w drugim języku.
