# 🧰 Narzędzia i linki — kurs AI Agents

Kompletna lista narzędzi używanych na kursie: w części **podstawowej** (no-code — AI buduje za Ciebie) i w **Advanced Tracku** (pod maskę — VS Code, git, Python).

Instaluj / zakładaj konto **tylko to, czego potrzebujesz na swoim etapie** — kolumna „Poziom" mówi, kiedy dane narzędzie wchodzi do gry.

> 🟢 **Podstawowy** = kurs główny &nbsp;•&nbsp; 🔵 **Zaawansowany** = Advanced Track &nbsp;•&nbsp; ⭐ **Bonus** = opcjonalne

---

## 📥 Do zainstalowania na komputerze

| Narzędzie | Do czego | Link | Poziom |
|---|---|---|---|
| **Node.js** (v18+) | uruchamianie aplikacji, `npm` | https://nodejs.org | 🟢 Podstawowy |
| **VS Code** | edytor kodu / IDE | https://code.visualstudio.com | 🟢 opcja &nbsp;•&nbsp; 🔵 **wymóg** |
| **Git** | wersjonowanie kodu (commity, cofanie) | https://git-scm.com/downloads | 🔵 Zaawansowany |
| **Python** (3.11+) | backend trzeciego agenta | https://www.python.org/downloads | ⭐ Bonus |

---

## ☁️ Konta i usługi online (darmowe plany)

| Usługa | Do czego | Link | Poziom |
|---|---|---|---|
| **Google AI Studio** | klucz API do modeli Gemini | https://aistudio.google.com | 🟢 Podstawowy |
| **GitHub** | hosting kodu, repozytoria, Pull Requesty | https://github.com/signup | 🟢 od L07 &nbsp;•&nbsp; 🔵 stale |
| **Supabase** | baza danych (Postgres) + pgvector (RAG) | https://supabase.com | 🟢 L5–L6 |
| **Neon** | serverless Postgres — alternatywa dla Supabase | https://neon.tech | 🔵 opcja / ⭐ Bonus |
| **Vercel** | wdrożenie agenta w internecie (deploy) | https://vercel.com | 🟢 L7 |

> 💡 **Supabase vs Neon:** oba dają darmowego Postgresa. Na kursie głównym używamy **Supabase** (bo ma wbudowany panel, auth i pgvector w jednym). **Neon** to lżejsza alternatywa, jeśli potrzebujesz tylko samej bazy — przydatna zwłaszcza pod backend w Pythonie.

---

## 🤖 Asystenci AI (wybierz przynajmniej jednego)

| Narzędzie | Do czego | Link | Poziom |
|---|---|---|---|
| **Claude Code** | asystent kodowania (apka desktop) | https://claude.com/download | 🟢 Podstawowy |
| **Codex** (OpenAI) | asystent kodowania (apka desktop) | https://chatgpt.com/codex | 🟢 Podstawowy |
| **Antigravity** (Google) | agent-first IDE | https://antigravity.google | 🟢 Podstawowy |
| **GitHub Copilot** | wtyczka AI **do VS Code** | https://github.com/features/copilot | 🔵 Zaawansowany |

> 🔵 **W Advanced Tracku** pracujesz w **VS Code + wtyczka z asystentem AI** (Copilot / Claude Code / Codex jako rozszerzenie). To wymóg — praca w prawdziwym IDE to część „zaawansowania".

---

## 📚 Dokumentacja (dla ciekawych)

| Temat | Link |
|---|---|
| **Next.js** — framework aplikacji | https://nextjs.org/docs |
| **Vercel AI SDK** — biblioteka do agentów | https://ai-sdk.dev |
| **Supabase Docs** | https://supabase.com/docs |
| **FastAPI** — backend w Pythonie | https://fastapi.tiangolo.com |
| **Git — poradnik** | https://git-scm.com/doc |

---

## 🗺️ Co, kiedy, po co (skrót)

- **Zaczynasz kurs?** → Node.js + klucz z Google AI Studio + jeden asystent AI. Tyle wystarczy na Lekcje 1–4.
- **Lekcje 5–7?** → dochodzi Supabase (baza), a od L07 GitHub i Vercel (deploy).
- **Wchodzisz w Advanced Track?** → VS Code (wymóg) + Git + wtyczka AI. GitHub od Modułu 1.
- **Bonus (trzeci agent)?** → Python + FastAPI, opcjonalnie Neon jako baza.

> Wszystkie narzędzia mają **darmowe plany / są open source**. Na kurs nie potrzebujesz karty kredytowej ani płatnych subskrypcji.
