# Lekcja 12. Prezentacje finałowe + warsztaty z feedbackiem

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Demo, wzajemny test, poprawka i wdrożenie nowej wersji.

## Zakres z potwierdzonego programu

- Podsumowanie drogi od chatbota do produktu
- Kierunki: MCP, multi-agent, Voice AI, Stripe i własny produkt
- Prezentacja agenta: demo, funkcja, własny scenariusz i refleksja
- Feedback w parach według checklisty i karta feedbacku
- Quick fix: jeden błąd z feedbacku, AI assistant i deploy

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 12. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Prezentacja gotowego projektu

**Zakres obowiązkowy · orientacyjnie 25 min.**

Podsumuj kolejne możliwości projektu: model, narzędzia, ReAct, pamięć, RAG, konta, scenariusze, automatyzacja, bezpieczeństwo i produkt. Demo ma pokazać faktycznie działającą funkcję, własny scenariusz i refleksję, a nie wyłącznie slajd z obietnicą.
Omów wszystkie nazwane ścieżki dalszego rozwoju: MCP, multi-agent, Voice AI, Stripe i własny produkt. To omówienie kierunków, nie dodatkowe obowiązkowe implementacje. Nie dopisujemy kursu RL. Wybór jednego kierunku przez uczestnika pomaga podsumować, ale nie zastępuje prezentacji.
Czas na osobę i organizację prezentacji ustala prowadzący do wielkości grupy; potwierdzony dokument nie wskazuje minut. Przy dużej grupie użyj pracy równoległej i wspólnego pokazu wybranych projektów, zapewniając prezentację każdej osobie. REPLAY oznacz jawnie; nie przedstawiaj nagrania jako live.

### Polecenie do asystenta

```text
Przygotuj demo mojego rzeczywistego projektu: cel, najciekawsza funkcja, własna misja i refleksja. Nie wymyślaj wyników. Uwzględnij źródła, narzędzia i ograniczenia.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Każdy uczestnik pokazał projekt, funkcję i własną misję.
- [ ] Refleksja oddziela działający zakres od planu.
- [ ] Omówiono MCP, multi-agent, Voice AI, Stripe oraz rozwój produktu.

**Gotowe, gdy:** Uczestnik pokazał działający projekt oraz własny scenariusz.

<a id="w2"></a>
## W2. Wymiana agentów i karta feedbacku

**Zakres obowiązkowy · orientacyjnie 30 min.**

Partner sam testuje aplikację według czterech części checklisty: podstawy (start/logowanie), funkcjonalności (narzędzie, pamięć, wiedza i własna misja), edge cases (brak danych/błąd/niepoprawny input), wrażenia (czytelność, mobile i zrozumiałość wyniku).
Używaj kont testowych i fikcyjnych danych. Nie udostępniaj haseł właściciela, kluczy ani prawdziwej historii. Zakres testów bezpieczeństwa musi być uzgodniony. Tester zapisuje input, spodziewany rezultat, obserwację, krok odtworzenia i ważność problemu.
Feedback jest konkretny: co pomogło, co blokuje zadanie i jaka poprawka byłaby użyteczna. Nie utożsamiaj subiektywnej opinii o kolorze z błędem logiki. Zapisana karta jest wejściem do W3; nie zastępuj jej planem pilotażu.

### Polecenie do asystenta

```text
Przygotuj kartę feedbacku: podstawy, funkcjonalności, edge cases i wrażenia. Tester zapisuje wejście, oczekiwanie, wynik i dowód. Nie dopisuj nieprzeprowadzonych testów.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Każdy projekt otrzymał feedback według czterech części checklisty.
- [ ] Co najmniej jeden problem ma kroki odtworzenia i oczekiwany wynik.
- [ ] Tester nie otrzymał sekretów ani danych innego użytkownika.

**Gotowe, gdy:** Każdy projekt ma kartę feedbacku i odtwarzalny problem do poprawy.

<a id="w3"></a>
## W3. Quick fix i ponowny deploy

**Zakres obowiązkowy · orientacyjnie 25 min.**

Wybierz odtwarzalny problem o małym zakresie. Asystent najpierw wskazuje pliki i sposób testu, potem proponuje minimalną zmianę. Nie przepisuj aplikacji ani nie usuwaj auth/RLS, żeby uzyskać zielony wynik.
Uruchom test przed poprawką i po niej, a także zwykły scenariusz kontrolny. Zapisz commit, wykonaj build i deploy, a następnie poproś partnera o powtórzenie identycznego wejścia na nowym URL. Lokalny sukces nie jest dowodem wdrożenia.
Potwierdzony program nie narzuca 15 minut; czas w materiale jest propozycją prowadzącego. Jeżeli naprawa dotyczy większej blokady, uczciwie zapisz stan i nie publikuj niebezpiecznej wersji. Plan pilotażu 7/14/30 nie wypiera tego obowiązkowego ćwiczenia; pozostaje w wariancie przyszłej edycji.

### Polecenie do asystenta

```text
Odtwórz jeden błąd z karty partnera. Dodaj test, wykonaj małą poprawkę i sprawdź build. Wdróż nową wersję oraz powtórz test na jej URL bez usuwania zabezpieczeń.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Błąd przed poprawką jest odtwarzalny.
- [ ] Poprawka i zwykły scenariusz przeszły test bez osłabienia zabezpieczeń.
- [ ] Nowy deploy sprawdzono na rzeczywistym URL; zapisano commit i wynik partnera.

**Gotowe, gdy:** Poprawka działa po deployu i ma dowód przed/po.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
