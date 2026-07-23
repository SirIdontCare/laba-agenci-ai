# 🐍 Ścieżka Pythona — Moduł 1: Twój agent na backendzie w Pythonie (FastAPI)

> ⭐ **To jest POZIOM WYŻEJ** — osobny stopień ponad Modułami 0–4, nie ich kolejna część. Ukończenie Modułu 4 to pełne zaliczenie Grupy Zaawansowanej. To pierwszy z trzech modułów Ścieżki Pythona — możesz przerwać ją na dowolnym z nich.
>
> 🔒 **Wymagane wejście:** ukończone Moduły 0–4.

## O co chodzi

Do tej pory Twój agent był **jedną aplikacją Next.js** — interfejs i „mózg" w jednym projekcie, w jednym języku.

Teraz rozdzielasz go tak, jak działają prawdziwe systemy produkcyjne: **interfejs zostaje w Next.js, a mózg agenta przenosisz do osobnego serwisu w Pythonie (FastAPI)**. Dwa oddzielne procesy, dwa porty, rozmawiające przez HTTP.

To jest Twoje pierwsze zetknięcie z **architekturą klient–serwer** i **drugim językiem programowania**. Dlatego to poziom wyżej.

```
Przeglądarka  →  Next.js (frontend, :3000)  →  Python / FastAPI (mózg, :8000)  →  Gemini
```

## Cel

Po tym module:
- masz działający **backend w Pythonie**, który rozmawia z Gemini,
- Twój agent w przeglądarce odpowiada **przez Pythona**, nie przez Next.js,
- rozumiesz, czym jest osobny serwis, **port**, **CORS**, **venv** i zmienne środowiskowe.

## Zanim zaczniesz

Pracujesz na swojej **kopii agenta po Lekcji 7** (tej z Modułu 0). Backend w Pythonie tworzysz w **nowym folderze obok** — nie w środku projektu Next.js.

---

## Kroki

### 1. Zainstaluj Pythona
Pobierz z [python.org/downloads](https://www.python.org/downloads) (3.11+).
> ⚠️ Na Windows przy instalacji **zaznacz „Add Python to PATH"** — bez tego terminal go nie zobaczy.

Sprawdź w terminalu VS Code:
```bash
python --version
```

### 2. Załóż folder backendu i środowisko wirtualne (venv)
```bash
mkdir agent-backend
cd agent-backend
python -m venv .venv
```
Aktywuj środowisko:
- **Windows:** `.venv\Scripts\activate`
- **Mac/Linux:** `source .venv/bin/activate`

W terminalu zobaczysz przedrostek `(.venv)` — jesteś w środowisku.

> 💡 **venv** to izolowana instalacja bibliotek tylko dla tego projektu — pythonowy odpowiednik `node_modules`.

### 3. Zainstaluj biblioteki
```bash
pip install fastapi uvicorn google-genai python-dotenv
```

### 4. Klucz API i ochrona sekretów
Utwórz plik **`.env`** w `agent-backend`:
```
GOOGLE_GENERATIVE_AI_API_KEY=TU_WKLEJ_SWOJ_KLUCZ_Z_AI_STUDIO
```
I plik **`.gitignore`**:
```
.venv
.env
__pycache__
```
> 🛑 Lekcja z Modułu 1 obowiązuje tak samo: **`.env` nigdy nie trafia do repo.**

### 5. Napisz backend — plik `main.py`
Utwórz `main.py` w `agent-backend`:

```python
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

load_dotenv()

app = FastAPI()

# Pozwól frontendowi z portu 3000 wołać ten backend (bez tego przeglądarka zablokuje)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GOOGLE_GENERATIVE_AI_API_KEY"))

SYSTEM_PROMPT = "Jesteś pomocnym asystentem. Odpowiadaj po polsku, krótko i konkretnie."


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def health():
    return {"status": "ok", "backend": "python"}


@app.post("/chat")
def chat(req: ChatRequest):
    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=f"{SYSTEM_PROMPT}\n\nUżytkownik: {req.message}",
    )
    return {"reply": response.text}
```

Przeczytaj ten plik linijka po linijce — rozumiesz już z Modułu 2A, jak śledzić kod. Zwróć uwagę na trzy rzeczy: **model danych** (`ChatRequest`), **endpoint** (`@app.post("/chat")`) i **CORS**.

### 6. Uruchom backend
```bash
uvicorn main:app --reload --port 8000
```

> 💡 **Windows:** jeśli w konsoli zamiast polskich znaków widzisz krzaki (`dzia�am`), to tylko kwestia kodowania terminala — odpowiedź jest poprawna. W przeglądarce wyświetli się prawidłowo.

Wejdź na **http://localhost:8000/docs** — FastAPI sam generuje interaktywną dokumentację. Rozwiń `POST /chat`, kliknij **Try it out**, wpisz wiadomość i **Execute**.

Jeśli dostajesz odpowiedź — **Twój agent myśli już w Pythonie.** 🎉

### 7. Podłącz frontend do Pythona
Teraz niech Twój agent w przeglądarce korzysta z tego backendu. W projekcie Next.js (kopia po L7) utwórz stronę **`app/python/page.tsx`**:

```tsx
"use client";
import { useState } from "react";

export default function PythonAgent() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  }

  return (
    <main style={{ padding: 32, maxWidth: 640 }}>
      <h1>🐍 Agent na backendzie w Pythonie</h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Zapytaj o coś..."
        style={{ width: "100%", padding: 8 }}
      />
      <button onClick={send} disabled={loading} style={{ marginTop: 8 }}>
        {loading ? "Myślę..." : "Wyślij"}
      </button>
      {reply && <p style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>{reply}</p>}
    </main>
  );
}
```

### 8. Uruchom OBA serwisy naraz
Potrzebujesz **dwóch terminali** w VS Code (przycisk `+` w panelu terminala):
- Terminal 1 (folder `agent-backend`, z aktywnym venv): `uvicorn main:app --reload --port 8000`
- Terminal 2 (folder agenta Next.js): `npm run dev`

Wejdź na **http://localhost:3000/python** i zadaj pytanie. Odpowiedź przychodzi z Pythona.

> To jest ten moment, w którym widzisz, że aplikacja to nie jeden program, tylko **kilka serwisów, które ze sobą gadają.**

---

## ✅ Samo-weryfikacja (Twój dowód „done")

1. `http://localhost:8000/` zwraca `{"status":"ok","backend":"python"}`
2. `http://localhost:8000/docs` → `POST /chat` zwraca sensowną odpowiedź
3. `http://localhost:3000/python` → wpisujesz pytanie, dostajesz odpowiedź **z backendu w Pythonie**
4. W repo **nie ma** `.env` ani `.venv`

Szybki test z terminala:
```bash
curl -X POST http://localhost:8000/chat -H "Content-Type: application/json" -d "{\"message\":\"Czesc, kim jestes?\"}"
```

## 🤖 Sprawdź się sam przez AI (zanim wyślesz prowadzącemu)

> *„Przeniosłem backend agenta do Pythona (FastAPI). Oto mój `main.py`: [wklej].*
> *Oceń wg rubryki — PASS/FAIL + jedno zdanie:*
> *1. Czy klucz API jest wczytywany ze zmiennej środowiskowej, a nie wpisany w kodzie?*
> *2. Czy CORS jest ustawiony tak, że frontend z localhost:3000 może wołać backend?*
> *3. Czy endpoint `/chat` poprawnie przyjmuje `message` i zwraca `reply`?*
> *4. Czy `.env` i `.venv` są w `.gitignore`?"*

## Jak oddać

Wypchnij backend jako **osobne repo** (`agent-backend`) — ćwiczysz to, co umiesz z Modułu 1. Potem wyślij **w DM do prowadzącego**:
1. **link do repo z backendem**,
2. **screenshot** strony `/python` z odpowiedzią agenta,
3. jedno zdanie: „Ścieżka Pythona — Moduł 1 gotowy".

## Chcesz iść jeszcze dalej? (nieobowiązkowe)

- **Dodaj narzędzie w Pythonie** — np. kalkulator albo dzielenie rachunku z Modułu 4, tym razem po stronie backendu.
- **Podłącz bazę** — Supabase albo Neon (Postgres) i zapisuj historię rozmów po stronie Pythona.
- **Wdróż backend** — np. na Railway albo Render, żeby żył w internecie tak jak Twój Next.js na Vercelu.

## Gdzie przekroczyłeś próg

Napisałeś działający serwis w **drugim języku**, rozdzieliłeś aplikację na **frontend i backend** i połączyłeś je przez HTTP. To już nie jest „kurs o agentach AI" — to jest **inżynieria oprogramowania**. Gratulacje. 🐍

---

## ➡️ Następny moduł Ścieżki Pythona

Twój backend zwraca **zwykły tekst** — ładny dla człowieka, bezużyteczny dla kodu. W kolejnym module naprawiasz to na poziomie architektury:

**[Moduł 2: Pydantic AI →](W6_PYDANTIC_AI.md)** — agent, który zwraca **zwalidowany obiekt**, a nie zdanie. (I okazuje się, że znasz to już z Modułu 4 — bo `pydantic` to `zod` w Pythonie.)
