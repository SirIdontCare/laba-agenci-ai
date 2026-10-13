# Lekcja 11. Agent jest produktem – landing page, monitoring, polish

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Landing, pełne metryki, domena, PWA oraz przełącznik motywu.

## Zakres z potwierdzonego programu

- Od projektu do produktu: landing, domena i monitoring
- Landing dla niezalogowanych: nazwa, opis i CTA „Zacznij za darmo”
- /admin/dashboard: wykresy Recharts, użytkownicy, rozmowy, tokeny i koszty
- Custom domain na Vercel: CNAME i SSL
- Polish: og:image, favicon, PWA manifest i przełącznik ciemny/jasny

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 11. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Landing page produktu

**Zakres obowiązkowy · orientacyjnie 20 min.**

Strona główna dla niezalogowanych opisuje konkretny produkt: nazwa, problem odbiorcy, wynik i najważniejsze funkcje. CTA „Zacznij za darmo” jest nazwane w sylabusie. W ćwiczeniu prowadzi do bezpłatnego dla testera demonstracyjnego flow — nie jest obietnicą nieograniczonego API ani bezpłatnego planu komercyjnego.
Zalogowany użytkownik trafia do własnej aplikacji. Publiczny landing nie może ujawniać danych rozmów, dokumentów lub panelu admina. Przykłady oznacz DEMO; nie dopisuj nieistniejących klientów, ocen i statystyk.
Poproś nowego testera, aby wyjaśnił zastosowanie po samym ekranie i uruchomił przykład. Popraw blokującą niejasność, nie przebudowuj całej aplikacji. Zachowaj istniejące narzędzia i uprawnienia.

### Polecenie do asystenta

```text
Dodaj landing / dla niezalogowanych: nazwa agenta, opis, funkcje i CTA „Zacznij za darmo” prowadzące do bezpłatnego przykładu. Nie publikuj fikcyjnych referencji.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Landing dla niezalogowanego zawiera nazwę, opis i wymagane CTA.
- [ ] CTA prowadzi do dostępnego bez opłaty testera przykładu/logowania.
- [ ] Dane prywatne i panel admina pozostają chronione.

**Gotowe, gdy:** Nowa osoba rozumie produkt i dochodzi do pierwszego przykładu.

<a id="w2"></a>
## W2. Dashboard użycia z Recharts

**Zakres obowiązkowy · orientacyjnie 25 min.**

Użyj Recharts zgodnie z nazwanym wymaganiem; sama tabela lub dowolna inna biblioteka nie zalicza tego punktu. Panel /admin/dashboard pokazuje użytkowników, rozmowy, tokeny i koszty — wszystkie cztery, nie wybrane dwie.
Zdefiniuj metryki: np. aktywni użytkownicy w okresie, liczba rozmów, suma input+output i suma znanych kosztów. Jeżeli liczysz wszystkich zarejestrowanych zamiast aktywnych, podpisz to jednoznacznie i użyj chronionego źródła administracyjnego. API admin nie trafia do frontendu. Wykresy mają osie, okres i jednostki. Porównaj trzy wybrane rekordy z ręcznym rachunkiem.
Nieznane koszty oznacz jako niepełny pomiar, nie zera. Nie sumuj fixture z realnym rozliczeniem. Dodatkowe metryki skuteczności i kosztu poprawnej misji można zachować po zrealizowaniu wymaganych czterech, lecz nie są ich zamiennikiem. Wartości demo w slajdach są przykładami, nie pomiarem gotowej aplikacji.

### Polecenie do asystenta

```text
Dodaj /admin/dashboard z Recharts. Obowiązkowe metryki: użytkownicy, rozmowy, tokeny i koszty. Sprawdź dane, zakres dat, braki kosztu oraz dostęp administratora.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] /admin/dashboard istnieje i używa Recharts.
- [ ] Widać użytkowników, rozmowy, tokeny i koszty z podpisanym okresem.
- [ ] Agregacje zgadzają się z danymi; brak kosztu i brak uprawnienia są obsłużone.

**Gotowe, gdy:** Cztery metryki i wykresy Recharts mają sprawdzone źródła.

<a id="w3"></a>
## W3. Domena, HTTPS i pełny polish

**Zakres obowiązkowy · orientacyjnie 30 min.**

Przed lekcją zapewnij własną domenę albo przydzieloną subdomenę testową z dostępem do DNS. To warunek organizacyjny do potwierdzenia z Laba; pakiet nie kupuje domen i nie zakłada, że organizator już ją udostępnił. Brak domeny nie zamienia warsztatu w bonus — oznacza konieczność przygotowania dostępu lub dokończenia testu.
Vercel → projekt → Settings → Domains: dodaj adres. Dla ćwiczenia na subdomenie ustaw CNAME dokładnie według panelu projektu. Nie przepisuj losowego przykładowego IP i nie zmieniaj rekordów poczty. Potwierdź właściwy adres, certyfikat HTTPS oraz brak mixed content. Po zmianie adresu sprawdź Site URL, redirecty Supabase i OAuth.
Dodaj og:image, favicon, manifest PWA z name/short_name/start_url/display/icons oraz przełącznik jasny/ciemny z utrwaleniem preferencji. Sprawdź metadane, zasoby manifestu, oba motywy i odświeżenie. Sam manifest nie oznacza offline — źródło nie wymaga trybu offline. Responsywność nie zastępuje przełącznika motywu.

### Polecenie do asystenta

```text
Skonfiguruj custom domain na Vercel oraz HTTPS. Dodaj og:image, favicon, PWA manifest i przełącznik jasny/ciemny. Wszystkie elementy są obowiązkowe; sprawdź je po deployu.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Własna/przydzielona domena wskazuje projekt i ma poprawny HTTPS.
- [ ] og:image i favicon są dostępne; manifest oraz ikony się wczytują.
- [ ] Przełącznik obu motywów działa i zachowuje wybór po F5; OAuth po nowym URL działa.

**Gotowe, gdy:** Domena działa po HTTPS; wszystkie cztery elementy polish przeszły test.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
