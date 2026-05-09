# NG Toteutus - Review

Päiväys: 2026-05-10
Laajuus: NG parser + detector -kokonaisuus kansiossa `multiplatform/ranger/src/ng`

## Yhteenveto

NG-toteutus on tällä hetkellä hyvässä kunnossa tuotantokelpoisuuden näkökulmasta:
- Arkkitehtuuri on selkeä (TokenSlice + detectorit + Parser)
- Testattavuus on hyvä (yhteinen harness + raportointi)
- Monikohde-tilanne on vahva (JS/Kotlin/Swift kaikki vihreänä)

Nykyiset pääheikkoudet eivät ole kriittisiä bugiluokan ongelmia, vaan ylläpidettävyyteen ja regressioriskiin liittyviä:
- Detector-järjestyksen herkkyys
- Heuristiikkapohjaisten detectorien mahdollinen päällekkäisyys
- Osa domain-listoista ja detector-kokoonpanoista vielä implisiittisiä

## Mikä on hyvää

1. Selkeä moduulirakenne
- Detectorit ovat erillisiä, yhden vastuun komponentteja.
- Kokonaisuus rakentuu hallitusti moduulien kautta (esim. TokenDetectorModule, StandardDetectors).

2. Hyvä testikate käytännön syötteille
- Harness kattaa tällä hetkellä laajan käytännön syötejoukon (36/36 pass).
- Mukana on sekä perusyksiköt (kg, bpm, %) että yhdistelmät (esim. set-rep-load, zone, sport + child parse).

3. Monikohdevarmistus käytössä
- Sama logiikka validoidaan JS/Kotlin/Swift targeteilla.
- Tämä laskee merkittävästi käännös- ja writer-regressioiden riskiä.

4. Raportoinnin käytettävyys
- Markdown-raportti on selkeä ja nopeasti luettava.
- Case-taso auttaa paikantamaan regressiot nopeasti.

5. Jaettujen listojen/factoryn keskitys aloitettu
- `NGSharedLists` singleton + constructor-initialized member data on oikea suunta.
- `NGSharedDetectorFactory` poistaa duplikaatiota SportExerciseDetectorista.

## Mikä ei ole hyvää / riskit

1. Detector-järjestys on edelleen kriittinen ja herkkä
- Usea detector toimii osittain päällekkäisillä pattern-alueilla.
- Pienikin järjestysmuutos voi muuttaa parse-tulosta ilman compile-virhettä.

2. Heuristiikkojen läpinäkyvyys
- Moni detector perustuu string/char heuristiikkaan; tämä on nopea mutta altis reunatapauksille.
- Negatiivisia testejä ("ei saa matchata") voisi olla enemmän.

3. Child detector -kokoonpanon semantiikka
- Vaikka lista on nyt keskitetty factoryyn, se on edelleen implisiittinen järjestyslista ilman metatietoa (miksi juuri tämä järjestys).
- Ilman dokumentoitua prioriteettia ylläpidettävyys kärsii pitkällä aikavälillä.

4. Domain-listojen laajennettavuus
- Sport-lista on nyt jaettu singletonissa, mutta data on hardcodattu.
- Jos käyttäjäkohtaiset tai kielikohtaiset variaatiot kasvavat, nykyinen malli alkaa rajoittaa.

5. Kotlin-generaation varoitukset
- Harness-ajossa näkyvät `open has no effect on a final class` -varoitukset.
- Ei riko toimintaa nyt, mutta heikentää signaali-kohina-suhdetta CI:ssä.

## Priorisoitu parannuslista

## P1 (lyhyt aikaväli)

1. Detector-järjestyksen dokumentointi
- Lisää dokumentti, jossa jokaisen detectorin paikka perustellaan yhdellä lauseella.
- Estää "vahingossa tehty" järjestysregressio.

2. Negatiiviset testit harnessiin
- Lisää vähintään 10 tapausta, joissa varmistetaan ettei detector matchaa väärää patternia.
- Erityisesti zone/roman/sport/percentage-risteymät.

3. Child detector -factoryn vakiointi
- Varmista että kaikki vastaavat detector-kokonaisuudet hakevat listansa keskitetysti.
- Vältä listojen kopioimista detector-luokkiin.

## P2 (keskipitkä aikaväli)

1. Dataohjattu shared list -malli
- Siirrä sport-nimet (ja myöhemmin mahdolliset muut listat) config- tai data-tiedostoon.
- Mahdollistaa helpommat päivitykset ilman koodimuutoksia.

2. Detector-telemetria debug-tilaan
- Lisää opt-in debug output: mikä detector matchasi, missä järjestyksessä, millä slice-alueella.
- Nopeuttaa ongelmien diagnosointia.

3. Kotlin-warnings cleanup
- Siivoa writerin tuottama `open`-käyttö niin, että varoitukset vähenevät.

## P3 (pidempi aikaväli)

1. Prioriteettimalli detector-ketjulle
- Harkitse eksplisiittistä prioriteettia (esim. metadata + järjestyksen validointi).
- Helpottaa turvallista laajentamista uusilla detectoreilla.

2. Property-based / fuzz-testaus
- Lisää satunnaissyöte- ja robustisuustestaus parserille.
- Paljastaa vaikeita reunatapauksia joita case-listat eivät kata.

## Kokonaisarvio

Arvosana: 8.5 / 10

Perustelu:
- Rakenne, testaus ja monikohdevarmistus ovat vahvoja.
- Merkittävimmät puutteet ovat ylläpidettävyyden ja pitkän aikavälin evoluution puolella, eivät nykyisessä perustoimivuudessa.
