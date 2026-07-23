# 🐛 debug_agent — ćwiczenie z debugowania

Cześć! To małe ćwiczenie przygotowałem dla Was na **Moduł 3 Grupy Zaawansowanej**. — *Paweł*

To jest **wycinek narzędzi agenta** z **3 zasadzonymi (przeze mnie) błędami**. Twoje zadanie: znaleźć je i naprawić **samodzielnie** — czytając komunikaty błędów, podglądając wartości i używając debuggera w VS Code. Bez wrzucania całości do AI z prośbą „napraw to". O to właśnie chodzi w tym module. 😉

## Uruchomienie

Nie musisz nic instalować — projekt nie ma żadnych zależności (korzysta z wbudowanego test runnera Node'a). Potrzebujesz tylko **Node.js 18+**.

W folderze projektu, w terminalu VS Code:

```bash
npm test
```

Zobaczysz **4 czerwone testy** — to 3 błędy (jeden psuje dwa testy naraz). Twój cel: doprowadzić do **6 zielonych**, edytując **wyłącznie** plik `tools.js`.

> ⛔ Pliku `tools.test.js` **nie ruszaj** — on opisuje, jak funkcje mają działać. Zmieniasz tylko `tools.js`, aż wszystko przejdzie na zielono.
> 🤖 Najpierw znajdź i zrozum błąd **sam**. AI możesz użyć dopiero na końcu — do sprawdzenia, nie do naprawiania.

## Pełna instrukcja krok po kroku

Techniki (jak czytać stack trace, jak użyć `console.log`, jak postawić breakpoint w VS Code) oraz sposób oddania pracy znajdziesz w pliku **`W3_DEBUG.md`** w materiałach Grupy Zaawansowanej (na naszym kanale).

Powodzenia — i pamiętaj: każdy inżynier spędza więcej czasu na czytaniu i naprawianiu cudzego kodu niż na pisaniu własnego. To umiejętność, która się liczy. 💪
