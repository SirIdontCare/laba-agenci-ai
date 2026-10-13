# Start uczestnika — jeden projekt, pełny zakres

## 1. Konta i środowisko

Przygotuj Git, wspieraną wersję Node zgodną z zamrożonym stosem prowadzącego, konto GitHub i Vercel oraz jednego AI coding assistanta. Konfigurację oraz modyfikację i diagnozę błędu przechodzimy także na L01. Od L05 potrzebujesz Supabase; od L07 konfiguracji Google OAuth; na L11 własnej albo przydzielonej subdomeny testowej i uprawnionego dostępu do DNS. Brak domeny nie usuwa tego warsztatu — ustal adres przed zajęciami z prowadzącym/Laba.

Podstawowy framework aplikacji: Next.js App Router + TypeScript + **Vercel AI SDK + @openrouter/ai-sdk-provider**. Dokładne wersje i lockfile pochodzą z próby prowadzącego. Nie instaluj automatycznie innej głównej wersji w środku zajęć. Pakiet nie zawiera deklaracji, że przygotowany został gotowy starter całej aplikacji.

## 2. Klucz i modele

Laba przekazuje klucz inference prywatnym kanałem, najlepiej indywidualny i z limitem. Klucz zarządzający kontem nie trafia do uczestników. Wartość umieść w lokalnym `.env.local` projektu aplikacji oraz oddzielnie w środowisku hostingu. Nigdy w promptach, repozytorium, URL, frontendzie ani screenach. Prefiks NEXT_PUBLIC_ nie jest przeznaczony dla sekretów.

Nazwy ról: tekst, vision, image i embedding. Zachowaj Gemini i Nano Banana 2 w konfiguracji wymaganych prób, o ile są dostępne przez OpenRouter. Konfiguracja search musi jawnie określać natywny Google Search, a nie ukryty fallback do innej wyszukiwarki. Szczegóły: REALIZACJA_TECHNICZNA.md. Brak dostępu → próba NIEURUCHOMIONA, do uzupełnienia, nie zaliczona.

## 3. Polecenie otwierające pracę

```text
Przeczytaj START.md, REALIZACJA_TECHNICZNA.md i aktualny plik lekcja_XX.md, sekcję wskazanego warsztatu. Wykonaj tylko ten zakres. Rozwijaj jeden projekt Next.js z Vercel AI SDK i OpenRouter. Nie czytaj ani nie wypisuj wartości sekretów. Najpierw plan, potem mała zmiana, test i zapis zmian. Nie usuwaj wymaganych tematów, nie zamieniaj AI SDK na sam HTTP, nie wyłączaj zabezpieczeń. Nie zmieniaj innych edycji.
```

## 4. Kontrola po każdym kroku

Sprawdź oczekiwany wynik, trudny przypadek i ograniczenia. Komunikat asystenta „gotowe” nie jest testem. Zapisz działający commit, a test wymagający modelu, konta, DNS lub harmonogramu oznacz rzeczywistym statusem. Nie twórz fikcyjnych checkpointów.

Pracujemy na danych fikcyjnych. Własny proces jest obowiązkowy, prawdziwe dane klientów nie. Nie wysyłamy prawdziwej poczty ani nie wykonujemy zakupów. Publiczny URL nie oznacza anonimowego, nieograniczonego dostępu do płatnych operacji. Przed użyciem w firmie potrzebne są odrębne uzgodnienia i próby.
