---
title: Voimaharjoitus
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Voimaharjoitus käyttää `Exercise`-, `Pyramid`- ja `Section`-rivejä rakenteen kuvaamiseen.

## Perusvoimaharjoitus

<CompactExampleBlock>
```compact
[2026-03-11] ## Jalkavoima
Section Pääosa
Exercise Takakyykky|3x5@85kg
Exercise Etukyykky|3x8@60kg
Exercise Askelkyykky|3x10+10@20kg
```
</CompactExampleBlock>

## Pyramidiharjoitus

Nousevat tai laskevat painot:

<CompactExampleBlock>
```compact
[2026-03-18] ## Penkkitreeni
Pyramid Penkkipunnerrus|10x60,8x70,6x80,4x90kg
Pyramid Kulmasoutu|10x50,10x60,10x70kg
```
</CompactExampleBlock>

## Unilateraaliset liikkeet

Oikea ja vasen puoli:

<CompactExampleBlock>
```compact
[2026-03-08] ## Unilateraalinen voima
Exercise Bulgarian Split Squat|3x10+10@16kg
Exercise Single-arm Press|3x8+8@20kg
Pyramid Single-arm Row|12+12x12,10+10x14,8+8x16kg
```
</CompactExampleBlock>

## Kontrastivoima

Räjähtävyys + maksimi yhdistettynä:

<CompactExampleBlock>
```compact
[2026-02-09] ## Kontrastivoima (Sali)
Tags voima, kontrasti
Exercise Takakyykky|3x5@90kg
Exercise Räjähtävät loikat|3x5
Exercise Penkkipunnerrus|3x5@80kg
Exercise Räjähtävä punnerrus|3x5
```
</CompactExampleBlock>

## Voimakestävyys (laitteet)

Kuntosalilaitteet perusvoimaan:

<CompactExampleBlock>
```compact
[2026-02-25] ## Laitetreeni
Tags kestovoima, jalat
Exercise Jalkaprässi yhdellä jalalla|1x12+12
Exercise Penkkipunnerrus|1x12@60kg
Exercise Pohkeet yhdellä jalalla|1x12+12
Exercise Takareisikoukistus|1x15
Exercise Reisiojennus|1x15
```
</CompactExampleBlock>

## Yhdistelmätreeni (Kokovartalo)

Voima, koordinaatio ja keskivartalo:

<CompactExampleBlock>
```compact
[2026-02-25] ## Kokovartalo
Section Jalat
Exercise Takakyykky|1x20@60kg
Exercise Etukyykky|1x20@40kg
Exercise Askelkyykky|1x20+20@bw
Section Keskivartalo
Time 20min | Vatsat, selät, kyljet
Section Ylävartalo
Exercise Hauis|3x10@12kg
Exercise Pystysoutu|3x10@30kg
Exercise Pystypunnerrus|3x10@25kg
```
</CompactExampleBlock>

## Jaettu rakenne

Section-osien avulla:

<CompactExampleBlock>
```compact
[2026-03-30] ## Palauttava ylävartalotreeni
Section Lämmittely
Time 10min | Kuntopyörä
Section Pääosa
Pyramid Penkkipunnerrus käsipainoilla|15x15,15x15,15x15kg
Exercise Ylätalja leveä ote|3x15@40kg
Section Jäähdyttely
Time 5min | Venyttely
```
</CompactExampleBlock>
