Tehdään parserista uusi versio ja rakennetaan se pienissä osissa, jokainen ranger luokka pistetään omaan tiedostoon joista importoidaan sitten pää test caseen.

Ensimmäinen vaihe on rakentaa tokeneita syövä engine, eli se ottaa sisään tiedoston tai rivejä tekstiä ja siinä voi siirtyä peek() eteenpäin tai kuluttaa tokeneita tarvittaessa tai lukea lisää dataa

- length() palauttaa merkkijonon pituuden
- peek(0) siirtää eteenpäin 0 merkkiä ( huomioitava UTF8 ) ja paluttaa uuden
- peek(1) siirtää eteenpäin 1 merkkiä ( huomioitava UTF8 ) ja palauttaa uuden
- step(1) siirtää eteenpäin 1 merkkiä
- read(3) lukee 3 merkkiä ( huomioi UTF 8 ) mutta ei siirrä eteenpäin
- slice(2) tekee uuden ei stringiä kopioivan instanssin positiosta esim. halutaan lukea jokin token "kg" ja saadaan uusi alkuperäiseen stringiin osoittava olio jonka pituus on 2 merkkiä. Tällä on samat funktiot kuin yllä.

Eli voidaan lukea vaikka 3 merkkiä 5 merkin päästä niin että

let newReader = reader.peek(5)
newReader.read(3)

Luettava teksti on muodoltaan "slice" eli ei mutatoida stringiä tai käytetä mitään operaatioita jotka kirjoittavat tai kopioivat muistia, pointteri samaan merkkijonoon säilyy joten lukeminen on nopeaa.

Tämä on siis eka modeli, TokenSlice joka tehdään ensimmäisenä ja sille tehdään testitiedosto Rangerilla joka ajetaan.

Sitten toteutetaan apufunktioita kuten vaikka has token joka tarkastaa onko positiossa token vai ei:

- hasToken:boolean (token:string) 

endsWith tarkastaa loppuuko TokenSlice johonkin merkkijonoon

- endsWith:boolean (token:string)

Katkasee seuraavaan merkkijonoon "token", esim. teksti "10kg", voisi palauttaa "10"

- splitWithToken:TokenSlice ( token:string )

Hakee uuden slicen johonkin merkkiin, esim. "penkki 10kg kevyt" ja jos tuolle kutsutaan sliceToToken("kg") niin saadaan "penkki 10kg" slice

- sliceToToken:TokenSlice ( token:string )

-----


Seuraava step on sitten rakentaa testit sille että rakennetaan erilaisia detektoreita, eli luokka voisi olla vaikka TokenDetector joka tunnistaa erilaisia asioita, vaikkapa numeroita, sit voidaan luoda vaikka TimeDetector, joka saa argumenttina TokenSlicen

Voidaan sitten kokeilla 

let slice = slice.detect( timeDetector ) // returns slice with type tag set

Jos slicen pituus on nolla eli length === 0 niin kyseisessä slicessäe ei ollut aika-arvoa.

Detektorit on tärkein juttu ja ne voitaisiin laittaa omiin Ranger tiedostoihin, jotka importoivat sitten tärkeimmät modulit, erilaisia detektoreita tarvitaan erilaisille Rangerin suureille, esim. erilaisia atomeja

10                      WholeNumber
10.4                    DecimalNumber
10:10                   TimeValue
2026-01-01              DateValue
2026-01-01T08:00:00     DateTimeValue
/10s                    RecoveryTime
2:50/100m               Speed
10x                     RepeatBlock
100kg                   Weight
100m                    Distance
10-50                   NumRangeBlock
100-200m                DistanceRangeBlock ( could be 100m-200m too )
3AM                     AMTimeValue
>                       DetailsData
# <text>                Heading data
120bpm                  BPM detector
120kcal                 KCAL detector
70%                     Percentage detector
40-50%                  Percentage range detector
1RM                     RM detector ( could be 5RM and so on )

Detectors should be returning TokenSlice which has the type tag set, so tag can be re-used here 

When we know the type of the Slice we can then parse the value based on type information

let slice = slice.detect( timeDetector )
let timeValues = timeDetector.parseValue( slice )

So it is enough to know that the slice is if time type and then we can apply the timeDetector to parse it.

Halutaan myös nopeita detektoreita tietyille avainsanoille, näihin ei tarvita kovin monimutkaista ja detektori voi olla dynaaminen rakenteeltaan ja voidaan luoda esim.

let splitDetector = new KeywordDetector("Split")

Tärkeää on että Repeat ei rajoiteta niin että on erikseen Sets ja Repeats vaan RepeatBlock toi toistua monta kertaa 10x10x10x10.... 

Näistä voidaan sitten johtaa monimutkaisempia molekyylejä niin että käytetään atomeja välissä 

WholeNumber "+" WholeNumber         MultiSeriesBlockDetector
RepeatBlock + WholeNumber           SetRepeatBlock


... ja niin edelleen


## Testing


Test 2:50/100m
Expect tag speed
Expect child 0 string 2:50
Expect child 2 string 100m


Test Swim 1000m
Test > Split 100m 2:45/100m
Expect 0 tag exercise
Expect 0 child 0 tag exercise-name
Expect 0 child 1 tag distance
Expect 1 tag details-data

Kun on useita peräkkäisiä `Test`-rivejä ilman väliin tulevaa `Expect`-riviä,
`Expect N ...` kohdistuu saman blokin N:nteen testiin (0-pohjainen indeksi).

Vanha muoto toimii edelleen:

Test 100kg bench
Expect tag weight
Expect child 0 string 100

JSON-export per testi:

Test > Swim 400m
JSON swim_details.json

Tai blokki-indeksillä:

Test > Swim 400m
Test >> Split 100m 2:45/100m
Test >>> Recovery 1min
JSON 2 common_recovery_data.json

`JSON tiedosto.json` kohdistuu viimeisimpään testiin.
`JSON N tiedosto.json` kohdistuu saman peräkkäisen Test-blokin N:nteen testiin.

Harness kirjoittaa tiedoston kielen output-kansioon:
- JS: `multiplatform/ranger/dist/ng/json/`
- Kotlin: `multiplatform/ranger/dist/ng-kotlin/json/`
- Swift: `multiplatform/ranger/dist/ng-swift/json/`

## Esimerkki

Circuit 3
> Swim 400m
>> Split 100m 2:45/100m
>>> Recovery 1min




