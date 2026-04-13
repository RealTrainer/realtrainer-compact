---
id: feeling-pain
title: Feeling / Pain
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Track subjective wellness, effort perception, and injury status with `Feeling` and `Pain`.

## Feeling — Wellness & RPE

### Basic Structure

`Feeling [score] [| description]`

<CompactExampleBlock>
```compact
Feeling 8/10
Feeling 7/10 | good energy
Feeling RPE:7
```
</CompactExampleBlock>

### Wellness Score (1-10)

<CompactExampleBlock>
```compact
Feeling 9/10 | great session
Feeling 7/10 | normal day
Feeling 5/10 | tired but managed
Feeling 3/10 | struggled, cut short
```
</CompactExampleBlock>

### RPE (Rate of Perceived Exertion)

<CompactExampleBlock>
```compact
Feeling RPE:6 | sustainable effort
Feeling RPE:8 | hard but doable
Feeling RPE:9 | near max effort
Feeling RPE:10 | all out
```
</CompactExampleBlock>

### Unknown Score

When you want to note something without scoring:

<CompactExampleBlock>
```compact
Feeling ?/10 | felt off, hard to rate
Feeling | just a note about the session
```
</CompactExampleBlock>

### Empty Placeholder

<CompactExampleBlock>
```compact
Feeling
```
</CompactExampleBlock>

## Pain — Injury Tracking

### Basic Structure

`Pain <body-part>|[severity] description`

<CompactExampleBlock>
```compact
Pain polvi|2/10 lievä jäykkyys
Pain olkapää|4/10 kipua yläpunnerruksessa
Pain alaselkä|3/10 aamujäykkyys
```
</CompactExampleBlock>

### Severity Scale (1-10)

| Score | Meaning |
|-------|---------|
| 1-2 | Mild discomfort, no impact on training |
| 3-4 | Noticeable, may need to modify |
| 5-6 | Moderate, significant modification needed |
| 7-8 | Severe, training limited |
| 9-10 | Unable to train affected area |

<CompactExampleBlock>
```compact
Pain polvi|1/10 lievä tunne kyykyssä
Pain olkapää|5/10 ei yläpään painoja
Pain nilkka|8/10 ei juoksua
```
</CompactExampleBlock>

### Recovery Tracking

Use `-` for body part when noting recovery:

<CompactExampleBlock>
```compact
Pain -|palautunut
Pain -|ei kipuja tänään
Pain polvi|0/10 täysin kunnossa
```
</CompactExampleBlock>

### Without Severity

<CompactExampleBlock>
```compact
Pain polvi|lievä jäykkyys aamulla
Pain olkapää|tunne pystypunnerruksessa
```
</CompactExampleBlock>

## Complete Examples

### Daily Wellness Check

<CompactExampleBlock>
```compact
[2026-04-10] ## Aamufiilis
Sleep 7.5h quality:good
Feeling 8/10 | hyvin levännyt
Pain -|ei vaivoja
```
</CompactExampleBlock>

### Post-Workout Feedback

<CompactExampleBlock>
```compact
[2026-04-10] ## Voimaharjoitus
Exercise Kyykky|4x6@100kg
Exercise Maastaveto|3x5@120kg
Exercise Penkkipunnerrus|4x8@70kg

Feeling RPE:7 | hyvä treeni
Feeling 8/10 | vahva olo
Pain polvi|1/10 pientä jäykkyyttä viimeisessä sarjassa
```
</CompactExampleBlock>

### Injury Monitoring

<CompactExampleBlock>
```compact
[2026-04-08] ## Kevyt treeni
Exercise Ylätalja|3x12@50kg
Exercise Vipunosto|3x15@8kg
Feeling 6/10 | varovainen
Pain olkapää|4/10 ei yläpään painoja

[2026-04-10] ## Yläkroppa
Exercise Penkkipunnerrus|3x10@60kg
Exercise Soutu|4x10@60kg
Feeling 7/10 | parempi
Pain olkapää|2/10 tuntuu mutta ei häiritse

[2026-04-12] ## Normaali treeni
Exercise Penkkipunnerrus|4x8@70kg
Exercise Pystypunnerrus|3x10@40kg
Feeling 8/10 | takaisin normaaliin
Pain -|olkapää kunnossa
```
</CompactExampleBlock>

### Competition Day

<CompactExampleBlock>
```compact
[2026-04-10] ## Kilpailu
Text 100m alkuerä: 11.45s
Text 100m finaali: 11.32s PR

Feeling 9/10 | erinomainen päivä
Feeling RPE:10 | kaikki peliin
Pain -|ei vaivoja
```
</CompactExampleBlock>

### Low Energy Day

<CompactExampleBlock>
```compact
[2026-04-10] ## Kevyt päivä
Text Alkuperäinen suunnitelma: voimaharjoitus
Text Toteutus: kevyt liikkuvuus

Time 20min | venyttely
Exercise Foam rolling|15min

Feeling 4/10 | väsynyt, ei palautumista
Pain alaselkä|3/10 jäykkä
Text Päätös: lepopäivä huomenna
```
</CompactExampleBlock>

## Tips

- Use `Feeling` with `/10` for general wellness
- Use `Feeling RPE:` for workout-specific effort rating
- Track `Pain` consistently to monitor recovery trends
- `-` as body part means general recovery note
- Combine with `Sleep` and `Vitals` for complete wellness picture
- Keep descriptions concise but informative
