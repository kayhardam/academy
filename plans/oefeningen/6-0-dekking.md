# Serie 6-0-dekking

Voorstel van 23 november 2026, bij `plans/stap-2-inhoud.md`. Elke tekst is een voorstel tot Kay ja zegt. Hoe je deze bestanden gebruikt staat in `LEESMIJ.md`.

## De serie

```yaml
# content/series/nl/6-0-defense.md
title: "6-0-dekking"
summary: "Van uitstappen en meeschuiven met één verdediger naar de 6-0-dekking met zes, in een spelvorm."
ages: [u14, u16]
items:
  - step-out-and-shift
  - shifting-with-three-defenders # week 3
  - 6-0-defense-basics
  - 6-0-defense-against-a-crossing # week 14
  - game-6-0-defense # week 22
```

## Schuiven met drie verdedigers

Week 3 · plek 2 in de serie · slug: `shifting-with-three-defenders`

```yaml
type: drill
title: "Schuiven met drie verdedigers"
category: defense
ages: [u12, u14, u16, u18]
level: basic
summary: "Drie verdedigers aan de 6 meter tegen drie opbouwers die de bal rondspelen. Wie de bal tegenover zich heeft, stapt uit. De andere twee sluiten het gat."
goal: "Samen schuiven: één stapt uit naar de bal, zijn buren sluiten het gat achter hem."
organization:
  players: "Zestallen: drie opbouwers (LO, MO en RO) en drie verdedigers."
  equipment: "Een bal per zestal."
  space: "Een half veld: de verdedigers staan aan de 6 meter, de opbouwers op 11 meter."
rules:
  - "De opbouwers spelen de bal rond en blijven op hun plek."
  - "Na tien passes mogen ze doorbreken. Lukt dat niet, dan krijgen de verdedigers een punt."
  - "Na drie rondes wisselen aanval en verdediging."
coachingPoints:
  - "Stap uit tot bij de werparm, armen omhoog."
  - "Na de pass: zak meteen terug naar de lijn."
  - "Buren: schuif een stap naar de bal en sluit het gat."
  - 'Roep "bal" als je uitstapt.'
  - "Schuif met kleine, snelle passen en kruis je voeten niet."
mistakes:
  - "Twee verdedigers stappen tegelijk uit: achter hen valt een gat."
  - "De uitgestapte verdediger blijft na de pass staan."
  - "De buitenste kijkt naar de bal en vergeet zijn eigen aanvaller."
  - "Niemand roept."
easier:
  - "De opbouwers houden de bal 3 tellen vast voordat ze spelen."
  - "Zonder bal: de trainer wijst aan welke opbouwer de bal heeft."
harder:
  - "De opbouwers mogen meteen doorbreken en schieten, met een keeper in het doel."
  - "Een cirkelloper erbij: de verdedigers houden hem voor zich."
  - "Speel 4 tegen 4, met een hoek erbij."
related:
  - nl/step-out-and-shift
  - nl/6-0-defense-basics
```

**Verloop**

1. MO heeft de bal. Zijn verdediger stapt naar hem uit; de twee naast hem sluiten het gat.
2. MO speelt naar RO. De verdediger van MO zakt terug naar de 6 meter.
3. De verdediger van RO stapt uit. De andere twee schuiven mee naar de kant van de bal.
4. RO speelt terug naar MO. De lijn schuift terug en de verdediger van MO stapt weer uit.

**Op het bord:** half veld: LO, MO en RO op 11 meter, drie verdedigers zonder label aan de 6 meter, één bal bij MO. Geen keeper. Getekend op 23 november 2026.

**Ook in deze pull request:** Uitstappen en meeschuiven krijgt `nl/shifting-with-three-defenders` bij Zie ook.

## 6-0-dekking tegen een kruising

Week 14 · plek 4 in de serie · slug: `6-0-defense-against-a-crossing`

```yaml
type: tactic
title: "6-0-dekking tegen een kruising"
category: defense
ages: [u14, u16, u18, senior]
level: intermediate
summary: "Kruisen twee opbouwers, dan lopen hun verdedigers niet mee. Ze blijven in hun zone en nemen elkaars aanvaller over. Wie de bal tegenover zich krijgt, stapt uit."
coachingPoints:
  - 'Roep "over" bij elke kruising.'
  - "Blijf in je zone: loop niet achter je aanvaller aan."
  - "Neem over naast elkaar, niet achter elkaar."
  - "Wie de bal tegenover zich krijgt, stapt uit. De ander zakt een stap terug."
  - "Houd de cirkelloper voor je, nooit achter je rug."
related:
  - nl/6-0-defense-basics
  - nl/crossing-cb-lb
  - nl/shifting-with-three-defenders
```

**Verloop**

1. MO loopt met de bal schuin naar links. Zijn verdediger schuift een paar passen mee.
2. LO kruist achter MO langs naar het midden. De twee verdedigers roepen "over".
3. De verdediger van MO laat hem los en neemt LO over. De verdediger van LO neemt MO over.
4. MO speelt terug naar LO. De nieuwe verdediger van LO stapt meteen naar hem uit.

**Tekst onder de stappen:** Meegaan met je eigen aanvaller kan ook, maar dan lopen twee verdedigers elkaar in de weg en valt er een gat. Daarom neemt de 6-0-dekking over.

**Op het bord:** half veld, de opstelling van 6-0-dekking: de basis: LH, LO, MO, RO, RH en CL tegen zes verdedigers zonder label en de keeper (K). De bal begint bij MO.

**Ook in deze pull request:** Kruising MO–LO krijgt `nl/6-0-defense-against-a-crossing` bij Zie ook. Bij 6-0-dekking: de basis staan er al drie: Kay kiest of er een plaatsmaakt.

## Spelvorm: 6-0-dekking

Week 22 · plek 5 in de serie · slug: `game-6-0-defense`

```yaml
type: drill
title: "Spelvorm: 6-0-dekking"
category: defense
ages: [u14, u16, u18]
level: basic
summary: "Zes tegen zes op een half veld, en de verdediging verdient de punten. Elke aanval zonder doelpunt is een punt, balwinst is er twee. De stappen laten één balwinst zien."
goal: "De 6-0-dekking in het spel: één stapt uit, de rest schuift mee, en samen de bal veroveren."
organization:
  players: "Twee teams van zes en een keeper."
  equipment: "Een bal en hesjes voor één team."
  space: "Een half veld."
rules:
  - "De aanval krijgt vijf aanvallen. Daarna wisselen de teams."
  - "Punten voor de verdediging: 1 voor een aanval zonder doelpunt, 2 voor balwinst."
  - "Na een vrije worp gaat dezelfde aanval verder."
  - "Elke aanval begint bij de middenlijn."
coachingPoints:
  - "Eén stapt uit, de rest schuift mee."
  - "Middenverdedigers: roep elke verschuiving."
  - "Houd de cirkelloper voor je, nooit achter je rug."
  - "Armen omhoog bij elke pass."
  - "Balwinst? Meteen weg voor de break."
mistakes:
  - "De lijn schuift niet mee: naast de uitgestapte verdediger valt een gat."
  - "Twee verdedigers stappen uit naar dezelfde aanvaller."
  - "De hoekverdediger staat te ver naar binnen: de hoek is vrij."
  - "Verdedigers kijken alleen naar de bal en verliezen de cirkelloper."
easier:
  - "De aanval speelt zonder cirkelloper: 5 tegen 6."
  - "De opbouwers mogen niet kruisen."
harder:
  - "De aanval speelt met twee cirkellopers."
  - "De verdediging speelt met een man minder: 6 tegen 5."
  - "Balwinst telt alleen als de bal daarna binnen 5 tellen over de middenlijn is."
related:
  - nl/6-0-defense-basics
  - nl/6-0-defense-against-a-crossing
```

**Verloop**

1. RO krijgt de bal van MO. Zijn verdediger stapt uit en de lijn schuift mee naar zijn kant.
2. RO speelt naar RH. De hoekverdediger stapt naar RH en de lijn schuift door.
3. RH speelt terug naar RO. De halfverdediger onderschept de bal: balwinst.

**Op het bord:** half veld, de opstelling van 6-0-dekking: de basis: LH, LO, MO, RO, RH en CL tegen zes verdedigers zonder label en de keeper (K). De bal begint bij MO.
