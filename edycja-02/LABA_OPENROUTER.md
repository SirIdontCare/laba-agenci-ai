# Dla Laba — organizacja OpenRouter

Ustalenie użytkownika: dostęp API zapewnia Laba. Pakiet nie zawiera klucza i nie zakłada, że został już wydany.

## Zalecany wariant szkoleniowy

Jeden oddzielny, zwykły klucz inference na uczestnika z niskim limitem wydatków i możliwością unieważnienia. Wspólna faktura/organizacja może pozostać po stronie Laba. Nie rozdajemy jednego nieograniczonego klucza głównego wszystkim. Klucz zarządzający służy administratorowi do wystawiania kluczy; nie trafia do uczestników, kodu aplikacji ani platformy kursowej. Dokumentacja OpenRouter rozdziela management keys i klucze inferencji [OR-KEYS].

Alternatywa, gdy Laba udostępni jeden sekret: kontrolowana bramka Laba na serwerze, indywidualne uwierzytelnienie uczestników, per-user limity, allowlista modeli i narzędzi, limity wejścia/wyjścia oraz rejestr kosztów. Bez takiej bramki wspólnego klucza nie publikujemy w aplikacjach kursantów. Ten pakiet nie wdraża bramki Laba i nie twierdzi, że ona istnieje.

## Lista do przygotowania przez organizatora

- Sposób prywatnego przekazania indywidualnego klucza; rotacja i data zakończenia dostępu.
- Budżet na uczestnika i całą grupę; osoba kontaktowa na wypadek 402/429. Kwotę zatwierdza Laba, nie slajd.
- Lista dopuszczonych identyfikatorów: fast, quality, vision, image, embedding. Lista źródeł i źródeł kosztu — `MODELE_I_ZRODLA.md`.
- Test tekstu, JSON, tool calling, obrazu wejściowego, grafiki wyjściowej, embeddingu i wyszukiwania. Każda funkcja może mieć inne warunki i opłaty.
- Próba równoległa odpowiadająca liczbie uczestników, nie tylko jedno zapytanie prowadzącego.
- Polityka routingu i prywatności: dostawcy za OpenRouter, logowanie i przetwarzanie. Nie utożsamiaj jednego klucza z jedną polityką danych [OR-PRIVACY].

## Wiadomość organizacyjna do skopiowania

„Do edycji 2 potrzebujemy dostępu OpenRouter dla każdego uczestnika, najlepiej osobnymi kluczami inference z limitem. Proszę o ustalenie budżetu, listy dostępnych modeli i prywatnego kanału przekazania. W kursie używamy tekstu, JSON, tools, vision, generowania grafiki, embeddingów i web search. Wyszukiwanie i obrazy mogą generować osobne opłaty. Potrzebujemy też klucza prowadzącego do próby technicznej przed zajęciami. Nie wysyłajcie klucza zarządzającego ani wspólnego sekretu na czat grupy.”

Źródła OR-KEYS i OR-PRIVACY są podane w `MODELE_I_ZRODLA.md`. Jest to przygotowany tekst, nie wysłana wiadomość.
