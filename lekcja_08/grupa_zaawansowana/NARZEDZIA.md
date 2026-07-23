# 🧰 Narzędzia i linki

Wszystko, czego potrzebujesz na tej ścieżce. **Instaluj tylko to, co jest potrzebne na Twoim etapie** — kolumna „Kiedy" mówi, od którego modułu.

Wszystkie narzędzia mają **darmowe plany lub są open source**. Nie potrzebujesz karty kredytowej.

---

## 📥 Do zainstalowania na komputerze

| Narzędzie | Po co | Link | Kiedy |
|---|---|---|---|
| **VS Code** | Twoje środowisko pracy — edytor, terminal, git i debugger w jednym | https://code.visualstudio.com | **Moduł 0** (wymóg) |
| **Node.js** (18+) | uruchamianie agenta, `npm` | https://nodejs.org | Moduł 0 |
| **Git** | wersjonowanie kodu, cofanie zmian | https://git-scm.com/downloads | Moduł 1 |
| **Python** (3.11+) | backend agenta | https://www.python.org/downloads | 🐍 Ścieżka Pythona |

> ⚠️ **Windows:** przy instalacji Pythona zaznacz **„Add Python to PATH"**, inaczej terminal go nie zobaczy.

---

## 🤖 Wtyczka z asystentem AI do VS Code

**Wymagana od Modułu 0.** Wybierz **jedną** i zainstaluj ją w VS Code (`Ctrl+Shift+X` → wyszukaj nazwę):

| Wtyczka | Link |
|---|---|
| **GitHub Copilot** | https://github.com/features/copilot |
| **Claude Code** | https://claude.com/download |
| **Codex (OpenAI)** | https://chatgpt.com/codex |

> 💡 Jeśli kurs robiłeś w osobnej aplikacji (Codex Desktop, Antigravity) — tutaj przesiadasz się na **wtyczkę wewnątrz VS Code**. Praca w prawdziwym IDE to część tej ścieżki.

---

## ☁️ Konta i usługi online

| Usługa | Po co | Link | Kiedy |
|---|---|---|---|
| **GitHub** | hosting kodu, oddawanie prac, Pull Requesty | https://github.com/signup | Moduł 1 |
| **Google AI Studio** | klucz API do modeli Gemini | https://aistudio.google.com | masz z kursu |
| **Supabase** | baza danych (Postgres) — **nowy, osobny projekt** | https://supabase.com | Moduł 0 (izolacja) |
| **Neon** | alternatywny darmowy Postgres | https://neon.tech | opcjonalnie |

> 🛑 **Baza:** w Module 0 zakładasz **nowy, pusty projekt** — nie używasz bazy swojego projektu kursowego. Inaczej eksperymenty (zwłaszcza SQL z Extra 1) mogą uszkodzić dane kursowe.

---

## 📚 Dokumentacja (gdy chcesz kopać głębiej)

| Temat | Link |
|---|---|
| **Git** — oficjalny podręcznik (po polsku) | https://git-scm.com/book/pl/v2 |
| **Next.js** — framework Twojego agenta | https://nextjs.org/docs |
| **Vercel AI SDK** — biblioteka do agentów | https://ai-sdk.dev |
| **Supabase** — dokumentacja | https://supabase.com/docs |
| **SQL** — kurs interaktywny od zera | https://sqlbolt.com |
| **FastAPI** — backend w Pythonie | https://fastapi.tiangolo.com |

---

## ⌨️ Skróty VS Code, które warto znać od razu

| Skrót | Co robi |
|---|---|
| `` Ctrl+` `` | otwórz / schowaj terminal |
| `Ctrl+P` | skocz do pliku po nazwie |
| `Ctrl+Shift+F` | szukaj tekstu w **całym** projekcie |
| `F12` | idź do definicji (skocz tam, gdzie coś powstało) |
| `Alt+←` | wróć tam, skąd skoczyłeś |
| `Ctrl+Shift+P` | paleta komend — wszystko, co VS Code potrafi |

> Na Macu zamiast `Ctrl` używasz `Cmd`.

---

## 🗺️ Co, kiedy, po co — skrót

- **Zaczynasz (Moduł 0)?** → VS Code + wtyczka AI + Node.js + nowy projekt Supabase.
- **Moduł 1?** → dochodzi Git i konto GitHub.
- **Moduły 2–4?** → nic nowego, pracujesz na tym, co masz.
- **Extra 1 (SQL)?** → tylko przeglądarka i Twój **nowy** projekt Supabase.
- **Ścieżka Pythona 🐍?** → dochodzi Python (+ opcjonalnie Neon). Moduł 2 dokłada `pydantic-ai`, Moduł 3 `langgraph`.
