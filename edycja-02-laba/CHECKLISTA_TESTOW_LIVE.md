# Próby integracji, które należy wykonać przed zajęciami

Stan na **14.10.2026**, bez klucza Laba, dostępu do npm i konta hostingowego. Wszystkie poniższe zewnętrzne testy: **NIEURUCHOMIONE**.

| Spotkanie | Próba i wymagany dowód |
|---|---|
| L01 | `npm install`, prawdziwy lockfile, `next build`; streaming na kluczu Laba; publiczny Vercel URL; API bez sesji=401 |
| L01 | Demo gotowego agenta wykorzystującego rzeczywiste narzędzie |
| L03 | Wyszukiwanie rzeczywiście natywnego Google Search, a nie domyślnej alternatywnej wyszukiwarki |
| L03 | Nano Banana 2 `google/gemini-3.1-flash-image`: zwrócony obraz; vision na własnym screenie |
| L04 | Osiem działających tools, pięć różnych odpowiedzi API, dashboard z `fetched_at` |
| L05–L06 | Supabase Auth/RLS, pgvector i weryfikacja braku obcych rekordów |
| L07 | Google OAuth: klient, callback, imię, avatar, wylogowanie |
| L09 | Rzeczywisty cron/webhook i zapis historii |
| L10 | 50 wiadomości/h, 10k tokenów/dzień, filtr output i logi administratora |
| L11 | Subdomena/domena szkoleniowa i HTTPS, PWA, Recharts |

**Statusy:** PASS = wykonana próba z dowodem; FAIL = awaria; NIEURUCHOMIONE = brak dostępu/danych/czasu; REPLAY = powtórka z nagrania lub fixture, NIE wynik live. Żadnego PASS bez dowodu. 8/8 testów jednostkowych adapterów i podpisu sesji offline to inny poziom weryfikacji.
