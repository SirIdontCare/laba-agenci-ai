# Przed kursem — próba techniczna i odbiór zakresu

Materiały nie zastępują działającego demo ani przygotowania prowadzącego. Przed udostępnieniem grupie wykonaj próbę na tych samych kontach/planach i wersjach paczek, które mają uczestnicy. Ten dokument jest checklistą do wypełnienia, nie listą wykonanych wdrożeń.

## Dostęp przed L01

- [ ] Klucz Laba przekazany prywatnie, niskie limity indywidualne i budżet grupy.
- [ ] Wybrany Gemini przez OpenRouter, test tekstu, JSON, tools i streamingu w AI SDK.
- [ ] Natywny Google Search: faktyczne źródła, metadane oraz właściwe oznaczenia UI; bez cichego zastąpienia silnika.
- [ ] Nano Banana 2 oraz vision sprawdzone osobno; embeddingi i wymiar wektora sprawdzone przed L06.
- [ ] Gotowy agent do demo L01; jeden działający starter i lockfile; build i deploy sprawdzone.
- [ ] Osiem tools L04 przetestowanych oddzielnie i pięć źródeł razem; pobierane dane mają jednostki i daty.
- [ ] Supabase GUI, sesja testowa i polityki bazy przećwiczone.
- [ ] Google OAuth: uprawniony projekt, konfiguracja aplikacji, client ID/secret, callback, użytkownicy testowi i konto z avatarem.
- [ ] Domena/subdomena testowa oraz dostęp do DNS przygotowane dla L11. Brak adresu to zadanie organizacyjne do rozwiązania, nie usunięcie warsztatu.
- [ ] Warunki kosztów hostingu/usług i koniec dostępu Laba są wyjaśnione; abonament czatu nie jest kredytem API.

## Przebieg spotkań

Minuty na slajdach są propozycją do próby czasowej. Prowadzący dostosowuje rytm do ustalonej długości spotkania. Potwierdzony program nie narzuca 120 minut ani liczby prac domowych. Dodatki nie wypierają zakresu: gdy uczestnik nie skończy obowiązkowej funkcji, zapisuje punkt do dokończenia i otrzymuje pomoc.

Przygotuj prawdziwy checkpoint aplikacji po każdej lekcji — po teście i buildzie. Ten pakiet nie zawiera gotowych checkpointów aplikacji. Nie stosuj pustych tagów ani zmyślonych statusów jako ratunku. W razie awarii pokaż oznaczony REPLAY i zaplanuj ponowny test live.

## Kryteria, których nie wolno pominąć

L03: streamText + generateText + typed tools + schema + web + obrazy + vision. L04: osiem tools, pięć źródeł, dashboard live i STOP. L07: email/password, Google OAuth, imię/avatar oraz dwa odizolowane konta. L10: trzy klasy ataków, filtr wyjścia, 50/h, 10k/dzień, api_usage, logi/alerty/top użytkowników. L11: Recharts i cztery metryki, domena/SSL, og:image/favicon/manifest/motyw. L12: demo, test partnera, jeden fix i deploy; MCP/multi-agent/Voice AI/Stripe/produkt jako omówienie dalszego rozwoju.

## Raport każdej próby

Wymaganie | input | oczekiwany wynik | obserwacja | dowód/commit | WYKONANO / BŁĄD / NIEURUCHOMIONO. Bez sekretów, haseł i danych klientów. Nie wpisuj, że aplikacja jest produkcyjnie bezpieczna lub zawsze bezbłędna na podstawie ukończenia ćwiczeń.
