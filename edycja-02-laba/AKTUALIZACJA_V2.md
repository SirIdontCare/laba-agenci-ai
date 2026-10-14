# Korekty dydaktyczne Laba V2 — 14.10.2026

**Podstawa:** potwierdzony program [LP feedback implementation | LABA | PL_AI AGENTS - 2](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit). Ani punktów programu, ani pierwotnej wersji kursu nie usuwano.

## Zmiany
1. L01: jasno oddzielono **prosty chatbot publiczny na Vercel w pierwszej lekcji** od dalszych 11 lekcji rozwijania agenta. Dodano sześć slajdów CP-A–CP-F: konfiguracja, debugging, API, streaming, GitHub/Vercel, końcowy odbiór.
2. L01: orientacyjne minuty dla W1/W2/W3 zmieniono z 20/25/20 na 25/35/25. To plan, nie wynik zweryfikowanej próby całej grupy.
3. L04: czas na osiem wymaganych narzędzi podniesiono do 40 min, na pięć źródeł i dashboard 35 min, z przygotowanymi adapterami. Nadal **każdy** uczestnik ma wykonać pełny zestaw i sprawdzić wyniki live.
4. Nazwa Nano Banana 2 w materiałach lokalnych zmieniona na stabilny identyfikator `google/gemini-3.1-flash-image` (zgodny z [OpenRouter](https://openrouter.ai/blog/tutorials/nano-banana/)), ale dostęp na kluczu Laba pozostał **NIEURUCHOMIONY**.
5. Usunięto z bio dwie niezweryfikowane liczby, zostawiając neutralne nazwy działalności.
6. Przygotowano źródła szkoleniowego startera Next.js, testy offline podpisanej sesji/ograniczenia wejścia, oraz 8 adapterów L04. 8/8 testów **offline** PASS; npm build, modele, OAuth i domena NIEURUCHOMIONE.

## Ograniczenia / warunki STOP
- Nie ma prawdziwego package-lock.json, ponieważ środowisko przygotowania nie ma dostępu do npm. Przed L01 prowadzący wykonuje `npm install`, zapisuje lockfile i przeprowadza `next build` oraz pełny deploy.
- Ochrona projektu w Vercel Hobby nie musi chronić produkcyjnej domeny; chronić płatny endpoint osobno. Limiter in-memory w starterze **nie** jest gwarancją limitów użytkownika.
- Nie mamy danych ani zgody organizatora potwierdzających dostęp do natywnego Google Search, Nano Banana 2, Google OAuth i domeny. Przed lekcją wymagają prawdziwych prób.
- W pakiecie lokalnym zapisano 73-punktową mapę nowej numeracji slajdów; footer IDs w poprzednich slajdach pozostały niezmienione.
