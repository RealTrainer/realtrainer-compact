/**
 * TypeScript Types for Compact Format
 *
 * These types describe the AST produced by the compact.pegjs parser.
 */

/**
 * Date or time period specification. Supports specific dates, datetimes, weeks, months, years, date ranges, and rolling periods.
 * @example
 * [2025-12-31]
 * [2025-12-31T18:00+02]
 * [W52/2025]
 * [2025-12]
 * [2025-12-01..31]
 * [2025-05-01..2025-05-06]
 * [4W:2025-12-31]
 */
export type DateValue =
  | { type: 'date'; year: number; month: number; day: number; unknown?: boolean }
  | { type: 'datetime'; year: number; month: number; day: number; hour: number; minute: number; timezone: string | null }
  | { type: 'week'; year: number; week: number }
  | { type: 'month'; year: number; month: number }
  | { type: 'year'; year: number }
  | { type: 'range'; year: number; month: number; startDay: number; endDay: number }
  | { type: 'range'; startYear: number; startMonth: number; startDay: number; endYear: number; endMonth: number; endDay: number }
  | { type: 'rolling'; weeks: number; endYear: number; endMonth: number; endDay: number };

/**
 * Weight specification supporting absolute weight, bodyweight, percentage of 1RM, or template placeholders.
 * @example
 * @60kg
 * @135lb
 * @bodyweight
 * @70%1RM
 * @2x32kg
 */
export type Weight =
  | { value: number; unit: 'kg' | 'lb' | 'bodyweight' | 'bar'; count: number; valueMax: number }
  | { percent: number; percentMax: number; of: '1RM' }
  | { template: Template };

/**
 * Template placeholder for values to be filled in later. Uses PEG.js rule names for type validation.
 * @example
 * {{PaceTime:target pace}}
 * {{Int:max reps}}
 * {{Number:weight}}
 */
export interface Template {
  type: 'PaceTime' | 'Int' | 'Number' | 'HRZone' | 'SwimZone' | 'Distance' | '?';
  hint: string;
}

/**
 * Distance specification with value and unit.
 * @example
 * 200m
 * 5km
 * 3mi
 * 100yd
 * 20-40m
 */
export interface Distance {
  value: number | null;
  valueMax?: number;
  unit: 'km' | 'mi' | 'yd' | 'ft' | 'm' | null;
}

/**
 * Time duration with value and unit.
 * @example
 * 30s
 * 10min
 * 60s
 */
export interface Duration {
  value: number;
  unit: 'min' | 's';
}

/**
 * Exercise intensity specification. Supports percentage, heart rate, HR zones, swim zones, pace, or text description.
 * @example
 * @80%
 * @80-90%
 * @120-150bpm
 * @Z2-Z3
 * @I-IV
 * @3:50-3:40/km
 * @easy
 */
export type Intensity =
  | { min: number; max: number }
  | { unknown: true }
  | { text: string }
  | { hr: HRIntensity }
  | { hrZone: HRZoneRange }
  | { zone: SwimZoneRange }
  | {
      paceMin: PaceTime;
      paceMax: PaceTime;
      paceUnit: 'km' | 'mi' | 'm' | 'yd' | 'ft';
      pacePerDistance?: { value: number; unit: 'km' | 'mi' | 'm' | 'yd' | 'ft' };
    }
  | { template: Template };

/**
 * Heart rate based intensity specification.
 * @example
 * @120-150bpm
 * @<150bpm
 * @>120bpm
 * @<=150bpm
 * @>=120bpm
 * @=140bpm
 */
export interface HRIntensity {
  value?: number;
  min?: number;
  max?: number;
  comparison?: 'lt' | 'gt' | 'lte' | 'gte' | 'eq';
}

/**
 * Heart rate zone range using zone numbers (1-5).
 * @example
 * @Z2
 * @Z2-Z4
 */
export interface HRZoneRange {
  min: number;
  max: number;
}

/**
 * Swimming intensity zone using roman numerals (I-V).
 * @example
 * @III
 * @I-III
 * @I+III
 */
export type SwimZoneRange =
  | { min: 'I' | 'II' | 'III' | 'IV' | 'V'; max: 'I' | 'II' | 'III' | 'IV' | 'V' }
  | { combo: ('I' | 'II' | 'III' | 'IV' | 'V')[] };

/**
 * Pace time specification in minutes:seconds format.
 * @example
 * 3:50/km
 * 4:00-4:30/km
 */
export interface PaceTime {
  minutes: number;
  seconds: number;
  fraction?: number;
}

/**
 * Rest/recovery period between sets or exercises.
 * @example
 * /60s
 * /2min
 * /30-60s
 * /walk
 */
export interface Recovery {
  value: number | null;
  max: number | null;
  unit: 'min' | 'sec' | 'walk' | null;
  text?: string;
}

/**
 * Number of repetitions. Can be a number, "max" for AMRAP, or RM (rep max) notation.
 * @example
 * 10
 * max
 * 5RM
 */
export type RepCount = number | 'max' | null | { rm: number };

/**
 * Measured duration for a single set (actual recorded time).
 * @example
 * { left: 23, right: null, unit: 's' } // Single side: 23s
 * { left: 23, right: 28, unit: 's' } // Bilateral: 23s+28s
 */
export interface MeasuredDuration {
  left: number;
  right: number | null;
  unit: 's' | 'min';
}

/**
 * A strength or conditioning exercise with sets, reps, weight, and other parameters.
 * @example
 * penkkipunnerrus 3x10@60kg/90s
 * hauiskääntö 3x8-12@30kg
 * kyykky 5x5@100kg/2min
 * lankku|23s, 34s, 28s (measured durations)
 */
export interface Exercise {
  type: 'exercise';
  name: string;
  sets: number;
  setsMax?: number;
  reps: RepCount | null;
  repsMax: number | null;
  repsRight?: number;
  unit: 's' | 'min' | 'm' | null;
  weight: Weight | null;
  recovery: Recovery | null;
  note: string | null;
  description: string | null;
  customFields: CustomField[] | null;
  // Measured durations (actual recorded times per set)
  specType?: 'measured' | 'multiset';
  measuredDurations?: MeasuredDuration[];
  isBilateral?: boolean;
}

/**
 * Pace specification for splits in minutes'seconds"/distance format.
 * @example
 * 3'39"/100m
 * 3:39/km
 * 2'55"/100m
 */
export interface SplitPace {
  minutes: number;
  seconds: number;
  perDistance: {
    value: number;
    unit: string;
  };
}

/**
 * A split/lap within a parent Move - used for recording intermediate times.
 * Splits are NOT counted separately in statistics (parent Move has the total).
 * Can also appear as standalone content entries (not attached to a Move).
 * @example
 * > Split 150m 3'39"/100m | sarja 1
 * > 450m 2'55"/100m 124bpm
 * > 100m@Z4 [[käsiräpylät]] | tekniikka
 */
export interface Split {
  type: 'split';
  distance: Distance | null;
  duration?: Duration | null;
  pace?: SplitPace | null;
  intensity: Intensity | null;
  hr?: number | null;
  customFields?: CustomField[] | null;
  note: string | null;
  splits?: Split[]; // Nested splits (recursive)
}

/**
 * A cardio/movement exercise like running, swimming intervals.
 * @example
 * 5x200m@80%/60s
 * 8x400m@3:50-3:40/km/2min
 * 30min 3.5km 8228steps | Kävely
 */
export interface Move {
  type: 'move';
  sport: string;
  sets: number;
  count: number;
  countMax: number | null;
  distance: Distance | null;
  duration?: Duration | null;
  steps?: number | null;
  intensity: Intensity | null;
  recovery: Recovery | null;
  note: string | null;
  description: string | null;
  customFields?: CustomField[] | null;
  splits?: Split[]; // Child splits/laps (not counted in statistics)
}

/**
 * Single set within a pyramid exercise structure.
 * @example
 * 10@40kg
 * 8@50kg
 * 2x5@60kg (2 sets of 5 reps)
 */
export interface PyramidSet {
  sets?: number;
  reps: number;
  repsRight?: number;
  weight: Weight | null;
}

/**
 * Pyramid training structure with varying reps/weight per set.
 * @example
 * kyykky pyramid [10@40kg, 8@50kg, 6@60kg, 8@50kg, 10@40kg]
 */
export interface Pyramid {
  type: 'pyramid';
  name: string;
  sets: PyramidSet[];
  note: string | null;
}

/**
 * Exercise item within a Circuit. Simplified version of Exercise for circuit context.
 * @example
 * > Penkkipunnerrus 8@80kg
 * > Etunojapunnerrus 5
 */
export interface CircuitItem {
  name: string;
  sets?: number;
  reps?: number;
  repsRight?: number;
  unit?: 's' | 'min' | 'm' | null;
  weight?: Weight | null;
  recovery?: Recovery | null;
  note?: string | null;
  customFields?: CustomField[] | null;
}

/**
 * Circuit/Superset training - multiple exercises performed in rotation.
 * All exercises are performed once before repeating the circuit.
 * @example
 * Circuit|3
 * > Penkkipunnerrus 8@80kg
 * > Etunojapunnerrus 5
 * 
 * Superset|4
 * > Hauiskääntö 10@12kg
 * > Ojentajapunnerrus 10@12kg
 */
export interface Circuit {
  type: 'circuit';
  /** Circuit variant: 'circuit' for full circuit, 'superset' for 2-exercise pairs */
  variant: 'circuit' | 'superset';
  /** Number of rounds/rotations through the circuit */
  rounds: number;
  /** Exercises in the circuit */
  exercises: CircuitItem[];
  /** Recovery between exercises within a circuit */
  recovery?: Recovery | null;
  /** Rest between complete rounds */
  roundRest?: Recovery | null;
  note?: string | null;
}

/**
 * Sport type indicator with intensity level (0-3).
 * @example
 * # juoksu
 * ## uinti
 * ### pyöräily
 */
export interface Sport {
  type: 'sport';
  level: 0 | 1 | 2 | 3;
  name: string;
}

/**
 * Training phase within a workout (e.g., warmup, main, cooldown).
 * @example
 * =1 Alkulämmittely
 * =2 Pääharjoitus
 */
export interface Phase {
  type: 'phase';
  number: number;
  name: string;
  details: string | null;
}

/**
 * Named section within a workout phase.
 * @example
 * § Lämmittely
 * § Venyttely
 */
export interface Section {
  type: 'section';
  name: string;
  intensity: number | null;
  duration: number | null;
}

/**
 * Subjective feeling or RPE (Rate of Perceived Exertion) rating.
 * @example
 * !RPE 7
 * !tunne 3 väsynyt
 */
export interface Feeling {
  type: 'feeling';
  scale: 'rpe' | 'feeling';
  value: number;
  description: string | null;
}

/**
 * Pain or discomfort notation with body part and severity.
 * @example
 * !kipu polvi 3
 * !kipu alaselkä
 */
export interface Pain {
  type: 'pain';
  bodyPart: string | null;
  severity: number | null;
  description: string;
}

/**
 * Vital measurements like weight, sleep, HRV, resting heart rate.
 * @example
 * !paino 75kg
 * !paino 165lb
 * !uni 7.5h
 * !leposyke 55bpm
 */
export interface Vitals {
  type: 'vitals';
  key: string;
  value: number;
  unit: 'kg' | 'lb' | 'h' | '%' | 'bpm' | '°C' | 'ms' | null;
}

/**
 * Strength maximum (1RM) record, can be measured or estimated.
 * @example
 * !max penkkipunnerrus 1x100kg
 * !max* kyykky 5x80kg
 */
export interface Max {
  type: 'max';
  name: string;
  reps: number;
  weight: number;
  unit: string;
  estimated: boolean;
  pr: boolean;
  calculation: { reps: number; weight: number; unit: string } | null;
}

/**
 * Personal best record for time/distance events.
 * @example
 * !best 5km 20:00
 * !best 1mi 5:30
 * !best 100m 11.5s PR
 */
export interface Best {
  type: 'best';
  name: string;
  result: { value: number; unit: 'time' | 'm' | 'km' | 'mi' | 'yd' | 'ft' | 's' | 'min' | 'count' };
  pr: boolean;
}

/**
 * A timed activity block without specific exercises.
 * @example
 * 30min venyttely
 * 60min palauttava lenkki
 */
export interface DurationBlock {
  type: 'duration';
  duration: Duration | null;
  timeOfDay?: { hour: number; minute: number };
  description: string | null;
}

/**
 * Ground contact count for plyometric exercises.
 * @example
 * !kontaktit 120
 */
export interface Contacts {
  type: 'contacts';
  count: number | null;
  sets: number | null;
  reps: number | null;
  name: string;
}

/**
 * Tags for categorizing workouts.
 * @example
 * #voima #jalat
 * #tempo #juoksu
 */
export interface Tags {
  type: 'tags';
  tags: string[];
}

/**
 * Visual emoji indicators for the workout entry.
 * @example
 * Emojis 🏋️💪🥗
 */
export interface Emojis {
  type: 'emojis';
  emojis: string;
}

/**
 * Free-form text note within a workout.
 * @example
 * > Hyvä treeni!
 * > Huom: venyttele enemmän
 */
export interface Text {
  type: 'text';
  value: string;
}

/**
 * Metadata key-value pair for additional workout info.
 * @example
 * $sää aurinkoinen
 * $paikka kuntosali
 */
export interface Meta {
  type: 'meta';
  key: string;
  value: string;
}

/**
 * Custom field attached to an exercise for tracking additional data like tempo, ROM, grip, etc.
 * @example
 * [[Tempo:3010]]
 * [[ROM:90°]]
 * [[Ote:Viistomyötäote]]
 */
export interface CustomField {
  name: string;
  value: number | string | boolean;
  unit: string | null;
}

/**
 * User-defined tracking value at workout level (e.g., workout weight, session focus).
 * @example
 * Custom Treenipaino 85
 * Custom Leveys 4
 * Custom Liikelaajuus 90|°
 */
export interface Custom {
  type: 'custom';
  name: string;
  value: number;
  unit: string | null;
  note: string | null;
}

/**
 * Derived value from feature vectors or computed analytics at workout/day level.
 * @example
 * Derived strength.neural_stress 72|score basis:entity confidence:88% source:exercise+load goodness:4
 * Derived endurance.zone2_minutes 95|min basis:day confidence:74 source:"all workouts" goodness:5 | pitkä pk-päivä
 */
export interface Derived {
  type: 'derived';
  name: string;
  value: number;
  unit: string | null;
  basis: 'entity' | 'day' | null;
  confidence: number | null;
  source: string | null;
  goodness: 1 | 2 | 3 | 4 | 5 | null;
  note: string | null;
}

/**
 * Food/nutrition tracking entry with optional macros.
 * @example
 * Food 130kcal 0.1g/prot | tummaa leipää
 * Food | aamupala
 */
export interface Food {
  type: 'food';
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  nutrients: NutrientValue[];
  description: string | null;
}

/**
 * Generic nutrient value used in Food/Drinking entries.
 * Name should be parser-compatible ASCII key (e.g. prot, carb, fat, fiber, omega3, sodium).
 */
export interface NutrientValue {
  name: string;
  value: number;
  unit: 'g' | 'mg' | 'mcg' | 'µg' | 'ug' | 'ml' | 'IU' | 'kcal' | string;
}

/**
 * Fluid intake tracking entry.
 * @example
 * Drinking 0.5l | vesi
 * Drinking 0.6l water | kahvi
 * Drinking 2dl | maito
 */
export interface Drinking {
  type: 'drinking';
  volume: number | null;
  volumeUnit: 'l' | 'dl' | 'ml' | null;
  calories: number | null;
  protein: number | null;
  nutrients: NutrientValue[] | null;
  liquid: string | null;
  description: string | null;
}

/**
 * Training-related expense tracking with optional VAT (ALV).
 * @example
 * Expense 4.50EUR | Bussilippu
 * Expense entry pirkkahalli 5.00USD
 * Expense 80EUR | Fysioterapiakäynti
 * Expense 100EUR ALV24% 19.35EUR | Konsultointi (with VAT)
 */
export interface Expense {
  type: 'expense';
  expenseType: 'general' | { type: 'entry' | 'transport' | 'membership' | 'equipment' | 'coaching' | 'health'; name: string };
  amount: number;
  currency: 'EUR' | 'USD' | 'GBP' | 'SEK' | 'NOK' | 'DKK' | '€' | '$' | '£';
  vatPercent: number | null;
  vatAmount: number | null;
  description: string | null;
}

/**
 * Date-based reminder entry.
 * @example
 * Reminder 2026-01-15 | Ilmoittautuminen päättyy
 */
export interface Reminder {
  type: 'reminder';
  date: { year: number; month: number; day: number };
  description: string | null;
}

/**
 * Training location entry.
 * @example
 * Location Tampere, Pirkkahalli
 * Location Helsinki
 */
export interface Location {
  type: 'location';
  place: string;
}

/**
 * URL/link entry for workouts.
 * @example
 * URL https://kisa.fi/ilmo
 */
export interface Url {
  type: 'url';
  url: string;
}

/**
 * Body measurement entry (weight, body fat, waist, hip).
 * @example
 * Weight 85.2kg
 * BodyFat 12.5%
 * Waist 82cm
 */
export interface BodyMeasurement {
  type: 'measurement';
  measureType: 'weight' | 'bodyFat' | 'waist' | 'hip';
  value: number;
  unit: 'kg' | 'lb' | '%' | 'cm' | 'in';
}

/**
 * Sleep tracking entry with duration and optional quality/HRV/RHR.
 * @example
 * Sleep 7.5h quality:good
 * Sleep 8h
 * Sleep 6.5h quality:poor hrv:45 rhr:52
 */
export interface SleepEntry {
  type: 'sleep';
  duration: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor' | null;
  hrv: number | null;
  rhr: number | null;
}

/**
 * Health-related entry (physio, injury, medication, etc.).
 * @example
 * Health physio | Olkapään mobilisaatio
 * Health injury | Polven kipu
 * Health medication | Ibuprofeeni 400mg
 */
export interface Health {
  type: 'health';
  healthType: 'physio' | 'injury' | 'pain' | 'medication' | 'supplement' | 'appointment' | 'checkup';
  description: string | null;
}

/**
 * Workout summary text.
 * @example
 * Summary Hyvä treeni, jaksoi hyvin
 */
export interface Summary {
  type: 'summary';
  text: string;
}

/**
 * Interval training specification.
 * @example
 * Interval 4x400m@80-90%/2-3m
 * Interval 5x200m@50%/2min
 */
export interface Interval {
  type: 'interval';
  count: number;
  distance: Distance;
  intensity: { min: number; max: number };
  recovery: { min: number; max: number };
}

/**
 * Unknown/unparsed line that didn't match any pattern.
 * Prevents malformed lines from breaking the entire document.
 */
export interface Unknown {
  type: 'unknown';
  raw: string;
}

/**
 * Union type of all possible workout content items.
 */
export type Content =
  | Tags
  | Emojis
  | Sport
  | Phase
  | Section
  | Exercise
  | Pyramid
  | Circuit
  | Move
  | Split
  | DurationBlock
  | Contacts
  | Feeling
  | Pain
  | Vitals
  | Max
  | Best
  | Meta
  | Text
  | Derived
  | Custom
  | Food
  | Drinking
  | Expense
  | Reminder
  | Location
  | Url
  | BodyMeasurement
  | SleepEntry
  | Health
  | Summary
  | Interval
  | Unknown;

/**
 * A complete workout entry with date, title, and content.
 * @example
 * [2025-01-15] Voimaharjoitus # kuntosali...
 */
export interface Workout {
  type: 'workout';
  id: string | null;
  date: DateValue | null;
  title: string | null;
  content: Content[];
  /** Original user input before AI transformation (added at runtime, not from parser) */
  originalInput?: string;
}

/**
 * Aggregated statistics for a time period.
 */
export interface Stats {
  type: 'stats';
  period: DateValue;
  workouts: number;
  exercises: number;
  sets: number;
  reps: number;
  weight: number | null;
  minutes: number | null;
  contacts: number | null;
}

/**
 * Root document containing all workouts and stats.
 */
export interface Document {
  workouts: Workout[];
  stats: Stats[];
}
