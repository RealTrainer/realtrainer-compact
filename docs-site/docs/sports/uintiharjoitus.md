---
title: Uintiharjoitus
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Uinti kuvataan `Move "laji" ...` -rivillä ja spliteillä. Uinnissa käytetään rooman numeroita (I-V) tehoalueisiin ja `/100m` pace-merkintää.

## Perusharjoitus

<CompactExampleBlock>
```compact
[2026-03-17] ## Uintitreeni
Move "vapaauinti" 30min 1200m
> 400m 6:40/100m | alkuverryttely
> 400m 1:45/100m | pääosa
> 400m 7:00/100m | loppuverryttely
```
</CompactExampleBlock>

## Tekniikkaharjoitus

<CompactExampleBlock>
```compact
[2026-04-01] ## Tekniikka
Tags uinti, tekniikka
Move "vapaauinti" 200m [[käsiräpylät]] | catch-harjoitus
Move "vapaauinti" 200m [[pullbuoy]] | jalkojen rentous
Move "rintauinti" 200m | tekniikkapotku
```
</CompactExampleBlock>

## Intervalliuinti

Tehoharjoitus uinnissa:

<CompactExampleBlock>
```compact
[2026-04-05] ## Teho-uinti
Section Alkulämmittely
Move "vapaauinti" 400m@II | rauhallinen
Section Pääosa
Move "vapaauinti" 800m
> 100m 1:35/100m | teho III
> 100m 1:45/100m | palautus II
> 100m 1:30/100m | teho IV
> 100m 1:45/100m | palautus II
> 100m 1:35/100m | teho III
> 100m 1:50/100m | palautus I
> 100m 1:30/100m | teho IV
> 100m 2:00/100m | jäähdyttely I
Section Loppuverryttely
Move "vapaauinti" 200m@I | rauhallinen
```
</CompactExampleBlock>

## Monipuolinen harjoitus

Eri uintilajit ja välineet:

<CompactExampleBlock>
```compact
[2026-04-10] ## Sekalainen
Tags uinti, monipuolinen
Section Lämmittely
Move "vapaauinti" 300m@I-II
Section Lajitekniikka
Move "rintauinti" 4x50m T:20s | tekniikka
Move "selkäuinti" 4x50m T:20s | tekniikka
Section Teho
Move "vapaauinti" 8x50m@III/15s
Section Välineet
Move "vapaauinti" 200m [[käsiräpylät]]
Move "vapaauinti" 200m [[pullbuoy]]
Section Loppuverryttely
Move "vapaauinti" 200m@I
```
</CompactExampleBlock>

## Kilpailuharjoitus

Kilpailumatkaa simuloiva harjoitus:

<CompactExampleBlock>
```compact
[2026-04-15] ## Kilpailusimulaatio
Tags uinti, kilpailu
Section Lämmittely
Move "vapaauinti" 400m@II
Section Simulaatio 200m
Move "vapaauinti" 200m
> 50m 0:35/50m | lähtö IV
> 50m 0:33/50m | teho IV-V
> 50m 0:34/50m | pito IV
> 50m 0:32/50m | loppukiri V
Section Palautus
Move "vapaauinti" 300m@I
```
</CompactExampleBlock>
