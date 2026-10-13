# Lekcja 06. Agent zna twoją firmę: baza danych RAG z Supabase pgvector

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Własna baza wiedzy z cytatami oraz reakcją na brak danych.

## Zakres z potwierdzonego programu

- RAG: wyszukaj → dołącz → odpowiedz z faktów
- Embeddingi i wyszukiwanie znaczenia
- Supabase pgvector: Extensions → Enable
- Włączenie pgvector w Dashboardzie i zapytanie SQL
- /upload: tekst → chunki → embeddingi → Supabase
- searchKnowledge — wyszukiwanie w bazie firmy
- Cytowanie źródeł i odmowa, gdy brakuje danych

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 6. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Włącz pgvector i przygotuj bazę

**Zakres obowiązkowy · orientacyjnie 20 min.**

Pokaż RAG jako dwie ścieżki: przygotowanie dokumentów i odpowiedź na pytanie. Embedding reprezentuje znaczenie; nie jest numerem porządkowym dokumentu ani gwarancją zgodności odpowiedzi.
Uczestnik otwiera Database → Extensions i włącza rozszerzenie vector. W SQL Editor wykonuje sprawdzone zapytanie tworzące kolumnę vector(D) i funkcję dopasowania. D wynika z rzeczywistej próby wybranego modelu embeddingowego OpenRouter, nie z liczby wpisanej z pamięci. Zachowaj identyfikator modelu oraz wymiar przy indeksie.
Przechowuj document_id, source_id, title, content, version, active i owner_id. Funkcja wyszukiwania respektuje właściciela przed zwróceniem danych do modelu. Zapytanie i przechowywane fragmenty muszą pochodzić z tego samego modelu/wymiaru. Zmiana modelu wymaga ponownego przygotowania embeddingów.

### Polecenie do asystenta

```text
Przeprowadź konfigurację pgvector w Supabase Dashboard. Potwierdź wymiar embeddingu, przygotuj tabele dokumentów i fragmentów oraz ograniczoną funkcję wyszukiwania.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Rozszerzenie vector jest włączone; utworzona tabela przyjmuje poprawny wektor.
- [ ] Zły wymiar jest odrzucany czytelnym błędem.
- [ ] Funkcja wyszukiwania nie zwraca cudzych dokumentów.

**Gotowe, gdy:** pgvector działa; wymiar i dostęp tabel są sprawdzone.

<a id="w2"></a>
## W2. /upload: od tekstu do bazy wiedzy

**Zakres obowiązkowy · orientacyjnie 20 min.**

Zbuduj nazwaną w sylabusie stronę /upload. Formularz przyjmuje tytuł i treść fikcyjnego dokumentu. Backend waliduje długość i uprawnienia, dzieli tekst na fragmenty zachowujące zdania/akapity oraz generuje embedding każdego fragmentu. Parametry chunkowania są propozycją techniczną — zapisz je w konfiguracji.
Każdy chunk ma indeks, document_id, source_id, tekst, model i wektor. UI pokazuje przetwarzanie oraz rzeczywisty wynik, nie losowy pasek postępu. Powtórzenie importu tej samej wersji nie powinno tworzyć niekontrolowanych kopii. Zmiana wersji dokumentu unieważnia albo oznacza stare fragmenty jako archiwalne.
Sprawdź rekordy w Table Editor. Błąd jednego fragmentu oznacz jako częściowy/nieudany import; nie pokazuj „Gotowe”, gdy brakuje danych. Obce dane nie trafiają do promptu ani odpowiedzi endpointu.

### Polecenie do asystenta

```text
Dodaj /upload: tytuł i tekst, podział na chunki, embeddingi przez OpenRouter oraz zapis w pgvector. Pokaż postęp, błąd importu, źródło i wersję dokumentu.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] /upload zapisuje fragmenty i wektory wskazanego dokumentu.
- [ ] Źródło, wersja i owner są obecne przy fragmentach.
- [ ] Puste wejście, przerwany import i ponowny import mają kontrolowane wyniki.

**Gotowe, gdy:** Tekst został podzielony i zapisany jako fragmenty z wektorami.

<a id="w3"></a>
## W3. searchKnowledge, cytaty i brak danych

**Zakres obowiązkowy · orientacyjnie 20 min.**

searchKnowledge wyszukuje uprawnione, aktywne fragmenty i zwraca identyfikatory źródła oraz tekst. Następnie model przygotowuje odpowiedź. Cytat w UI otwiera faktyczny fragment dokumentu. Backend sprawdza, czy source_id należał do wyniku tej próby.
Próby na danych fikcyjnych: aktualny Start 490 netto miesięcznie; Enterprise bez ceny; kwota brutto bez stawki VAT; archiwum ze Start 440; dokument obcego konta; temat całkowicie spoza bazy. W ostatnich przypadkach wymagane jest wskazanie braku danych/odmowa podania nieznanej informacji. Nie wyłączaj odpowiedzi „nie wiem”, aby wyglądały bardziej efektownie.
Wymóg programu o odpowiedzi z faktów realizujemy poprzez retrieval, cytat i sprawdzalny test braku danych. Ograniczona próba nie dowodzi braku wszystkich możliwych halucynacji. Porównanie pełnego kontekstu z RAG pozostaje dodatkiem poza obowiązkową ścieżką.

### Polecenie do asystenta

```text
Dodaj searchKnowledge z pgvector do agenta AI SDK. Odpowiadaj na podstawie zwróconych fragmentów, pokazuj źródła; przy braku dowodu odmawiaj podania nieznanego faktu.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Cennik odpowiada z aktywnego źródła, a cytat je otwiera.
- [ ] Brak ceny i temat spoza bazy skutkują jawną odmową zgadywania.
- [ ] Archiwum i cudze źródło nie trafiają do bieżącego kontekstu.

**Gotowe, gdy:** Odpowiedź ma wspierające źródło; brak wiedzy nie prowadzi do zgadywania.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
