---
title: Lihaskunto
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Lihaskunto ja kehonpainoharjoittelu käyttää `Exercise`-rivejä aikamääreinä, toistoina ja oikea/vasen-merkinnöin. Kiertoharjoitteluun käytetään `Circuit`-rakennetta.

Katso myös: [Circuit-syntaksi](../tracking-types/circuit)

## Keskivartaloharjoitus

<CompactExampleBlock>
```compact
[2026-03-08] ## Keskivartalo
Exercise Lankku|3x46s,28s,24s
Exercise Venäläinen kierto|3x20@10kg
Exercise Kylkilankku|2x20s/37s,23s/21s
```
</CompactExampleBlock>

## Kehonpainoharjoitus (kotona)

<CompactExampleBlock>
```compact
[2026-02-15] ## Aktivoiva iltatreeni (kotona)
Tags koti, aktivoiva, kehonhuolto
Section Aktivointi
Exercise Lantionnosto|2x15
Exercise Lankku|2x30s
Exercise Kuollut ötökkä|2x10
Section Koordinaatio
Exercise Nopeat jalat sukkasillaan|3x10s
```
</CompactExampleBlock>

## Sekasarja (toistot + kesto)

Ajallisia pitoaikoja eri puolille:

<CompactExampleBlock>
```compact
[2026-03-08] ## Huolto ja stabilointi
Exercise Lankku|3x46s,28s,24s
Exercise Kylkilankku|2x20s/37s,23s/21s
Exercise Selän ojennus|3x15
```
</CompactExampleBlock>

## Kuntopiiri (Circuit)

Kiertoharjoittelu useilla liikkeillä:

<CompactExampleBlock>
```compact
[2026-04-12] ## Kiertoharjoitus
Circuit|3/2min
> Penkkipunnerrus 8@60kg
> Kyykky 12
> Soutu 10@30kg
> Etunojapunnerrus 15
```
</CompactExampleBlock>

## AMRAP (? kierrosta)

Niin monta kierrosta kuin ehtii:

<CompactExampleBlock>
```compact
[2026-04-10] ## AMRAP 20min
Circuit|?
> Air squats 15
> Push-ups 10
> Sit-ups 8
```
</CompactExampleBlock>

## Tehokuntopiiri

Intensiivinen versio plyometrisillä liikkeillä:

<CompactExampleBlock>
```compact
[2026-04-01] ## Tehopiiri
Tags teho, plyometria
Circuit|2
> Yhden jalan kyykky 10+10
> Penkkihyppy 20
> Etunojahyppy 15
> Pohjehyppy 20
> Leuanveto 8
```
</CompactExampleBlock>
