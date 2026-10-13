# Lekcja 10. Bezpieczeństwo i zabezpieczenia: AI prompt injection, AI red teaming

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Trzy nazwane próby, filtr wyjścia i dwa niezależne limity.

## Zakres z potwierdzonego programu

- Zagrożenia: wstrzykiwanie promptów, wyciek danych, eksplozja kosztów
- Zabezpieczenia agenta
- Red teaming: indirect injection, prompt extraction, data exfiltration
- Obrona wielowarstwowa: walidacja inputu, filtr outputu, 50 msg/h per user
- Budżet: api_usage w Supabase i 10k tokenów/dzień per user
- /admin/security: logi, alerty i top użytkownicy

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 10. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Red team: trzy nazwane klasy ataków

**Zakres obowiązkowy · orientacyjnie 20 min.**

Zakres: własna testowa aplikacja, zgoda testerów, fikcyjne dane i mały budżet. Nie testuj cudzych usług. Indirect injection: dokument albo wynik narzędzia zawiera polecenie zmieniające cel. Sprawdź, czy wpłynęło na uprawnienia lub wykonanie.
Prompt extraction: ustaw własny fikcyjny system prompt z neutralnym znacznikiem LABA_PROMPT_TEST_01. Poproś testowaną aplikację o odtworzenie jego instrukcji. Oceń, czy odpowiedź rzeczywiście odpowiada treści, czy model ją wymyślił. Samo powtórzenie publicznej roli nie dowodzi wyciągnięcia całej instrukcji. Nigdy nie umieszczaj prawdziwego klucza w prompcie.
Data exfiltration: konto A próbuje uzyskać dokument B oznaczony B_ONLY_TEST. Sprawdź treść odpowiedzi, log narzędzia i dane przekazane modelowi; końcowa odmowa nie cofa wcześniejszego ujawnienia. Omów eksplozję kosztów na kontrolowanym adapterze zamiast wywoływać serię płatnych żądań. Wszystkie wyniki: PASS/FAIL/NIEURUCHOMIONY z dowodem, bez obietnicy pełnej odporności.

### Polecenie do asystenta

```text
Przetestuj własny sandbox: indirect injection, prompt extraction i data exfiltration. Użyj fikcyjnej instrukcji oraz znaczników. Zapisz skutek każdego testu i plan naprawy.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Istnieją trzy oddzielne przypadki i faktyczne wyniki.
- [ ] Extraction porównano z własną prawdziwą instrukcją testową.
- [ ] Exfiltration sprawdza także źródła przed modelem i brak dostępu do B.

**Gotowe, gdy:** Każda z trzech klas ma osobny test, dowód i ocenę skutku.

<a id="w2"></a>
## W2. Walidacja, filtr wyjścia i 50 wiadomości/h

**Zakres obowiązkowy · orientacyjnie 25 min.**

Obowiązkowe są wszystkie trzy elementy, nie tylko naprawa dowolnej jednej luki. Waliduj długość i format wejścia, dozwolone pola oraz identyfikatory zasobów. Nie traktuj blacklisty słów jako pełnej ochrony przed injection.
Filtr wyjścia: użyj kontrolowanego adaptera zwracającego niedozwolony testowy znacznik. Zablokuj go przed przekazaniem użytkownikowi i zapisz minimalny powód. Dla tej chronionej ścieżki buforuj odpowiedź przed publikacją albo zastosuj sprawdzony filtr strumieniowy; filtrowanie dopiero po pokazaniu streamu jest spóźnione. Streaming z L01/L03 pozostaje omówioną i wykonaną funkcją; tu uczymy jego ograniczeń przy ochronie outputu.
Rate limit: maksymalnie 50 przyjętych wiadomości użytkownika w ruchomym oknie 60 minut. To doprecyzowanie implementacyjne prowadzącego. Użytkownik z sesji, zapis/odczyt atomowy w trwałym magazynie. 51. wiadomość odrzucona przed modelem, z informacją o ponownej próbie. Lokalna Map nie wystarcza dla wielu instancji. Test używa sztucznego zegara i modelu offline.

### Polecenie do asystenta

```text
Dodaj trzy warstwy: walidację inputu, filtr outputu i limit 50 wiadomości/h per user w trwałym magazynie. Testuj próg 50/51 oraz brak wycieku przed filtrem.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Poprawne wejście przechodzi, błędne jest zatrzymane.
- [ ] Testowy znacznik nie pojawia się w UI, streamie ani ogólnym logu.
- [ ] 50 wiadomości przyjętych, 51. zablokowana; inne konto ma osobny limit; wygaśnięcie okna działa.

**Gotowe, gdy:** Wszystkie trzy warstwy działają; 51. wiadomość w oknie jest odrzucana.

<a id="w3"></a>
## W3. 10k tokenów dziennie i /admin/security

**Zakres obowiązkowy · orientacyjnie 25 min.**

Tabela api_usage obejmuje user_id, run_id, identyfikator wywołania, czas, model, tokens_input, tokens_output, endpoint i opcjonalny cost_usd. Użycie wszystkich kroków zapisuj dokładnie raz. Doprecyzowanie techniczne: dzień kalendarzowy UTC; input+output liczone zgodnie z raportem dostawcy, bez podwójnego doliczania zawartych już tokenów reasoning/cache. Koszt nieznany to null, nie zero.
Limit 10 000 tokenów dotyczy każdego użytkownika osobno. Przed nowym krokiem sprawdzaj dostępny budżet i rezerwuj zakres atomowo. Ogranicz output i kontekst; rozlicz rzeczywiste usage po odpowiedzi. Nie obiecuj dokładnego górnego ograniczenia przed nieznanym użyciem providera — raportuj ewentualne przekroczenie i zatrzymaj kolejne kroki. Test na deterministycznym adapterze sprawdza 9999, 10000, blokadę następnego wywołania, zmianę dnia i równoległe żądania. To oddzielny limit od wydatków w USD i 50/h.
/admin/security ma: logi zdarzeń z datą i przyczyną, alerty limitów/ataków oraz top 5 użytkowników według zużycia tokenów. Liczba pięciu jest propozycją panelu. Dostęp admina sprawdzaj na serwerze. Wystarczą pseudonimy/ID; nie publikuj treści prywatnych rozmów.

### Polecenie do asystenta

```text
Dodaj api_usage w Supabase oraz limit 10 000 tokenów/dzień per user. /admin/security ma logi, alerty i top zużycia. Sprawdź próg, reset dnia i rolę administratora.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] api_usage zapisuje wszystkie kroki bez duplikatów.
- [ ] Przy 10000 kolejne wywołanie nie dociera do modelu; reset dnia i konta są odseparowane.
- [ ] Panel zawiera logi, alerty i top użytkowników; zwykły user nie ma dostępu.

**Gotowe, gdy:** Limit dzienny i panel działają niezależnie od limitu 50/h.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
