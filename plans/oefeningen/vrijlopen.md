# Serie Vrijlopen

Voorstel van 23 november 2026, bij `plans/stap-2-inhoud.md`. Elke tekst is een voorstel tot Kay ja zegt. Hoe je deze bestanden gebruikt staat in `LEESMIJ.md`.

## De serie

```yaml
# content/series/nl/off-the-ball.md
title: "Vrijlopen"
summary: "Aanspeelbaar zijn zonder bal: vrijlopen van je verdediger, passen en doorlopen, lummelen en de cirkelloper aanspelen."
ages: [u14, u16]
items:
  - getting-free-from-your-defender # week 11
  - give-and-go # week 12
  - keep-away-4-on-2 # week 18
  - passing-to-the-pivot # week 25
  - getting-open
```

Spelvorm: aanspeelbaar zijn staat nu op 9 t/m 14 jaar. De serie kan pas live als dat 9 t/m 16 jaar is (startprompt in `plans/stap-2-inhoud.md`).

## Vrijlopen van je verdediger

Week 11 · plek 1 in de serie · slug: `getting-free-from-your-defender`

```yaml
type: drill
title: "Vrijlopen van je verdediger"
category: attack
ages: [u12, u14, u16]
level: basic
summary: "In drietallen: een aanvaller, een verdediger en een aanspeelpunt. De aanvaller loopt eerst weg, draait en sprint terug naar de vrije ruimte. Daar krijgt hij de bal."
goal: "Loskomen van je verdediger met een tempowissel en een verandering van richting, en dan de bal vragen."
organization:
  players: "Groepjes van drie: een aanvaller, een verdediger en een aanspeelpunt."
  equipment: "Een bal en vier pionnen per groepje."
  space: "Per groepje een vak van 8 bij 8 meter; het aanspeelpunt staat erbuiten."
rules:
  - "De verdediger mag de pass onderscheppen, maar houdt de aanvaller niet vast."
  - "Het aanspeelpunt speelt binnen 5 tellen. Lukt dat niet, dan krijgt de verdediger een punt."
  - "De aanvaller vangt de bal binnen het vak."
  - "Na drie beurten draai je door: de aanvaller wordt verdediger, de verdediger wordt aanspeelpunt."
coachingPoints:
  - "Loop eerst weg, kom dan terug."
  - "Wissel van tempo: rustig weg, snel terug."
  - "Vraag de bal met je hand, aan de kant waar je verdediger niet staat."
  - "Aanspeelpunt: speel in de ruimte, voor de loper uit."
  - "Vang in de loop."
mistakes:
  - "De aanvaller rent rondjes in één tempo."
  - "De aanvaller vraagt de bal terwijl zijn verdediger er nog tussen staat."
  - "De aanvaller loopt naar het aanspeelpunt toe en maakt de ruimte klein."
  - "Het aanspeelpunt speelt naar de plek waar de aanvaller stond."
easier:
  - "De verdediger loopt alleen mee en onderschept niet."
  - "Maak het vak groter: 10 bij 10 meter."
harder:
  - "Speel 2 tegen 2 in het vak, met één aanspeelpunt."
  - "Na de vangst speelt de aanvaller terug en loopt zich opnieuw vrij: drie keer achter elkaar."
  - "Maak het vak kleiner: 6 bij 6 meter."
related:
  - nl/getting-open
```

**Verloop**

1. A1 loopt een paar passen weg van de bal. V1 gaat mee.
2. A1 remt af, draait en sprint terug naar de vrije ruimte.
3. Het aanspeelpunt speelt de bal voor A1 uit. A1 vangt in de loop.

**Op het bord:** half veld: vier pionnen in een vierkant van 8 bij 8 meter, A1 en V1 erin, een aanspeelpunt zonder label met de bal erbuiten.

**Ook in deze pull request:** Spelvorm: aanspeelbaar zijn krijgt `nl/getting-free-from-your-defender` bij Zie ook.

## Passen en doorlopen

Week 12 · plek 2 in de serie · slug: `give-and-go`

```yaml
type: drill
title: "Passen en doorlopen"
category: attack
ages: [u12, u14, u16]
level: basic
summary: "De aanvaller speelt de bal af en loopt meteen door, langs zijn verdediger. Hij krijgt de bal terug in de loop en schiet."
goal: "Na je pass meteen doorlopen: wie de bal afgeeft en doorloopt, blijft aanspeelbaar."
organization:
  players: "Groepjes van vier tot zes: een aanspeelpunt (A2), een verdediger en de anderen in een rij, en een keeper."
  equipment: "Een bal per speler in de rij."
  space: "Een half veld: de rij staat op 11 meter, A2 op 9 meter opzij en de verdediger op 8 meter."
rules:
  - "De verdediger kijkt de bal na en loopt niet mee met A1."
  - "A2 speelt de bal terug binnen 2 tellen."
  - "Na elke beurt draai je door: A1 wordt A2, A2 wordt verdediger en de verdediger sluit aan bij de rij."
coachingPoints:
  - "Speel en start in één beweging."
  - "Loop door zodra je verdediger naar de bal kijkt."
  - "Ga dicht langs je verdediger."
  - "Vraag de bal met je hand."
  - "A2: speel voor de loper uit, niet op zijn lichaam."
  - "Vang in de loop en schiet zonder af te remmen."
mistakes:
  - "Wie de bal heeft afgespeeld, blijft staan kijken."
  - "De loper gaat in een wijde boog om de verdediger heen."
  - "De pass terug komt achter de loper."
  - "De loper kijkt niet om en mist de bal."
easier:
  - "Zet een pion neer in plaats van een verdediger."
  - "A2 houdt de bal vast tot de loper langs de verdediger is."
harder:
  - "De verdediger mag meelopen met A1: doet hij dat, dan gaat A2 zelf."
  - "De pass terug komt met een stuit."
  - "Een aanspeelpunt aan beide kanten: A1 kiest."
related:
  - nl/getting-open
  - nl/getting-free-from-your-defender
```

**Verloop**

1. A1 speelt naar A2 en loopt meteen door, dicht langs V1.
2. A2 speelt de bal terug, voor A1 uit.
3. A1 vangt in de loop en schiet op doel.

**Op het bord:** half veld: de keeper (K), A1 op 11 meter met A3 achter hem, A2 op 9 meter opzij, V1 op 8 meter voor A1, twee ballen bij de rij.

## Lummelen: 4 tegen 2

Week 18 · plek 3 in de serie · slug: `keep-away-4-on-2`

```yaml
type: drill
title: "Lummelen: 4 tegen 2"
category: attack
ages: [u12, u14, u16]
level: basic
summary: "Vier spelers om een vak spelen de bal rond, twee lummels in het vak proberen hem te raken. Wie de bal niet heeft, loopt langs zijn lijn uit de dekking."
goal: "Snel kiezen en aanspeelbaar zijn: de balbezitter moet altijd naar twee kanten kunnen spelen."
organization:
  players: "Groepen van zes: vier om het vak, twee lummels erin."
  equipment: "Een bal en vier pionnen per groep."
  space: "Per groep een vak van 6 bij 6 meter."
rules:
  - "De vier staan elk aan een zijde van het vak en blijven erbuiten. De lummels blijven erin."
  - "Raakt een lummel de bal, dan wisselt hij met de speler die de bal speelde."
  - "Houd de bal hoogstens 3 tellen vast. Niet dribbelen."
  - "Tien passes achter elkaar is een punt voor de vier."
coachingPoints:
  - "Zonder bal: loop langs je lijn tot de balbezitter je kan aanspelen."
  - "Kijk voordat je de bal krijgt: waar speel je hem heen?"
  - "Maak een schijnpass als een lummel dichtbij is."
  - "Speel strak, op borsthoogte."
  - "Lummels: één gaat naar de bal, de ander staat in de passlijn."
mistakes:
  - "Spelers blijven staan, verstopt achter een lummel."
  - "De balbezitter houdt de bal te lang vast."
  - "Een boogbal over de lummels heen: die is te lang onderweg."
  - "De twee lummels jagen allebei op de bal."
easier:
  - "Speel 4 tegen 1."
  - "Maak het vak groter: 8 bij 8 meter."
harder:
  - "Maak het vak kleiner: 5 bij 5 meter."
  - "Houd de bal hoogstens 2 tellen vast."
  - "Speel alleen met een stuit."
related:
  - nl/getting-open
  - nl/passing-in-a-square
```

**Verloop**

1. A1 heeft de bal. V1 stapt naar hem toe, V2 staat in de passlijn naar A3.
2. A2 loopt langs zijn lijn uit de dekking. A1 speelt hem aan.
3. V1 en V2 schuiven naar A2. A4 loopt zich alvast vrij voor de volgende pass.

**Op het bord:** half veld: vier pionnen in een vierkant van 6 bij 6 meter, A1 tot en met A4 elk aan een zijde, V1 en V2 erin, één bal bij A1.

## De cirkelloper aanspelen

Week 25 · plek 4 in de serie · slug: `passing-to-the-pivot`

```yaml
type: drill
title: "De cirkelloper aanspelen"
category: attack
ages: [u14, u16, u18]
level: intermediate
summary: "Een opbouwer valt aan en trekt een verdediger naar zich toe. Dan speelt hij de bal met een stuit langs hem naar de cirkelloper, die draait en schiet."
goal: "De cirkelloper aanspelen: eerst een verdediger naar je toe trekken, dan de bal langs hem spelen."
organization:
  players: "Groepjes van vijf: een opbouwer, een cirkelloper, twee verdedigers en een keeper."
  equipment: "Een bal per opbouwer."
  space: "Het midden van een half veld, tussen de 6 en de 10 meter."
rules:
  - "De pass naar de cirkelloper gaat met een stuit of op heuphoogte, langs de verdediger."
  - "Stapt V1 niet uit, dan schiet de opbouwer zelf."
  - "V2 verdedigt de cirkelloper van achteren en houdt hem niet vast."
  - "Na vijf beurten draai je door: de opbouwer wordt cirkelloper."
coachingPoints:
  - "Opbouwer: dreig eerst zelf, speel dan pas."
  - "Opbouwer: speel met een stuit, langs het been van je verdediger."
  - "Cirkelloper: sta breed en houd je verdediger achter je."
  - "Cirkelloper: vraag de bal met de hand die het verst van je verdediger is."
  - "Vang met twee handen, draai en schiet in één beweging."
mistakes:
  - "De opbouwer speelt zonder eerst te dreigen: de verdediger staat ertussen."
  - "De pass is te hoog en wordt onderschept."
  - "De cirkelloper loopt weg van zijn plek als de bal komt."
  - "De cirkelloper staat bij het vangen in het doelgebied."
easier:
  - "Zonder V2: de cirkelloper staat vrij."
  - "V1 stapt altijd uit."
harder:
  - "V1 kiest: uitstappen naar de opbouwer of terugzakken naar de cirkelloper."
  - "De cirkelloper zet eerst een sper en draait dan weg naar het doel."
  - "Twee opbouwers: wie zijn verdediger naar zich toe trekt, speelt de cirkelloper aan."
related:
  - nl/crossing-cb-lb-with-screen
  - nl/goalkeeper-shots-from-the-line
  - nl/getting-open
```

**Verloop**

1. CL staat aan de 6 meter, met zijn rug tegen V2, en vraagt de bal met zijn hand.
2. MO loopt met de bal op het doel af. V1 stapt naar hem uit.
3. MO speelt de bal met een stuit langs V1 naar CL.
4. CL vangt, draait weg van V2 en schiet op doel.

**Op het bord:** half veld: de keeper (K), CL aan de 6 meter met V2 achter hem, V1 op 7 meter voor MO, MO op 11 meter met de bal. De pass is de pijl Stuit.

**Ook in deze pull request:** Keeper: schoten van de cirkel krijgt `nl/passing-to-the-pivot` bij Zie ook.
