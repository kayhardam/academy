# Tekstvoorstellen voor de nieuwe oefeningen

Per serie één bestand, met de tekst van elke nieuwe oefening uit `plans/stap-2-inhoud.md`. De vorm is die van een item in het Coachboard, zonder de tekening. Alles is een voorstel tot Kay ja zegt. Goedgekeurde tekst gaat daarna letterlijk over.

## Wat er per oefening staat

- De week, de plek in de serie en een voorstel voor de slug: Engels, zoals de bestaande items.
- Het blok voor de front matter: titel, categorie, leeftijden, niveau, samenvatting en de lijsten.
- **Verloop:** één zin per stap van de tekening.
- **Op het bord:** de opstelling om te tekenen.
- Waar nodig: de tekst onder de stappen, en welk bestaand item de oefening bij Zie ook krijgt.

Bovenaan elk bestand staat een voorstel voor het serie-bestand van stap 4: titel, samenvatting, leeftijden, de vijf items in volgorde en `position`, de plek op de startpagina. De plekken volgen de volgorde van stap 2, van Kruisen (1) tot Vrijlopen (8). Het formaat staat in `scripts/lib/series.mjs`.

## Gecontroleerd

Met een script, tegen het schema van het Coachboard (`src/content.config.ts` op commit `4b2a7de`) en het plan van stap 2:

- de titel is de goedgekeurde titel en heeft hoogstens 40 tekens;
- de samenvatting heeft minstens 50 tekens, elke lijst hoogstens zes punten;
- een oefening heeft een doel van hoogstens twee zinnen, en spelers, materiaal en ruimte van elk één zin;
- twee tot acht stappen, elk hoogstens 100 tekens;
- een getal en "meter" staan met een vaste spatie;
- Zie ook noemt alleen items die er in die week al zijn;
- de leeftijden zijn een reeks zonder gat, met 13-14 en 15-16 jaar erin.

Het serie-blok bovenaan elk bestand is op 25 november 2026 gecontroleerd met `checkSeries()` uit `scripts/lib/series.mjs`. Of een nieuw item bestaat, controleert de export pas als het in de submodule staat.

Niet gecontroleerd: de tekening. Dat doen `npm run import-link` en `npm run verify` in het Coachboard.

## Een oefening schrijven

1. Kay leest de tekst van die week en past aan wat anders moet.
2. Kay tekent het bord op `/nl/board/`, één stap per zin, en kopieert de link.
3. Een sessie in de coachboard-repo maakt het item, met de startprompt hieronder.
4. Daarna hier: de submodule naar de nieuwe commit en de slug in het serie-bestand, zoals stap 4 dat inricht.

## Startprompt voor de coachboard-repo

```text
Lees AGENTS.md en src/content/AGENTS.md. Werk op een nieuwe branch vanaf origin/main.

Maak het Nederlandse item <slug> uit de tekst onderaan. Kay heeft die tekst goedgekeurd: neem haar
letterlijk over. De tekening komt uit deze link: <link>

1. Draai npm run import-link -- "<link>". Meldt het een fout of een waarschuwing, leg die dan aan Kay
   voor. Verander de tekening niet zelf.
2. Maak src/content/library/nl/<slug>.md: de front matter uit de tekst, het blok board uit import-link en,
   als die er is, de tekst onder de stappen. De zin van elke stap is de zin uit "Verloop".
3. Voeg de slug toe bij Zie ook van de items die de tekst daarvoor noemt.
4. Draai npm run verify (exitcode 0) vóór de commit en open de pull request zoals AGENTS.md vraagt voor
   inhoud.

<plak hier de tekst van de oefening uit plans/oefeningen/ van kayhardam/academy>
```
