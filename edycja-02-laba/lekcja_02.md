# Lekcja 02. Inżynieria promptów

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Persona, few-shot, JSON oraz test ataku i obrony.

## Zakres z potwierdzonego programu

- Łańcuch myślenia, uczenie z przykładów i strukturalny format JSON
- Wpływ instrukcji na zachowanie agenta
- Projektowanie instrukcji: persona, zasady, format wyjściowy
- Wymuszanie schematu JSON
- Atak i obrona przed wstrzykiwaniem promptów

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 2. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Persona, zasady i techniki promptowania

**Zakres obowiązkowy · orientacyjnie 20 min.**

Wprowadzenie obejmuje wszystkie nazwane techniki: Chain of Thought (łańcuch myślenia), Few-Shot Prompting i format strukturalny. Na prostym autorskim zadaniu porównaj prośbę o sam wynik z prośbą o rozwiązanie krok po kroku. Sprawdź wynik niezależnie. Wyjaśnij, że zewnętrzny plan lub uzasadnienie nie jest dostępem do pełnego ukrytego procesu modelu i nie gwarantuje poprawności. Nie żądaj ujawnienia niepublicznych instrukcji obcej usługi.
Zbuduj instrukcję fikcyjnego asystenta firmy: persona, cel, dostępne źródła, zakazane działania, format i reakcja na brak informacji. Dodaj dwa przykłady rozróżniające zapytanie sprzedażowe i zgłoszenie pomocy. Sprawdź nowy przykład, którego nie było w instrukcji. Nie nazywaj few-shot trenowaniem wag.
Używaj tego samego modelu podczas porównania instrukcji. Ranking modeli i seria A/B nie są obowiązkową częścią tej wersji kursu; zostały zachowane w wariancie rozwojowym.

### Polecenie do asystenta

```text
Dodaj personę, zasady i format. Pokaż few-shot oraz porównanie odpowiedzi bez i z instrukcją rozumowania krok po kroku. Oceniaj wynik, nie długość uzasadnienia.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Instrukcja zawiera personę, reguły, źródła i format.
- [ ] Few-shot zadziałał albo błąd zapisano na nowym wejściu.
- [ ] CoT omówiono pod własną nazwą; wynik zadania zweryfikowano niezależnie.

**Gotowe, gdy:** Instrukcja ma zakres; uczestnik rozróżnia few-shot i CoT.

<a id="w2"></a>
## W2. Wymuszanie schematu JSON

**Zakres obowiązkowy · orientacyjnie 20 min.**

Zdefiniuj schema wyniku klasyfikacji wiadomości: category (sales/support/billing/unknown), priority (normal/high), draft (tekst) i needs_review (boolean). Można dodać source_ids i missing_data, ale nie ukrywać obowiązkowych pól w swobodnym tekście. Użyj mechanizmu structured output zgodnego z wybraną wersją AI SDK oraz modelu wspierającego schema.
Wykonaj walidację lokalnie po odebraniu odpowiedzi. Sprawdź brak pola, zły typ, wartość spoza enum i dodatkowe pole przy zakazie dodatkowych właściwości. Osobno sprawdź prawdziwość cytatu lub ceny — zgodność struktury tego nie potwierdza.
Odmowa modelu, limit odpowiedzi i awaria są stanami procesu, nie automatycznym sukcesem. Wynik oznaczony draft pozostaje szkicem; needs_review=false nie jest zgodą na wysyłkę. Schema jest tematem obowiązkowym, nie zamiennikiem kontroli merytorycznej.

### Polecenie do asystenta

```text
Dodaj wynik JSON przez AI SDK i OpenRouter. Określ category, priority, draft i needs_review. Waliduj schema oraz obsłuż odmowę, ucięcie i błąd formatu.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Poprawny wynik spełnia schema.
- [ ] Brak pola i zły typ są odrzucone.
- [ ] Odmowa i przerwana odpowiedź mają jawny stan błędu/kontroli.

**Gotowe, gdy:** Poprawny JSON jest odczytywany, błędny wynik nie przechodzi dalej.

<a id="w3"></a>
## W3. Prompt injection: atak i obrona

**Zakres obowiązkowy · orientacyjnie 20 min.**

Wykonuj próby wyłącznie na własnym projekcie. Do fikcyjnego maila dodaj prośbę zignorowania instrukcji albo wykonania niedozwolonej akcji. Zapisz oczekiwanie, faktyczną odpowiedź i stan narzędzi. Nie wykorzystuj prawdziwego klucza jako sekretu testowego.
Najpierw wskaż, co atak zmienił. Następnie popraw właściwą warstwę: oddzielenie danych od instrukcji, walidację wejścia/wyniku lub uprawnienia narzędzi. Sam tekst „nie daj się oszukać” nie zastępuje serwerowej kontroli. Powtórz atak i zwykłe zapytanie, aby obrona nie blokowała całego produktu.
Nie obiecuj pełnej odporności po jednym teście. W L10 wrócimy do trzech nazwanych klas ataków, filtrowania wyjścia i limitów. Ten warsztat kończy się obserwowalnym wynikiem obrony, nie porównaniem dwóch modeli.

### Polecenie do asystenta

```text
Na własnej aplikacji przygotuj próbę prompt injection. Zapisz wejście i skutek, popraw instrukcję oraz kontrolę backendu i powtórz test. Użyj fikcyjnych danych.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Wynik przed i po poprawce jest zapisany.
- [ ] Niedozwolona operacja nie jest wykonana przez backend.
- [ ] Zwykła wiadomość nadal daje użyteczny wynik.

**Gotowe, gdy:** Udokumentowano próbę, obronę i ponowny test poprawnej wiadomości.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
