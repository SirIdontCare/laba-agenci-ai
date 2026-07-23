# 🐍 Ścieżka Pythona — Moduł 3: LangGraph (narysuj mózg swojego agenta)

> 🔒 **Wymagane wejście:** ukończony [Moduł Pydantic AI](W6_PYDANTIC_AI.md).
> 🔴 **To najtrudniejszy moduł całej ścieżki.** Jeśli poprzednie szły Ci opornie — spokojnie odpuść. Nic nie tracisz.

## O co chodzi

Wróć myślami do **Lekcji 4** kursu głównego. Zbudowałeś tam agenta **ReAct**: myśl → działaj → obserwuj → myśl dalej. Ale tej pętli nigdy nie widziałeś. Była schowana w SDK pod jednym parametrem:

```js
maxSteps: 8
```

Agent gdzieś w środku kręcił się w kółko, a Ty mogłeś tylko ustawić, ile razy. **LangGraph wyciąga tę pętlę na wierzch** i zamienia ją w graf, który sam rysujesz: węzły to kroki, krawędzie to decyzje, a Ty widzisz dokładnie, którędy przebiega rozumowanie.

Pierwszy raz **zobaczysz** to, czego używasz od miesięcy.

```
        START
          │
          ▼
      ┌───────┐   nie potrzeba narzędzia
      │ MYŚL  │────────────────────────────► END
      └───────┘
          │ potrzebuję narzędzia
          ▼
     ┌───────────┐
     │ NARZĘDZIA │
     └───────────┘
          │
          └──────► wraca do MYŚL
```

## Cel

Po tym module:
- budujesz **graf stanu** (`StateGraph`) z własnymi węzłami,
- rozumiesz **krawędź warunkową** — czyli jak agent decyduje „narzędzie czy koniec",
- widzisz w konsoli **każdy krok pętli ReAct**,
- wiesz, gdzie postawić **bezpiecznik na koszty** (odpowiednik `maxSteps`).

## Kroki

### 1. Zainstaluj
```bash
pip install langgraph langchain-google-genai
```

### 2. Napisz graf — plik `graph_agent.py`

```python
import os
from dotenv import load_dotenv

load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")

from typing import Annotated, TypedDict
from langchain_core.messages import HumanMessage
from langchain_core.tools import tool
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition


# 1. NARZĘDZIE — to samo co zawsze, tylko w konwencji LangChaina
@tool
def split_bill(total: float, people: int, tip_percent: float = 0) -> float:
    """Dzieli rachunek na osoby z opcjonalnym napiwkiem."""
    print(f"   [WĘZEŁ: NARZĘDZIE] total={total} people={people} tip={tip_percent}")
    if people <= 0:
        raise ValueError("people musi być > 0")
    return round((total * (1 + tip_percent / 100)) / people, 2)


# 2. STAN — to, co płynie przez graf. Tu: lista wiadomości.
class State(TypedDict):
    messages: Annotated[list, add_messages]


llm = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite").bind_tools([split_bill])


# 3. WĘZEŁ „MYŚL" — zwykła funkcja: bierze stan, zwraca nowy fragment stanu
def mysl(state: State):
    print("   [WĘZEŁ: MYŚL]")
    return {"messages": [llm.invoke(state["messages"])]}


# 4. BUDOWA GRAFU
g = StateGraph(State)
g.add_node("mysl", mysl)
g.add_node("narzedzia", ToolNode([split_bill]))

g.add_edge(START, "mysl")                 # start zawsze do „myśl"
g.add_conditional_edges(                  # ↙ tu agent decyduje
    "mysl", tools_condition, {"tools": "narzedzia", END: END}
)
g.add_edge("narzedzia", "mysl")           # po narzędziu wracamy myśleć — TO JEST PĘTLA

app = g.compile()


if __name__ == "__main__":
    out = app.invoke(
        {"messages": [HumanMessage("Podziel 240 zł na 4 osoby z napiwkiem 10 procent.")]},
        {"recursion_limit": 8},           # ← bezpiecznik, odpowiednik maxSteps
    )
    print("ODPOWIEDŹ:", out["messages"][-1].text())
    print("KROKÓW W GRAFIE:", len(out["messages"]))
```

### 3. Uruchom i **obserwuj pętlę**
```bash
python graph_agent.py
```
**Oczekiwany wynik:**
```
   [WĘZEŁ: MYŚL]
   [WĘZEŁ: NARZĘDZIE] total=240.0 people=4 tip=10.0
   [WĘZEŁ: MYŚL]
ODPOWIEDŹ: ... 66 zł na osobę.
KROKÓW W GRAFIE: 4
```

**Zatrzymaj się i popatrz na te trzy linie.** To jest pętla ReAct z Lekcji 4, którą przez cały kurs miałeś schowaną pod maską:
1. agent **pomyślał** i stwierdził, że potrzebuje narzędzia,
2. graf poszedł krawędzią warunkową do **węzła narzędzia**,
3. wynik wrócił do **„myśl"**, a agent sformułował odpowiedź.

> ⚠️ **Pułapka:** `out["messages"][-1].content` **nie jest tekstem** — to lista bloków. Żeby dostać zwykły napis, użyj **`.text()`** (z nawiasami), tak jak w kodzie wyżej.

### 4. Zobacz bezpiecznik w akcji
Zmień `recursion_limit` na `2` i uruchom ponownie. Graf przerwie się błędem, bo nie zdąży dojść do końca.

To jest dokładnie ten sam mechanizm co `maxSteps` — i dokładnie to miejsce, w którym **pilnujesz kosztów**. Bez limitu zapętlony agent potrafi wykonać dziesiątki płatnych zapytań na jedno pytanie użytkownika (patrz [Extra 2](E2_KOSZTY_AGENTA.md)).

## ✅ Samo-weryfikacja (Twój dowód „done")

- W konsoli widzisz sekwencję **MYŚL → NARZĘDZIE → MYŚL**,
- odpowiedź zawiera **66 zł na osobę**,
- `recursion_limit: 2` powoduje przerwanie — czyli rozumiesz, gdzie jest bezpiecznik,
- potrafisz wskazać w kodzie: gdzie jest **stan**, gdzie **węzeł**, a gdzie **krawędź warunkowa**.

## 🤖 Sprawdź się sam przez AI

> *„Robię moduł o LangGraph. Oto mój graf: [wklej graph_agent.py].*
> *Oceń wg rubryki — PASS/FAIL + jedno zdanie:*
> *1. Czy graf ma krawędź warunkową decydującą między narzędziem a końcem?*
> *2. Czy po węźle narzędzia stan wraca do węzła „myśl" (czyli pętla naprawdę istnieje)?*
> *3. Czy ustawiłem limit rekursji chroniący przed nieskończoną pętlą?*
> *4. Wytłumacz mi własnymi słowami, czym różni się `add_edge` od `add_conditional_edges`."*

## Jak oddać

```bash
git add graph_agent.py
git commit -m "Modul LangGraph: jawna petla ReAct jako graf"
git push
```
Wyślij **w DM do prowadzącego**: link do repo + **zrzut konsoli z widoczną sekwencją węzłów** + zdanie „LangGraph gotowe".

## 🚀 Idź dalej (nieobowiązkowe)

1. **Dorzuć drugie narzędzie** (np. kurs walut albo kalkulator VAT) i zobacz, jak agent sam wybiera, do którego węzła pójść.
2. **Dodaj własny węzeł** przed „myśl" — np. `waliduj`, który odrzuca wiadomości dłuższe niż 500 znaków. To bezpiecznik kosztowy z Extra 2, wpięty w graf.
3. **Pamięć między rozmowami:** LangGraph ma *checkpointery* — potrafi zapisywać stan grafu do Postgresa. Podepnij bazę z [Extra 1](E1_BAZA_OD_SRODKA.md) i Twój graf zacznie pamiętać poprzednie rozmowy.
4. **Narysuj graf:** `app.get_graph().draw_ascii()` wypisze Twój graf w konsoli. Porównaj go z diagramem z początku tego modułu.

## Gdzie przekroczyłeś próg

Przeszedłeś drogę od „agent to czarna skrzynka, której ustawiam `maxSteps`" do „agent to graf, który sam zaprojektowałem i którego każdy krok widzę". To jest różnica między używaniem cudzej abstrakcji a **projektowaniem własnej architektury** — i to jest najwyższy punkt tej ścieżki.
