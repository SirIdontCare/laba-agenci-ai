# Rozszerzenia dla szybszych — wybierz jedno, nie wszystko

Nie zwiększamy trudności całej grupie tylko dlatego, że jedna osoba skończyła wcześniej. Każde rozszerzenie ma wartość użytkową i test, a nie tylko nową nazwę technologii.

## 1. MCP do własnego systemu — tylko odczyt na start

W osobnym środowisku testowym udostępnij jedno narzędzie wyszukujące własne rekordy. MCP to sposób udostępnienia narzędzi, nie zastępstwo autoryzacji. Klient uwierzytelnia dostęp, backend egzekwuje owner/tenant i allowlistę. Agent nie dostaje dostępu do wszystkich tools serwera z automatu. Kryterium: A widzi własny rekord, B nie widzi A; zerwane połączenie daje kontrolowany błąd. Potrzebne konkretne SDK i specyfikację zweryfikuj przed implementacją: https://modelcontextprotocol.io/docs/learn/architecture . Nie używaj prawdziwych danych firmowych bez zgody.

## 2. Jeden model kontra system wieloagentowy

Wybierz misję z mierzalnym wynikiem. Porównaj jeden model z dwoma wyspecjalizowanymi etapami na tej samej próbce. Policz wszystkie kroki, błędy, czas i koszt poprawek. System wieloagentowy wygrywa dopiero, gdy wynik uzasadnia dodatkowe koszty i złożoność. Nie oceniaj po liczbie kolorowych węzłów. Nie zmieniaj zbioru testowego między wariantami.

## 3. Ręczne wykonanie kontra gotowe AI kontra Mission Desk

Ten sam zestaw fikcyjnych zadań, ten sam dostęp do danych i podobny model. Zmierz także kopiowanie, kontrolę i poprawki. Zapisz, którego wymagania narzędzie gotowe nie spełnia, a które już spełnia. Wynik „nie warto budować własnej aplikacji” jest dopuszczalny i wartościowy.

## 4. Użyteczna multimodalność

Wczytaj własny screenshot oferty, porównaj z dokumentem tekstowym i pokaż różnice z dowodami. Cena albo liczba kont nie może być cicho odgadywana. Model generujący grafikę może przygotować ilustrację raportu, ale nie zastępuje walidacji jego liczb. Kryterium: co najmniej jeden nieczytelny fragment poprawnie oznaczony jako brak danych.

## 5. Router modeli ze sprawdzalnym fallbackiem

Profil fast rozwiązuje proste zadania, quality tylko te wymagające eskalacji. Reguły i budżet są serwerowe. Test: model fallback ma właściwe możliwości; requested/actual są zapisane; awaria modelu nie przełącza narzędzia z trybu odczytu na zapis. Nie włączaj automatycznego fallbacku do dowolnego droższego modelu.

## Odbiór dodatku

Jedna hipoteza → jeden eksperyment → te same dane → wynik i koszt → decyzja zostaw/usuń. Dodatek nie może psuć działającego CORE. Zapisz go na oddzielnej gałęzi projektu uczestnika.
