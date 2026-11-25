# Serie Keepen

Voorstel van 23 november 2026, bij `plans/stap-2-inhoud.md`. Elke tekst is een voorstel tot Kay ja zegt. Hoe je deze bestanden gebruikt staat in `LEESMIJ.md`.

## De serie

```yaml
# content/series/nl/goalkeeping.md
title: "Keepen"
summary: "Vijf oefeningen voor de keeper: je plek kiezen, schoten uit de hoek en van de cirkel, samenwerken met het blok en de break starten."
ages: [u14, u16]
items:
  - goalkeeper-shots-from-three-spots
  - goalkeeper-wing-shots # week 7
  - goalkeeper-shots-from-the-line # week 24
  - goalkeeper-and-block # week 17
  - goalkeeper-starting-the-fast-break # week 8
position: 6
```

## Keeper: schoten uit de hoek

Week 7 · plek 2 in de serie · slug: `goalkeeper-wing-shots`

```yaml
type: drill
title: "Keeper: schoten uit de hoek"
category: goalkeeping
ages: [u12, u14, u16, u18, senior]
level: basic
summary: "Schutters springen vanuit de hoek naar binnen en schieten. De keeper staat bij de korte paal, stapt mee en blijft groot tot het schot."
goal: "Bij een schot uit de hoek de korte hoek dichthouden en groot blijven tot de bal weg is."
organization:
  players: "Een keeper, een rij in de linkerhoek en een aanspeelpunt op de plek van LO."
  equipment: "Een bal per schutter."
  space: "Een half veld."
rules:
  - "De schutter springt naar binnen en schiet pas in de sprong."
  - "Na vijf schoten krijgt de keeper 30 seconden rust."
  - "Wissel na twee rondes van hoek."
coachingPoints:
  - "Sta bij de korte paal, een stap voor de lijn."
  - "Maak je groot: armen omhoog, niet door je knieën zakken."
  - "Stap mee met de schutter, met kleine passen."
  - "Blijf staan tot de bal de hand verlaat."
  - "De verre hoek: stap uit met je been en breng je hand erbij."
mistakes:
  - "De keeper staat te ver van de korte paal: de korte hoek is open."
  - "De keeper gaat zitten voordat het schot komt."
  - "De keeper komt te ver uit en de bal gaat in een boog over hem heen."
  - "De keeper draait zijn schouder weg van de bal."
easier:
  - "De schutter zegt vooraf: korte hoek of verre hoek."
  - "Schoten op halve kracht."
harder:
  - "De schutter mag met een boogbal schieten."
  - "Direct na het schot uit de hoek volgt een schot uit het midden."
  - "De schutter kiest pas in de lucht."
related:
  - nl/wing-shot
  - nl/goalkeeper-shots-from-three-spots
```

**Verloop**

1. De keeper staat bij de korte paal, een stap voor de lijn. LH krijgt de bal en loopt aan.
2. LH springt naar binnen. De keeper stapt mee en blijft tussen de bal en het doel.
3. LH schiet. De keeper blijft groot tot de bal weg is en redt met zijn arm of zijn been.

**Op het bord:** half veld, de opstelling van Schieten uit de hoek: de keeper (K) bij de linkerpaal, LH in de linkerhoek met twee spelers achter hem, een aanspeelpunt zonder label op de plek van LO, twee ballen.

**Ook in deze pull request:** Schieten uit de hoek krijgt `nl/goalkeeper-wing-shots` bij Zie ook.

## Keeper: schoten van de cirkel

Week 24 · plek 3 in de serie · slug: `goalkeeper-shots-from-the-line`

```yaml
type: drill
title: "Keeper: schoten van de cirkel"
category: goalkeeping
ages: [u12, u14, u16, u18, senior]
level: intermediate
summary: "De cirkelloper krijgt de bal aan de 6 meter, draait en schiet van dichtbij. De keeper komt uit en maakt zich groot."
goal: "Bij een schot van dichtbij uitkomen en je groot maken, in plaats van op de doellijn te wachten."
organization:
  players: "Een keeper, een cirkelloper en twee aanspeelpunten."
  equipment: "Vier ballen."
  space: "Het doelgebied en de ruimte tot de 9 meter."
rules:
  - "De cirkelloper schiet binnen 2 tellen na het vangen."
  - "Niet op het hoofd schieten: mik op de hoeken."
  - "De aanspeelpunten spelen om en om, van links en van rechts."
  - "Na vijf schoten wisselt de cirkelloper."
coachingPoints:
  - "Kom uit zodra de cirkelloper de bal vangt."
  - "Sta stil op het moment van het schot."
  - "Maak je breed: armen en benen wijd."
  - "Blijf op je voeten en kijk naar de bal."
  - "Na de redding: meteen terug naar je doel."
mistakes:
  - "De keeper blijft op de doellijn staan."
  - "De keeper komt te laat uit en loopt nog als het schot komt."
  - "De keeper draait zijn hoofd weg."
  - "De keeper springt voordat de cirkelloper schiet."
easier:
  - "De cirkelloper schiet uit stand, zonder te draaien."
  - "Schoten op halve kracht."
harder:
  - "De cirkelloper mag een schijnschot maken."
  - "De cirkelloper springt naar links of naar rechts weg."
  - "Een verdediger hindert de cirkelloper."
related:
  - nl/goalkeeper-wing-shots
  - nl/goalkeeper-shots-from-three-spots
```

**Verloop**

1. Het aanspeelpunt speelt CL aan. CL staat aan de 6 meter, met zijn rug naar het doel.
2. CL draait naar het doel. De keeper komt twee passen uit, naar de bal toe.
3. CL schiet. De keeper staat stil en maakt zich breed: armen en benen wijd.

**Op het bord:** half veld: de keeper (K), CL aan de 6 meter recht voor het doel, twee aanspeelpunten zonder label op 10 meter, links en rechts, elk met een bal.

## Keeper en blok

Week 17 · plek 4 in de serie · slug: `goalkeeper-and-block`

```yaml
type: drill
title: "Keeper en blok"
category: goalkeeping
ages: [u14, u16, u18, senior]
level: intermediate
summary: "Een schutter van afstand tegen een blokker en een keeper. Het blok dekt de kant van de werparm, de keeper neemt de andere hoek. Zo is het doel samen dicht."
goal: "Samenwerken: het blok dekt één hoek van het doel af, de keeper neemt de andere."
organization:
  players: "Groepjes van vier: een keeper, een blokker, een schutter en een aanspeelpunt."
  equipment: "Twee ballen per groepje."
  space: "Een baan van 5 meter breed voor het doel; de blokker staat op 7 meter."
rules:
  - "Keeper en blokker spreken het vooraf af: het blok neemt de kant van de werparm."
  - "De schutter schiet van achter de 9 meter en breekt niet door."
  - "Een redding of een geblokte bal is een punt voor de verdediging. Een doelpunt is een punt voor de schutter."
  - "Wissel na vijf schoten: de schutter wordt blokker."
coachingPoints:
  - "Blokker: armen omhoog en naast elkaar, zonder gat ertussen."
  - "Blokker: spring pas als de schutter springt."
  - "Keeper: vertrouw op het blok en blijf in je eigen hoek."
  - "Keeper: zie je de bal niet, stap dan opzij tot je hem ziet."
  - "Keeper: praat met je blokker en zeg waar hij moet staan."
mistakes:
  - "De keeper staat achter het blok en ziet de bal niet."
  - "Het blok laat een gat tussen de armen."
  - "De blokker draait zijn hoofd weg en laat zijn armen zakken."
  - "De keeper gokt op de hoek van het blok."
easier:
  - "De schutter schiet uit stand."
  - "De schutter schiet alleen in de hoek van de keeper."
harder:
  - "De schutter mag een pas opzij zetten."
  - "Twee blokkers, en schoten van LO, MO en RO."
  - "De schutter mag een schijnschot maken."
related:
  - nl/shooting-past-a-block
  - nl/goalkeeper-shots-from-three-spots
```

**Verloop**

1. A1 loopt aan met de bal. De blokker stapt uit, aan de kant van de werparm van A1.
2. Het blok dekt de hoek achter zijn armen. De keeper stapt naar de andere hoek.
3. A1 schiet langs het blok. De keeper redt in zijn eigen hoek.

**Op het bord:** half veld, dezelfde opstelling als Schieten langs een blok: de keeper (K), een blokker zonder label op 7 meter, A1 op 11 meter, een aanspeelpunt zonder label opzij met de bal.

## Keeper: de break starten

Week 8 · plek 5 in de serie · slug: `goalkeeper-starting-the-fast-break`

```yaml
type: drill
title: "Keeper: de break starten"
category: goalkeeping
ages: [u12, u14, u16, u18, senior]
level: basic
summary: "Na een redding pakt de keeper de bal en speelt hem diep naar een loper die al onderweg is. Zo begint de break bij de keeper."
goal: "Na een redding de bal snel pakken en de break starten met een lange pass voor de loper uit."
organization:
  players: "Een keeper, een schutter en een rij lopers in de hoek."
  equipment: "Een bal per schot en twee reserveballen naast het doel."
  space: "Een half veld: de loper vangt de bal bij de middenlijn."
rules:
  - "De loper start op het moment van het schot."
  - "De keeper speelt binnen 3 tellen na de redding."
  - "Vangt de loper de bal in de loop, dan is dat een punt voor het tweetal."
  - "Ligt de bal te ver weg, dan pakt de keeper een reservebal."
coachingPoints:
  - "Pak eerst de bal, kijk dan."
  - "Kijk waar de loper is en waar een verdediger kan staan."
  - "Speel de bal voor de loper uit, niet op zijn lichaam."
  - "Stap in met het been tegenover je werparm."
  - "Is diep niet vrij, speel dan kort."
mistakes:
  - "De keeper kijkt de bal na in plaats van hem te pakken."
  - "De pass komt achter de loper: hij moet afremmen."
  - "De boog is te hoog: een verdediger is op tijd terug."
  - "De keeper speelt altijd diep, ook als er iemand tussen staat."
easier:
  - "De loper start op de 9 meter."
  - "De keeper begint met de bal in zijn hand."
harder:
  - "Twee lopers, links en rechts: de keeper kiest wie vrij is."
  - "Een verdediger loopt mee met de loper."
  - "Met twee doelen: de loper rondt af aan de overkant."
related:
  - nl/fast-break-1-on-1
  - nl/fast-break-second-wave
  - nl/goalkeeper-shots-from-three-spots
```

**Verloop**

1. A1 schiet van de 9 meter. De keeper redt en pakt de bal.
2. Bij het schot start A2 in de hoek. Hij sprint langs de zijlijn naar de middenlijn.
3. De keeper speelt de bal met een lange pass voor A2 uit. A2 vangt in de loop.

**Op het bord:** half veld: de keeper (K), A1 als schutter op 9 meter met een bal, A2 in de linkerhoek met A3 achter hem. De pijlen van A2 en van de lange pass lopen naar de middenlijn.
