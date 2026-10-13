# Lekcja 05. Agent pamięta – baza danych SQL na Supabase

> AI Agents — edycja 2 / zakres Laba / OpenRouter / 13.10.2026

**Rezultat:** Rozmowy, profil i historia zapisane w Supabase.

## Zakres z potwierdzonego programu

- Dlaczego agent zapomina? RAM a baza danych
- Supabase — baza PostgreSQL w chmurze
- Demo: prowadzący zakłada projekt Supabase na żywo
- Dashboard: New Project i Create Table
- Zapis rozmów w Supabase — pamięć przetrwa F5
- Personalizacja: user_profiles i preferencje JSONB
- Lista rozmów /history

Źródło zakresu: [program Laba](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit), lekcja 5. OpenRouter pozostaje zmianą zleconą przez Pawła; różnice technologiczne są jawne w [REALIZACJA_TECHNICZNA.md](REALIZACJA_TECHNICZNA.md).

Przed pracą: [START.md](START.md). Czasy poniżej są propozycją prowadzącego, nie cytatem z programu. Brak dostępu lub czasu nie usuwa wymaganego tematu; zapisz NIEURUCHOMIONY i dokończ próbę.

<a id="w1"></a>
## W1. Supabase: projekt i tabele przez Dashboard

**Zakres obowiązkowy · orientacyjnie 20 min.**

Prowadzący zakłada projekt na żywo; uczestnicy powtarzają New Project. Następnie Table Editor → Create Table: conversations (id, owner_id, title, created_at), messages (id, conversation_id, owner_id, role, content, created_at) i user_profiles (id/owner powiązany z Auth, name, preferences JSONB).
Włącz RLS od początku. Minimalna tożsamość operatora jest technicznym przygotowaniem chronionego zapisu w L05, nie zastępstwem pełnych warsztatów email/Google OAuth na L07. Prowadzący przygotowuje pomocniczą migrację relacji i polityk, ale każdy uczestnik wykonuje pokazane tworzenie tabel w Dashboardzie. Nie publikuj danych bez RLS, aby uprościć GUI.
Porównaj RAM z trwałą bazą. To Supabase przechowuje dane, a aplikacja dołącza wybrane rekordy do modelu. Przedmiotem lekcji nie jest trenowanie modelu. Konto i plan dobierz do warunków szkolenia; brak instalacji lokalnej bazy nie oznacza nieograniczonego darmowego hostingu.

### Polecenie do asystenta

```text
Przeprowadź mnie przez Supabase Dashboard: New Project i Create Table. Przygotuj conversations, messages i user_profiles. Nie zastępuj całego ćwiczenia migracją SQL.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Projekt i tabela zostały utworzone przez Dashboard, nie tylko pokazane.
- [ ] Tabele mają pola, relacje i włączoną ochronę właściciela.
- [ ] Własna sesja zapisuje dane, anonim nie odczytuje prywatnej tabeli.

**Gotowe, gdy:** Uczestnik utworzył projekt i tabelę przez GUI; dane nie są publiczne.

<a id="w2"></a>
## W2. Trwałe rozmowy i /history

**Zakres obowiązkowy · orientacyjnie 20 min.**

Połącz aplikację z Supabase przez sesję użytkownika. Stwórz rozmowę i nadaj stabilne ID wiadomości. Zapisuj pełną odpowiedź po zakończeniu streamingu; częściowy wynik oznacz partial. Każdy fragment streamingu nie może być nowym rekordem.
/history pokazuje tytuły rozmów właściciela, datę i przycisk otwarcia. Po wybraniu wątku pobierz właściwe messages w kolejności, dołącz potrzebny kontekst i pozwól kontynuować. Przycisk „Nowa rozmowa” nie nadpisuje starej. Obsłuż usunięcie własnego wątku z potwierdzeniem.
Wykonaj F5, zamknij i otwórz przeglądarkę, przełącz między dwiema rozmowami. Nie pobieraj „ostatniej rozmowy w całej bazie”. Filtr UI ułatwia odczyt; polityki bazy i backend odpowiadają za uprawnienia.

### Polecenie do asystenta

```text
Dodaj zapis conversations/messages i /history. Lista ma otwierać właściwy wątek, umożliwiać kontynuację i nową rozmowę. Sprawdź F5, kolejność i brak duplikatów.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Po F5 i ponownym zalogowaniu widać zapisane wiadomości.
- [ ] Dwie rozmowy nie mieszają się; kontynuacja trafia do właściwego wątku.
- [ ] Ponowny zapis tego samego ID nie dubluje wiadomości.

**Gotowe, gdy:** Po F5 i ponownym wejściu rozmowy pozostają dostępne.

<a id="w3"></a>
## W3. Imię i preferencje w user_profiles

**Zakres obowiązkowy · orientacyjnie 20 min.**

Użyj fikcyjnego profilu, np. Ada, Toruń, krótkie odpowiedzi. Zapisz imię w name, preferencje w JSONB. Użytkownik widzi profil i może go poprawić. Aplikacja odczytuje dane potwierdzone i dołącza je do instrukcji jako dane, nie jako nowe uprawnienia.
Rozpocznij nową rozmowę i sprawdź powitanie po imieniu oraz zachowanie preferencji. Edycja imienia ma aktualizować profil, a nie tworzyć dwie równorzędne sprzeczne wersje. Zapis „jestem administratorem” w preferences nie nadaje roli.
Odróżnij usunięcie informacji z profilu od jej obecności w historii. Wyczyszczenie pamięci profilu nie usuwa automatycznie starego tekstu rozmowy. Nie zapisuj kluczy ani rzeczywistych danych wrażliwych jako ćwiczenia personalizacji.

### Polecenie do asystenta

```text
Dodaj personalizację przez user_profiles: imię i preferences JSONB. Agent ma witać właściwą osobę i pamiętać jej preferencje po nowej sesji, bez mieszania profili.
Pracuj w jednym projekcie. Najpierw plan, mały zakres zmiany i test. Nie czytaj sekretów; nie wyłączaj zabezpieczeń. Oznacz testy nieuruchomione zamiast wpisywać PASS.
```

### Odbiór

- [ ] Name i preferences JSONB mają realny rekord w bazie.
- [ ] Nowa rozmowa uwzględnia profil właściwego użytkownika.
- [ ] Zmiana preferencji działa; profil nie nadaje uprawnień.

**Gotowe, gdy:** Agent pamięta imię i preferencje przypisane do właściwej osoby.

## Zakończenie lekcji

Zapisz działającą wersję, wyniki prób, nieukończone punkty i ograniczenia. Zestaw ćwiczeń utrwalających nie zmienia zasad zaliczenia organizatora. Nie przypisuj temu dokumentowi prac domowych ani liczby minut nieobecnych w źródle.

Dokumentacja implementacji: [ZRODLA.md](ZRODLA.md). To instrukcje warsztatowe, nie deklaracja uruchomienia aplikacji przez autora materiałów.
