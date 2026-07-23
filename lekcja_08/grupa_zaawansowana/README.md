# Grupa Zaawansowana — od użytkownika AI do inżyniera

Autorska ścieżka dla osób, które chcą przestać *zlecać* AI budowanie aplikacji, a zacząć **rozumieć i kontrolować** własny kod. Zamiast wklejać prompty do gotowej apki — schodzisz pod maskę: VS Code, git, czytanie kodu, debugowanie, pisanie funkcji ręcznie.

> Autor: **Paweł Paruzel**

## Dla kogo

Dla każdego, kto zbudował już aplikację z pomocą asystenta AI i czuje, że chce **naprawdę** zapanować nad tym, co powstaje pod spodem.

## Czego potrzebujesz

| Narzędzie | Po co | Kiedy |
|---|---|---|
| **VS Code** + **wtyczka AI** (Copilot / Claude Code / Codex) | Twoje środowisko pracy | **wymóg od Modułu 0** |
| **Node.js 18+** | uruchamianie agenta | od Modułu 0 |
| **Git** | wersjonowanie | od Modułu 1 |
| konto **GitHub** | oddawanie prac | od Modułu 1 |
| **Python 3.11+** | backend agenta | 🐍 Ścieżka Pythona |

👉 Wszystkie linki do pobrania: **[NARZEDZIA.md](NARZEDZIA.md)**

---

## 🚀 Jak korzystać z tych warsztatów

### Krok 1: Przygotuj bezpieczną piaskownicę

> 🛑 **Pełna izolacja od kursu — to warunek wejścia.** Całą ścieżkę robisz na **kopii swojego agenta po Lekcji 7**, która ma:
> - **osobny folder** (z usuniętym `.git`, żeby nie ciągnąć powiązania z repo kursowym),
> - **osobną bazę danych** (nowy projekt Supabase / Neon),
> - **osobne repo na GitHubie**,
> - **osobny projekt na Vercelu** (w Module 4) — Twój zaawansowany agent żyje **obok** kursowego, nie zamiast niego.
>
> Twój projekt kursowy, jego baza i jego wersja na Vercelu zostają **nietknięte** — na nich idziesz dalej na zwykłych zajęciach. Bez tej izolacji eksperymenty z tej ścieżki potrafią rozwalić kurs.

Konfigurację przechodzisz krok po kroku w **[Module 0](W0_KOKPIT.md)** (kopia + baza) i **[Module 1](W1_GIT_GITHUB.md)** (repo). Nie pomijaj tego.

### Krok 2: Idź modułami po kolei

Moduły są **ułożone w kolejności** — każdy zakłada umiejętności z poprzedniego. Zacznij od **Modułu 0** (to bilet wstępu) i idź po numerach. Nie przeskakuj.

### Krok 3: Pracuj każdym modułem w tym samym rytmie

Każdy plik modułu ma zawsze tę samą budowę — pracujesz nią cztery kroki:

| | Etap | Co robisz |
|---|---|---|
| 1️⃣ | **Przeczytaj** „O co chodzi" i „Cel" | wiesz, po co to robisz |
| 2️⃣ | **Wykonaj „Kroki"** na swoim projekcie | tu dzieje się nauka |
| 3️⃣ | **✅ Samo-weryfikacja** | uruchamiasz podaną komendę / robisz screenshot |
| 4️⃣ | **🤖 Sprawdź się przez AI** | wklejasz swój kod + gotową rubrykę do wtyczki → dostajesz PASS/FAIL |

Na końcu każdego modułu jest jeszcze **🚀 „Idź dalej"** — dodatkowe ćwiczenia dla chętnych. Nieobowiązkowe, ale to w nich siedzi największy przyrost.

### Krok 4: Oddaj pracę

Wszystko wysyłasz **prywatną wiadomością (DM) do prowadzącego na Discordzie** — nie na kanał publiczny.

| Moduł | Co wysyłasz |
|---|---|
| **Moduł 0** | 2 screenshoty (VS Code z działającym agentem + nowa baza z danymi) |
| **Moduł 1 i dalej** | **link do swojego repo na GitHubie** + zdanie „Moduł X gotowy" |

To wciąż to samo repo — kolejne moduły po prostu dopychasz commitami, a postęp widać w historii. Jeden link starcza do końca ścieżki.

### Krok 5: Gdy utkniesz

1. **Przeczytaj komunikat błędu** — serio, jest w nim odpowiedź częściej, niż myślisz (Moduł 3 uczy właśnie tego).
2. **Zapytaj swoją wtyczkę AI o wyjaśnienie**, nie o gotowca:
   > *„Wytłumacz mi ten błąd krok po kroku, jakbym nigdy nie programował: [wklej błąd]"*
3. **Dopiero potem** pisz do prowadzącego — z konkretem: co robisz, co widzisz, screenshot.

---

## 🤖 Ważne: asystent AI zostaje z Tobą

Ta ścieżka **nie zabiera Ci AI** — zmienia mu rolę.

- **Na kursie głównym** AI było **autopilotem**: wklejałeś prompt, dostawałeś gotową aplikację.
- **Tutaj** AI jest **drugim pilotem** w Twoim IDE: podpowiada linie, tłumaczy kod, sprawdza Twoją pracę. Ale to **Ty prowadzisz**.

W dwóch modułach (**3 — debugowanie** i **4 — capstone**) celowo przykręcamy asystenta: najpierw znajdź/napisz **sam**, a AI użyj dopiero **do sprawdzenia**. Nie dlatego, że AI jest złe — tylko dlatego, że inaczej niczego się nie nauczysz.

## Mapa ścieżki

### Ścieżka główna — te moduły trzeba przejść

| # | Moduł | Czego się nauczysz |
|---|---|---|
| **0** | [Kokpit: VS Code, koniec z autopilotem](W0_KOKPIT.md) | VS Code, terminal, uruchomienie projektu ręcznie |
| **1** | [Wersjonowanie jak inżynier](W1_GIT_GITHUB.md) | git + GitHub, commity, cofanie zmian |
| **2A** | [Czytaj kod, który AI napisało](W2A_CZYTANIE_KODU.md) | czytanie kodu, śledzenie przepływu danych |
| **2B** | [Elementarz kodu](W2B_ELEMENTARZ_KODU.md) | zmienne, funkcje, `if`, `return` — rozgrzewka, ~30 min |
| **3** | [Debugowanie bez AI](W3_DEBUG.md) | stack trace, `console.log`, debugger — na projekcie [`debug_agent/`](debug_agent) |
| **4** | [Capstone: zmiana bez generatora](W4_CAPSTONE.md) | własna funkcja ręcznie + Pull Request + **własny deploy na Vercelu** |

**Ukończenie Modułów 0–4 = pełne zaliczenie Grupy Zaawansowanej.** Każdy moduł ma na końcu sekcję **„Idź dalej"** z dodatkowymi ćwiczeniami dla chętnych.

### Moduły ponadprogramowe — dla chętnych

| Moduł | Czego się nauczysz |
|---|---|
| ⭐ [Extra 1: Twoja baza od środka](E1_BAZA_OD_SRODKA.md) | SQL, tabele, własne zapytania do bazy agenta |
| ⭐ [Extra 2: Panuj nad kosztami agenta](E2_KOSZTY_AGENTA.md) | audyt kosztów, płatne przełączniki, limity, tokeny |

### 🐍 Ścieżka Pythona — poziom wyżej

Osobne piętro **ponad** ścieżką główną: drugi język, prawdziwy backend i frameworki agentowe. W pełni opcjonalne.

| # | Moduł | Czego się nauczysz | Trudność |
|---|---|---|---|
| **1** | [Twój agent na backendzie w Pythonie](W5_PYTHON_BACKEND.md) | FastAPI, architektura klient–serwer, drugi język | 🟢 |
| **2** | [Pydantic AI](W6_PYDANTIC_AI.md) | zwalidowana odpowiedź zamiast tekstu (`pydantic` = `zod` w Pythonie) | 🟡 |
| **3** | [LangGraph](W7_LANGGRAPH.md) | jawna pętla ReAct jako graf — zobacz to, co SDK ukrywało | 🔴 |

> 🐍 **To nie jest część głównej ścieżki.** Ukończenie Modułów 0–4 to pełne zaliczenie Grupy Zaawansowanej. Ścieżkę Pythona bierzesz, jeśli chcesz sięgnąć piętro wyżej — i możesz przerwać ją na dowolnym module.

## Efekt

Po tej ścieżce przestajesz być „użytkownikiem AI" — zostajesz osobą, która **panuje nad swoim projektem**: pracuje w prawdziwym IDE, wersjonuje przez git, czyta cudzy kod, łapie błędy sama i wdraża zmiany jak inżynier.

---

© Paweł Paruzel. Materiały autorskie.
