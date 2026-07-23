# ⭐ EXTRA 1: Twoja baza od środka (SQL)

> ⭐ **Moduł ponadprogramowy** — nieobowiązkowy. Nie jest wymagany do ukończenia Grupy Zaawansowanej.
> 🔒 **Wymagane wejście:** zaliczony Moduł 2A + agent z bazą Supabase.

> 🛑 **STOP — zanim napiszesz choć jedno zapytanie.** Pracujesz **wyłącznie na osobnej bazie**, którą podpiąłeś w [Module 0](W0_KOKPIT.md) (krok 4) — nie na bazie swojego projektu kursowego. SQL nie ma przycisku „cofnij": jedno nieostrożne `delete` na bazie kursu i tracisz pracę z Lekcji 5–7.
>
> **Sprawdź teraz:** czy w Supabase masz otwarty projekt `agent-zaawansowany` (ten nowy), a nie kursowy? Jeśli nie masz osobnej bazy — wróć do Modułu 0 i ją załóż. Dopiero potem wracaj tutaj.

## O co chodzi

Twój agent od Lekcji 5 **zapisuje dane do bazy** — pamięta rozmowy, trzyma dokumenty do wyszukiwania. Ale do tej pory baza była dla Ciebie panelem, w który się klikało.

Baza danych to nie panel. To **serwer, który rozumie własny język — SQL**. Tutaj przestajesz klikać i zaczynasz **pytać bazę wprost**. SQL to jedna z najbardziej uniwersalnych umiejętności w IT — nie zmienia się od 40 lat i działa wszędzie tak samo.

## Cel

Po tym module:
- wiesz, **jakie tabele** ma Twój agent i co dokładnie w nich siedzi,
- umiesz napisać własne zapytanie `SELECT` z filtrem i sortowaniem,
- rozumiesz pojęcia: **tabela, wiersz, kolumna, typ danych**,
- potrafisz sprawdzić w bazie, co agent naprawdę zapisał.

## Kroki

### 1. Zobacz swoje tabele
Wejdź na [supabase.com](https://supabase.com) → Twój projekt → **Table Editor** (ikona tabeli po lewej).

Zobaczysz listę tabel — u Ciebie prawdopodobnie coś w rodzaju `messages`, `conversations` czy `documents` (nazwy zależą od tego, co zbudował Twój asystent AI).

Kliknij w jedną i przyjrzyj się:
- **kolumny** (u góry) = jakie informacje przechowujemy,
- **wiersze** (w dół) = konkretne zapisane rekordy,
- pod nazwą każdej kolumny jest jej **typ** (`text`, `timestamptz`, `uuid`, `vector`...).

> 💡 Tabela to arkusz Excela z narzuconą dyscypliną: każda kolumna ma z góry określony typ i nie da się tam wpisać czegokolwiek.

### 2. Pierwsze zapytanie
Przejdź do **SQL Editor** (ikona `>_` po lewej) → **New query**. Wpisz (podmieniając nazwę tabeli na swoją):

```sql
select * from messages limit 10;
```
Kliknij **Run**.

Czytaj to jak zdanie: *„wybierz **wszystkie kolumny** (`*`) z tabeli `messages`, ale pokaż tylko 10 wierszy"*.

> ⚠️ `limit 10` to Twój przyjaciel. Bez niego przy dużej tabeli ściągasz wszystko.

### 3. Wybierz tylko to, co Cię interesuje
```sql
select content, created_at from messages limit 10;
```
Zamiast `*` podajesz **konkretne kolumny**. (Podmień `content` / `created_at` na te, które faktycznie masz.)

### 4. Filtrowanie — `where`
```sql
select content, created_at
from messages
where role = 'user'
limit 20;
```
*„...ale tylko te wiersze, gdzie kolumna `role` równa się `user`"*.

> W SQL teksty są w **pojedynczych** cudzysłowach: `'user'`. Do porównania wystarczy jedno `=` (inaczej niż `===` w JavaScripcie z Modułu 2B).

### 5. Sortowanie i liczenie
Najnowsze na górze:
```sql
select content, created_at
from messages
order by created_at desc
limit 10;
```
Ile w ogóle masz rekordów:
```sql
select count(*) from messages;
```

### 6. Znajdź samego siebie
Napisz zapytanie, które wyciągnie **Twoją własną rozmowę** z agentem — porozmawiaj z nim, a potem odszukaj tę wiadomość w bazie:
```sql
select *
from messages
order by created_at desc
limit 5;
```
To jest ten moment, w którym widzisz, że „pamięć agenta" to po prostu **wiersze w tabeli**. Żadnej magii.

> 🛑 **Uwaga na `delete` i `update`.** W SQL nie ma „cofnij". `delete from messages;` bez `where` **kasuje całą tabelę**. Na tym module trzymamy się `select` — czytamy, nie niszczymy.

## ✅ Samo-weryfikacja (Twój dowód „done")

Utwórz w swoim repo plik **`zapytania.sql`** i wklej do niego **trzy działające zapytania** wraz z komentarzem, co robią:

```sql
-- 1. Ostatnie 10 wiadomosci
select content, created_at from messages order by created_at desc limit 10;

-- 2. Tylko wiadomosci uzytkownika
select content from messages where role = 'user' limit 20;

-- 3. Ile rekordow mam w bazie
select count(*) from messages;
```
Każde musi **realnie działać** na Twojej bazie (podmienione nazwy tabel i kolumn).

## 🤖 Sprawdź się sam przez AI

> *„Robię moduł o SQL. Oto moje zapytania: [wklej zapytania.sql] oraz struktura mojej tabeli: [wypisz kolumny].*
> *Oceń wg rubryki — PASS/FAIL + jedno zdanie:*
> *1. Czy zapytania są poprawne składniowo i pasują do tej struktury tabeli?*
> *2. Czy użyłem `where`, `order by` i `count` zgodnie z ich przeznaczeniem?*
> *3. Czy któreś zapytanie jest ryzykowne (brak `limit`, `delete`/`update` bez `where`)?"*

## Jak oddać

```bash
git add zapytania.sql
git commit -m "Extra 1: wlasne zapytania SQL do bazy agenta"
git push
```
Wyślij **w DM do prowadzącego**: link do repo + zdanie „Extra 1 gotowe".

## 🚀 Idź dalej (nieobowiązkowe)

1. **Połącz dane z dwóch tabel** (`join`) — np. wiadomości z ich rozmowami.
2. **Grupowanie:** ile wiadomości przypada na każdą rolę? (`group by role`)
3. **Zajrzyj do RAG:** jeśli masz tabelę `documents` z Lekcji 6, obejrzyj kolumnę `embedding` — zobaczysz, jak wygląda tekst zamieniony na liczby.

## Gdzie przekroczyłeś próg

SQL to język, którym mówi się do praktycznie każdej bazy danych na świecie — w każdej firmie, w każdym stacku. Umiesz już zadać bazie pytanie zamiast klikać w cudzy panel. To jedna z tych umiejętności, które zostają z Tobą na lata.
