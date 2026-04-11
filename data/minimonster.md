# MINIMONSTER Test Corpus
# Single workout with ALL content type variations for UI testing

[2026-02-23#minimonster] ## MINIMONSTER - All Content Types
Tags juoksu, voimakestävyys, test
Emojis 🏃⚡💪
Summary Testataan kaikki renderöitävät muodot
Level0 juoksu
Level1 intervallit
Level2 tekniikka
Level3 joku vapaa tarkenne

Derived strength.neural_stress 72|score basis:entity confidence:88% source:exercise+load goodness:4
Derived strength.max_strength_emphasis 45|score basis:entity confidence:75% source:rep-range goodness:3
Derived strength.power_emphasis 80|score basis:entity confidence:90% source:movement-speed goodness:5
Derived strength.speed_strength_emphasis 65|score basis:entity confidence:80% source:velocity goodness:4
Derived strength.strength_endurance_emphasis 30|score basis:entity confidence:70% source:set-duration goodness:3
Derived strength.hypertrophy_emphasis 55|score basis:entity confidence:85% source:volume-tut goodness:4
Derived strength.total_volume_load 4500|kg basis:entity confidence:100% source:sets*reps*load goodness:5
Derived endurance.zone1_minutes 10|min basis:entity confidence:70% source:warmup-estimate goodness:3
Derived endurance.zone2_minutes 25|min basis:entity confidence:75% source:intensity-description goodness:4
Derived endurance.zone3_minutes 15|min basis:entity confidence:80% source:interval-analysis goodness:4
Derived endurance.zone4_minutes 8|min basis:entity confidence:85% source:interval-analysis goodness:4
Derived endurance.zone5_minutes 2|min basis:entity confidence:60% source:sprint-estimate goodness:3
Derived nutrition.sugar_simple 15|g basis:entity confidence:65% source:food-estimate goodness:3
Derived nutrition.sugar_complex 45|g basis:entity confidence:60% source:food-estimate goodness:3
Derived nutrition.fat_good_total 20|g basis:entity confidence:70% source:food-estimate goodness:4
Derived nutrition.fat_bad_total 8|g basis:entity confidence:75% source:food-estimate goodness:3

Phase1 Alkuverryttely|1km
Phase2|VOIMAKESTÄVYYS
Phase3 Alkuverryttely
Phase Voima/nop.kest.|lisätiedot
Phase Yleinen vaihe

Section 0-100m 70%
Section Nopeus 90% 3min
Section 2
Section Koordinaatiot

Time 10min | Kuntopalloverkka
Time 20 min | ilman pipea
Time 30-60min | aikaväli
Time ?min | unknown duration

Contacts 5x10|konkka oikealla
Contacts 3x20 | naputtelu (note pipe)
Contacts 30-80|heittopaino
Contacts 200|loikat tasamaa

Text Vapaa tekstiä tähän väliin.

> goal:kyykky 160kg
> custom_field:arvoa

Run 30min @120-150bpm/2min | pk-verkka
Run 3.5km 8228steps @6:00/km | askeleet mukana
Run 30min 3.5km 8228steps @Z2-Z3 | kombo (kesto+matka+steps)
Run 9km 41'34" @<150bpm | matka + "min'sec"
Run 9km 41min34s @>=120bpm | matka + min+sec ilman väliä
Run 9km 41min 34s @=140bpm | matka + min + sec välilyönnillä
Run 9km 41min @70% | matka + minuutit
Run 3x60m @90-95%/2-3min | kiihdytykset
Run 4x40m @? /kävely | unknown intensity + text recovery
Run 2x10x? @max | sets x reps x unknown
Run 2x altaanmitta @I-II | custom unit
Run 20+20m @3'11"/100m | bilateraali matka
Run 10+10 @bw | bilateraali count ilman yksikköä
Run 1x?km @{{Distance:tavoite}} | unknown distance with unit + template
Run @{{PaceTime:nelkun tavoitevauhti}}/km | tyhjä spec + template intensity

Move "rintauinti" 1x450m @3:11/100m T:20s | tekniikka
> 100m 3'12"/100m 137bpm [[käsiräpylät]] | split note
> 100m 2:51/100m
> 100m 2:55/100m
> 100m 2:56/100m
> > 50m 1:20/100m 140bpm | nested split (2 levels)

> 150m 27min | standalone split (ei Move:n alla)
> 3'39"/100m | pace-only split
> 5min | duration-only split

Interval 4x400m@80-90%/2-3min
Interval 5x200m@50%/2-3m
Interval 4x400m@80-90%/2m
Interval 5x200m@50%/2
Interval 6x3min@Ylämäki/2m palautus
Interval 6x200m@Z4

Pyramid penkki|10x40,8x50,6x60kg|kommentti
Pyramid kyykky|3x5x80,2x2x85kg
Pyramid naruhyppely|10,20,30,40,30,20,10

Exercise Takakyykky|3x8@100kg [[Tempo:3010]] [[Leveys:2]] | hyvä fiilis
Exercise Penkkipunnerrus|3x8@{{Number:80}}kg | template paino
Exercise Farmer walk|3x40m/2min@2x32kg | raskas (recovery before weight -tyyli)
Exercise Isometrinen pito|3x30/10s@20kg (lisäkuvaus) [[Hengitys:nenä]] | note
Exercise Yhden jalan kyykky|2-3x15-20@bw [[Liikelaajuus:90°]]
Exercise Lankku|3x30-60s@bodyweight | core
Exercise Kiertäjät|15+15@2kg
Exercise Etunojapunnerrus|2x10+10
Exercise Loikat|2x3x20-30m@bw
Exercise Loikat (tasamaa ja ylämäki)|2-3x3-4x20-30m
Exercise Aitajuoksu|3x4x5
Exercise Venytys|30s-60s
Exercise Tuki|60s@bw
Exercise Päkiähypyt|8
Exercise Käsipainon maastaveto|8x60kg
Exercise Nopeusliike|3x@2kg
Exercise Sarjat ilman toistoja|3x
Exercise Pelkkä paino|@tanko
Exercise Tuntematon|2-3x?
Exercise Tuntematon painolla|2-3x?@bw
Exercise Välisarja|3x3+3+2-4@25kg
Exercise Välisarja ilman painoa|3x3+3+2-4
Exercise Bilateraali painolla|4x6+6@20kg
Exercise Bilateraali aika|3x30s+30s
Exercise Bilateraali ilman painoa|15+15
Exercise Teksti putken jälkeen|vain selitys tähän [[Huom:kyllä]]
Exercise Koulupaini (1p matolta ajosta, 2p nostosta) [[sparri]]
Exercise Pelkkä nimi ilman speksejä [[strict]]

Max kyykky|1RM:150kg PR
Max penkki|eRM:142kg@5x120kg
Max mave|3RM:185kg

Best 100m|11.2s PR
Best cooper|2850m
Best lankku|3:45

Feeling 8/10|hyvä energia
Feeling RPE:7
Feeling 9/10
Feeling ?/10
Feeling |pelkkä kommentti
Feeling

Pain polvi|2/10 lievä jäykkyys
Pain -|palautunut

Vitals weight:85.2kg
Vitals sleep:7.5h
Vitals rhr:52bpm
Vitals

Custom Effort 7|Korkea hermostollinen kuormitus
Custom Nesteytyssuositus 0.6|l
Custom Liikelaajuus 90|°
Custom Treenipaino 85 | huom (note pipe)

Food 450kcal 30g/prot 60g/carb 10g/fat | kaurapuuro, maitorahka
Food 100mg/caffeine 5g/creatine | lisäravinteet
Food | aamupala

Drinking 0.5l | vesi
Drinking 0.6l kahvi | aamukahvi
Drinking 3dl 120kcal 8g/prot maito | proteiinijuoma
Drinking 0.5l 200mg/caffeine energiajuoma | pre-workout

Expense 4.50EUR | Bussilippu
Expense entry pirkkahalli 5.00USD | sisäänpääsy
Expense 100EUR ALV24% 19.35EUR | Konsultointi
Expense 50EUR ALV10% | Ruoka

Reminder 2026-01-15 | Ilmoittautuminen päättyy
Reminder 2026-01-01

Location Tampere, Pirkkahalli
URL https://example.com

Weight 85.2kg
BodyFat 12.5%
Waist 82cm
Hip 95cm

Sleep 7.5h quality:good hrv:45 rhr:52
Sleep 8h
Sleep 6.5h quality:poor

Health physio | Olkapään mobilisaatio
Health injury | Polven kipu
Health medication | Ibuprofeeni 400mg

Blorple this should be unknown line and not crash parsing
