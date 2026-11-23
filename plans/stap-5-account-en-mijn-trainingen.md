# Stap 5: Account en Mijn trainingen

Live op zondag 28 maart 2027. Vijf delen, elk met een eigen branch en pull request. `main` werkt na elke merge.

Nagekeken op 23 november 2026: de code op `main` (`abd9470`) en de documentatie van Laravel 13, Laravel Cloud en Resend. Dit plan is geschreven voordat stap 4 is gebouwd. Leg het vóór de start naast wat stap 4 heeft opgeleverd. Alle voorstellen en teksten gelden pas na Kays ja.

## Doel

Een trainer maakt een account met een e-mailadres en een wachtwoord. Hij bewaart oefeningen in een eigen training, vinkt af wat hij heeft gedaan en kan zijn account met alles erin verwijderen. Lezen blijft zonder account en zonder cookie.

## Wat de starterkit nu doet

- De tabel `users` heeft een verplichte naam. `AGENTS.md` staat alleen een e-mailadres en een wachtwoord toe.
- De accountpagina's zijn Engels en staan buiten `/nl` (`/login`, `/settings/profile`). Na inloggen ga je naar `/dashboard`, met de zijbalk van de starterkit.
- Sessies staan in de database, met per rij een IP-adres en een browser (`SESSION_DRIVER=database`).
- Mail gaat naar het log (`MAIL_MAILER=log`): de bevestigingsmail en de herstelmail komen nergens aan.
- Een account verwijderen kan alleen met een bevestigd e-mailadres (`routes/settings.php`).
- In productie vraagt de starterkit een wachtwoord van 12 tekens met hoofdletter, cijfer en symbool, en vraagt hij haveibeenpwned.com of het gelekt is.
- Registratie is uit sinds commit `77ff51c`.

## Aanpak

| Deel | Wat | Wie |
|---|---|---|
| A | Accounts onder `/nl`: zonder naam, met een schakelaar | Claude Code |
| B | Nederlands en mail | Kay keurt de tekst goed, koppelt Resend en zet de DNS; Claude Code bouwt |
| C | Datamodel van Mijn trainingen | Kay schrijft het datamodel, Claude Code de tests en de review |
| D | De pagina's: bewaren, afvinken, beheren | Kay schrijft de eerste versie, Claude Code de tests, de review en de afwerking |
| E | Privacy, verwijderen, back-up en vrijgave | Claude Code, Kay controleert live |

**A. Accounts onder `/nl`.** Registratie komt terug met een revert van `77ff51c`, achter een schakelaar in de omgeving. Die staat in productie uit tot deel E, want `main` gaat bij elke merge live. Alle accountroutes krijgen `/nl` ervoor (`prefix` in `config/fortify.php` en de routes in `routes/settings.php`). De naam verdwijnt uit de tabel, de formulieren en de code. Het dashboard vervalt: na inloggen ga je tot deel D naar `/nl`. Een account verwijderen kan ook zonder bevestigd adres. Registreren krijgt een rem, zodat een bot geen bevestigingsmails naar vreemde adressen laat sturen.

**B. Nederlands en mail.** De teksten staan in de pagina's zelf. De mails en de meldingen uit PHP komen in `lang/nl.json`, de validatie in `lang/nl/`, alleen voor de regels die de formulieren gebruiken. Geen vertaalpakket. Mail gaat via Resend, de enige maildienst die Laravel Cloud zelf beheert: Kay koppelt het account en zet de DNS-records, Cloud zet de sleutel en `MAIL_MAILER=resend` in de omgeving. Dat kan al in december; de controle van de DNS kan tot 72 uur duren.

**C. Datamodel.** Voorstel; Kay schrijft de migraties en de modellen zelf.

- `trainings`: `user_id` en `title`. Verdwijnt met het account.
- `training_exercise`: `training_id`, `exercise_id`, `position` en `done_at`. Uniek op training en oefening. Verdwijnt met de training.

Alleen de eigenaar ziet een training; voor ieder ander bestaat ze niet (404). Een oefening die stap 4 heeft gearchiveerd blijft in de training staan, met haar titel en zonder link.

**D. Pagina's.** Achter inloggen en een bevestigd e-mailadres:

- `/nl/trainings`: Mijn trainingen, met een formulier voor een nieuwe.
- `/nl/trainings/{training}`: de oefeningen in volgorde, elk met afvinken en een link naar de oefening; de training hernoemen en verwijderen.
- `/nl/trainings/add/{oefening}`: een oefening bewaren in een bestaande of een nieuwe training.

Een publieke pagina hoeft niet te weten wie er is ingelogd (zie voorstel 1 in de aanvulling van het plan van stap 4). Ze krijgt twee gewone links: naar Mijn trainingen in de kop, en naar het bewaren op elke oefening. Wie niet is ingelogd komt eerst op de inlogpagina en daarna op de pagina die hij wilde. De accountpagina's krijgen de kop van de publieke pagina's, niet de zijbalk van de starterkit.

Formulieren blijven gewone HTML-formulieren met `action` en `method`. Laravel 13 laat een formulier van dezelfde herkomst over https toe zonder token. Inloggen, bewaren en afvinken horen dus ook te werken als JavaScript uit staat of nog niet geladen is. Een browsertest bewijst dat; lukt het niet, dan krijgt elk formulier het token als verborgen veld.

**E. Privacy, verwijderen, back-up en vrijgave.** De privacypagina krijgt de tekst over accounts. Een test bewijst dat na het verwijderen van een account geen tabel nog een rij heeft met het id of het e-mailadres. De test zoekt de tabellen zelf op, zodat een nieuwe tabel niet vergeten wordt. Onbevestigde accounts vervallen na 7 dagen, met een taak die elke dag draait. De herstelgeschiedenis van de database gaat van 1 dag naar 7 dagen, en Kay probeert één keer een herstel. Dan gaat de schakelaar aan.

## Tekst ter goedkeuring

Nieuwe tekst is eerst van Kay. Claude in de chat levert vóór deel B één lijst, `plans/stap-5-teksten.md`: elke tekst van de accountpagina's, de twee mails en de foutmeldingen. Vóór deel E volgt de privacytekst, in de opbouw van de privacypagina van het Coachboard. Die tekst zegt:

- wie de site beheert en hoe je hem bereikt;
- lezen: geen account en geen cookie. De host verwerkt je IP-adres om de pagina te leveren en bewaart logregels één dag (het plan Starter van Laravel Cloud);
- account: je e-mailadres, je wachtwoord als hash, en je trainingen: de titels die je zelf typt en de oefeningen erin. We bewaren ze om je trainingen te tonen, en om geen andere reden;
- cookies zodra je de inlogpagina opent. Ze zijn nodig om in te loggen en ingelogd te blijven, dus er is geen cookiemelding, maar we noemen ze wel;
- mail: Resend verstuurt de bevestigingsmail en de herstelmail vanuit Ierland en bewaart 30 dagen wat er verstuurd is;
- hoe lang: tot je je account verwijdert, en daarna nog hoogstens 7 dagen in de herstelgeschiedenis. Een onbevestigd account vervalt na 7 dagen;
- je rechten: inzien, verbeteren en verwijderen, en een klacht bij de Autoriteit Persoonsgegevens;
- wat we niet doen: geen naam, geen statistiek in de pagina, niets doorverkopen.

Dit is geen juridisch advies. Laat de tekst nalezen als je twijfelt.

## Risico's

- **Mail komt niet aan.** Zonder mail kan niemand zijn adres bevestigen. Gratis Resend stopt bij 100 mails per dag en 3.000 per maand. Zet de DNS daarom vroeg, en houd "Stuur opnieuw" op de pagina over bevestigen.
- **De link in de mail.** De bevestigingslink is ondertekend en gebruikt `APP_URL`. Staat die op het adres van Laravel Cloud, of ziet Laravel het verzoek achter de rand niet als https, dan werkt de link niet. Kay test de route daarom live in deel B, niet pas bij de vrijgave.
- **Registratie te vroeg open.** Daarom de schakelaar, met een test voor beide standen.
- **Verwijderen laat iets achter.** Een nieuwe tabel met `user_id` zonder cascade bewaart gegevens van een verwijderd account. De test van deel E vraagt de tabellen daarom op uit het schema.
- **Jonge trainers.** Een jeugdtrainer kan zelf minderjarig zijn. We vragen alleen een e-mailadres. Schrijf de privacytekst zo dat een veertienjarige hem begrijpt.
- **Vroeg geschreven.** De startprompts gaan uit van de code van 23 november. Na stap 4 staan er pagina's, een layout en tabellen bij.

## Jij beslist

- **Maildienst.** Voorstel: Resend via Laravel Cloud, verzonden vanuit Ierland (`eu-west-1`). Gratis tot 3.000 mails per maand. Het vraagt één dependency, `resend/resend-php`; Claude Code legt versie en grootte voor. Het alternatief zonder dependency is SMTP, dat Laravel zelf meebrengt; dan stel je de dienst met de hand in.
- **Afzender.** Voorstel: een eigen subdomein voor mail, zoals Laravel Cloud aanraadt: `mail.handballcoachboard.com`, met antwoorden naar `contact@handballcoachboard.com`. De naam van de afzender is de naam van de site. Die is nog een werktitel en hoort bij de paginatitels van stap 4.
- **Sessies.** Voorstel: in een cookie (`SESSION_DRIVER=cookie`, ook als standaard in `config/session.php`). De database bewaart dan geen IP-adres en geen browser. De prijs: uitloggen maakt een gestolen cookie niet meteen ongeldig; hij verloopt na hoogstens twee uur. Anders blijven sessies in de database en noemt de privacytekst het IP-adres. Kijk in beide gevallen wat er nu bij de variabelen van de omgeving staat.
- **Wachtwoord.** Voorstel: minstens 12 tekens en geen eisen aan soorten tekens: lengte telt, en op een telefoon struikel je over symbolen. De controle op gelekte wachtwoorden blijft. Laravel doet die met k-anonimiteit: er gaat een stuk van een hash naar haveibeenpwned.com, niet het wachtwoord.
- **Bevestigen.** Voorstel: bewaren kan pas na het bevestigen van je e-mailadres, en een onbevestigd account vervalt na 7 dagen. Daarvoor gaat de Scheduler van Laravel Cloud aan. Die wekt de omgeving alleen als een taak aan de beurt is.
- **Licht en donker.** Voorstel: de pagina Appearance vervalt. Het is een pagina minder om te vertalen en te testen, en de tekeningen hebben vaste kleuren.
- **Grenzen en volgorde.** Voorstel: hoogstens 50 trainingen per account, 20 oefeningen per training en een titel van 60 tekens. Oefeningen staan in de volgorde van toevoegen, met Omhoog en Omlaag als gewone knoppen. Slepen is Later.
- **URL's.** Voorstel: Engels, zoals de series: `/nl/login`, `/nl/register`, `/nl/trainings`, `/nl/settings/…` en `/nl/privacy`.
- **Back-up.** Voorstel: 7 dagen herstelgeschiedenis. Laravel Cloud rekent de geschiedenis als opslag. Een herstel maakt een nieuw cluster; het oude blijft staan.
- **Verwerkers.** Laravel Cloud (met Cloudflare, AWS en Neon) en Resend verwerken gegevens voor jou. Leg hun verwerkersovereenkomsten vast; begin voor Laravel bij trust.laravel.com.

## Klaar als

- [ ] Registreren, bevestigen via de mail, inloggen, wachtwoord herstellen en uitloggen werken live, in het Nederlands, onder `/nl`.
- [ ] Een trainer maakt een training, bewaart er vanaf een oefening die oefening in, vinkt haar af en verwijdert de training.
- [ ] Een ander account krijgt op die training 404.
- [ ] Een account is een e-mailadres en een wachtwoord: de kolom `name` bestaat niet meer.
- [ ] Na het verwijderen van een account heeft geen tabel nog een rij met het id of het e-mailadres. Een test bewijst het.
- [ ] De publieke pagina's zetten nog steeds geen cookie, als Kay voorstel 1 van stap 4 heeft overgenomen.
- [ ] De privacypagina staat live met de goedgekeurde tekst. De registratiepagina en de voet van elke pagina linken ernaar.
- [ ] De browsertest op telefoonformaat loopt de hele route, ook met JavaScript uit, met een toegankelijkheidscontrole per paginatype.
- [ ] Kay heeft één herstel van de database geprobeerd.
- [ ] Kay heeft elke diff gelezen, de tekst goedgekeurd en gemerged.

## Startprompts

Controleer elke prompt vóór gebruik tegen wat stap 4 en de vorige sessie hebben opgeleverd.

### Deel A: accounts onder /nl

```text
Lees AGENTS.md en plans/stap-5-account-en-mijn-trainingen.md. Werk alleen aan deel A, op de branch
step-5a-accounts.

Doel: de accounts van de starterkit passen bij onze regels. Nog geen Nederlandse tekst en geen mail: dat is
deel B.

Doe dit in deze volgorde, elk in een eigen commit, met composer ci:check groen vóór elke commit:
1. Revert commit 77ff51c: registratie komt terug. Los conflicten op en houd de tests van de starterkit.
2. Zet registratie achter een schakelaar in de omgeving (voorstel: REGISTRATION_OPEN, standaard uit). Uit
   betekent: de registratiepagina en het registreren geven 404, en de inlogpagina linkt er niet naar.
   Fortify legt zijn routes vast bij het opstarten: kies een vorm die je in één testrun in beide standen
   kunt testen, en leg die eerst voor.
3. Zet alle accountroutes onder /nl: prefix in config/fortify.php en de routes in routes/settings.php. Het
   dashboard vervalt, met zijn route, pagina en test; home in config/fortify.php wijst tot deel D naar /nl.
   Een test bewaakt dat elke route met /nl begint, en noemt de uitzonderingen (zoals / en /up) bij naam.
4. Haal de naam weg: een nieuwe migratie die de kolom name verwijdert, CreateNewUser,
   ProfileValidationRules, het model, de factory, de formulieren, de types en elke plek die de naam toont
   (toon daar het e-mailadres). Zoek daarna in de hele repo naar wat nog naar de naam van een gebruiker
   verwijst.
5. Een account verwijderen kan ook zonder bevestigd e-mailadres: haal profile.destroy uit de groep verified
   en schrijf de test.
6. Wat Kay heeft gekozen bij "Jij beslist": de sessie (bij een cookie: .env.example, de standaard in
   config/session.php en een test dat inloggen geen rij in sessions schrijft), de wachtwoordregels in
   AppServiceProvider met een test, en de pagina Appearance.
7. Een rem op registreren: hoogstens tien per IP-adres per uur. Test de elfde.

Regels: geen nieuwe dependency; niets wijzigen in coachboard/; groeit het werk buiten deze lijst, stop en
meld het. Lees je eigen diff na en open de pull request: wat, waarom, hoe te testen, risico's, en wat je
niet hebt kunnen testen.
```

### Deel B: Nederlands en mail

```text
Lees AGENTS.md en plans/stap-5-account-en-mijn-trainingen.md. Werk alleen aan deel B, op de branch
step-5b-dutch-mail.

Kay heeft de teksten goedgekeurd in plans/stap-5-teksten.md. Neem ze letterlijk over. Ontbreekt een tekst,
vraag hem dan: verzin er geen.

1. Zet de goedgekeurde tekst in de accountpagina's: inloggen, registreren, wachtwoord vergeten en
   herstellen, e-mailadres bevestigen, en de instellingen (e-mailadres, wachtwoord, account verwijderen).
2. Maak lang/nl.json voor wat uit PHP komt: de meldingen en de twee mails van Laravel (bevestigen en
   wachtwoord herstellen). Maak lang/nl/ voor validatie, auth en passwords, alleen met de regels die deze
   formulieren gebruiken. Lees in de documentatie van Laravel 13 hoe vertaalbestanden werken. Geen
   vertaalpakket.
3. Schrijf per formulier een test: elke foutmelding die het kan geven is de goedgekeurde Nederlandse
   tekst. Schrijf per mail een test: onderwerp, tekst en knop zijn Nederlands, en de link begint met
   APP_URL.
4. Mail: Laravel Cloud zet MAIL_MAILER=resend en RESEND_API_KEY in de omgeving zodra Kay Resend koppelt.
   De transport van Laravel vraagt het pakket resend/resend-php. Leg eerst voor: naam, versie, grootte,
   reden en het alternatief zonder (SMTP). Wacht op Kays ja. .env.example blijft op log.
5. Schrijf voor Kay op wat hij in Laravel Cloud en bij zijn DNS doet, volgens de documentatie van Laravel
   Cloud over e-mail: Resend koppelen, het verzenddomein met regio eu-west-1, de DNS-records, de afzender,
   en APP_URL op het eigen domein.

Kay test daarna live met zijn eigen adres, met de schakelaar kort aan: registreren, de mail, de link.
Lees je eigen diff na en open de pull request: wat, waarom, hoe te testen, risico's, en wat je niet hebt
kunnen testen.
```

### Deel C, sessie 1: tests voor het datamodel

```text
Lees AGENTS.md en plans/stap-5-account-en-mijn-trainingen.md. Werk alleen aan deel C, sessie 1, op de branch
step-5c-trainings.

Doel: tests die nu nog falen. Kay schrijft daarna zelf de migraties, de modellen en de policy.

1. Schrijf tests voor de modellen: een gebruiker heeft trainingen; een training geeft haar oefeningen in
   volgorde, met per oefening of ze is afgevinkt; dezelfde oefening kan niet twee keer in één training; een
   gearchiveerde oefening blijft in de training.
2. Schrijf tests voor wat verdwijnt: met de gebruiker verdwijnen zijn trainingen, met een training haar
   regels. Een oefening verdwijnt nooit door een training.
3. Schrijf tests voor de policy: alleen de eigenaar mag een training zien, wijzigen en verwijderen.
4. Schrijf tests voor de grenzen die Kay heeft gekozen: trainingen per gebruiker, oefeningen per training
   en de lengte van de titel.
5. Schrijf voor Kay op, in het Nederlands: welke migraties, modellen en policy de tests verwachten, en waar
   in de documentatie van Laravel hij foreign keys met cascade, een koppeltabel met extra kolommen en
   policies vindt.

Schrijf zelf geen migraties, modellen of policy. Stop na punt 5.
```

### Deel C, sessie 2: review van het datamodel

```text
Lees AGENTS.md en plans/stap-5-account-en-mijn-trainingen.md. Werk alleen aan deel C, sessie 2, op de branch
step-5c-trainings.

Kay heeft de migraties, de modellen en de policy geschreven.

1. Review zijn code: leg uit wat beter kan en waarom. Pas alleen aan wat hij goedkeurt.
2. Controleer dat alle tests van sessie 1 slagen, op PostgreSQL, lokaal en in CI.
3. Lees je eigen diff na en open de pull request: wat, waarom, hoe te testen, risico's, en wat je niet hebt
   kunnen testen.
```

### Deel D, sessie 1: tests voor de pagina's

```text
Lees AGENTS.md en plans/stap-5-account-en-mijn-trainingen.md. Werk alleen aan deel D, sessie 1, op de branch
step-5d-pages.

Doel: tests die nu nog falen. Kay schrijft daarna zelf de routes, de controllers en de eerste versie van de
pagina's.

1. Schrijf tests voor de routes onder /nl/trainings: de lijst toont alleen eigen trainingen; een training
   maken, hernoemen en verwijderen; een oefening bewaren in een bestaande en in een nieuwe training;
   afvinken en terugzetten; een oefening uit een training halen; een oefening omhoog en omlaag zetten.
   Voor elke route: een gast gaat naar de inlogpagina, een onbevestigd account naar de pagina over
   bevestigen, en de training van een ander geeft 404.
2. Schrijf tests voor de publieke pagina's: de kop linkt naar Mijn trainingen en elke oefening naar het
   bewaren, als gewone links. Zetten de publieke pagina's sinds stap 4 geen cookie, dan blijft dat zo.
3. Na inloggen kom je op de pagina die je wilde, en anders op Mijn trainingen (home in config/fortify.php).
4. Schrijf voor Kay op, in het Nederlands: welke routes, controllers en pagina's de tests verwachten, welke
   props elke pagina krijgt, en hoe een formulier van Inertia met de helpers van Wayfinder ook zonder
   JavaScript werkt.

Schrijf zelf geen routes, controllers of pagina's. Stop na punt 4.
```

### Deel D, sessie 2: review, afwerking en browsertests

```text
Lees AGENTS.md en plans/stap-5-account-en-mijn-trainingen.md. Werk alleen aan deel D, sessie 2, op de branch
step-5d-pages.

Kay heeft de routes, de controllers en de eerste versie van de pagina's geschreven.

1. Review zijn code: leg uit wat beter kan en waarom. Pas alleen aan wat hij goedkeurt.
2. Werk de pagina's af: telefoon eerst, de kop van de publieke pagina's op elke accountpagina, en alleen
   goedgekeurde tekst. De zijbalk van de starterkit gaat weg, met wat alleen hij gebruikte.
3. Browsertests op telefoonformaat (390 bij 844), met de schakelaar aan: registreren, inloggen, van een
   oefening naar het bewaren, afvinken, de training verwijderen en uitloggen. Dezelfde route met JavaScript
   uit. Werkt een formulier dan niet, geef het het token als verborgen veld en meld het. Een
   toegankelijkheidscontrole op elk nieuw paginatype.
4. Lees je eigen diff na en open de pull request: wat, waarom, hoe te testen, risico's, en wat je niet hebt
   kunnen testen.
```

### Deel E: privacy, verwijderen en vrijgave

```text
Lees AGENTS.md en plans/stap-5-account-en-mijn-trainingen.md. Werk alleen aan deel E, op de branch
step-5e-release.

1. Zet de goedgekeurde privacytekst op /nl/privacy. De registratiepagina en de voet van elke pagina linken
   ernaar.
2. Account verwijderen: een test maakt een gebruiker met trainingen, een herstelverzoek en, als sessies in
   de database staan, een sessie. Hij verwijdert het account en zoekt daarna in elke tabel met een kolom
   user_id of email naar een rij van die gebruiker. De test vraagt de tabellen op uit het schema, niet uit
   een vaste lijst.
3. Onbevestigde accounts vervallen na 7 dagen: een taak die elke dag draait, met een test.
4. Breid de SSR-test uit met de privacypagina en de inlogpagina.
5. Schrijf in de pull request wat Kay in Laravel Cloud doet, volgens de documentatie van Laravel Cloud: de
   Scheduler aan, de herstelgeschiedenis van de database op 7 dagen, één herstel als proef, en als laatste
   de schakelaar aan en opnieuw deployen.
6. Lees je eigen diff na en open de pull request: wat, waarom, hoe te testen, risico's, en wat je niet hebt
   kunnen testen.
```
