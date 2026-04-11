---
title: Kuntosali (Formaattiesitykset)
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Tämä sivu näyttää, miten kuntosalidataa esitetään COMPACT-formaatissa.

Tarkempi syntaksikartta löytyy sivulta [Exercise Notation Patterns](../tracking-types/exercise-notation).

## Keskeiset elementit

- `Exercise` vakiosarjoille
- `Pyramid` vaihteleville kuormille/sarjoille
- `Time` alku- ja loppuosuuksille
- `Section` treenirakenteen näkyväksi jakamiseen

## Esimerkki: perusvoimapohja

<CompactExampleBlock>
```compact
[2026-02-09] ## Kontrastivoima (Sali) & Kierto
Tags voima, kontrasti, sali
Exercise Takakyykky|3x5@90kg
Exercise Penkkipunnerrus|3x5@80kg
Exercise Räjähtävä punnerrus|3x5
```
</CompactExampleBlock>

## Esimerkki: pyramidimuoto

<CompactExampleBlock>
```compact
[2026-03-08] ## Voima - Yläkroppa
Pyramid Penkkipunnerrus|10x60,10x60,10x60,10x60kg
Pyramid Pystypunnerrus käsipainoilla|9x16.5,7x16.5,5x16.5kg
Pyramid Kulmasoutu tangolla|10x50,10x50,10x50,10x50kg
```
</CompactExampleBlock>

## Esimerkki: oikea ja vasen puoli

<CompactExampleBlock>
```compact
[2026-03-08] ## Unilateraalinen voima
Exercise Bulgarian Split Squat|3x10+10@16kg
Exercise Side Plank|2x20s/37s,23s/21s
Pyramid Single-arm Press|12+12x12,10+10x14,8+8x16kg
```
</CompactExampleBlock>

## Esimerkki: jaettu rakenne

<CompactExampleBlock>
```compact
[2026-03-30] ## Palauttava ylävartalotreeni
Section Lämmittely
Time 10min | Kuntopyörä (erittäin kevyt vastus)
Section Pääosa
Pyramid Penkkipunnerrus käsipainoilla|15x15,15x15,15x15kg
Exercise Ylätalja leveä ote|3x15@40kg
```
</CompactExampleBlock>
