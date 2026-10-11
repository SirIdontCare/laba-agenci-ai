# Wspólny kontrakt techniczny

To decyzje projektowe edycji 2, nie stwierdzenie, że gotowa aplikacja już istnieje. Każdy warsztat odwołuje się do tego pliku.

## Architektura

Next.js App Router + TypeScript → serwerowy adapter OpenRouter → modele i narzędzia. Supabase: Postgres, Auth i pgvector od L05/L06. Vercel: hosting i harmonogram. Jedna aplikacja, kolejne małe funkcje. Vercel AI SDK można wykorzystać przez `@openrouter/ai-sdk-provider`, nie przez domyślną bramkę innego dostawcy. Biblioteki muszą być wzajemnie zgodne i zapisane w lockfile. Pomocniczy kod w `reference/` używa udokumentowanego HTTP OpenRouter, aby testy kursu nie zależały od zmian SDK.

Aktualny README providera OpenRouter wskazuje linię dla AI SDK 7 z Node 22+; starsza linia 2.9.1 jest dla AI SDK 6. To nie powód do ślepego instalowania `latest`. Prowadzący utrwala i uruchamia jedną kombinację przed kursem. Gdy używasz SDK 6, kontrola pętli to `stepCountIs`; dla innej wersji sprawdź faktyczne eksporty. Limit pętli sprawdzamy testem, nie grepem nazwy funkcji.

## Modele

Serwer mapuje role `fast`, `quality`, `vision`, `image`, `embedding` na konkretne identyfikatory z konfiguracji Laba. Nie akceptuje dowolnego modelu, providera, URL ani pluginu od klienta. Dwa profile mogą wskazywać ten sam model. Każda rola ma limit kosztu i wymagane możliwości. `tools` nie oznacza obsługi obrazu; vision nie oznacza generowania obrazu. Fallback tylko do dopuszczonego modelu o zgodnym kontrakcie i akceptowalnej cenie. Brak zgodnego modelu → jawny błąd, nie ciche osłabienie zabezpieczeń.

## Wczesny deploy

L01–L04: wyłącznie fikcyjne dane, unikalna długa fraza dostępu, sprawdzana po stronie serwera dla KAŻDEGO płatnego endpointu, plus limit klucza u dostawcy. Nie zapisuj frazy w URL, localStorage ani publicznym kodzie. Współdzielony limit i ograniczenie prób logowania wdrażamy przed szerszym udostępnieniem; sama fraza to bariera demonstracyjna, nie pełna autentykacja produktu. Brak bariery → aplikacja pozostaje lokalnie. Token OpenRouter nigdy nie trafia do przeglądarki.

L05: dodaj minimalną sesję Supabase Auth dla testowego operatora i RLS od pierwszej tabeli. L07 rozwija pełne konta, rejestrację, dwa odizolowane profile i opcjonalne OAuth. Takie wcześniejsze minimum Auth jest świadomą korektą względem kolejności starego kursu: publiczna baza nie czeka bez zabezpieczeń do L07.

## Jednolity przebieg zadania

`run`: id, owner_id, mode, status, started_at, finished_at, stop_reason, model_requested, model_actual, prompt_version, input_tokens, output_tokens, cost_usd (nullable), cost_source, error_code.

Status: queued / running / needs_review / succeeded / partial / failed / cancelled. Wywołania zapisujące stan: dodatkowo action_id, wersja payloadu, approval i klucz idempotencji. Limit startowy kursu: 6 kroków modelu, 8 wywołań tools, 45 s na run; to propozycja do pomiaru, nie parametry planu usługodawcy. Kroki, tools i czas liczymy oddzielnie. Limity egzekwuje backend.

Użycie liczymy za wszystkie kroki, nie tylko ostatnią odpowiedź. Koszt nieznany pozostaje null/UNKNOWN, nie 0. Cena z katalogu to estymacja; koszt raportowany przez dostawcę ma oddzielną etykietę. Obrazy, search i inne opłaty nie znikają tylko dlatego, że nie są tokenami tekstu.

## Kontrakt danych i testów

`data/fixtures.json` to źródło dydaktyczne: fikcyjna firma Kursowy Agent, Start 490 PLN netto/mies., archiwum 440, Zespół 990. Brak stawki VAT oznacza brak ceny brutto. Nie traktuj tych danych jako oferty Laba.

Odpowiedzi modelu waliduj schematem ORAZ regułami biznesowymi. Błąd, odmowa i ucięta odpowiedź mają osobne stany. `needs_review` oznacza niepewność wyniku; nie jest zgodą na wykonanie działania. Szkic zawsze pozostaje niewysłany, także kiedy `needs_review=false`.

RLS ma chronić conversations, messages, memory, documents/chunks, runs, actions, briefings, events i usage. owner_id wyłącznie z uwierzytelnionej sesji; filtr aplikacji to dodatkowa wygoda, nie zabezpieczenie bazy. Testy A/B/anon muszą dotyczyć również bezpośredniego API/RPC. Klucz service-role/secret tylko na serwerze, w zadaniach administracyjnych i po jawnym sprawdzeniu uprawnień.

## Kryterium odbioru funkcji

Normalne wejście działa; braki są jawne; błąd ma następny krok; cudze dane są niedostępne; skutki uboczne kontrolowane; koszt ograniczony; wynik ma dowód. Test offline ≠ test modelu ≠ test pełnego wdrożenia. Raport zawsze rozdziela te trzy kategorie.
