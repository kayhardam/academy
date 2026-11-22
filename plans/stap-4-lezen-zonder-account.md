# Stap 4: Lezen zonder account

Live op zondag 31 januari 2027. Vier delen, elk met een eigen branch en pull request. `main` werkt na elke merge.

## Doel

Een jeugdtrainer vindt zonder account een serie voor zijn leeftijdsgroep, ziet de oefeningen in volgorde en bekijkt elke oefening stap voor stap. Er staan drie series live: Kruisen, De break en 6-0-dekking.

## Aanpak

| Deel | Wat | Wie |
|---|---|---|
| A | Export: van Markdown en serie-bestanden naar één JSON-bestand | Claude Code |
| B | Datamodel en import in de database | Kay schrijft het datamodel, Claude Code de tests en het importcommando |
| C | De drie pagina's | Kay schrijft de eerste versie, Claude Code de tests, de review en de afwerking |
| D | Vindbaarheid, deploy en vrijgave | Claude Code, Kay controleert live |

**A. Export.** `scripts/export-library.mjs` leest de items uit `coachboard/src/content/library/` en de series uit `content/series/nl/`. Het laadt de code van het Coachboard via Vite, zoals `coachboard/scripts/import-link.mjs` doet, en gebruikt dezelfde controles als de build van het Coachboard. Het schrijft `database/data/library.json`, dat niet in git komt. Per Nederlands item: slug, type, titel, categorie, leeftijden, niveau, samenvatting, de lijsten, het bord, de link (met `encode()`) en het pad van de Coachboard-pagina (met `itemPath()`). Elke fout stopt het script.

Een serie-bestand is `content/series/nl/<slug>.md` met `title`, `summary`, `ages` en `items` (de slugs in volgorde). Kay schrijft de drie bestanden.

**B. Datamodel en import.** Voorstel voor de tabellen; Kay schrijft de migraties en de modellen zelf.

- `series`: `lang`, `slug`, `title`, `summary`, `age_min`, `age_max`, `position`. Uniek op `lang` en `slug`.
- `exercises`: `lang`, `slug`, `type`, `title`, `category`, `age_min`, `age_max`, `level`, `summary`, `details` (jsonb), `board` (jsonb), `link`, `canonical_path`, `archived_at`. Uniek op `lang` en `slug`.
- `series_exercise`: `series_id`, `exercise_id`, `position`. Uniek op serie en positie.

`php artisan library:import` leest het JSON-bestand in één transactie. Opnieuw draaien verandert niets. Een oefening die uit de bron verdwijnt wordt gearchiveerd en niet verwijderd, zodat bewaarde trainingen in stap 5 heel blijven.

**C. Pagina's.** Drie routes, zonder account bereikbaar:

- `/nl`: de series, met een filter op leeftijd als gewone links.
- `/nl/series/{serie}`: de oefeningen in volgorde.
- `/nl/series/{serie}/{oefening}`: titel, kenmerken, samenvatting, de stappen als tekening met hun zin, de lijsten, en Vorige en Volgende binnen de serie. De opbouw volgt de itempagina van het Coachboard.

Elke oefening heeft twee knoppen naar het Coachboard: "Afspelen" (`/nl/board/link/#t=<link>`) en "Open in het bord" (`/nl/board/#t=<link>`). De viewer leest het bord uit de URL, dus inline afspelen komt later.

Bestaande teksten komen uit de submodule (`t()`, `agesLabel()`, `levelLabel()`, `categoryInfo()`), zodat de woorden gelijk blijven.

**D. Vindbaarheid en vrijgave.** De canonical van een oefening wijst naar de Coachboard-pagina (`https://handballcoachboard.com/nl/<canonical_path>`). Series en de startpagina zijn hun eigen canonical. Op Laravel Cloud komen `npm run export` vóór `npm run build:ssr` in de build-commando's, en `php artisan migrate --force` en `php artisan library:import` in de deploy-commando's.

## Tekst ter goedkeuring

Nieuwe tekst is eerst van Kay. Voorstel:

- Startpagina: de kop en één zin eronder. Voorstel voor de zin: "Oefeningen in een vaste opbouw, stap voor stap op het bord."
- Filter: "Leeftijd" en "Alle leeftijden".
- Serie: "{n} oefeningen". Oefening: "Oefening {n} van {count}" en "Terug naar {serie}".
- De vorm van de paginatitels.

Bestaand en ongewijzigd: "Afspelen", "Open in het bord", "Vorige", "Volgende", "Stap voor stap", "Aandachtspunten" en de kopjes van een oefening.

## Risico's

- **Twee waarheden.** De export controleert opnieuw wat de build van het Coachboard al controleert. Wijken die twee af, dan is de code in `coachboard/` de maatstaf, niet onze kopie van de regels.
- **Link per omgeving.** Dezelfde tekening kan per omgeving tot andere bytes comprimeren. Vergelijk in tests daarom borden, nooit de tekst van een link.
- **Dubbele inhoud.** Dezelfde oefening staat op twee adressen. De canonical lost dat op; een test bewaakt hem.
- **Inhoud op tijd.** Drie series met elk drie oefeningen vragen nieuwe items in januari. Die komen uit de schrijfkalender van stap 2.
- **Vite+.** De starterkit bouwt met Vite+ (`vp`); `vite` is daar een alias. Het exportscript laadt de code van het Coachboard via die Vite. Deel A bewijst als eerste dat dat werkt.

## Jij beslist

- De drie serie-bestanden en alle nieuwe tekst.
- De vorm van het filter in de URL. Voorstel: `/nl?age=13-14`, in jaren zoals op de site.
- Drie dev-dependencies:
  - `yaml` (npm): de front matter lezen in het exportscript. Zonder: een eigen parser, en die is breekbaar.
  - `@playwright/test` en `@axe-core/playwright` (npm): browsertests en toegankelijkheid, zoals in het Coachboard. De starterkit brengt zelf geen browsertests mee. Claude Code weegt eerst de browsertests van Pest af en legt het verschil voor.

## Klaar als

- [ ] Drie series staan live, elk met minstens drie oefeningen.
- [ ] De startpagina, een serie en een oefening tonen hun inhoud zonder JavaScript.
- [ ] Het filter op leeftijd werkt met gewone links.
- [ ] "Afspelen" opent de viewer van het Coachboard met het juiste bord, en "Open in het bord" de editor.
- [ ] De canonical van elke oefening wijst naar de Coachboard-pagina.
- [ ] De tests zijn groen in CI: export, import, routes, en de browsertest op telefoonformaat met toegankelijkheidscontrole.
- [ ] Een Lighthouse-meting op telefoonformaat van de drie paginatypes staat in de pull request van deel D.
- [ ] Kay heeft elke diff gelezen, de tekst goedgekeurd en gemerged.

## Startprompts

Controleer elke prompt vóór gebruik tegen wat de vorige sessie heeft opgeleverd.

### Deel A: export

```text
Lees AGENTS.md en plans/stap-4-lezen-zonder-account.md. Werk alleen aan deel A, op de branch step-4a-export.

Doel: scripts/export-library.mjs maakt database/data/library.json uit de submodule en de serie-bestanden.

1. Lees in coachboard/, zonder er iets te wijzigen: docs/link-format.md, src/content.config.ts,
   src/content/AGENTS.md ("The build fails on"), src/data/library.ts, src/lib/library.ts,
   src/data/categories.ts en scripts/import-link.mjs (het patroon om TypeScript via Vite te laden).
2. Leg het formaat van een serie-bestand vast: content/series/nl/<slug>.md met title, summary (minstens
   50 tekens), ages (een aaneengesloten reeks uit AGES) en items (slugs in volgorde). Kay levert de echte
   bestanden; maak zelf alleen fixtures voor de tests.
3. Schrijf het script. Het leest alle items in alle talen, past dezelfde controles toe als de build van het
   Coachboard (met de functies uit coachboard/, niet met een eigen versie), en schrijft de Nederlandse items en
   de series weg zoals het plan beschrijft. Een serie die naar een onbekend item wijst is een fout. Bij een
   fout: één regel per fout en exit 1.
4. Zet de pure functies in scripts/lib/ en test ze met node --test. Vergelijk borden, nooit linkteksten.
5. Voeg het npm-script "export" toe, zet database/data/library.json in .gitignore en laat CI de export en
   de tests draaien.

Dependency ter goedkeuring: yaml (npm, dev) voor de front matter. Noem versie, grootte, reden en het
alternatief, en wacht op Kays ja voordat je hem toevoegt.

Lees je eigen diff na en open de pull request: wat, waarom, hoe te testen, risico's, en wat je niet hebt
kunnen testen.
```

### Deel B, sessie 1: tests voor het datamodel en de import

```text
Lees AGENTS.md en plans/stap-4-lezen-zonder-account.md. Werk alleen aan deel B, sessie 1, op de branch
step-4b-import.

Doel: tests die nu nog falen. Kay schrijft daarna zelf de migraties en de modellen.

1. Maak een kleine fixture van library.json: twee series, vier oefeningen, één oefening in beide series.
2. Schrijf tests voor de modellen: een serie geeft haar oefeningen in volgorde, een oefening kent haar
   series, en gearchiveerde oefeningen doen niet mee.
3. Schrijf tests voor php artisan library:import: de eerste run vult de tabellen, een tweede run verandert
   niets, een gewijzigde titel wordt bijgewerkt, een verdwenen oefening wordt gearchiveerd, en een kapot
   bestand laat de database ongemoeid en geeft een foutcode.
4. Schrijf voor Kay op, in het Nederlands: welke migraties en modellen de tests verwachten, en waar in de
   Laravel-documentatie hij migraties, Eloquent-relaties en casts vindt.

Schrijf zelf geen migraties, modellen of het commando. Stop na punt 4.
```

### Deel B, sessie 2: het importcommando

```text
Lees AGENTS.md en plans/stap-4-lezen-zonder-account.md. Werk alleen aan deel B, sessie 2, op de branch
step-4b-import.

Kay heeft de migraties en de modellen geschreven.

1. Review zijn migraties en modellen: leg uit wat beter kan en waarom. Pas alleen aan wat hij goedkeurt.
2. Schrijf php artisan library:import tot alle tests van sessie 1 slagen. Eén transactie; duidelijke
   meldingen; een foutcode bij elke fout.
3. Controleer dat de tests op PostgreSQL draaien, lokaal en in CI.
4. Lees je eigen diff na en open de pull request: wat, waarom, hoe te testen, risico's, en wat je niet hebt
   kunnen testen.
```

### Deel C, sessie 1: tests voor de pagina's

```text
Lees AGENTS.md en plans/stap-4-lezen-zonder-account.md. Werk alleen aan deel C, sessie 1, op de branch
step-4c-pages.

Doel: tests die nu nog falen. Kay schrijft daarna zelf de routes, de controllers en de eerste versie van de
pagina's.

1. Schrijf tests voor de drie routes: de startpagina toont de series op positie; het filter op leeftijd
   toont alleen passende series; een serie toont haar oefeningen in volgorde; een oefening krijgt haar bord,
   haar link, en de vorige en volgende in de serie; een onbekende of gearchiveerde slug geeft 404.
2. Schrijf voor Kay op, in het Nederlands: welke routes, controllers en pagina's de tests verwachten, welke
   props elke pagina krijgt, hoe hij StepDrawing gebruikt, en welke functies hij uit @coachboard haalt voor
   de bestaande teksten.

Schrijf zelf geen routes, controllers of pagina's. Stop na punt 2.
```

### Deel C, sessie 2: review, afwerking en browsertests

```text
Lees AGENTS.md en plans/stap-4-lezen-zonder-account.md. Werk alleen aan deel C, sessie 2, op de branch
step-4c-pages.

Kay heeft de routes, de controllers en de eerste versie van de pagina's geschreven.

1. Review zijn code: leg uit wat beter kan en waarom. Pas alleen aan wat hij goedkeurt.
2. Werk de pagina's af volgens het plan: telefoon eerst, de opbouw van de itempagina van het Coachboard
   (lees coachboard/src/components/LibraryItem.astro en StepStrip.astro), de twee knoppen, Vorige en Volgende.
   Gebruik alleen tekst die Kay heeft goedgekeurd of die uit @coachboard komt.
3. Browsertests op telefoonformaat (390 bij 844): van de startpagina via het filter naar een serie en een
   oefening; dezelfde inhoud met JavaScript uit; een toegankelijkheidscontrole op elk paginatype.
4. Lees je eigen diff na en open de pull request: wat, waarom, hoe te testen, risico's, en wat je niet hebt
   kunnen testen.

Dependencies ter goedkeuring: @playwright/test en @axe-core/playwright. De starterkit brengt zelf geen
browsertests mee; leg eerst het verschil voor met de browsertests van Pest. Wacht op Kays ja.
```

### Deel D: vindbaarheid en vrijgave

```text
Lees AGENTS.md en plans/stap-4-lezen-zonder-account.md. Werk alleen aan deel D, op de branch
step-4d-release.

1. Paginatitels en beschrijvingen volgens de door Kay goedgekeurde vorm. De canonical van een oefening wijst
   naar https://handballcoachboard.com/nl/<canonical_path>; series en de startpagina zijn hun eigen canonical.
2. Breid de SSR-test uit naar de drie paginatypes: titel, eerste stap en canonical staan in de server-HTML.
3. Schrijf in het pull request welke build- en deploy-commando's Kay op Laravel Cloud instelt, volgens het
   plan en de documentatie van Laravel Cloud.
4. Meet de drie paginatypes met Lighthouse op telefoonformaat en zet de uitkomst in de pull request.
5. Lees je eigen diff na en open de pull request: wat, waarom, hoe te testen, risico's, en wat je niet hebt
   kunnen testen.
```
