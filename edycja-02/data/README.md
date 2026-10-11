# Dane w całości fikcyjne

`fixtures.json` zawiera 5 dokumentów, 5 przypadków development, 5 holdout, 6 testów RAG, 3 firmy porównawcze i 3 zdarzenia webhooka. Pierwsze dwa zdarzenia mają identyczne event_id celowo — test deduplikacji.

Ceny i zasady dotyczą fikcyjnego Kursowego Agenta, nie oferty Laba. Nie dopisuj VAT, rabatów, SLA ani kontaktów. `owner-a` i `owner-b` to markery. Import do aplikacji testowej przypisuje rzeczywistego właściciela z sesji lub jawnej konfiguracji administratora.

`expected_*`, `checks`, `rag_tests.expected` i kryteria oceny służą TYLKO oceniającemu. Do żądania modelu przekaż `input` i właściwe, uprawnione dokumenty. Nie wklejaj całego fixtures.json do promptu ewaluowanego modelu — to ujawni odpowiedzi.

Holdout nie jest materiałem do dostrajania. Po zmianie instrukcji na podstawie wyników holdout trzeba przygotować nowy niezależny test, a stare wyniki oznaczyć jako wykorzystane w rozwoju.
