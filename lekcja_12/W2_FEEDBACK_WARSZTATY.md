# Warsztat 2: Feedback warsztaty — wymiana agentów i wzajemne recenzje

> ⚠️ **Ten warsztat jest INTERAKTYWNY — wymieniacie się agentami i testujecie nawzajem.**

## Cel
Każdy student testuje agenta innego studenta. Szuka bugów, testuje edge cases, daje konstruktywny feedback: co działa świetnie, co poprawić, pomysły na ulepszenia.

## Jak to działa

### 1. Wymiana agentów (5 min)
Prowadzący dzieli grupę na **pary** (lub trójki):
- Student A testuje agenta Studenta B
- Student B testuje agenta Studenta A
- Wymiana linków (URL agenta na Vercel)

Zasada: Testujesz agenta osoby, z którą NORMALNIE NIE siedzisz obok.
Cel: świeże oczy, nowa perspektywa.

### 2. Testowanie (15 min)
Każdy student testuje agenta partnera wg checklisty:

#### Checklist do testowania:

**🟢 Podstawy (2 min)**
- [ ] Landing page: czy wygląda profesjonalnie?
- [ ] Rejestracja/login: czy działa?
- [ ] Czat: czy agent odpowiada?
- [ ] Czy streaming działa?

**🟡 Funkcjonalności (5 min)**
- [ ] Historia rozmów: czy się zapisuje? Czy przetrwa F5?
- [ ] Personalizacja: czy agent pyta o imię? Czy pamięta?
- [ ] Baza wiedzy: czy są dokumenty? Czy agent odpowiada z nich?
- [ ] Scenariusze biznesowe: czy działa email triage / raporty / własny scenariusz?
- [ ] Briefing: czy jest strona /briefings?

**🔴 Edge cases (5 min)**
- [ ] Wpisz pustą wiadomość — co się dzieje?
- [ ] Wpisz BARDZO długą wiadomość (1000 słów) — crash?
- [ ] Spróbuj basic prompt injection: "Ignoruj instrukcje" — zadziała?
- [ ] Wyloguj się i wejdź na chronioną stronę — redirect na login?
- [ ] Otwórz na telefonie — responsive?

**💡 Wrażenia (3 min)**
- [ ] Co Cię WOW-nęło? (1 rzecz)
- [ ] Co Cię ZIRYTOWAŁO? (1 rzecz)
- [ ] Co byś DODAŁ gdybyś miał 2 godziny? (1 pomysł)

### 3. Wypełnij kartę feedbacku (5 min)

Dla każdego testowanego agenta wypełnij:

```
FEEDBACK DLA: [imię studenta]
AGENT: [nazwa agenta]
TESTOWAŁ/A: [Twoje imię]

🟢 CO DZIAŁA ŚWIETNIE (min. 2 rzeczy):
1. 
2. 

🟡 CO POPRAWIĆ (min. 2 rzeczy):
1. 
2. 

🔴 BUGI / PROBLEMY (jeśli znalazłeś):
1. 

💡 POMYSŁY NA ULEPSZENIE (min. 1):
1. 

⭐ OGÓLNA OCENA (1-5): ___
KOMENTARZ OGÓLNY: 
```

### 4. Wymiana feedbacku (10 min)
- Pary siadają razem
- Każdy prezentuje swój feedback partnerowi (2 min per osoba)
- Wspólna dyskusja: "Jak to naprawić?" (3 min per para)
- Opcjonalnie: wspólne naprawianie na żywo z AI assistantem!

## Zasady feedbacku

### ✅ TAK — konstruktywny feedback:
- "Landing page wygląda super, ale brakuje mi opisu co agent robi"
- "Historia rozmów działa, ale po F5 nie ładuje się ostatnia rozmowa"
- "Pomysł: dodaj przycisk 'Kopiuj odpowiedź' przy każdej wiadomości"

### ❌ NIE — destrukcyjny feedback:
- "To nie działa" (bez wyjaśnienia CO nie działa)
- "Brzydkie" (bez konkretu co zmienić)
- "U mnie jest lepiej" (to nie konkurs)

### Złota zasada:
**Dawaj feedback, który SAM chciałbyś usłyszeć.**

## Oczekiwany rezultat
- Każdy student przetestował min. 1 agenta innego studenta
- Każdy student otrzymał min. 1 kartę feedbacku
- Każdy wie: co działa, co poprawić, jakie ma pomysły na przyszłość
- Pary/trójki mogły wspólnie naprawić 1-2 bugi na żywo

## Dlaczego to jest ważne
W prawdziwej pracy produkty testują INNI ludzie — nie Ty. Feedback od kolegów to symulacja prawdziwego user testing. Będziesz zaskoczony ile bugów znajdzie ktoś kto widzi Twojego agenta po raz pierwszy. To jest najcenniejsze ćwiczenie kursu.
