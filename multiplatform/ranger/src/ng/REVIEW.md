# NG Toteutus - Review

Päiväys: 2026-05-12
Laajuus: NG parser + detector -kokonaisuus kansiossa `multiplatform/ranger/src/ng`

## Yhteenveto

NG-toteutus on tuotantokelpoisessa kunnossa ja kehittynyt edellisen reviewin jälkeen mitattavasti:
- Arkkitehtuuri on selkeä (TokenSlice + detectorit + Parser, sub-parser-rekisteri eriytetty)
- Sub-parserit käyttävät nyt zero-copy `Parser.fromSlice(...)` -konstruktoria (poisti substring-kopion + duplikaatit TokenSlice-allokaatiot 11 detectorista)
- Tokenisaattori käsittelee non-ASCII (ä, ö, å, …) sanamerkkeinä → Välisarja-luokan väärinparsiminen korjattu (`isAlphaNum` huomioi koodit ≥ 128)
- Dead-code-vähennys: `SetRepRangeLoadDetector` + `SetRepRangeLoadValue` poistettu kokonaan (35 aktiivista detektoria)
- Reilu PegJS-vertailukorpus olemassa: `data/minimonster.peg.compact` ↔ `data/minimonster.ng.compact`

### Suorituskyky (10 ajoa × 1000 iteraatiota, warmup 50)

| Suite | Mean / iteraatio |
|---|---:|
| PegJS — `minimonster.peg.compact` | 0.893 ms |
| NG — `minimonster.ng.compact` | 0.359 ms |
| **Speedup (sama sisältö)** | **2.49×** |

### Koko (käännetty JS)

| Parser | Raw | Gzip -9 |
|---|---:|---:|
| NG (`token_slice.cjs` + `token_detector.cjs` + `parser.cjs`) | ~330 KB | **39 KB** |
| PegJS (`parser-generated.js`) | ~815 KB | **57 KB** |
| **Suhde** | 2.5× | 1.4× pienempi |

Nykyiset pääheikkoudet eivät ole kriittisiä bugiluokan ongelmia, vaan ylläpidettävyyteen ja regressioriskiin liittyviä:
- Detector-järjestyksen herkkyys (StandardDetectors-listan järjestys ei ole dokumentoitu)
- Heuristiikkapohjaisten detectorien mahdollinen päällekkäisyys
- StandardDetectors-listassa importteja, joita ei pushata listaan (`WeightDetector`, `DistanceDetector`, `PercentageDetector`, `PercentageRangeDetector`); käytetään vain sub-parsereissa — ei rikki, mutta hämmentävä

## Mikä on hyvää

1. Selkeä moduulirakenne
- Detectorit ovat erillisiä, yhden vastuun komponentteja.
- Sub-parser-rekisteri (`NGSubParserDetectors` / `NGChildDetectorRegistry`) eriytetty omiin moduuleihinsa.
- `Parser`-luokka tukee sekä string- että slice-pohjaista konstruointia (`Parser.fromSlice`), mikä mahdollistaa zero-copy sub-parserit.

2. Hyvä testikate käytännön syötteille
- Harness kattaa laajan käytännön syötejoukon (`ng_common_harness.ngtest`, kaikki vihreänä).
- Mukana sekä perusyksiköt (kg, bpm, %) että yhdistelmät (zone, sport + child parse, repeat-block, distance-range, num-range, percentage-range).

3. Monikohdevarmistus käytössä
- Sama logiikka validoidaan JS/Kotlin/Swift targeteilla.
- Tämä laskee merkittävästi käännös- ja writer-regressioiden riskiä.

4. Mitattu suorituskyky ja koko
- 2.49× nopeampi PegJS:ää vastaan reilussa minimonster-vertailussa.
- 1.4× pienempi gzip-koko PegJS-parseriin verrattuna.
- Koodissa olemassa `parser_benchmark_pegjs_ng.mjs` toistettavaa mittausta varten (`npm run ranger:bench:pegjs-ng`).

5. Jaettujen listojen/factoryn keskitys
- `NGSharedLists` singleton + constructor-initialized member data on oikea suunta.
- `NGSharedDetectorFactory` poistaa duplikaatiota SportExerciseDetectorista.

6. Dead-code-puhdistus tehty
- `SetRepRangeLoadDetector` ja siihen liittyvät value-luokat poistettu kun ne eivät enää kuuluneet aktiiviseen pipelineen.
- Vähentää ylläpitokuormaa ja parantaa luotettavuutta.

## Mikä ei ole hyvää / riskit

1. Detector-järjestys on edelleen kriittinen ja herkkä
- Useampi detector toimii osittain päällekkäisillä pattern-alueilla.
- Pienikin järjestysmuutos voi muuttaa parse-tulosta ilman compile-virhettä.
- `StandardDetectors.create()` -listalle ei ole inline-perusteluja järjestykselle.

2. Heuristiikkojen läpinäkyvyys
- Moni detector perustuu string/char heuristiikkaan; nopea mutta altis reunatapauksille.
- Esim. `RomanZoneDetector` rikkoutui non-ASCII rajalla ennen `isAlphaNum`-korjausta — vastaavia hiljaisia reunatapauksia voi yhä olla.
- Negatiivisia testejä ("ei saa matchata") voisi olla enemmän.

3. StandardDetectors-listan ja importtien epäsymmetria
- `WeightDetector`, `DistanceDetector`, `PercentageDetector`, `PercentageRangeDetector` ovat importattuja mutta niitä EI lisätä päälistaan; ne ajetaan vain sub-parsereista.
- Tämä on toimiva mutta hämmentävä: lukijalle ei ole näkyvissä eroa "top-level" ja "sub-parser only" detectorien välillä.

4. Child detector -kokoonpanon semantiikka
- Vaikka lista on nyt keskitetty factoryyn, se on edelleen implisiittinen järjestyslista ilman metatietoa (miksi juuri tämä järjestys).
- Ilman dokumentoitua prioriteettia ylläpidettävyys kärsii pitkällä aikavälillä.

5. Domain-listojen laajennettavuus
- Sport-lista on nyt jaettu singletonissa, mutta data on hardcodattu.
- Jos käyttäjäkohtaiset tai kielikohtaiset variaatiot kasvavat, nykyinen malli alkaa rajoittaa.

6. Kotlin-generaation varoitukset
- Harness-ajossa näkyvät `open has no effect on a final class` -varoitukset.
- Ei riko toimintaa nyt, mutta heikentää signaali-kohina-suhdetta CI:ssä.

## Priorisoitu parannuslista

## P1 (lyhyt aikaväli)

1. Detector-järjestyksen dokumentointi
- Lisää `StandardDetectors.rgr`:n yläpuolelle kommenttilohko, jossa jokaisen detectorin paikka perustellaan yhdellä lauseella.
- Estää "vahingossa tehty" järjestysregressio.

2. Negatiiviset testit harnessiin
- Lisää vähintään 10 tapausta, joissa varmistetaan ettei detector matchaa väärää patternia.
- Erityisesti zone/roman/sport/percentage-risteymät, sekä non-ASCII reunat (Välisarja, Ä-alku ennen numeroa).

3. Sub-parser-only detectorien merkintä
- Erottele importit kommentilla tai pienellä alirakenteella, jotta on selvää mitkä detectorit ajetaan vain child-pipelinesta (`WeightDetector`, `DistanceDetector`, `PercentageDetector`, `PercentageRangeDetector`).

4. Benchmark CI-vaiheeseen (kevyt)
- `npm run ranger:bench:pegjs-ng:10` osaksi nightly-ajoa, regressioiden havaitsemiseksi (esim. > 10 % hidastuminen punaiseksi).

## P2 (keskipitkä aikaväli)

1. Dataohjattu shared list -malli
- Siirrä sport-nimet (ja myöhemmin mahdolliset muut listat) config- tai data-tiedostoon.
- Mahdollistaa helpommat päivitykset ilman koodimuutoksia.

2. Detector-telemetria debug-tilaan
- Lisää opt-in debug output: mikä detector matchasi, missä järjestyksessä, millä slice-alueella.
- Nopeuttaa ongelmien diagnosointia.

3. Kotlin-warnings cleanup
- Siivoa writerin tuottama `open`-käyttö niin, että varoitukset vähenevät.

4. Sub-parser-allokaation poisto
- Vaikka `Parser.fromSlice` poisti string-kopion, jokainen sub-parse luo vielä uuden `Parser`-instanssin + uuden detector-listan kopion.
- Harkitse jaettua sub-parser-instanssia per child-pipeline (reset-tyylillä) → odotettu lisänopeus erityisesti `SportExerciseDetector`-raskaissa syötteissä.

## P3 (pidempi aikaväli)

1. Prioriteettimalli detector-ketjulle
- Harkitse eksplisiittistä prioriteettia (esim. metadata + järjestyksen validointi).
- Helpottaa turvallista laajentamista uusilla detectoreilla.

2. Property-based / fuzz-testaus
- Lisää satunnaissyöte- ja robustisuustestaus parserille.
- Paljastaa vaikeita reunatapauksia joita case-listat eivät kata.

3. Yhteinen "parse session" -konteksti
- Nykyiset detectorit ovat tilattomia mutta kontekstia ei jaeta (esim. edellinen heading vaikuttaa lapsi-parseriin).
- Eksplisiittinen sessio-objekti voisi mahdollistaa älykkäämmät ratkaisut ilman globaalia tilaa.

## Kokonaisarvio

Arvosana: **9 / 10** (edellinen 8.5)

Perustelu (delta edellisestä reviewistä):
- Suorituskyky on nyt mitattu ja dokumentoitu reilussa vertailussa (2.49× PegJS) ja koko on kilpailukykyinen (1.4× pienempi gzip).
- Zero-copy sub-parser ja non-ASCII-korjaus poistivat kaksi konkreettista riskialuetta.
- Dead-code on siivottu, joten pinta-ala on aiempaa pienempi.
- Avoimet asiat ovat edelleen ylläpidettävyyden ja pitkän aikavälin evoluution puolella, eivät nykyisessä perustoimivuudessa.
