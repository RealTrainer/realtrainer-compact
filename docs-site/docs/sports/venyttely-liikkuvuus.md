---
title: Venyttely / Liikkuvuus
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Venyttely ja liikkuvuus esitetään `Time`- ja `Exercise`-riveillä. Liikkeiden kuvauksissa hyödynnetään `Text`-rivejä.

## Dynaaminen venyttely

<CompactExampleBlock>
```compact
[2026-03-04] ## Liikkuvuus
Time 12min | Dynaamiset venyttelyt
Exercise Rintarangan kierto|2x15
Exercise Lonkankoukistaja|3x1min
```
</CompactExampleBlock>

## Keppiharjoitus (VGH-tyylinen)

Liikkuvuutta ja lihaskuntoa yhdistävä:

<CompactExampleBlock>
```compact
[2026-03-10] ## Keppiharjoitus
Tags liikkuvuus, kehonhuolto
Text Tee silmät kiinni, keskity lihastyöhön
Exercise Keppikierto lantio paikallaan|2x15
Exercise Tempausvala kepillä|2x15
Exercise Askelkyykky + rintarangan kierto|2x10+10
Exercise Nelinkontin rintarangan kierto|2x15
```
</CompactExampleBlock>

## Pumppaava venyttely

Loppuverryttelyn venytykset:

<CompactExampleBlock>
```compact
[2026-04-05] ## Loppuvenyttely
Text Pumppaa 10x 2s per liike
Exercise Pakaravenytys (nopeat vaihdot)|2x15
Exercise Pohjevenytys korokkeella|2x15
Exercise Lonkankoukistaja|2x30s
```
</CompactExampleBlock>

## Kokonaisvaltainen liikkuvuusharjoitus

<CompactExampleBlock>
```compact
[2026-02-28] ## Liikkuvuustreeni
Section Alavartalon liikkuvuus
Exercise Sivulle taivutus|2x15
Exercise Jalkojen vienti sivulle (T-asento)|2x15
Section Ylävartalon liikkuvuus
Exercise Kylkimakuulla rintarangan kierto|2x10+10
Exercise Selinmakuulla kepin vienti|2x15
Section Aktivointi
Exercise Hyljepomppu|2x15
Exercise Mittarimato|2x10
```
</CompactExampleBlock>
