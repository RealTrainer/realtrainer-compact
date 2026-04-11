---
title: Lihaskunto (Formaattiesitykset)
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Tämä sivu näyttää, miten lihaskunto ja kehonpainopainotteinen data esitetään COMPACT-formaatissa.

## Keskeiset elementit

- `Exercise` perusriveille
- Sekamuotoiset sarjat: toistot, sekunnit, yhdistelmät
- `Text` laadulliselle kuvaukselle
- `Section` rakenteen selkeyttämiseen

## Esimerkki: kehonpainopainotteinen lihaskunto

<CompactExampleBlock>
```compact
[2026-02-15] ## Aktivoiva iltatreeni (kotona)
Tags koti, aktivoiva, kehonhuolto
Emojis 🏠💪✨
Section Aktivointi
Exercise Lantionnosto|2x15
Exercise Lankku|2x30s
Exercise Kuollut ötökkä|2x10
Section Koordinaatio
Exercise Nopeat jalat sukkasillaan|3x10s
```
</CompactExampleBlock>

## Esimerkki: sekasarja (toistot + kesto)

<CompactExampleBlock>
```compact
[2026-03-08] ## Huolto ja stabilointi
Exercise Lankku|3x46s,28s,24s
Exercise kylkilankku|2x20s/37s,23s/21s
Text Yhdistää ajallisia pitoaikoja eri puolille
```
</CompactExampleBlock>

## Esimerkki: lihaskunto kuntosalirakenteessa

<CompactExampleBlock>
```compact
[2026-02-21] ## Core- ja ylävartalohuolto
Section Keskivartalo
Exercise Lankku|3x60s
Exercise Venäläinen kierto|3x20@10kg
```
</CompactExampleBlock>
