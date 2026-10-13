# L04 — osiem narzędzi i pięć źródeł

Lista ośmiu kategorii pochodzi z programu. Nazwy funkcji, kontrakty i dostawcy poniżej są **proponowaną realizacją**, a nie listą narzuconą przez Laba. Każde narzędzie ma typowany input, ograniczony output, timeout i własny test. Użyj dokumentacji i sprawdź faktyczną dostępność przed zajęciami.

| Kategoria programu | Proponowana funkcja / input | Output i źródło | Test odbioru |
|---|---|---|---|
| Pogoda | getWeather({latitude, longitude, date}) | prognoza w dostępnym horyzoncie; units, source_id, fetched_at; Open-Meteo | poprawny termin / poza horyzontem / timeout |
| Waluty | getExchangeRate({currency, date}) | kurs referencyjny do PLN, effective_date; NBP | znana waluta / brak notowania / zła waluta |
| Święta | getHolidays({countryCode, year}) | lista dat i nazw; Nager.Date | poprawny kraj / pusty wynik / zły kod |
| Wikipedia | searchWikipedia({query, language}) | tytuł, krótki fragment, URL; Wikimedia | trafienie / brak wyniku / zbyt długie zapytanie |
| Kalkulator | calculate({operation, a, b}) | wynik dla add/subtract/multiply/divide | poprawny rachunek / dzielenie przez zero / niedozwolona operacja |
| Czas | getTime({timezone}) | lokalny czas, UTC, offset, source_id; zewnętrzne API czasu | strefa poprawna / nieznana / błąd dostawcy |
| Notatki | notes({action, text, noteId}) | utworzona/odczytana własna notatka, ID | zapis+odczyt / brak dostępu / limit długości |
| Diagnostyka | diagnostics({check}) | health i nazwy dostępnych funkcji, bez sekretów | bezpieczny stan / zabronione żądanie .env |

## Pięć identyfikowalnych źródeł w podróży

1. `weather_openmeteo`: Open-Meteo, pogoda dla miejsca/terminu.
2. `fx_nbp`: NBP, waluta i data notowania.
3. `holidays_nager`: Nager.Date, święta dla kraju i roku.
4. `wiki_destination`: Wikimedia, materiał o miejscu.
5. `time_provider`: odrębny serwis czasu dla strefy, np. zgodny interfejs opisany przez timezone.io.

Jedna domena źródłowa odpytana pięć razy nie zastępuje tego dydaktycznego zestawu. Dwa miasta nie oznaczają dwóch ani pięciu źródeł. Daty pogody, kursu i świąt muszą pasować do pytań; nie udawaj prognozy dla terminu poza zasięgiem. Obliczenia i notatki są narzędziami pomocniczymi, nie kolejnymi zewnętrznymi źródłami faktów.

## Dashboard live

Pięć kart: źródło, dane, jednostki/zakres, pobrano o, status. Przycisk aktualizacji rzeczywiście wykonuje odczyt. Log modelu nie zastępuje widoku danych. W trybie REPLAY etykieta musi być widoczna; REPLAY nie zalicza sprawdzenia live. Gdy źródło nie działa, pokaż błąd/partial i nie zmyślaj wartości. Wymagany test pełnej ścieżki z pięcioma źródłami pozostaje do powtórzenia po przywróceniu dostępności.

## Bezpieczna implementacja

Nie udostępniaj eval, new Function, dowolnego SQL, dowolnego URL ani odczytu .env. Adresy API są zapisane na serwerze, parametry walidowane. Notatki z L04 mają ograniczony zakres sesji; trwałą bazę wprowadzamy w L05. Nie przedstawiaj pamięci instancji serverless jako trwałego magazynu. W produkcji dane notatek podlegają autoryzacji i RLS.

Dokumentacje: Open-Meteo https://open-meteo.com/en/docs ; NBP https://api.nbp.pl/en.html ; Nager.Date https://nagerholidays.com/api ; Wikimedia https://www.mediawiki.org/wiki/API:REST_API ; czas https://www.timezone.io/docs/worldtimeapi . Dostawca czasu jest propozycją — sprawdzenie dokumentacji nie potwierdza działania endpointu z sieci uczestnika. Limity API mogą dotyczyć wspólnego IP grupy. Nie korzystaj ze starego worldtimeapi.org jako gwarantowanego źródła.
