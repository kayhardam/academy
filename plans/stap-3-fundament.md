# Stap 3: Fundament

Klaar op zondag 20 december 2026. Eén branch, `step-3-foundation`, en één pull request.

Nagekeken in de bron op 21 november 2026: de starterkit `laravel/svelte-starter-kit` (commit `0c2f47b`), de Laravel-installer 5.33.0 en de documentatie van Laravel Cloud. Installeer je later, dan kan een vraag of een bestand anders zijn. Bijgewerkt op 22 november 2026, nadat Kay punt 1 en 2 van de aanpak heeft uitgevoerd. Bijgewerkt op 23 november 2026, na de controle van het plan van sessie A (de configuratie die de submodule vraagt, de vorm van de fixture en de SSR-test) en na de oplevering van sessie A (de teksten en de taal van de eerste pagina).

## Doel

Een basis die live staat en de hele keten bewijst: Laravel met de Svelte-starterkit, PostgreSQL, de coachboard-repo als submodule, CI en server-side rendering op Laravel Cloud. Op `/nl` staat één stap van een bord als tekening in de server-HTML.

## Gereedschap (MacBook)

PHP 8.3, Composer, Node 22 en VS Code met de Claude Code-extensie staan er al. Nieuw is PostgreSQL 18, de versie die Laravel Cloud standaard geeft. Homebrew zet die niet in je PATH, vandaar het volledige pad:

```bash
composer global update laravel/installer
brew install postgresql@18
brew services start postgresql@18
$(brew --prefix postgresql@18)/bin/createdb academy
$(brew --prefix postgresql@18)/bin/createdb academy_testing
php -m | grep pgsql
```

De installer gaat hiermee van 5.30 naar 5.33, en de laatste regel hoort `pdo_pgsql` en `pgsql` te tonen. In de commando's staan geen opmerkingen met `#`: zsh ziet die in een geplakte regel niet als commentaar en geeft de woorden erna mee als argumenten.

PHP krijgt op de Mac standaard 128 MB geheugen en dat is te weinig voor PHPStan in `composer ci:check`. Verhoog de limiet naar 1 GB; de tweede regel hoort `1G` te tonen. In CI is dit niet nodig, want de actie `setup-php` zet daar `memory_limit=-1`.

```bash
sed -i '.bak' 's/^memory_limit *=.*/memory_limit = 1G/' "$(php -r 'echo php_ini_loaded_file();')"
php -r 'echo ini_get("memory_limit"), PHP_EOL;'
```

In Claude Code: per taak een nieuw gesprek, eerst in de modus Plan.

## Aanpak

In deze volgorde. Wie het doet staat erbij.

1. **Kay: de app.** `laravel new academy --no-boost`, zelf getypt in Terminal: de installer herkent een AI-agent en slaat dan alle vragen over. Antwoorden: starterkit ja, Svelte, Laravel's built-in authentication, teams nee, en de inlogfuncties volgens "Jij beslist". Versie 5.33.0 vraagt niet naar het testframework, Boost en npm: hij kiest zelf Pest, installeert Boost en draait `npm install` en `npm run build`. Alleen de vlag `--no-boost` houdt Boost eruit.
2. **Kay: database en repo.** De installer zet een starterkit zonder te vragen op SQLite. Zet de `DB_`-regels in `.env` op PostgreSQL (zie onder) en draai `php artisan migrate`. Haal `/AGENTS.md` en `/CLAUDE.md` uit `.gitignore`, want de starterkit negeert ze. Zet `AGENTS.md`, `plan.md` en `plans/` in de map en maak `CLAUDE.md` als symlink (`ln -s AGENTS.md CLAUDE.md`). Voeg `'AGENTS.md'`, `'plan.md'` en `'plans/**'` toe aan `fmt.ignorePatterns` in `vite.config.ts`: de formatcontrole kijkt ook naar Markdown en keurt de tabellen in `plan.md` af. Draai `composer ci:check` en zet de repo op GitHub, met je noreply-adres op de commits.
3. **Claude Code, sessie A.** De bedrading: PostgreSQL voor de tests, de submodule `coachboard/`, de alias `@coachboard` met de configuratie die de submodule vraagt (zie "Versies" bij de risico's), het component `StepDrawing.svelte` rond `Court.svelte`, en tests die nog falen voor punt 4.
4. **Kay: de eerste pagina.** Schrijf zelf de route, de controller en de pagina tot die tests slagen. `/` stuurt door naar `/nl`, en `/nl` toont een titel en één tekening. Geef de route `/nl` de naam `home`: de inlogpagina's van de starterkit verwijzen daarnaar. Het bord komt uit `coachboard/src/lib/board/fixtures/v2-drill.json`. Dat bestand is `{ "link": …, "board": … }`: geef alleen de sleutel `board` door als prop `board`. De titel en het label van de tekening staan bij "Jij beslist".
5. **Claude Code, sessie B.** Review van punt 4, de taal van de pagina, registratie uit tot stap 5, de SSR-test, CI op PostgreSQL, de commando's in `AGENTS.md` en de pull request.
6. **Kay: Laravel Cloud.** Maak de app aan vanuit de repo, in de regio EU (Frankfurt). Voeg een database toe: Laravel Serverless Postgres, versie 18, dezelfde regio, de preset Dev, met scale to zero aan. Zet "Use Inertia SSR" aan, maak `npm run build:ssr` het build-commando en `php artisan migrate --force` het deploy-commando, en deploy opnieuw nadat de database is gekoppeld. Zet `academy.handballcoachboard.com` in de DNS. Controleer de live HTML en merge. Controleer bij de variabelen dat `APP_LOCALE` niet op `en` staat, en in de live HTML dat er `<html lang="nl">` staat.

De `DB_`-regels in `.env`. `DB_USERNAME` is je Mac-gebruikersnaam en het wachtwoord blijft leeg:

```ini
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=academy
DB_USERNAME=kayhardam
DB_PASSWORD=
```

Volg intussen op Laracasts "Laravel From Scratch (2026 Edition)", de delen The Fundamentals en Authentication and Authorization. Gebruiken de lessen SQLite of MySQL, dan maakt dat voor wat je daar leert geen verschil.

## Bestanden

- **Nieuw:** `.gitmodules`, `coachboard/` (submodule), `resources/js/components/StepDrawing.svelte`, `resources/js/pages/Home.svelte`, een controller, tests, `AGENTS.md`, `CLAUDE.md` (symlink), `plan.md`, `plans/`.
- **Gewijzigd:** `.gitignore`, `.env.example`, `phpunit.xml`, `routes/web.php`, `vite.config.ts`, `tsconfig.json`, `package.json`, `svelte.config.js`, `resources/css/app.css`, `resources/js/app.ts`, `config/fortify.php`, de pagina's die naar registratie verwijzen, `.github/workflows/tests.yml`.
- **Weg:** `resources/js/pages/Welcome.svelte`.

## Risico's

- **Submodule op Laravel Cloud.** Het is niet gedocumenteerd of de build submodules ophaalt. De eerste deploy bewijst het. Lukt het niet, dan is `git subtree` het alternatief; dat beslist Kay.
- **Stille terugval.** Bij een SSR-fout rendert Inertia in de browser, en dat zie je niet. Daarom haalt een test de server-HTML op. Die test zet zelf `inertia.ssr.throw_on_error` aan, zodat een fout de oorzaak noemt. In `phpunit.xml` hoort die instelling niet. `config/inertia.php` van de starterkit heeft de sleutel niet, dus `INERTIA_SSR_THROW_ON_ERROR` doet in deze app niets. En staat hij voor alle tests aan, dan faalt elke test die een Inertia-pagina opvraagt zodra er een bundel in `bootstrap/ssr` staat en de SSR-server niet draait.
- **Versies.** De starterkit bouwt met Vite+ (`vp`) en TypeScript 5. Het Coachboard bouwt met Astro en TypeScript 6, en `Court.svelte` gebruikt `$props.id()`. De SSR-server vraagt Node 22 of hoger. Fouten lossen we op in onze configuratie en nooit in `coachboard/`. Nagespeeld op 22 november 2026 in een kopie (main `d82f0cc`, submodule op `4b2a7de`, zonder de PHP-kant): TypeScript 5 vindt geen fouten in de bestanden die meekomen, maar svelte-check en Vite lezen voor bestanden uit de submodule de configuratie van het Coachboard, en die verwijst naar Astro-pakketten die hier niet staan. Drie instellingen lossen dat op. Haal ze niet weg:
  - `package.json`: `--config ./svelte.config.js` bij `types:check`. Zonder leest svelte-check `coachboard/svelte.config.js`, dat `@astrojs/svelte` importeert.
  - `vite.config.ts`: `tsconfig: 'tsconfig.json'`. Zonder leest Vite `coachboard/tsconfig.json`, dat `astro/tsconfigs/strict` uitbreidt.
  - `svelte.config.js`: bestanden uit `coachboard/` slaan de scriptstap van `vitePreprocess` over. Die stap zoekt zelf een tsconfig en kent de optie van Vite niet. Svelte haalt de types er dan zelf uit, zoals in de build van het Coachboard.
- **SQLite sluipt terug.** De starterkit gaat uit van SQLite en productie is PostgreSQL. Daarom draaien lokaal, de tests en CI vanaf de eerste commit op PostgreSQL 18, en bewaakt een test dat.
- **Engelse inlogpagina's.** De starterkit levert inloggen in het Engels, met registratie aan. Sessie B zet registratie uit tot de privacyverklaring er is. Tot stap 5 linkt niets naar de inlogpagina's.

## Jij beslist

- **De naam van de map en de repo.** Voorstel: `academy`, gelijk aan het subdomein. Kies je anders, vervang dan `academy` in de commando's en de prompts.
- **De inlogfuncties.** De installer vraagt welke je wilt en haalt de rest uit de code. Voorstel: Registration en Email verification aan; Two-factor authentication, Passkeys en Password confirmation uit. Dat past bij "een account is een e-mailadres en een wachtwoord", en het scheelt pagina's om te vertalen, te testen en te onderhouden. Later toevoegen kan, maar is handwerk.
- **Laravel Boost.** Voorstel: nu nee, met de vlag `--no-boost` bij de installatie. Het is een extra dependency met eigen richtlijnen voor Claude Code, naast onze `AGENTS.md`. Het kan later met één commando, na een voorstel met naam, versie, reden en alternatief.
- **De regio.** Voorstel: EU (Frankfurt), voor de app en de database. Die twee moeten in dezelfde regio staan.
- **De teksten op de eerste pagina.** Voorstel: geen nieuwe tekst. De titel is de titel van het bord in de fixture ("Kruisen in tweetallen"). Het label is de tekst die het Coachboard zelf bij een staptekening zet: `t('nl', 'tactic.diagram', { n: '1' })` uit `@coachboard/i18n/ui` geeft "Tekening van stap 1". Met die import gaat het hele woordenboek mee naar de browser; in een proefbuild was dat 6,3 kB gzip.
- **De taal van de pagina.** De starterkit zet `<html lang>` op de taal van de app, en die staat op `en`. Voorstel: `APP_LOCALE=nl`, met een test dat `/nl` `lang="nl"` heeft; sessie B doet het. De Engelse inlogpagina's krijgen dan ook `nl`, tot stap 5 ze vertaalt.
- Verder vraagt deze stap geen nieuwe dependencies. Vraagt Claude Code er toch om, dan eerst naam, reden en alternatief.

## Klaar als

- [ ] `/` stuurt door naar `/nl`.
- [ ] De HTML van `/nl`, opgehaald zonder JavaScript, bevat de titel en een `<svg role="img">` met het label van de tekening. Dat geldt lokaal, in CI en live.
- [ ] Lokaal, in CI en live draait de app op PostgreSQL 18. Een test faalt als de tests op SQLite draaien.
- [ ] CI is groen op de pull request en draait de SSR-test.
- [ ] Registreren kan niet, en een test bewaakt dat.
- [ ] `coachboard/` staat op de afgesproken commit en is ongewijzigd.
- [ ] Kay heeft de diff gelezen en gemerged.

## Startprompt sessie A

```text
Lees AGENTS.md en plans/stap-3-fundament.md. Werk alleen aan "sessie A".

Doel: de bedrading voor de eerste pagina, plus falende tests waar Kay tegenaan bouwt.

Doe dit in deze volgorde, elk in een eigen commit. Draai composer ci:check vóór elke commit: alles is groen,
behalve in de commit van punt 7.
1. Maak de branch step-3-foundation vanaf main.
2. Zet de tests op PostgreSQL. .env.example: pgsql met database academy. phpunit.xml: pgsql met database
   academy_testing, in plaats van SQLite in het geheugen. Kay heeft beide databases lokaal gemaakt. Voeg een
   test toe die faalt als de tests niet op PostgreSQL draaien. De bestaande tests blijven groen.
3. Voeg https://github.com/kayhardam/coachboard toe als submodule in coachboard/, vastgezet op commit
   4b2a7dea719eeba9f47b1226900436fa0f3e7c9b. Wijzig niets in die map. Sluit coachboard/ uit van de format-
   en lintcontrole van de starterkit (lint.ignorePatterns en fmt.ignorePatterns in vite.config.ts) en van
   Tailwind (@source not '../../coachboard'; in resources/css/app.css). Zet --config ./svelte.config.js bij
   types:check in package.json: svelte-check leest de configuratie van de submodule zodra de map er staat.
4. Maak de alias @coachboard naar coachboard/src, voor Vite en voor TypeScript. Zoek eerst uit waar de
   starterkit de alias @ vandaan haalt (in vite.config.ts staat hij niet; tsconfig.json heeft paths) en volg
   dat patroon. Voeg de twee andere instellingen toe uit "Versies" bij de risico's. Controleer
   versie-afhankelijke details in de officiële documentatie. Bewijs de bedrading met een echte build voordat
   je commit: maak het component van punt 5 en een tijdelijke pagina die het toont met het bord uit
   v2-drill.json, draai npm run build:ssr en zoek in de SSR-bundel naar role="img" (niet naar
   <svg role="img": daar staat viewBox tussen). Gooi daarna de tijdelijke pagina en de map bootstrap/ssr
   weg en draai npm run build. Niets van de proef komt in een commit; het component komt in de commit van
   punt 5.
5. Maak resources/js/components/StepDrawing.svelte met de props board (type Board uit
   @coachboard/lib/board/format), step (vanaf 0) en label. Het component rendert Court uit
   @coachboard/components/board/Court.svelte en bevat geen eigen tekenlogica.
6. Publieke pagina's krijgen geen app-layout. In resources/js/app.ts krijgt nu alleen Welcome geen layout en
   elke andere pagina de layout voor ingelogde gebruikers. Zorg dat Home geen layout krijgt.
7. Schrijf tests die nu nog falen, want Kay schrijft de route, de controller en de pagina zelf:
   - GET / stuurt door naar /nl.
   - GET /nl geeft 200 met de Inertia-pagina Home en de props title en board. Het bord is de sleutel board
     uit v2-drill.json; dat bestand is { link, board }.
   - De route /nl heet home.
8. Draai composer ci:check nog één keer en meld per controle de uitkomst. Alleen de tests van punt 7 mogen
   falen.

Stop daarna. Open nog geen pull request.

Regels: geen nieuwe dependency; niets wijzigen in coachboard/; groeit het werk buiten deze lijst, stop en meld het.

Lever op, in het Nederlands: de commits, de uitkomst van elke controle, en wat Kay nu moet schrijven
(welke bestanden, welke props de pagina krijgt, dat de controller alleen de sleutel board uit de fixture
doorgeeft, en hoe hij StepDrawing gebruikt).
```

## Startprompt sessie B

```text
Lees AGENTS.md en plans/stap-3-fundament.md. Werk alleen aan "sessie B", op de branch step-3-foundation.

Kay heeft de route, de controller en de pagina Home geschreven. De tests van sessie A slagen.

Doe dit in deze volgorde, elk in een eigen commit:
1. Review Kays route, controller en pagina. Leg uit wat beter kan en waarom. Pas alleen aan wat hij goedkeurt.
2. Verwijder de pagina Welcome.svelte: na Kays route gebruikt niets haar meer. Haal Welcome ook uit de
   layout-regel in resources/js/app.ts.
3. Zet registratie uit tot stap 5, in één commit die stap 5 kan terugdraaien: de Fortify-feature in
   config/fortify.php en alles wat naar de registratieroute verwijst, anders faalt de build (onder meer
   Login.svelte en Register.svelte). Voeg een test toe dat registreren niet kan.
4. Zet de taal van de pagina op Nederlands: APP_LOCALE=nl in .env.example en in Kays .env, en een test dat
   de HTML van /nl <html lang="nl"> heeft.
5. Schrijf de SSR-test: haal /nl op terwijl de SSR-server draait en verwacht in de HTML de titel en een
   <svg role="img"> met het label van de tekening. In de HTML staat viewBox vóór role: zoek dus naar
   role="img" en het aria-label, niet naar de letterlijke tekst <svg role="img". Zet in die test
   inertia.ssr.throw_on_error aan met config(), niet in phpunit.xml (zie "Stille terugval" bij de
   risico's). Draait de SSR-server niet, dan slaat de test lokaal over met een duidelijke melding; in CI
   is hij verplicht. Volg de Inertia v3-documentatie over server-side rendering.
6. Breid de workflow van de starterkit uit (.github/workflows/tests.yml) en maak geen tweede: checkout met
   submodules, PostgreSQL 18 als service, npm run build:ssr, de SSR-server starten en dan composer ci:check.
   De workflow draait composer setup, en dat migreert de database academy uit .env.example; de tests
   gebruiken academy_testing. De service heeft dus beide databases nodig, met een gebruiker die past bij
   .env.example (root, zonder wachtwoord) of bij DB_-variabelen in de workflow. De workflow draait op elke
   pull request en elke push naar main.
7. Vul "Commands" in AGENTS.md in met de commando's die in deze repo echt bestaan.
8. Lees je eigen diff na en open de pull request: wat, waarom, hoe te testen, de risico's, en wat je niet
   hebt kunnen testen.

Regels: geen nieuwe dependency zonder Kays ja; niets wijzigen in coachboard/; groeit het werk buiten deze
lijst, stop en meld het.
```
