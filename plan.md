# Plan: leerplatform naast het Coachboard

Stand: 23 november 2026. Dit is het overzicht op één pagina. Het plan per stap staat in `plans/`. Het whiteboard toont hetzelfde in één beeld: https://claude.ai/artifact/8WZkXj5rMeXdT4iVdTC2cV

## Doel

Op zondag 28 maart 2027 kan een jeugdtrainer zonder account een serie voor zijn leeftijdsgroep vinden en elke oefening stap voor stap zien en afspelen. Met een account bewaart hij oefeningen in een eigen training.

## Uitgangspunten

- Kwaliteit van product en code gaat voor snelheid en kosten. Een datum mag schuiven, de lat niet.
- Inhoud gaat voor code. Lukt een week niet allebei, dan eerst de oefening.
- Eén bron: oefeningen blijven Markdown in de coachboard-repo. Aan het Coachboard zelf verandert niets.
- Lezen kan zonder account. Een account is er om te bewaren.
- Alleen Nederlands voor nu, met `/nl` in elke URL.
- Stack: Laravel, Inertia en Svelte 5, met server-side rendering.

## Besloten

- **Adres:** academy.handballcoachboard.com.
- **Hosting:** Laravel Cloud, in de EU (Frankfurt).
- **Database:** PostgreSQL 18, als Serverless Postgres op Laravel Cloud. Lokaal en in CI draait dezelfde versie, nergens SQLite.
- **Leeftijd:** 13 t/m 16 jaar. In het Coachboard zijn dat de groepen 13-14 en 15-16.
- **Account:** voortgang als "Mijn trainingen". Een trainer zet oefeningen in een eigen training en vinkt ze af.
- **Inlogfuncties:** registratie en e-mailverificatie. Registratie staat uit tot stap 5.
- **Inhoud:** acht series van vijf oefeningen, 40 op 4 juli. De series, de titels en de schrijfkalender staan in `plans/stap-2-inhoud.md`.

## Open keuzes

Geen. De keuzes van stap 1 en stap 2 zijn op 23 november 2026 beslist.

## Stappen

| # | Stap | Datum | Klaar als |
|---|------|-------|-----------|
| 1 | Beslissen | klaar op ma 23 nov | de open keuzes zijn ingevuld |
| 2 | Inhoud plannen | klaar op ma 23 nov | elke week van de schrijfkalender heeft een titel |
| 3 | Fundament | klaar op ma 23 nov | één stap van een bord staat als tekening in de server-HTML van de live site |
| 4 | Lezen zonder account | live zo 31 jan | drie series live, elk met minstens drie oefeningen |
| 5 | Account en Mijn trainingen | live zo 28 mrt | een training maken, afvinken en het account verwijderen werkt |
| 6 | Vullen en beslissen | t/m zo 4 juli | 38 tot 64 oefeningen live en een besluit over Later |

Stap 1, 2 en 3 zijn af. Vanaf maandag 4 januari komen er elke week 1 à 2 oefeningen bij, 26 weken lang, volgens de schrijfkalender van stap 2.

## Kwaliteitslat (elke stap)

- Elke route en elk commando heeft een test. CI is groen vóór elke merge.
- De hoofdroutes hebben een browsertest op telefoonformaat, ook met JavaScript uit.
- Toegankelijkheid wordt per paginatype gecontroleerd.
- Geen scripts van een andere origin en geen analytics in de pagina.
- Nederlandse tekst is vooraf met Kay afgestemd.
- Kay leest elke diff en merget zelf.

## Wie doet wat

- **Kay:** beslissen, het datamodel en de eerste pagina's zelf schrijven, reviewen en mergen. Testen met trainers en contact met de bond zijn van hem; geen stap wacht erop.
- **Claude in de chat:** het plan van één pagina en de startprompt per stap, zoekwerk, het whiteboard.
- **Claude Code:** bouwen. Eén taak is één branch en één pull request.

## Budget (t/m eind maart 2027: €200)

| Post | Bedrag |
|---|---|
| Claude Pro, vijf afschrijvingen vanaf 24 november | €109 |
| Laravel Cloud met database, vanaf 9 december (de eerste periode is gratis) | €20 tot €45 |
| Laracasts, hooguit één maand | €0 tot €25 |
| Usage credits en Fable na 24 november | €0 (uit) |
| Reserve | €21 tot €71 |

Is een limiet bereikt, dan wacht het werk op de reset. Er wordt niets bijgekocht en de lat gaat niet omlaag.

## Risico's

- **Techniek:** bewezen in stap 3. Laravel Cloud haalt de submodule op en rendert de pagina op de server; de live HTML is op 23 november 2026 gecontroleerd.
- **NHV:** de Trainersapp van de bond komt alsnog. Daarom 13 t/m 16 jaar en het afspeelbare bord.
- **Tijd:** Laravel leren, bouwen en schrijven tegelijk. Daarom gaat inhoud voor en schuift de datum, niet de lat.

## Later, niet nu

Leerlijnen, zoeken, meerdere trainers, "teken het zelf", inline afspelen, Engels. Niet: forum, betalen, podcast, app.
