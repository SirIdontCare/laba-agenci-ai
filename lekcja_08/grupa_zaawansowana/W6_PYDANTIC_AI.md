# 🐍 Ścieżka Pythona — Moduł 2: Pydantic AI (agent, który nie może skłamać o formacie)

> 🔒 **Wymagane wejście:** ukończony [Moduł 1 Ścieżki Pythona](W5_PYTHON_BACKEND.md) — masz działający backend FastAPI.

## O co chodzi

Twój backend z poprzedniego modułu zwraca **zwykły tekst**. To wystarcza do czatu, ale jest bezużyteczne, gdy chcesz coś z tą odpowiedzią *zrobić* — zapisać do bazy, policzyć, pokazać w tabelce. Model potrafi odpowiedzieć „66 zł", „66.0", „około 66 złotych na osobę" albo napisać wiersz. Za każdym razem inaczej.

**Pydantic AI** rozwiązuje to twardo: definiujesz **kształt odpowiedzi**, a framework gwarantuje, że dostaniesz dokładnie taki obiekt — albo błąd. Model nie może „prawie trafić" w format.

> 🔑 **Znasz to już.** W Module 4 pisałeś ręcznie w TypeScripcie:
> ```js
> inputSchema: z.object({ total: z.number(), people: z.number() })
> ```
> To był **zod**. `pydantic` to dokładnie ta sama idea, tylko w Pythonie. Nie uczysz się nowego pojęcia — **rozpoznajesz znane pojęcie w drugim języku.** To jest moment, w którym przestajesz umieć „jeden framework", a zaczynasz rozumieć, jak to działa w ogóle.

## Cel

Po tym module:
- definiujesz **model odpowiedzi** (Pydantic) i dostajesz zwalidowany obiekt zamiast tekstu,
- podpinasz **narzędzie** do agenta jednym dekoratorem,
- rozumiesz, dlaczego typowana odpowiedź to warunek, żeby agent nadawał się do produkcji.

## Kroki

### 1. Zainstaluj
W folderze `agent-backend`, z aktywnym venv:
```bash
pip install pydantic-ai
```

### 2. Uwaga na nazwę zmiennej z kluczem
Pydantic AI szuka klucza pod nazwą **`GOOGLE_API_KEY`**, a Ty masz go w `.env` jako `GOOGLE_GENERATIVE_AI_API_KEY`. Nie duplikuj klucza — **przepisz go w kodzie**:
```python
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
```
> ⚠️ Nie ustawiaj obu naraz (`GOOGLE_API_KEY` i `GEMINI_API_KEY`) — biblioteka wypisze wtedy ostrzeżenie.

### 3. Napisz agenta z gwarantowaną strukturą — plik `typed_agent.py`

```python
import os
from dotenv import load_dotenv

load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")

from pydantic import BaseModel, Field
from pydantic_ai import Agent


# 1. KSZTAŁT ODPOWIEDZI — odpowiednik z.object({...}) z Modułu 4
class Rachunek(BaseModel):
    total: float = Field(description="Kwota po doliczeniu napiwku")
    people: int = Field(description="Liczba osób")
    per_person: float = Field(description="Kwota na jedną osobę")


# 2. AGENT — dostaje model i wymagany typ odpowiedzi
agent = Agent(
    "google:gemini-3.1-flash-lite",
    output_type=Rachunek,
    system_prompt="Używaj narzędzia split_bill do obliczeń. Nie licz w pamięci.",
)


# 3. NARZĘDZIE — jeden dekorator zamiast całego obiektu tools
@agent.tool_plain
def split_bill(total: float, people: int, tip_percent: float = 0) -> float:
    """Dzieli rachunek na osoby z opcjonalnym napiwkiem."""
    if people <= 0:
        raise ValueError("people musi być > 0")
    return round((total * (1 + tip_percent / 100)) / people, 2)


if __name__ == "__main__":
    wynik = agent.run_sync("Podziel 240 zł na 4 osoby z napiwkiem 10 procent.")
    print("TYP:  ", type(wynik.output).__name__)
    print("OBIEKT:", wynik.output)
    print("Sama kwota na osobę:", wynik.output.per_person)
```

Zwróć uwagę na trzy rzeczy, których **nie musisz** robić: nie parsujesz tekstu, nie piszesz `JSON.parse`, nie sprawdzasz, czy pole istnieje. Framework robi to za Ciebie — albo rzuca błąd.

### 4. Uruchom
```bash
python typed_agent.py
```
**Oczekiwany wynik:**
```
TYP:   Rachunek
OBIEKT: total=264.0 people=4 per_person=66.0
Sama kwota na osobę: 66.0
```

To ta sama liczba co w Module 4 (240 + 10% = 264, ÷ 4 = 66) — ale tym razem jako **obiekt z polami**, a nie zdanie do przeczytania.

### 5. Zobacz różnicę na własne oczy
Zmień `output_type=Rachunek` na `output_type=str` i uruchom ponownie. Dostaniesz zdanie — ładne dla człowieka, bezużyteczne dla kodu. Wróć do `Rachunek`.

**To jest cała lekcja tego modułu.**

## ✅ Samo-weryfikacja (Twój dowód „done")

- `python typed_agent.py` wypisuje **`TYP: Rachunek`** (nie `str`),
- `wynik.output.per_person` zwraca **liczbę 66.0**, do której możesz od razu dodać `+ 10`,
- narzędzie `split_bill` faktycznie się wykonuje (dodaj w nim `print(...)`, żeby to zobaczyć).

## 🤖 Sprawdź się sam przez AI

> *„Robię moduł o Pydantic AI. Oto mój kod: [wklej typed_agent.py].*
> *Oceń wg rubryki — PASS/FAIL + jedno zdanie:*
> *1. Czy `output_type` to model Pydantic, a nie `str`?*
> *2. Czy narzędzie jest podpięte dekoratorem i ma docstring (model używa go jako opisu)?*
> *3. Czy klucz API jest brany ze zmiennej środowiskowej, a nie wpisany w kodzie?*
> *4. Czy narzędzie broni się przed `people = 0`?"*

## Jak oddać

```bash
git add typed_agent.py
git commit -m "Modul Pydantic AI: agent ze zwalidowana odpowiedzia"
git push
```
Wyślij **w DM do prowadzącego**: link do repo + wynik z konsoli + zdanie „Pydantic AI gotowe".

## 🚀 Idź dalej (nieobowiązkowe)

1. **Zobacz, jak działa walidacja:** dodaj do `Rachunek` pole `waluta: str` i poproś agenta o rachunek w euro. Sprawdź, czy trafia.
2. **Zagnieżdżone modele:** zrób `output_type=ListaWydatkow`, gdzie każdy wydatek to osobny model z polami `nazwa` i `kwota`. To jest wzorzec „wyciągnij dane z tekstu do bazy".
3. **Wymuś sensowne wartości:** użyj `Field(gt=0)` dla `people` i zobacz, co się stanie, gdy model spróbuje zwrócić zero.
4. **Wepnij to do FastAPI:** zamień endpoint `/chat` z poprzedniego modułu tak, żeby zwracał `Rachunek` — wtedy Twój frontend dostaje gotowy JSON o znanym kształcie.

## Gdzie przekroczyłeś próg

Typowana odpowiedź to granica między „fajnym demem" a czymś, co można wpiąć w prawdziwy system. Dopóki agent zwraca tekst, każdy kolejny element aplikacji musi zgadywać, co dostał. Od momentu, gdy zwraca **zwalidowany obiekt**, agent staje się normalnym komponentem oprogramowania — takim, któremu można zaufać.

---

## ➡️ Następny moduł Ścieżki Pythona

Wiesz już, **co** agent zwraca. Zostało pytanie, **jak** on do tego dochodzi — bo pętla rozumowania wciąż jest schowana w bibliotece.

**[Moduł 3: LangGraph →](W7_LANGGRAPH.md)** 🔴 — wyciągasz pętlę ReAct z Lekcji 4 na wierzch i rysujesz ją jako graf. Najtrudniejszy moduł całej ścieżki.
