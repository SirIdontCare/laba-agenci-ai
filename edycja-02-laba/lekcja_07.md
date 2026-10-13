# Lekcja 07. Agent dla wielu osób: autentykacja i multi-user, izolacja danych

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Email, Google OAuth oraz prywatne rozmowy wielu użytkowników.

## Zakres z potwierdzonego programu

- Dlaczego logowanie? Prywatność, personalizacja, bezpieczeństwo
- Supabase Auth — logowanie i konta użytkowników
- Multi-tenancy — jeden agent, wielu użytkowników, izolowane dane
- /login: e-mail i hasło (Supabase Auth)
- Prywatne rozmowy: izolacja danych per user
- Personalizacja: powitanie po imieniu i preferencje per user
- Google OAuth: logowanie, imię i avatar

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 7. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Logowanie e-mail i hasło

**Zakres obowiązkowy · orientacyjnie 20 min.**

Rozwiń minimalną tożsamość techniczną z L05 do rzeczywistego wieloużytkownikowego flow: rejestracja, logowanie, wylogowanie i odtworzenie sesji. /login zawiera e-mail i hasło. Gdy konfiguracja wymaga potwierdzenia adresu, korzystaj z własnych kont testowych umożliwiających odebranie wiadomości.
Sprawdzaj sesję po stronie serwera dla /api/chat, /api/agent, uploadu, historii i innych chronionych operacji. Przekierowanie strony to tylko interfejs; nie zastępuje ochrony endpointu. Role administratora ustala zaufana konfiguracja, nie edytowalne metadata użytkownika.
Przy wylogowaniu usuń z widoku wiadomości, profil i cache poprzedniej osoby. Otwórz aplikację w nowej sesji, aby wykluczyć przypadkowe użycie starego tokenu. Logowania Google nie pomijamy — jest osobnym obowiązkowym W3.

### Polecenie do asystenta

```text
Dodaj /login z e-mailem i hasłem przez Supabase Auth. Chroń strony i API sprawdzaną sesją. Przetestuj rejestrację, logowanie, wylogowanie i brak dostępu.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Rejestracja i logowanie własnym e-mailem działają.
- [ ] Brak/wygaśnięcie sesji blokuje chronione dane i kosztowne operacje.
- [ ] Wylogowanie czyści widok prywatny i zamyka dostęp.

**Gotowe, gdy:** Logowanie działa; niezalogowany nie odczytuje danych ani nie uruchamia API.

<a id="w2"></a>
## W2. Prywatne rozmowy i personalizacja

**Zakres obowiązkowy · orientacyjnie 20 min.**

Każda prywatna tabela ma właściciela powiązanego z sesją. Dotyczy conversations, messages, user_profiles, documents/chunks i zapisanych wyników. user_id/owner_id nie może pochodzić bez sprawdzenia z body klienta. Polityki RLS i kontrola serwera są wymagane także dla funkcji wyszukiwania.
Utwórz dwie odrębne rozmowy i dwa profile. Sprawdź bezpośredni endpoint/API z obcym conversation_id i document_id: brak ujawnienia, modyfikacji i usunięcia. Weryfikuj także listę źródeł przed wywołaniem modelu — odmowa po odczycie cudzych danych nie jest poprawną izolacją.
Po zmianie konta na tym samym urządzeniu powitanie używa właściwego imienia, a preferencje nie pochodzą ze starego cache. Ten zestaw dwóch kont to proponowany test techniczny, nie dopisany wymóg liczby użytkowników z dokumentu Laba.

### Polecenie do asystenta

```text
Dodaj izolację per user w tabelach i RLS. Sprawdź odczyt, zapis i obce ID z kont A/B. Zachowaj powitanie po imieniu i preferencje każdego użytkownika.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] A i B mają osobne dane i powitania.
- [ ] Podstawienie cudzego ID nie ujawnia ani nie zmienia rekordu.
- [ ] Cudzy dokument nie trafia do modelu; wylogowanie nie zostawia danych w UI.

**Gotowe, gdy:** A i B widzą wyłącznie własne rozmowy, dokumenty oraz profil.

<a id="w3"></a>
## W3. Google OAuth: imię i avatar

**Zakres obowiązkowy · orientacyjnie 30 min.**

To obowiązkowy warsztat, nie rozszerzenie. Przed zajęciami przygotuj dostęp do własnego testowego projektu Google Cloud. W Google Auth Platform skonfiguruj audience/test users, ekran zgody i klienta OAuth typu Web application. Scopes ogranicz do openid, profilu i adresu e-mail. Nie prosimy o dostęp do Gmail ani Drive.
Adres callback Supabase skopiuj z konfiguracji dostawcy Google w projekcie. Dodaj go do authorized redirect URIs klienta OAuth; origin aplikacji ustaw zgodnie z dokumentacją. Client ID i Client Secret wprowadź do konfiguracji Google provider w Supabase. Secret nie trafia do przeglądarki, Git ani promptu. W Supabase ustaw Site URL i dozwolone powroty aplikacji.
W Next.js dodaj signInWithOAuth({provider:'google'}) oraz poprawną obsługę sesji/callback dla wybranego flow serwerowego. Odczytaj imię i avatar z metadanych profilu. Brak obrazka obsłuż placeholderem, nie fałszywym zdjęciem. Sprawdź logowanie, odrzucenie zgody, niepoprawny redirect i wylogowanie. Nie obchodź braku konfiguracji przez wyłączenie sprawdzania sesji.

### Polecenie do asystenta

```text
Dodaj obowiązkowe logowanie Google przez Supabase Auth: klient OAuth, poprawne callback/redirect URL, przycisk, sesja, imię i avatar. Testuj powrót oraz wylogowanie.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Zalogowanie z Google wraca do aplikacji i tworzy poprawną sesję.
- [ ] Widać właściwe imię i avatar (albo jawny brak avatara).
- [ ] Wylogowanie oraz odrzucona zgoda są obsłużone; izolacja A/B nadal działa.

**Gotowe, gdy:** Google OAuth działa, a aplikacja pokazuje właściwe imię i avatar.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
