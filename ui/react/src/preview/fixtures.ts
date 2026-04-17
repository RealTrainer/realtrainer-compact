import type { CompactWorkoutModel } from '../lib/types';

/**
 * UKK Tuolijumppa liikepankki - demo workout for ActiveWorkoutSession.
 * Source: https://ukkinstituutti.fi/wp-content/uploads/2021/03/tuolijumppa-liikepankki.pdf
 */
export const activeWorkoutSessionCompactExample = `[2026-04-14] ## Tuolijumppa liikepankki
Tags pdf, ukk, harjoitepankki
Section Lämmittely
Exercise Hiihtoliike|2x10
Text Ojenna kädet ylös ja vie ne sitten taakse samalla ylävartaloa eteen kallistaen.
Exercise Marssi ja hartiat eteen-taakse|30s
Text Marssi paikallasi ja pyöritä hartioita samanaikaisesti eteen ja taakse.
Exercise Marssi ja potku eteen|2x10
Text Marssi kolme askelta ja potkaise neljännellä jalka terävästi suoraksi eteen.
Exercise Melontaliike|2x10
Text Tee käsillä laajaa melontaliikettä ja seuraa käsien liikettä katseellasi.
Exercise Pikajuoksuliike|20s
Text Tee nopeaa juoksuliikettä jaloilla ja käsillä istuen tuolin etureunalla.
Exercise Pumppaukset|2x15
Text Nosta vuorotellen kantapäitä ja varpaita irti lattiasta pitäen selkä suorana.
Exercise Vastakkaiset polvi ja kyynärpää|2x10
Text Nosta polvea ja vie vastakkaista kyynärpäätä sitä kohti mahdollisimman terävästi.
Section Lihaskunto
Exercise Jalan nosto|3x10
Text Nosta jalkaa koukussa irti lattiasta ylävartalon pysyessä liikkumattomana.
Exercise Keinutuoliliike|3x10
Text Kallista ylävartaloa taakse ja nosta jalat koukussa irti lattiasta vatsalihaksia jännittäen.
Exercise Kyynärpäiden veto taakse|3x12
Text Vedä kyynärpäitä suoraan taakse ja purista lapaluita yhteen rintakehän pysyessä auki.
Exercise Pakaroiden nosto|3x8
Text Nosta pakarat irti tuolista käsien varassa ja laskeudu hitaasti takaisin.
Exercise Pyöräilyliike|30s
Text Nojaa ylävartaloa taakse ja tee jaloilla polkupyöräliikettä ilmassa.
Exercise Tuolilta ylösnousu|3x10
Text Nouse tuolilta seisomaan selkä suorana ja laskeudu hallitusti takaisin istumaan.
Section Venyttely
Exercise Lonkankoukistajat|30s
Text Vie toinen jalka taakse ja työnnä lantiota eteenpäin, kunnes tunnet venytyksen nivusessa.
Exercise Niska- ja hartiaseudun venytys|30s
Text Kallista päätä sivulle ja paina vastakkaista hartiaa alas venytyksen tehostamiseksi.
Exercise Pyöristys ja aukaisu|1x5
Text Pyöristä yläselkä leuka rinnassa ja avaa sitten rintakehä viemällä kädet taakse.
Exercise Reiden takaosa ja säären etuosa|30s
Text Ojenna jalka suoraksi eteen kantapää lattiassa ja kallista ylävartaloa suorana eteenpäin.
Exercise Vatsalihasten venytys|30s
Text Ojenna jalat ja kädet pitkäksi ja nojaa ylävartaloa taaksepäin tuolin selkänojaa vasten.
Exercise Yläselän venytys|30s
Text Työnnä yhteen liitettyjä käsiä eteenpäin ja pyöristä yläselkää katse alaspäin.
Section Muu
Exercise Jalan heilautus eteen-taakse|2x10
Text Seiso tuolin vieressä ja heilauta jalkaa suorana eteen ja taakse.
Exercise Jalan loitonnus ja vienti eteen ristiin|2x8
Text Heilauta jalkaa rennosti sivulle, eteen, sivulle ja lopuksi ristiin toisen jalan eteen.
Exercise Piirrä kahdeksikko|2x5
Text Seiso yhdellä jalalla ja piirrä toisella jalalla mahdollisimman suurta kahdeksikkoa ilmassa.
Exercise Tandemkävely|10 askelta
Text Kävele asettamalla kantapää suoraan toisen jalan varpaiden eteen.
Exercise Tandemkävely ja polvi ylös|10 askelta
Text Kävele tandemaskelin ja nosta jalka välillä korkealle koukkuun ennen seuraavaa askelta.
URL https://ukkinstituutti.fi/wp-content/uploads/2021/03/tuolijumppa-liikepankki.pdf
`;

export const sampleWorkout: CompactWorkoutModel = {
  title: 'Voima- ja Kestavyysharjoitus',
  date: '08.04.2026',
  tags: ['kuntosali', 'voima', 'kestavyys'],
  emojis: '🏃⚡💪',
  points: 75,
  rows: [
    { id: 'summary-1', type: 'summary', text: 'Testataan blogview ja editori samoilla riveilla.' },
    { id: 'phase-1', type: 'phase', number: 1, name: 'Alkuverryttely', details: 'Nosta syke rauhallisesti' },
    {
      id: 'move-1',
      type: 'move',
      sport: 'rintauinti',
      sets: 1,
      count: 1,
      duration: { value: 12, unit: 'min' },
      distance: { value: 500, unit: 'm' },
      note: 'CrossTrainer',
      splits: [
        {
          id: 'split-1',
          type: 'split',
          distance: { value: 100, unit: 'm' },
          pace: { minutes: 3, seconds: 12, perDistance: { value: 100, unit: 'm' } },
          hr: 137,
          note: 'tekniikka',
        },
      ],
    },
    { id: 'section-1', type: 'section', name: 'Voima' },
    { id: 'exercise-1', type: 'exercise', name: 'Penkkipunnerrus kasipainoin', sets: 3, reps: 10, weightKg: 15 },
    {
      id: 'pyramid-1',
      type: 'pyramid',
      name: 'Alataljasoutu',
      sets: [
        { reps: 12, weightKg: 52.5 },
        { reps: 12, weightKg: 52.5 },
        { reps: 12, weightKg: 52.5 },
      ],
    },
    { id: 'custom-1', type: 'custom', name: 'Kalorit', value: 239, unit: 'kcal' },
    { id: 'duration-1', type: 'duration', value: 20, unit: 'min', description: 'Kestavyysosio' },
    { id: 'text-1', type: 'text', text: 'Huomio: tekniikka pysyi hallinnassa loppuun asti.' },
    { id: 'unknown-1', type: 'unknown', raw: 'Blorple this should be unknown line and highlighted as error' },
  ],
};
