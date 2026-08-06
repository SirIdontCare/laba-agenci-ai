# Warsztat 4: Co dalej — mapa drogowa po kursie

> ⚠️ **Ten warsztat to nie kodowanie.**
> Prowadzący omawia trendy i możliwości. Studenci zabierają ten plik ze sobą jako listę linków.

## Cel
Wiesz, co zbudowałeś. Teraz: co dalej? Trzy kierunki — rozwijaj technicznie, zrób z tego produkt, ucz się dalej.

---

## Część 1: Dokąd idzie branża (15 min)

### 🔌 MCP — Model Context Protocol
Standard podłączania agentów do zewnętrznych narzędzi i danych. Zamiast pisać własną integrację z Slackiem, Google Drive czy bazą — podłączasz gotowy serwer MCP.

Twój agent ma dziś narzędzia napisane ręcznie (`getWeather`, `searchKnowledge`). MCP to ten sam pomysł, tyle że jako otwarty standard — narzędzie napisane raz działa w każdym kliencie.

- Dokumentacja i specyfikacja: https://modelcontextprotocol.io
- Katalog gotowych serwerów: https://github.com/modelcontextprotocol/servers
- SDK TypeScript: https://github.com/modelcontextprotocol/typescript-sdk

**Spróbuj sam:** podłącz gotowy serwer MCP (np. do plików albo GitHuba) w Claude Code lub Codex i zobacz, jak agent nagle „widzi" Twój dysk.

### 🤝 A2A — Agent2Agent
Protokół komunikacji **między agentami** różnych producentów. Twój agent zleca zadanie cudzemu agentowi i odbiera wynik. Ogłoszony przez Google w 2025, dziś pod Linux Foundation, wspierany przez 150+ organizacji i zintegrowany z platformami Google, Microsoft i AWS.

- Strona projektu: https://a2a-protocol.org
- Repozytorium i specyfikacja: https://github.com/a2aproject/A2A

**Dlaczego to ważne:** dziś budujesz jednego agenta. Za rok będziesz budował agenta, który zatrudnia innych agentów.

### 🖥️ Computer use — agent klika za Ciebie
Agent, który steruje przeglądarką i pulpitem: wypełnia formularze, klika, przenosi dane między aplikacjami. Wchodzi wszędzie tam, gdzie nie ma API.

- Claude w przeglądarce i na komputerze: https://claude.com/product/claude-in-chrome
- Automatyzacja przeglądarki (open source): https://github.com/browser-use/browser-use

---

## Część 2: Zrób z tego produkt (15 min)

### Od projektu do biznesu — kolejność kroków

```
1. NISZA  → nie "asystent AI dla wszystkich", tylko
             "asystent ofertowy dla biur rachunkowych"
2. 3 KLIENTÓW → znajdź trzy osoby z tym problemem. Daj za darmo.
                Słuchaj, co mówią. To jest cały research.
3. PŁATNOŚĆ → gdy ktoś powie "wziąłbym to" — poproś o pieniądze.
              Dopóki nikt nie zapłacił, nie wiesz, czy masz produkt.
4. SKALA   → dopiero teraz: więcej userów, marketing, automatyzacja
```

### Czego brakuje Twojemu agentowi do sprzedaży

| Element | Narzędzie | Link | Alternatywy |
|---|---|---|---|
| Płatności i subskrypcje | Stripe | https://stripe.com/docs | Lemon Squeezy (https://lemonsqueezy.com), Paddle (https://paddle.com), Polar (https://polar.sh) |
| Wysyłka maili | Resend | https://resend.com/docs | Postmark (https://postmarkapp.com), SendGrid (https://sendgrid.com) |
| Analityka — kto i jak używa | PostHog | https://posthog.com/docs | Plausible (https://plausible.io), Umami (https://umami.is) |
| Monitoring błędów | Sentry | https://docs.sentry.io | Better Stack (https://betterstack.com) |
| Formularz zapisów / waitlista | Tally | https://tally.so | Typeform (https://typeform.com) |

> 💡 **Stripe vs reszta:** Stripe daje najwięcej kontroli, ale VAT/OSS rozliczasz sam.
> Lemon Squeezy i Paddle działają jako *merchant of record* — biorą wyższą prowizję,
> ale załatwiają podatki za Ciebie. Przy sprzedaży za granicę to często warte różnicy.

### 🇵🇱 Płatności na rynek polski — BLIK to nie opcja, to podstawa

Sprzedajesz w Polsce? **Bez BLIKa i szybkich przelewów tracisz większość klientów.**
Karta to u nas mniejszość płatności online — Polak chce kliknąć BLIK i mieć spokój.

**Wariant 1: zostajesz przy Stripe**
Nie musisz nic zmieniać — Stripe obsługuje BLIK i Przelewy24 jako metody płatności.
Włączasz je w panelu, bez osobnej integracji.
- BLIK w Stripe: https://docs.stripe.com/payments/blik
- Przelewy24 w Stripe: https://docs.stripe.com/payments/p24

**Wariant 2: polski operator**

| Operator | Link | Uwagi |
|---|---|---|
| **Przelewy24** | https://www.przelewy24.pl | Najpopularniejszy agregator, 165+ banków, BLIK, karty |
| **PayU** | https://payu.pl | Duży gracz, mocne w e-commerce, płatności odroczone |
| **tpay** | https://tpay.com | Prosta integracja, przyjazny dla małych firm |
| **Autopay** | https://autopay.pl | Dawniej Blue Media |
| **imoje** (ING) | https://imoje.pl | Jeśli masz konto firmowe w ING |
| **Paynow** (mBank) | https://www.paynow.pl | Jeśli masz konto firmowe w mBanku |

**Jak wybrać:**
- Sprzedajesz **tylko w PL** → polski operator, zwykle niższe prowizje i faktury po polsku
- Sprzedajesz **w PL i za granicę** → Stripe z włączonym BLIK/P24, jeden system zamiast dwóch
- Sprzedajesz **głównie za granicę, subskrypcje** → Paddle / Lemon Squeezy, żeby nie tonąć w VAT OSS

> ⚖️ Prowizje, limity i wymagania (np. czy potrzebujesz firmy, czy wystarczy działalność
> nierejestrowana) zmieniają się i różnią między operatorami — sprawdź aktualny cennik
> u źródła. Kwestie VAT, OSS i regulaminu skonsultuj z księgową.

### 🇪🇺 AI Act — jedno zdanie, które musisz mieć na stronie

Od **2 sierpnia 2026** obowiązuje art. 50 unijnego AI Act. Dla Ciebie sprowadza się to do jednego wymogu:

> **Użytkownik musi wiedzieć, że rozmawia z AI** — chyba że to oczywiste z kontekstu.

W praktyce: dopisz to na landing page i przy pierwszej wiadomości agenta. Dosłownie tyle:

```
"Rozmawiasz ze sztuczną inteligencją. Odpowiedzi mogą zawierać błędy —
w ważnych sprawach zweryfikuj je u człowieka."
```

Jeśli agent generuje treści (obrazy, dłuższe teksty publikowane dalej), dochodzi obowiązek ich oznaczania — tu masz czas do 2 grudnia 2026, jeśli system był na rynku przed sierpniem.

- Art. 50 w oficjalnym serwisie AI Act: https://artificialintelligenceact.eu/transparency-rules-article-50/
- FAQ Komisji Europejskiej: https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act

> ⚖️ To ogólna informacja, nie porada prawna. Przy komercyjnym wdrożeniu (zwłaszcza
> gdy agent dotyka danych osobowych — RODO) skonsultuj się z prawnikiem.

### Ile to kosztuje na starcie
Vercel Hobby, Supabase Free i darmowy limit Gemini wystarczą do pierwszych kilkudziesięciu użytkowników. Realnie **0 zł do momentu, aż ktoś zacznie płacić**. Pierwszy poważny koszt to własna domena (~50-100 zł/rok) i przejście na płatny plan bazy, gdy urośniesz.

> ⚖️ To ogólne informacje o narzędziach, nie porada biznesowa ani prawna.
> Zanim zaczniesz sprzedawać — sprawdź kwestie RODO i regulaminu z kimś, kto się na tym zna.

---

## Część 3: Ucz się dalej

### 🔵 Advanced Track — kolejny krok w Labie

Na tym kursie AI pisała kod za Ciebie. **Advanced Track to ten sam świat, ale pod maską:**
praca w VS Code, git na co dzień, Python, własny backend — czyli moment, w którym przestajesz
tylko zlecać, a zaczynasz rozumieć i poprawiać to, co dostajesz.

Dla kogo: jeśli przez ostatnie 12 lekcji łapałeś się na myśli *„ale co ten kod właściwie robi?"* — to jest odpowiedź na to pytanie.

**📦 Materiały grupy zaawansowanej:**
> https://github.com/SirIdontCare/grupa-zaawansowana

Czego będziesz potrzebować (pełna lista w pliku `NARZEDZIA.md` w tym repo):
- VS Code — tam już wymóg, nie opcja: https://code.visualstudio.com
- Git: https://git-scm.com/downloads
- Python 3.11+: https://www.python.org/downloads

### 💬 Gdzie pytać, gdy coś nie działa

Przez 12 tygodni miałeś grupę i prowadzącego. Warto mieć gdzie pytać dalej:

- **Grupa naszego kursu** — [TU WSTAW LINK]
- **Vercel Community (AI SDK)** — pytania o stack, którego używasz: https://community.vercel.com/c/ai-sdk/62
- **Supabase Discord** — baza, auth, pgvector: https://discord.supabase.com
- **r/LocalLLaMA** — najżywsza społeczność o modelach AI: https://reddit.com/r/LocalLLaMA
- **Discussions MCP** — jeśli wejdziesz w protokoły: https://github.com/modelcontextprotocol/modelcontextprotocol/discussions

> 💡 Zanim zapytasz człowieka — wklej błąd do swojego asystenta AI. 9 na 10 problemów
> rozwiąże w 30 sekund. Na forum idź z tym dziesiątym.

### Dokumentacja stacku, którego używałeś
- **AI SDK (Vercel)** — serce Twojego agenta: https://ai-sdk.dev/docs/introduction
- **Next.js** — framework aplikacji: https://nextjs.org/docs
- **Supabase** — baza, auth, pgvector: https://supabase.com/docs
- **Gemini API** — modele, limity, ceny: https://ai.google.dev/gemini-api/docs
- **Vercel** — deploy, domeny, cron: https://vercel.com/docs

### Alternatywy — czym można podmienić każdy klocek

Nauczyłeś się jednego stacku, ale **każdy element ma zamienniki**. Warto wiedzieć, że istnieją — w pracy często decyzja jest już podjęta za Ciebie.

| Warstwa | Używałeś | Alternatywy |
|---|---|---|
| **Baza danych** | Supabase | Neon (https://neon.tech) — serverless Postgres, hojny darmowy plan<br>Turso (https://turso.tech) — SQLite na brzegu sieci<br>Firebase (https://firebase.google.com) — ekosystem Google |
| **Logowanie** | Supabase Auth | Clerk (https://clerk.com) — najładniejsze gotowe UI<br>Auth.js (https://authjs.dev) — darmowe, self-hosted<br>Better Auth (https://better-auth.com) |
| **Baza wektorowa (RAG)** | pgvector | Qdrant (https://qdrant.tech), Pinecone (https://pinecone.io), Weaviate (https://weaviate.io), Chroma (https://trychroma.com) |
| **Model AI** | Gemini | OpenAI (https://platform.openai.com), Claude (https://docs.claude.com), Mistral (https://mistral.ai)<br>OpenRouter (https://openrouter.ai) — jeden klucz do wszystkich modeli<br>Groq (https://groq.com) — bardzo szybka inferencja |
| **Framework agenta** | AI SDK | Mastra (https://mastra.ai) — TypeScript, blisko AI SDK<br>LangChain / LangGraph (https://langchain.com) — standard w Pythonie<br>LlamaIndex (https://llamaindex.ai) — mocny w RAG |
| **Hosting** | Vercel | Netlify (https://netlify.com), Cloudflare Workers (https://workers.cloudflare.com), Railway (https://railway.app), Render (https://render.com), Fly.io (https://fly.io) |
| **Automatyzacja / cron** | Vercel Cron | n8n (https://n8n.io) — wizualne workflow, self-hosted<br>Make (https://make.com), Zapier (https://zapier.com) |

> 🎯 **Jak wybierać:** nie po tym, co „najlepsze", tylko po tym, co **najszybciej postawisz i najtaniej utrzymasz przy 10 użytkownikach**.
> Gdy urośniesz do 10 000, i tak przepiszesz połowę. Zamiana bazy czy modelu to dziś dzień pracy, nie miesiąc — zwłaszcza że AI assistant robi migrację za Ciebie.

### Asystenci kodowania — idź głębiej
- **Claude Code**: https://docs.claude.com/en/docs/claude-code/overview
- **Codex (OpenAI)**: https://chatgpt.com/codex
- **Antigravity (Google)**: https://antigravity.google

### Inspiracje i budowanie
- Kolekcja gotowych szablonów AI: https://vercel.com/templates/ai
- Przykłady agentów w AI SDK: https://github.com/vercel/ai/tree/main/examples
- Awesome MCP — lista narzędzi: https://github.com/punkpeye/awesome-mcp-servers

---

---

## Certyfikat — zrób z niego coś więcej niż PDF w folderze

Dostajesz dziś certyfikat. Sam w sobie nie znaczy wiele — **znaczy to, co do niego dołączysz.**
Masz działającego agenta pod własnym adresem i kod na GitHubie. To jest mocniejsze niż certyfikat.

**15 minut po zajęciach:**

```
1. LinkedIn → Dodaj do profilu → Licencje i certyfikaty
   Nazwa: Budowanie Agentów AI (Laba)
   W opisie NIE pisz "ukończyłem kurs". Napisz co zbudowałeś:
   "Agent AI z bazą wiedzy (RAG), pamięcią rozmów, logowaniem
    i automatycznymi briefingami. Next.js + Supabase + Gemini."
   → i wklej LINK do działającego agenta

2. GitHub → README repo
   Screenshot agenta + link live + 3 zdania o tym, co potrafi.
   Rekruter otwiera README, nie kod.

3. Post na LinkedIn (opcjonalnie, ale działa)
   "3 miesiące temu nie umiałem programować. Dziś mój agent AI
    robi [konkretna rzecz]. Link poniżej."
   → dodaj krótkie nagranie ekranu. To niesie dalej niż tekst.
```

> ⚠️ Zanim wrzucisz link publicznie: sprawdź, czy w bazie wiedzy agenta nie ma
> prywatnych ani firmowych dokumentów, i czy masz włączone limity z Lekcji 10.
> Publiczny link to też publiczny rachunek za tokeny.

---

## Twój plan na najbliższe 30 dni

```
TYDZIEŃ 1 — Nie pozwól, żeby to umarło
  → Wróć do agenta. Napraw 2 rzeczy z kart feedbacku (W2).
  → Wyślij link 5 osobom spoza kursu.

TYDZIEŃ 2 — Jedna nowa umiejętność
  → Podłącz jeden serwer MCP. Zobacz, jak zmienia się agent.

TYDZIEŃ 3 — Zderz z rzeczywistością
  → Znajdź 1 osobę, która ma problem, który Twój agent rozwiązuje.
  → Posadź ją przed ekranem i patrz, gdzie się gubi. Nie podpowiadaj.

TYDZIEŃ 4 — Decyzja
  → Rozwijam dalej / zaczynam coś nowego / wracam do tego za pół roku.
  → Każda odpowiedź jest OK. Nieświadome porzucenie — nie.
```

## Zasada na koniec
Największy skok masz już za sobą: od „nie umiem programować" do „mam działającego agenta w internecie". Wszystko dalej to warianty tego, co dziś potrafisz — nowe narzędzie, nowy protokół, nowy scenariusz.

**Nie czekaj na kolejny kurs. Zbuduj następną rzecz.**
