# Grupa Zaawansowana — Moduł 2A: Czytaj kod, który AI napisało

> 🔒 **Wymagane wejście:** zaliczony Moduł 1 (repo na GitHubie).

## O co chodzi

Przez cały kurs AI pisało kod, a Ty go uruchamiałeś. Ale kiedy coś nie działa albo chcesz coś zmienić świadomie, musisz umieć **przeczytać** to, czego sam nie pisałeś — i zrozumieć, **którędy płynie wiadomość** od kliknięcia użytkownika do odpowiedzi agenta.

W tym module nie piszesz kodu. **Śledzisz go palcem** — jak inżynier, który dostał cudzy projekt. I robisz to **narzędziami VS Code, nie pytając AI „gdzie to jest".** O to właśnie chodzi: przestać być zależnym od asystenta w orientacji we własnym projekcie.

## Cel

Po tym module:
- rozumiesz strukturę swojego projektu (co siedzi w `app/`, `api/`, `components/`, `lib/`),
- potrafisz prześledzić **drogę jednej wiadomości**: UI → `/api/chat/route.ts` → narzędzie → odpowiedź,
- **znajdujesz palcem**, gdzie w kodzie włącza się Google Search (grounding),
- opisujesz ten przepływ w `README.md` swojego repo.

## Narzędzia VS Code, których użyjesz (zamiast pytać AI)

- **Explorer** (drzewo plików, po lewej) — mapa projektu.
- **Szukaj w całym projekcie:** `Ctrl+Shift+F` — wpisujesz tekst, VS Code pokazuje **wszystkie pliki**, gdzie występuje.
- **Idź do definicji:** kliknij nazwę funkcji/zmiennej i wciśnij **`F12`** (albo `Ctrl+klik`) — VS Code przeskakuje tam, gdzie to zostało zdefiniowane.
- **Wróć:** `Alt+←` — powrót do miejsca, z którego skoczyłeś.

> 💡 To jest sedno modułu: **nawiguj kod tymi klawiszami, nie promptem.** Wtyczkę AI możesz na koniec poprosić o sprawdzenie, ale trasę pokonujesz sam.

## Kroki

### 1. Zrób mapę projektu
Rozejrzyj się po drzewie w Explorerze i odpowiedz sobie (na razie w głowie):
- Gdzie jest **interfejs** (strony, które widzi użytkownik)? → zwykle `app/…/page.tsx`
- Gdzie jest **backend agenta** (logika, wywołania modelu)? → `app/api/…/route.ts`
- Gdzie są **komponenty** wielokrotnego użytku? → `app/components/` lub `components/`

### 2. Prześledź drogę wiadomości
Zacznij od strony czatu (`page.tsx` odpowiedniej strony) i znajdź moment, w którym aplikacja **wysyła wiadomość do backendu** — szukaj `Ctrl+Shift+F` frazy:
```
/api/chat
```
To jest „drzwi" między interfejsem a mózgiem agenta. Otwórz plik **`app/api/chat/route.ts`** (albo inny `route.ts`, do którego prowadzi ten adres) i znajdź w nim:
- **konfigurację modelu** (`google(...)`, `streamText(...)`),
- **narzędzia** agenta (`tools: { ... }`) — kalkulator, czytanie stron itd.

Użyj **`F12`** na nazwie modelu albo narzędzia, żeby zobaczyć, skąd się bierze.

### 3. Znajdź palcem, gdzie włącza się Google Search
Wciśnij `Ctrl+Shift+F` i wyszukaj:
```
useSearchGrounding
```
(a jeśli nie ma wyniku — wyszukaj `grounding` albo `ENABLE_SEARCH_GROUNDING`).

Otwórz plik z wynikiem i ustal **dokładnie, w której linii** grounding jest włączany oraz **od czego zależy** (czy jest na sztywno `true`, czy sterowany zmienną środowiskową). Zapamiętaj `nazwa_pliku:numer_linii` — będzie potrzebny do oddania.

> To nie jest przypadkowe ćwiczenie: grounding to najdroższa funkcja agenta. Inżynier musi wiedzieć **gdzie** ona siedzi, żeby nad kosztami panować — bez pytania AI za każdym razem.

### 4. Opisz przepływ w `README.md`
W pliku `README.md` swojego repo dodaj sekcję **„Jak działa mój agent (przepływ)"** i opisz w 5–8 zdaniach albo w punktach:
```
1. Użytkownik wpisuje wiadomość na stronie:  [plik]
2. Interfejs wysyła ją na endpoint:           /api/chat  ([plik])
3. Backend konfiguruje model i narzędzia:     [plik]  (funkcja streamText)
4. Google Search (grounding) włącza się tu:   [plik:linia]  — sterowany przez: [true / zmienną ENABLE_SEARCH_GROUNDING]
5. Model decyduje, których narzędzi użyć, i zwraca odpowiedź strumieniowo do UI.
```
Wypełnij nawiasy **konkretnymi ścieżkami i liniami** ze swojego projektu.

## ✅ Samo-weryfikacja (Twój dowód „done")

W `README.md` masz sekcję z przepływem, a w niej:
- wskazane **konkretne pliki** dla UI i backendu,
- wskazane **`plik:linia`**, gdzie włącza się grounding,
- informację, **od czego** grounding zależy (sztywne `true` czy zmienna środowiskowa).

Zacommituj i wypchnij:
```bash
git add README.md
git commit -m "Moduł 2A: opis przepływu wiadomości w agencie"
git push
```

## 🤖 Sprawdź się sam przez AI (zanim wyślesz prowadzącemu)

Wklej do wtyczki AI treść swojej sekcji z README + poproś:

> *„Jestem na Module 2A (czytanie kodu). Oto mój opis przepływu wiadomości w agencie: [wklej]. Oceń wg rubryki — PASS/FAIL + jedno zdanie:*
> *1. Czy poprawnie wskazałem plik interfejsu i plik backendu (`route.ts`)?*
> *2. Czy poprawnie wskazałem `plik:linia`, gdzie włącza się grounding?*
> *3. Czy opisałem, od czego grounding zależy (sztywne true czy zmienna środowiskowa)?*
> *Sprawdź to względem realnego kodu w projekcie, nie tylko mojego opisu."*

## Jak oddać

Wyślij **w DM do prowadzącego**:
1. **link do repo** (ten sam co w Module 1 — sekcja przepływu jest już w `README.md`),
2. jedno zdanie: „Moduł 2A gotowy" + w którym `plik:linia` siedzi grounding.

## 🚀 Idź dalej (nieobowiązkowe)

Im więcej tras przejdziesz palcem, tym szybciej czytasz każdy nowy projekt:

1. **Policz swoje narzędzia:** znajdź obiekt `tools` w `route.ts` i wypisz **wszystkie** narzędzia agenta wraz z ich `description`. Zdziwisz się, ile już ich masz po Lekcji 7.
2. **Znajdź osobowość agenta:** wyszukaj (`Ctrl+Shift+F`) system prompt — fragment tekstu, który mówi agentowi, kim jest. Zmień w nim jedno zdanie, odśwież stronę i zobacz, jak zmienia się zachowanie. Potem cofnij (`git restore`).
3. **Prześledź drugi przepływ:** wybierz **inną** stronę swojego agenta niż czat (np. tę z Lekcji 6 lub 7) i prześledź jej drogę do backendu tak samo jak w kroku 2 tego modułu.
4. **Skacz jak zawodowiec:** przejdź całą trasę z kroku 2 jeszcze raz, używając wyłącznie `Ctrl+P` (skok do pliku) i `F12` (skok do definicji) — bez ani jednego kliknięcia w drzewo plików.
5. **Gdzie mieszka baza:** znajdź w projekcie miejsce, gdzie agent łączy się z Supabase. Nie musisz rozumieć zapytań — wystarczy, że wiesz, **gdzie to jest**.

## Gdzie przekroczyłeś próg zaawansowania

Umiesz teraz wejść w projekt, którego nie pisałeś, i w kilka minut **wskazać palcem, gdzie dzieje się konkretna rzecz** — bez pytania AI. To jest umiejętność, która dzieli „użytkownika AI" od „osoby, która panuje nad kodem". W następnym module wykorzystasz ją, żeby **znaleźć i naprawić błąd** — samodzielnie.
