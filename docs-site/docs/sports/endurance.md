---
title: Kestävyys (Formaattiesitykset)
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Tämä sivu näyttää, miten kestävyysdata esitetään COMPACT-formaatissa.

## Keskeiset elementit

- `Run` matka-aika-vauhti -rakenteille
- `Time` kestoperusteiselle tekemiselle
- `Split`-rivit (`>`) osasuorituksille
- `Custom` lisämetriikoille (syke, kalorit, kadenssi)

## Esimerkki: ulkojuoksu

<CompactExampleBlock>
```compact
[2026-03-28] ## Ulkojuoksu
Tags juoksu, Tampere
Emojis 🏃
Run 8.45min 1.03km
> 1km 8'11"@140bpm
> 0.03km 0'13"@156bpm
Custom Kadenssi 136|spm
Custom Kalorit 77|kcal
```
</CompactExampleBlock>

## Esimerkki: uinti run-muodossa

<CompactExampleBlock>
```compact
[2026-03-10] ## Rintauinti (750m)
Tags uinti, rintauinti
Run "rintauinti" 24.95min 750m
> 50m 1'50"/100m
> 700m 3'06"/100m
```
</CompactExampleBlock>

## Esimerkki: kesto ilman matkaa

<CompactExampleBlock>
```compact
[2026-03-08] ## Palauttava allas
Time 120min | Allasleikit
Text Kevyt liikunta ilman tarkkaa matkamittausta
```
</CompactExampleBlock>
