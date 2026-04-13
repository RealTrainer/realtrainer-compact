---
title: Intervallit / Vedot
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Intervallit esitetään `Interval`- tai `Run`-rivillä intensiteetillä ja palautuksella.

## Perusintervallit

<CompactExampleBlock>
```compact
[2026-04-03] ## Vedot
Interval 6x200m@Z4/2min
Run 3x400m@85%/3min
```
</CompactExampleBlock>

## Kiihtyvä tempo

Nouseva intensiteetti matkan aikana:

<CompactExampleBlock>
```compact
[2026-03-20] ## Kiihtyvä 400m
Section Pääosa
Interval 3x400m@80%/10min
Text 0-100m 70%, 100-200m 80%, 200-300m 90%, 300-400m 100%
Section Jäähdyttely
Run 10min@easy
```
</CompactExampleBlock>

## Ylämäkivedot

Voimakestävyyttä kehittävät:

<CompactExampleBlock>
```compact
[2026-04-10] ## Ylämäki-intervallit
Section Lämmittely
Run 15min@easy
Section Ylämäet
Run 4x100m@90%/kävely
Run 2x200m@85%/2min | Pitkä ylämäki
Section Jäähdyttely
Run 10min@easy
```
</CompactExampleBlock>

## Vaihtovedot (Fartlek)

Vuorottelevan intensiteetin harjoitus:

<CompactExampleBlock>
```compact
[2026-03-28] ## Fartlek
Tags fartlek, kestävyys
Run 40min 8km
> 2km 10min | Z2 peruskestävyys
> 1km 4min | Z4 teho
> 2km 10min | Z2 palautus
> 1km 4min | Z4 teho
> 2km 12min | Z2 jäähdyttely
```
</CompactExampleBlock>

## Rataintervalli

Tarkkaan mitattu harjoitus:

<CompactExampleBlock>
```compact
[2026-04-15] ## Rataharjoitus
Section Alku
Run 2km@easy | Lämmittely
Section Pääosa
Interval 8x400m@85%/90s
Section Loppu
Run 1km@easy | Jäähdyttely
```
</CompactExampleBlock>
