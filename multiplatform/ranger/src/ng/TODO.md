# NG TODO (v2 alignment)

Paivays: 2026-05-10
Laajuus: NG parser + detectorit/valuet kansiorakenteessa multiplatform/ranger/src/ng
Lahde: ai/v2.md

## Tavoite

Tama lista tarkentaa mita NG-kerroksessa pitaa tehda, jotta v2-suunnitelman sisalto on selkeasti katettu.

## Prioriteetit

### P1 - parserin kaytettava kattavuus

- [x] Left/Right child-rivit
  - Tuki: `> Left 10x16kg`, `> Right 10x16kg`
  - Toimenpiteet:
    - Lisaa LeftRightDetector (tai kaksi detectoria) ja kytke StandardDetectors-listaan.
    - Paata AST-malli: oma parsed kind (`left-right`) tai keyword + payload.
    - Lisaa harness-caset ja JSON-exportit.

- [x] Feeling/Pain (riveina)
  - Tuki: `Feeling 3`, `Feelings 3`, `Pain 2`
  - Toimenpiteet:
    - Yhtenainen detector + parsed value scorelle.
    - Alias-kasittely (Feeling/Feelings).
    - Positiiviset ja negatiiviset testit.

- [x] Body Metrics -rivit
  - Tuki:
    - `Weight 95.5kg`
    - `BodyFat 17%`
    - `Sleep 7.5h`
    - `Health resting_hr 52`
    - `Vitals bp 120/75`
  - Toimenpiteet:
    - Paata tehdanko erilliset detectorit vai yksi metric-detector avainsanalla.
    - Kytke parsed value export NGTestRunneriin.
    - Lisaa harness-caset + JSON tiedostot jokaiselle metricalle.

### P2 - harjoitusrakenteet

- [x] Circuit-muodon tarkennus
  - Tuki:
    - `Circuit 3`
    - `Circuit 4/2min`
    - sisaiset child-rivit (`> BenchPress 8x80kg`, `> Recovery 5min`)
  - Toimenpiteet:
    - Varmista detector-jarjestys suhteessa Repeat/Recovery/DetailsData.
    - Varmista rekursio: `>` tasot toimivat circuitin sisalla.
    - Lisaa harnessiin nested-caset.

- [ ] Generic child semantics (`>`)
  - Toimenpiteet:
    - Dokumentoi mitka child-rivit tulkitaan domain-objekteiksi (Split, Attempt, Recovery, Left/Right, Comment, Feeling/Pain).
    - Yhtenainen prioriteetti child-detectoreille.

### P3 - ravinto ja talous

- [x] Nutrition/Food/Drinking/Expense/Reminder
  - Tuki:
    - `Food Chicken salad | lunch`
    - `Drinking 500ml water`
    - `Expense 14.90 | groceries`
    - `Reminder Buy resistance bands`
  - Toimenpiteet:
    - Tee detectorit tai key-value detector, jossa avainsana sanelee payloadin.
    - Lisaa mittayksikkojen tunnistus juomalle (ml/l).
    - Lisaa mahdollinen proteiini-merkinta (esim. `Protein 30g` tai `Food ... | protein 30g`).

## Cross-cutting

- [x] Paivita NGTestRunner parsedValueToJson kaikille uusille kindeille.
- [x] Lisaa joka uudelle detectorille:
  - harness-case
  - JSON export case
  - smoke/regression-case detector-smokeen jos tarpeen
- [ ] Paivita REVIEW.md kun P1-kohdat valmistuvat (riskit + status).

## Iteraatio 2026-05-10 (tehty)

- Toteutettu detectorit ja typed valuet:
  - LeftRightDetector / LeftRightValue
  - FeelingDetector / FeelingValue
  - BodyMetricDetector / BodyMetricValue
  - CircuitDetector / CircuitValue
  - ContextEntryDetector / ContextEntryValue (Food, Drinking, Expense, Reminder, Protein)
- Kytketty StandardDetectors + NGSharedDetectorFactory + TokenDetectorModule.
- Kytketty JSON-serialisointi NGTestRunneriin uusille parsed kindeille.
- Lisatty harness-caset tiedostoon `multiplatform/ranger/test/ng_common_harness.ngtest`.
- Lisatty smoke-caset tiedostoon `multiplatform/ranger/test/token_detector_smoke.mjs`.

## Iteraatio 2026-05-10 (kansiorakenne)

- NG-koodi jarjestelty kahteen alikansioon:
  - detectorit: `multiplatform/ranger/src/ng/detectors`
  - valuet: `multiplatform/ranger/src/ng/values`
- Paivitetty Import-polut vastaamaan uutta rakennetta (`detectors/...`, `values/...`).
- Vahvistettu build + harness:
  - `npm run ranger:ng:detector:build` vihrea
  - `npm run ranger:ng:common:test` vihrea

## Jatkotehtavat

- [ ] Lisaa negatiiviset harness-caset uusille detektoreille (virheellinen syote).
- [ ] Tarkenna Drinking-yksikot rakenteiseksi payloadiksi (ml/l parsinta erillisiksi kentiksi).
- [ ] Paivita REVIEW.md vastaamaan uutta detectorikattavuutta.

## Ehdotettu toteutusjarjestys (jaljella)

1. Generic child semantics (`>`) dokumentointi + detector-prioriteetit
2. Negatiiviset harness-caset uusille detektoreille
3. Drinking-yksikoiden rakenteinen payload (ml/l kentiksi)
4. REVIEW.md paivitys (riskit + status)

## Definition of Done (per teema)

- Detector loytaa oikeat osumat eika varasta muita tokeneita.
- Parsed value kind + payload serialisoituu JSONiin.
- Harnessissa vahintaan 1 positiivinen ja 1 negatiivinen tapaus.
- JS/Kotlin/Swift harness vihrea.
