# Kod referencyjny — zakres i ograniczenia

`openrouter.mjs` to mały klient **serwerowy**, tylko do odpowiedzi tekstowej i opcjonalnego JSON Schema bez streamingu. Własne tools, vision, generowanie obrazów, embeddingi, streaming i pętlę uczestnik dokłada w odpowiednich warsztatach zgodnie z dokumentacją. Nie jest to kompletny SDK ani gotowy endpoint z auth, limiterem i rozliczaniem.

`complete()` nie autoryzuje użytkownika. Sesję, dozwolone parametry, ograniczenia procesu i rezerwację budżetu sprawdź PRZED jego wywołaniem. Przekazuj instrukcję systemową z zaufanej konfiguracji, nie jako dowolną rolę z body klienta. Pomocnik celowo nie przyjmuje dowolnego URL, modelu czy opcji dostawcy.

`guards.mjs`: porównanie Bearer, przykładowy kontrakt podpisu webhooka, wąska walidacja triage i agregacja kosztów. Podpis webhooka nie implementuje deduplikacji, kolejki, mapowania nadawcy ani kontroli właściciela — to osobne wymagania L09. Wąski walidator nie zastępuje biblioteki JSON Schema dla dowolnego formatu. Nie ocenia prawdziwości całego tekstu.

`schema.sql`: dwie pierwsze tabele nowego projektu Supabase i polityki właściciela. Nie zawiera całej pamięci, RAG, zadań, approval ani budżetu. Ma zatrzymać się, gdy tabele już istnieją; nie kasuj danych, żeby zadziałał. Przed użyciem sprawdź migrację i uruchom testy A/B/anon w prawdziwym środowisku testowym.

`npm test` w katalogu edycji sprawdza pomocniki na sztucznych odpowiedziach. Nie testuje prawdziwych modeli, SQL w Supabase ani aplikacji Next.js. `npm run check` sprawdza kompletność plików i lokalne linki. `npm run live` wykonuje jeden krótki płatny test tekstu; nie zalicza innych możliwości modelu.

Po adaptacji kodu do swojej aplikacji twórz i uruchamiaj jej własne testy. Nie kopiuj wyniku 35/35 z tego pakietu jako dowodu, że Twoja aplikacja jest bezpieczna.
