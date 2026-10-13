# Program źródłowy i sposób realizacji

**Podstawa wymagań:** [potwierdzony Google Docs](https://docs.google.com/document/d/1-dLpRjal8xETmgwjE6Tk2vewbqoiG31iA9YB-pQQGVQ/edit). **Poniższe decyzje implementacyjne są opisem tej wersji materiałów**, nie nowym brzmieniem dokumentu Laba.

## AI SDK i OpenRouter

Wspólny stos to Next.js, TypeScript, Vercel AI SDK i jawny provider OpenRouter. L01 wdraża `streamText`; L03 sprawdza także `generateText`, typowane narzędzia, structured output i wspólny endpoint. Pomocniczy adapter HTTP może służyć diagnozie konkretnej funkcji, ale nie zastępuje ćwiczenia AI SDK. Dla generacji obrazów można użyć wspieranego przez OpenRouter interfejsu, gdy kontrakt obrazów różni się od tekstu; pozostała aplikacja nadal spełnia wymagania frameworka.

Dokumentacja providera wskazuje różne linie zgodności dla głównych wersji SDK. Przed kursem sprawdź eksporty i peer dependencies, utrwal wersje, uruchom build i testy. Nie mieszaj przykładów `maxSteps`, `stepCountIs` i `isStepCount` bez sprawdzenia. To zadanie próby technicznej — nie deklaracja, że bibliotekę już zainstalowano w projekcie uczestnika. [T1, T2]

## Gemini, Google Search grounding i Nano Banana 2

Źródło wymienia Gemini, Google Search oraz Nano Banana 2. Decyzja Pawła zmienia sposób dostępu na **OpenRouter**. Nie usuwamy tych nazwanych funkcji ani nie nazywamy dowolnej wyszukiwarki „Google Search”.

Dla wspieranego modelu Gemini skonfiguruj plugin `web` z `engine: "native"` i sprawdź rzeczywiste metadane grounding/cytatów. Domyślny automatyczny wybór może użyć innego silnika; nie zalicza to automatycznie próby natywnego Google Search. W przypadku braku wsparcia na kluczu Laba zatrzymaj tę próbę i uzgodnij dostęp albo jawny zamiennik. Nie wpisuj PASS na podstawie samego katalogu. Zastosuj wymagane przez dostawcę oznaczenia/cytaty w UI. [T3, T4]

Katalog OpenRouter identyfikuje **Nano Banana 2** jako `google/gemini-3.1-flash-image-preview`. To kandydat do konfiguracji L03, który trzeba sprawdzić na kluczu Laba. Wymagany wynik: faktycznie zwrócony obraz i jego kontrola. Vision to osobne przyjmowanie zdjęcia lub screenshotu; samo obsługiwanie obrazu wejściowego nie dowodzi zdolności generacji. [T5, T6]

## maxSteps w L04

Słowo `maxSteps` pozostaje w omówieniu punktu programu. W kodzie użyj odpowiednika kontroli pętli zgodnego z faktycznie utrwaloną wersją AI SDK, np. `stopWhen: stepCountIs(N)` w wersji, która udostępnia tę funkcję. Zmiana nazwy API jest jawna; mechanizm, limit iteracji i test zatrzymania obowiązkowe. Limit kroków modelu, liczba wykonanych tools i deadline są odrębnymi licznikami. Dobór konkretnych liczb to parametr ćwiczenia, nie zapis sylabusa. [T2]

## Baza, Auth i RLS

Na L05 obowiązkowo wykonaj **New Project i Create Table w Dashboardzie**. SQL do relacji/polityk może uzupełniać praktykę GUI. Zachowaj `user_profiles` i `preferences JSONB`. Minimum sesji testowego operatora i RLS jest technicznym przygotowaniem, aby publiczna baza nie była otwarta. Pełne email/password, wiele kont, personalizacja i Google OAuth z imieniem/avatarem należą do L07. Nie wyłączaj ochrony, żeby zachować kolejność slajdów. [T7, T8]

## Domena i polish

Konfiguracja domeny/subdomeny oraz SSL są wymaganym warsztatem L11. Można użyć adresu przydzielonego przez prowadzącego/Laba; nie jest konieczny nowy zakup przez każdą osobę. Dla subdomeny wykonaj CNAME według panelu projektu. Dla apex użyj właściwego rekordu wskazanego przez hosting. Nie kopiuj uniwersalnego IP ani nie naruszaj poczty. Obowiązują także og:image, favicon, manifest PWA i przełącznik jasny/ciemny. Manifest nie jest obietnicą trybu offline. [T9, T10]

## Granice oceny

Kryterium „nie halucynuje, gdy czegoś nie wie” realizujemy przez wymaganą odmowę odpowiedzi przy braku źródła oraz testy cytowania. Pojedynczy wynik nie uprawnia do zapewnienia uniwersalnej bezbłędności. Źródłowy Google Docs nie został zmieniony. Modele, integracje i domeny muszą przejść osobne próby na kontach uczestników.

Odnośniki T1–T13: [ZRODLA.md](ZRODLA.md).
