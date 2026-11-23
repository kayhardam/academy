# Serie Kruisen

Voorstel van 23 november 2026, bij `plans/stap-2-inhoud.md`. Elke tekst is een voorstel tot Kay ja zegt. Hoe je deze bestanden gebruikt staat in `LEESMIJ.md`.

## De serie

```yaml
# content/series/nl/crossing.md
title: "Kruisen"
summary: "Van kruisen zonder tegenstand naar de kruising MO–LO in het spel. Vijf oefeningen die op elkaar voortbouwen."
ages: [u14, u16]
items:
  - crossing-in-pairs
  - crossing-against-a-defender # week 1
  - crossing-cb-lb
  - crossing-cb-lb-with-screen # week 13
  - game-crossing # week 20
```

## Kruisen tegen een verdediger

Week 1 · plek 2 in de serie · slug: `crossing-against-a-defender`

```yaml
type: drill
title: "Kruisen tegen een verdediger"
category: attack
ages: [u12, u14, u16]
level: basic
summary: "Twee rijen kruisen tegen één verdediger. De eerste valt hem aan, de tweede kruist erachter langs. Zo leer je kiezen: afgeven of zelf gaan."
goal: "De verdediger naar je toe trekken en dan kiezen: de bal afgeven aan de kruiser of zelf doorgaan."
organization:
  players: "Twee rijen van drie of meer, een verdediger en een keeper."
  equipment: "Twee pionnen en ballen bij de linkerrij."
  space: "Een half veld: twee pionnen op 8 meter, 7 meter uit elkaar, en de verdediger ertussen, op 7 meter."
rules:
  - "De verdediger blijft tussen de pionnen en probeert de bal te raken."
  - "Blijft de verdediger staan, dan gaat de eerste zelf door en schiet."
  - "Wissel de verdediger na vijf beurten."
  - "Wissel na vijf minuten van kant: de ballen gaan naar de rechterrij."
coachingPoints:
  - "Eerste: ga recht op de verdediger af, tot hij naar je uitstapt."
  - "Eerste: geef de bal pas af als de verdediger bij je is."
  - "Tweede: start pas als de eerste de verdediger aanvalt."
  - "Kruis dicht achter elkaar langs."
  - "Vraag de bal met je hand."
mistakes:
  - "De eerste geeft de bal af voordat de verdediger heeft gekozen."
  - "De eerste loopt opzij, weg van de verdediger."
  - "De tweede start te vroeg en staat stil als de bal komt."
  - "De tweede kruist te wijd: de verdediger kan er nog bij."
easier:
  - "De verdediger stapt altijd uit: de tweede krijgt altijd de bal."
  - "De verdediger houdt zijn handen op zijn rug."
harder:
  - "De verdediger kiest zelf: uitstappen, blijven staan of meegaan met de kruiser."
  - "Een tweede verdediger erbij: 2 tegen 2 tussen de pionnen."
related:
  - nl/crossing-in-pairs
  - nl/crossing-cb-lb
```

**Verloop**

1. De eerste van links loopt met de bal schuin naar het midden, recht op de verdediger af.
2. De verdediger stapt naar hem uit. De eerste van rechts kruist erachter langs en krijgt de bal.
3. Die loopt door het gat dat de verdediger achterlaat en schiet op doel.
4. Daarna sluiten ze allebei aan bij de andere rij.

**Op het bord:** half veld, zoals Kruisen in tweetallen: twee rijen van drie zonder label, drie ballen bij de linkerrij, de keeper (K). Erbij: twee pionnen op 8 meter en een verdediger zonder label ertussen, op 7 meter. Getekend op 23 november 2026.

**Ook in deze pull request:** Kruisen in tweetallen krijgt `nl/crossing-against-a-defender` bij Zie ook.

## Kruising MO–LO met sper

Week 13 · plek 4 in de serie · slug: `crossing-cb-lb-with-screen`

```yaml
type: tactic
title: "Kruising MO–LO met sper"
category: attack
ages: [u14, u16, u18, senior]
level: intermediate
summary: "De kruising MO–LO, nu met een sper van de cirkelloper. CL zet de middenverdediger vast. Zo komt LO vrij voor het schot."
coachingPoints:
  - "CL: sta stil en breed voordat LO bij je is."
  - "CL: zet de sper aan de kant waar LO langs wil."
  - "LO: loop dicht langs de sper."
  - "LO: start pas als MO de bal heeft."
  - "MO: ga op het doel af, zodat je verdediger moet uitstappen."
related:
  - nl/crossing-cb-lb
  - nl/crossing-against-a-defender
```

**Verloop**

1. MO loopt schuin naar links en krijgt de bal van RO.
2. CL zet een sper tegen de middenverdediger. LO kruist achter MO langs.
3. MO speelt de bal terug naar LO.
4. LO loopt dicht langs de sper naar het gat en schiet op doel.

**Tekst onder de stappen:** Stapt een verdediger om de sper heen naar LO, dan is CL vrij. Hij draait naar het doel en krijgt de bal aan de 6 meter.

**Op het bord:** half veld, de opstelling van Kruising MO–LO: LH, LO, MO, RO, RH en CL tegen zes verdedigers zonder label en de keeper (K). De sper is de pijl Sper van CL.

**Ook in deze pull request:** Kruising MO–LO krijgt `nl/crossing-cb-lb-with-screen` bij Zie ook.

## Spelvorm: kruisen

Week 20 · plek 5 in de serie · slug: `game-crossing`

```yaml
type: drill
title: "Spelvorm: kruisen"
category: attack
ages: [u12, u14, u16]
level: basic
summary: "Drie tegen drie op één doel, met één accent: kruisen. Een doelpunt na een kruising telt dubbel. De stappen laten één kruising zien."
goal: "De kruising in het spel gebruiken: eerst zelf aanvallen, dan kruisen en doorgaan naar het doel."
organization:
  players: "Drietallen: drie opbouwers (LO, MO en RO) tegen drie verdedigers, en een keeper."
  equipment: "Een bal en hesjes voor de verdedigers."
  space: "Een half veld; de verdedigers verdedigen tussen de 6 en de 9 meter."
rules:
  - "Een doelpunt is een punt. Een doelpunt na een kruising is twee punten."
  - "Elke aanval begint bij de middenlijn."
  - "Na vijf aanvallen wisselen aanval en verdediging."
  - "Welk drietal heeft na twee rondes de meeste punten?"
coachingPoints:
  - "Val eerst zelf aan: zonder dreiging werkt een kruising niet."
  - "Kruis dicht achter elkaar langs."
  - "Na de kruising: ga door het gat of speel de vrije man aan."
  - "Zonder bal: blijf breed staan."
  - "Vraag de bal met je hand."
mistakes:
  - "De kruising loopt opzij, niet naar het doel."
  - "Na de kruising valt het spel stil: niemand gaat door."
  - "Alle drie lopen naar het midden en niemand staat breed."
  - "De bal gaat weg voordat de verdediger heeft gekozen."
easier:
  - "Speel 3 tegen 2."
  - "De verdedigers houden hun handen op hun rug."
harder:
  - "Speel 4 tegen 4, met een cirkelloper."
  - "Alleen een doelpunt na een kruising telt."
  - "De verdedigers mogen elkaars aanvaller overnemen."
related:
  - nl/crossing-against-a-defender
  - nl/crossing-cb-lb
```

**Verloop**

1. LO loopt met de bal schuin naar het midden. Zijn verdediger gaat mee. RO blijft breed staan.
2. MO kruist achter LO langs en krijgt de bal.
3. MO loopt door het gat aan de linkerkant en schiet op doel.

**Op het bord:** half veld: LO, MO en RO op 11 meter, drie verdedigers zonder label op 8 meter, de keeper (K), één bal bij LO.
