# Grupa Zaawansowana — Moduł 0: Kokpit (VS Code, koniec z autopilotem)

> 🎯 **To jest bilet wstępu do Grupy Zaawansowanej.** Przejdź Moduł 0, wyślij dowód prowadzącemu — i ruszasz z Modułem 1. Kto nie przejdzie, nic nie traci — wraca do kursu głównego.

## O co chodzi w tej ścieżce

W kursie głównym **zlecałeś** AI: wklejałeś prompt, asystent budował, Ty testowałeś. To była magia — ale magii się nie rozumie, magii się używa.

Grupa Zaawansowana odwraca to o 180°. Tu **schodzisz pod maskę własnego agenta**: uruchamiasz go ręcznie, czytasz jego kod, wersjonujesz przez git, debugujesz sam. AI zostaje — ale teraz siedzi **w Twoim IDE jako drugi pilot**, a nie jako osobna apka, która robi wszystko za Ciebie.

Pierwszy krok: przesiadka do prawdziwego kokpitu inżyniera — **VS Code**.

> ⚠️ **Wymóg całej ścieżki:** pracujesz w **VS Code + wtyczce z asystentem AI** (GitHub Copilot / Claude Code / Codex). Jeśli kurs główny robiłeś w Codex Desktop czy Antigravity — tutaj przesiadasz się na IDE. **Praca w VS Code to właśnie ta część „zaawansowana".**

> 🛑 **NAJPIERW: pracuj na KOPII i na OSOBNEJ BAZIE.** Całą Grupę Zaawansowaną robisz na **kopii swojego agenta w stanie po Lekcji 7**, podpiętej do **własnej, nowej bazy danych**. Główny projekt i jego baza zostają nietknięte — na nich idziesz dalej na zwykłych zajęciach (Lekcje 8–12). Bez tego eksperymenty z tej ścieżki (git, refaktor, debug, własne SQL) **rozwaliłyby Ci kurs**. Jak to ustawić — kroki 3 i 4 poniżej.

## Cel Modułu 0

Po tym module:
- masz zainstalowany VS Code + wtyczkę AI,
- masz **kopię** swojego agenta (stan po Lekcji 7) w osobnym folderze i otwierasz w VS Code właśnie ją,
- kopia ma **własną, osobną bazę danych** — kurs jest odcięty od Twoich eksperymentów,
- uruchamiasz agenta **ręcznie z wbudowanego terminala** (bez proszenia AI o start),
- potrafisz sam znaleźć plik `route.ts` w drzewie projektu.

Zero nowego kodu. Chodzi o to, żebyś **umiał się poruszać** tam, gdzie do tej pory poruszał się za Ciebie asystent.

## Kroki

### 1. Zainstaluj VS Code
Pobierz i zainstaluj z [code.visualstudio.com](https://code.visualstudio.com/). Uruchom.

### 2. Zainstaluj wtyczkę z asystentem AI
W VS Code otwórz panel **Extensions** (ikona klocków po lewej albo `Ctrl+Shift+X`) i zainstaluj JEDNĄ z:
- **GitHub Copilot** (szukaj „GitHub Copilot")
- **Claude Code** (szukaj „Claude Code")
- **Codex / OpenAI** (szukaj „Codex")

Zaloguj się w niej swoim kontem. To Twój drugi pilot — zostaje z Tobą do końca ścieżki.

### 3. Skopiuj agenta (stan po Lekcji 7) i otwórz KOPIĘ
1. Znajdź folder swojego agenta z kursu głównego (ten, w którym jest `package.json`) — w stanie **po Lekcji 7**.
2. Skopiuj **cały folder** obok i nazwij kopię np. `moj-agent-zaawansowany`. (Nie musisz kopiować `node_modules` — odtworzysz je przez `npm install`.)
3. **Odetnij kopię od repozytorium kursowego** — usuń z niej ukryty folder `.git`. To krytyczne: razem z projektem skopiowałeś jego historię i **powiązanie z Twoim repo kursowym na GitHubie**. Bez tego pierwszy `push` z kopii poleciałby do repo kursu i mógłby **przedeployować Twojego kursowego agenta**.

   W terminalu, będąc **w folderze kopii**:
   ```bash
   # Windows (PowerShell):
   Remove-Item -Recurse -Force .git

   # Mac / Linux / Git Bash:
   rm -rf .git
   ```
   > Folder `.git` jest ukryty — w Eksploratorze może być niewidoczny. Najpewniej usuniesz go komendą wyżej.

4. W VS Code: `File → Open Folder…` → wskaż **kopię** (`moj-agent-zaawansowany`), **nie oryginał**.

Po lewej, w **Explorerze**, zobaczysz drzewo plików. Od teraz **cała Grupa Zaawansowana dzieje się na tej kopii** — oryginału nie ruszasz, żeby na zajęciach (Lekcje 8–12) nie było rozjazdu.

### 4. Podepnij OSOBNĄ bazę danych ⚠️

Skopiowałeś folder — ale kopia **nadal celuje w tę samą bazę Supabase**, co Twój projekt z kursu. Gdybyś zostawił to tak, eksperymenty z tej ścieżki (a zwłaszcza własne zapytania SQL) mogłyby **uszkodzić bazę, na której stoi Twój kurs**.

Dlatego kopia dostaje **własną, czystą bazę**:

1. Wejdź na [supabase.com](https://supabase.com) → **New project**. Nazwij go np. `agent-zaawansowany`. Poczekaj, aż się postawi (~1 min).
2. **Odtwórz tabele** — otwórz **SQL Editor** i uruchom te same zapytania SQL, które wykonywałeś na Lekcjach 5 i 6 (pliki `W1_SUPABASE_SETUP.md` i `W1_PGVECTOR.md` z materiałów kursu).
   Powinny powstać te same tabele co w kursie: **`conversations`**, **`messages`**, **`user_profiles`**, a jeśli robiłeś Lekcję 6 — również **`documents`** z rozszerzeniem `pgvector`.
3. W nowym projekcie wejdź w **Settings → API** i skopiuj **Project URL** oraz **anon key**.
4. W swojej **kopii** projektu otwórz `.env.local` i **podmień wartości** na te z nowego projektu:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://TU_ID_NOWEGO_PROJEKTU.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY_Z_NOWEGO_PROJEKTU
   ```
   Klucz do modelu (`GOOGLE_GENERATIVE_AI_API_KEY`) zostaje **bez zmian** — to ten sam klucz co w kursie.

> 📄 **Nie wiesz, co dokładnie ma być w `.env.local`?** W tym repo jest gotowy wzór: **[`.env.local.example`](.env.local.example)** — z opisem każdej zmiennej i miejscem na Twoje wartości. Skopiuj go do folderu kopii jako `.env.local` i uzupełnij.

> 🛑 **Sprawdź dwa razy, że edytujesz `.env.local` w KOPII, nie w oryginale.** Oryginalny projekt musi dalej wskazywać na starą bazę — na nim idziesz na zwykłych zajęciach.

> 💡 Nie chcesz drugiego projektu w Supabase (albo skończył Ci się darmowy limit)? Możesz użyć [Neon](https://neon.tech) — to też darmowy Postgres. Wtedy podmieniasz connection string zamiast kluczy Supabase.

**Od teraz masz pełną izolację: osobny folder + osobna baza.** Cokolwiek zepsujesz w Grupie Zaawansowanej, Twój kurs jest bezpieczny.

### 5. Otwórz wbudowany terminal
Menu: `Terminal → New Terminal` (albo `` Ctrl+` ``). Na dole pojawi się terminal — i **już jesteś w folderze projektu** (nie musisz robić `cd`).

### 6. Uruchom agenta RĘCZNIE
Wpisz kolejno (zatwierdzając Enterem):
```bash
npm install
npm run dev
```
Poczekaj na adres (np. `http://localhost:3000`). Otwórz go w przeglądarce. **Twój agent działa — uruchomiony Twoją ręką, nie promptem.**

Porozmawiaj z nim chwilę i sprawdź w Supabase (nowy projekt → Table Editor), czy dane lądują **w nowej bazie**. Jeśli tak — izolacja działa.

### 7. Znajdź `route.ts` — sam
W Explorerze rozwiń: `app` → `api` → `chat` → i otwórz **`route.ts`**.
To jest „mózg" Twojego agenta — plik, do którego w kolejnych modułach będziesz wracał. Na razie tylko go znajdź i otwórz.

> 💡 Nie pytaj AI „gdzie jest route.ts". O to właśnie chodzi w Module 0 — masz to znaleźć sam. Wtyczkę odpalisz przy trudniejszych modułach.

## ✅ Samo-weryfikacja (Twój dowód „done")

**Screenshot 1 — kokpit.** Zrób zrzut, na którym widać naraz:
1. **drzewo projektu** w Explorerze VS Code (po lewej) — z nazwą folderu **kopii**,
2. otwarty plik **`route.ts`**,
3. **wbudowany terminal** z działającym `npm run dev` (widoczny adres `localhost`).

Dla pewności, że jesteś we właściwym miejscu, wpisz w terminalu VS Code:
```bash
node -v && npm run dev
```
**Oczekiwany wynik:** wersja Node (v18+) i serwer startujący z adresem `localhost`.

**Screenshot 2 — dowód izolacji.** Porozmawiaj chwilę z agentem, a potem pokaż **Table Editor swojego NOWEGO projektu Supabase** z widocznymi świeżymi danymi. To potwierdza, że kopia pisze do własnej bazy, a nie do kursowej.

Jeśli oba się zgadzają — zaliczone.

## 🤖 Sprawdź się sam przez AI (zanim wyślesz prowadzącemu)

Wklej do swojej wtyczki AI ten prompt razem z opisem tego, co zrobiłeś:

> *„Jestem na Module 0 ścieżki zaawansowanej. Oceń, czy zaliczyłem, wg tej rubryki — odpowiedz PASS albo FAIL + jedno zdanie co poprawić:*
> *1. Czy pracuję na KOPII projektu, a nie na oryginale z kursu?*
> *2. Czy usunąłem z kopii folder `.git` (czyli `git remote -v` nic nie pokazuje)?*
> *3. Czy kopia jest podpięta do NOWEJ, osobnej bazy danych?*
> *4. Czy uruchomiłem projekt z wbudowanego terminala VS Code (nie z osobnej apki AI)?*
> *5. Czy potrafię wskazać, gdzie w drzewie leży app/api/chat/route.ts?*
> *Oto co zrobiłem: [opisz w 5 zdaniach]"*

Jeśli AI zwróci **PASS** — jesteś w domu.

## Jak oddać

Wyślij screenshot **w prywatnej wiadomości (DM) do prowadzącego na Discordzie** — nie na publiczny kanał. To **jedyny moduł oddawany screenshotem**: od Modułu 1 zakładasz własne repozytorium na GitHubie i **od tej pory wysyłasz prowadzącemu na priv link do repo**. Cały Twój dalszy postęp widać w historii commitów, więc wystarczy jeden link.

## 🚀 Idź dalej (nieobowiązkowe)

Chcesz wycisnąć z tego modułu więcej? Te ćwiczenia sprawdzisz sam:

1. **Trzy skróty, które oszczędzą Ci godziny:** `Ctrl+P` (skocz do dowolnego pliku po nazwie), `Ctrl+Shift+P` (paleta komend — wszystko, co VS Code potrafi), `` Ctrl+` `` (terminal). Otwórz `route.ts` używając `Ctrl+P` zamiast klikania w drzewie.
2. **Ogarnij terminal na piechotę:** zamknij terminal VS Code, otwórz systemowy i dojdź do folderu projektu używając `cd`, sprawdzając po drodze `pwd` (Mac/Linux) lub `cd` bez argumentu (Windows) oraz `ls` / `dir`. Uruchom stamtąd `npm run dev`.
3. **Twardy restart:** zatrzymaj serwer `Ctrl+C`, uruchom ponownie. Zrób to trzy razy, aż przestanie być stresujące — będziesz to robił setki razy.
4. **Rozejrzyj się:** otwórz `package.json` i znajdź sekcję `"scripts"`. To spis wszystkich komend, jakie Twój projekt potrafi wykonać.

## Gdzie przekroczyłeś próg zaawansowania

Do tej pory ktoś (AI) uruchamiał Twój projekt za Ciebie. Od teraz **robisz to sam, w narzędziu, w którym pracują prawdziwi inżynierowie.** To nie jest drobiazg — to różnica między „umiem kazać AI zbudować apkę" a „umiem tę apkę prowadzić". Reszta ścieżki stoi na tym fundamencie.
