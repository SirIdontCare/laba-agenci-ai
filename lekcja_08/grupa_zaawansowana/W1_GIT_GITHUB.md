# Grupa Zaawansowana — Moduł 1: Wersjonowanie jak inżynier (git + GitHub)

> 🔒 **Wymagane wejście:** zaliczony Moduł 0 (VS Code + wtyczka AI, projekt agenta otwarty).

## O co chodzi

Do tej pory Twój kod istniał tylko na Twoim dysku. Jedna zła zmiana AI i nie ma jak wrócić. Prawdziwy inżynier ma **wehikuł czasu do kodu** — git — i **kopię w chmurze** — GitHub.

W tym module zakładasz repozytorium, uczysz się commitować, wypychasz projekt na GitHuba i — najważniejsze — **cofasz katastrofę jednym poleceniem**. Od tego modułu **GitHub staje się Twoim sposobem oddawania prac**: wysyłasz prowadzącemu link do repo na priv, a on widzi cały Twój postęp w historii commitów.

> ⚠️ **Najważniejsza zasada modułu:** **NIGDY nie wypychaj na GitHuba pliku `.env.local`** — tam siedzą Twoje klucze API. Zaraz ustawimy `.gitignore`, który to blokuje. Klucz wrzucony na publiczne repo potrafi zostać wykradziony w kilka minut.

## Cel

Po tym module:
- masz zainicjowane repozytorium git w projekcie agenta,
- `.env.local` i `node_modules` są **ignorowane** (nie trafią do repo),
- masz ≥5 sensownych commitów,
- projekt jest na **GitHubie**,
- umiesz **cofnąć** złą zmianę przez git.

## Kroki

### 1. Przedstaw się gitowi (tylko za pierwszym razem)
W terminalu VS Code (`` Ctrl+` ``):
```bash
git config --global user.name "Twoje Imię"
git config --global user.email "twoj@email.pl"
```

### 2. Zainicjuj repozytorium
Będąc w folderze **kopii**:
```bash
git init
```

**Natychmiast sprawdź, czy nie ciągniesz za sobą repo kursowego:**
```bash
git remote -v
```
**Oczekiwany wynik: PUSTO** (żadnej linii). To znaczy, że kopia nie jest z niczym powiązana.

> 🛑 Jeśli coś się wypisało (np. `origin  https://github.com/…`), to znaczy, że **nie usunąłeś `.git`** przy kopiowaniu w Module 0. Twoje commity poleciałyby do **repo kursowego** i mogłyby przedeployować Twojego kursowego agenta. Napraw to od razu:
> ```bash
> git remote remove origin
> ```
> i upewnij się, że `git remote -v` jest już puste.

### 3. Zablokuj sekrety i śmieci — `.gitignore`
Sprawdź, czy w projekcie jest plik **`.gitignore`**. Jeśli go nie ma, utwórz go w głównym folderze i wklej:
```
node_modules
.env.local
.env
.next
```
> To mówi gitowi: „tych rzeczy nigdy nie zapisuj". `node_modules` jest ogromne i odtwarzalne (`npm install`), a `.env.local` zawiera Twoje klucze — **nie ma prawa opuścić Twojego komputera.**

Sprawdź, że działa:
```bash
git status
```
**Na liście NIE może być** `.env.local` ani `node_modules`. Jeśli się pojawiają — popraw `.gitignore` (albo poproś wtyczkę AI: *„czemu git status wciąż pokazuje .env.local mimo wpisu w .gitignore?"*).

### 4. Pierwszy commit
```bash
git add .
git commit -m "Pierwszy commit: mój agent z kursu"
```

### 5. Zrób kilka prawdziwych commitów
Wprowadź 3–4 drobne zmiany w agencie (np. zmień tekst nagłówka, kolor, tytuł strony) i **po każdej** commituj osobno:
```bash
git add .
git commit -m "Zmiana nagłówka na stronie czatu"
```
> Zasada inżyniera: **jeden commit = jedna sensowna zmiana**, z opisem po co. Nie wrzucaj wszystkiego w jeden worek.

Możesz też używać panelu **Source Control** w VS Code (ikona gałęzi po lewej) — wpisujesz opis, klikasz „Commit". To samo co w terminalu, tylko klikane.

### 6. Wypchnij na GitHuba — do NOWEGO repozytorium
**Najprościej — przez VS Code:**
1. Załóż darmowe konto na [github.com](https://github.com/signup) (jeśli nie masz).
2. W panelu **Source Control** kliknij **„Publish to GitHub"**.
3. Podaj **nową nazwę repo** (np. `moj-agent-zaawansowany`) — **nie wybieraj repo kursowego**.
4. Wybierz **„Publish to GitHub public repository"** (kod jest bezpieczny — klucze zostały w `.env.local`, który git ignoruje).
5. VS Code zaloguje Cię do GitHuba i wypchnie repo.

> 🛑 **Nowe repo = warunek bezpieczeństwa.** Twój kursowy agent jest podpięty na Vercelu do **repo kursowego** i przebudowuje się sam po każdym pushu. Dlatego kopia musi mieć **własne, nowe repo** — wtedy nic, co tu robisz, nie ruszy Twojej kursowej wersji w internecie.
>
> Swojego zaawansowanego agenta **też wdrożysz** — ale jako **osobny projekt na Vercelu**, w [Module 4](W4_CAPSTONE.md). Do tego czasu pracujesz lokalnie (`npm run dev`). Istniejącego projektu kursowego na Vercelu **nigdy nie dotykasz**.

> Wolisz prywatne repo? Wybierz „private" — tylko wtedy **dodaj prowadzącego jako collaborator** (Settings → Collaborators), inaczej nie otworzy linku.

### 7. Cofnij katastrofę (najważniejsza umiejętność)
Teraz nauczysz się wracać w czasie.

**Wariant A — zmiana jeszcze NIE zacommitowana:**
Zepsuj coś specjalnie (np. skasuj pół pliku), **nie commituj**, a potem:
```bash
git restore .
```
Wszystkie niezapisane zmiany znikają — projekt wraca do ostatniego commita.

**Wariant B — zła zmiana JUŻ w commicie:**
Zepsuj coś i zacommituj („Zepsuty eksperyment"). Zobacz historię:
```bash
git log --oneline
```
Cofnij ten commit **nowym commitem cofającym**:
```bash
git revert HEAD
```
Aplikacja znów działa, a w historii widać i błąd, i jego cofnięcie — czyli jak w prawdziwym zespole.

### 8. Wypchnij finalny stan
```bash
git push
```

## ✅ Samo-weryfikacja (Twój dowód „done")

W terminalu:
```bash
git log --oneline
```
**Oczekiwany wynik:** co najmniej **5 commitów** z sensownymi opisami, w tym jeden z `revert`.

Oraz — otwórz swoje repo na GitHubie w przeglądarce i sprawdź:
- kod tam jest,
- **NIE MA** tam pliku `.env.local` (kliknij, poszukaj — ma go nie być),
- widać listę commitów.

## 🤖 Sprawdź się sam przez AI (zanim wyślesz prowadzącemu)

Wklej do wtyczki AI:

> *„Jestem na Module 1 (git + GitHub). Oceń wg rubryki — odpowiedz PASS albo FAIL + jedno zdanie co poprawić:*
> *1. Czy `.env.local` jest w `.gitignore` i NIE trafił do repo? (to punkt krytyczny — jeśli nie, od razu FAIL)*
> *2. Czy mam ≥5 commitów z sensownymi opisami?*
> *3. Czy użyłem `git revert` albo `git restore`, żeby cofnąć zmianę?*
> *4. Czy projekt jest wypchnięty na GitHuba?*
> *Oto mój `git log --oneline`: [wklej] oraz link do repo: [wklej]"*

## Jak oddać

Wyślij **w prywatnej wiadomości (DM) do prowadzącego** na Discordzie:
1. **link do swojego repo na GitHubie**,
2. jedno zdanie: „Moduł 1 gotowy".

Ten sam link będzie służył do końca ścieżki — kolejne moduły dopychasz do **tego samego repo**, a prowadzący widzi postęp w commitach.

> 🛑 Zanim wyślesz — ostatni raz sprawdź, że na GitHubie **nie ma `.env.local`**. Jeśli jest: usuń go z repo (`git rm --cached .env.local`, commit, push), popraw `.gitignore`, i **zmień klucz API w Google AI Studio** — ten stary uznaj za spalony.

## 🚀 Idź dalej (nieobowiązkowe)

Git odwdzięcza się za każdą godzinę. Te ćwiczenia sprawdzisz sam:

1. **Zobacz, co dokładnie zmieniłeś:** zmień coś w pliku i **przed** commitem uruchom `git diff`. Zielone linie to dodane, czerwone — usunięte. To Twoje najlepsze narzędzie kontroli, zanim cokolwiek zatwierdzisz.
2. **Praca na gałęzi:** `git switch -c eksperyment` → zmień coś śmiało → `git switch main`. Zobacz, że na `main` Twoich zmian nie ma. Tak wygląda bezpieczne eksperymentowanie (w Module 4 zrobisz to na poważnie).
3. **Cofnij tylko jeden plik:** zepsuj dwa pliki, a potem przywróć **tylko jeden**: `git restore nazwa-pliku`. Drugi zostaje zepsuty — widzisz różnicę między „cofnij wszystko" a „cofnij punktowo".
4. **Kto to napisał:** `git log --oneline --graph` pokazuje historię jako drzewo. A `git blame nazwa-pliku` pokazuje, kto i kiedy dopisał **każdą linię**. W zespole to codzienność.
5. **Zadbaj o wizytówkę:** dopisz do `README.md` swojego repo krótki opis projektu. To pierwsza rzecz, którą widzi każdy — łącznie z rekruterem.

## Gdzie przekroczyłeś próg zaawansowania

Masz teraz kopię swojego kodu w chmurze, historię każdej zmiany i umiejętność cofnięcia dowolnej wpadki. To jest różnica między „mam plik na pulpicie i modlę się, żeby AI nic nie zepsuło" a „pracuję jak zespół inżynierski". Od teraz każda Twoja praca to commity — a to Twoje CV widzi jako pierwsze.
