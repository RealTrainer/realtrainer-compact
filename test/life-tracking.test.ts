/**
 * Life tracking parsing tests
 * Adapted from realtrainer/backend/src/__tests__/life-tracking.test.ts
 * Using actual syntax that the compact.pegjs grammar supports
 */

import { describe, it, expect } from 'vitest';
import { parseCompact } from '../dist/index.js';

// Helper to parse a workout and return the document
function parseInput(input: string) {
  const result = parseCompact(input);
  if (!result.success) {
    throw new Error(`Parse failed: ${result.error.message}`);
  }
  return result.document;
}

// Helper to get specific content type from parsed workout
function getContent(input: string, type: string) {
  const result = parseInput(input);
  const workout = result.workouts[0];
  const content = workout.content.find((c: any) => c.type === type || c.measureType === type);
  if (!content) {
    throw new Error(`Content type '${type}' not found. Available: ${workout.content.map((c: any) => c.type).join(', ')}`);
  }
  return content;
}

// =============================================================================
// DateTime tests
// =============================================================================

describe('DateTime', () => {
  it('parses date with time', () => {
    const result = parseInput('[2026-01-06T07:30] ## Aamupala\n');
    const workout = result.workouts[0];
    expect(workout.date.type).toBe('datetime');
    expect(workout.date.year).toBe(2026);
    expect(workout.date.month).toBe(1);
    expect(workout.date.day).toBe(6);
    expect(workout.date.hour).toBe(7);
    expect(workout.date.minute).toBe(30);
  });

  it('parses date with time and timezone', () => {
    const result = parseInput('[2026-01-06T07:30+02] ## Aamupala\n');
    const workout = result.workouts[0];
    expect(workout.date.timezone).toBe('+02');
  });

  it('parses date without time (backwards compatible)', () => {
    const result = parseInput('[2026-01-06] ## Treeni\n');
    const workout = result.workouts[0];
    expect(workout.date.type).toBe('date');
    expect(workout.date.hour).toBeUndefined();
  });
});

// =============================================================================
// Food tests
// =============================================================================

describe('Food', () => {
  it('parses food with calories and protein', () => {
    const content = getContent('[2026-01-06] ## Aamupala\nFood 450kcal 30g/prot | kaurapuuro\n', 'food');
    expect(content.calories).toBe(450);
    expect(content.protein).toBe(30);
    expect(content.description).toBe('kaurapuuro');
  });

  it('parses food with calories only', () => {
    const content = getContent('[2026-01-06] ## Aamupala\nFood 200kcal | kahvileipä\n', 'food');
    expect(content.calories).toBe(200);
    expect(content.protein).toBeNull();
  });

  it('parses food with description only', () => {
    const content = getContent('[2026-01-06] ## Aamupala\nFood | aamupala\n', 'food');
    expect(content.calories).toBeNull();
    expect(content.description).toBe('aamupala');
  });
});

// =============================================================================
// Drinking tests
// =============================================================================

describe('Drinking', () => {
  it('parses drinking with volume in liters', () => {
    const content = getContent('[2026-01-06] ## Nesteytys\nDrinking 0.5l | vesi\n', 'drinking');
    expect(content.volume).toBe(0.5);
    expect(content.volumeUnit).toBe('l');
    expect(content.description).toBe('vesi');
  });

  it('parses drinking with volume in deciliters', () => {
    const content = getContent('[2026-01-06] ## Nesteytys\nDrinking 2dl | kahvi\n', 'drinking');
    expect(content.volume).toBe(2);
    expect(content.volumeUnit).toBe('dl');
  });

  it('parses drinking with volume in milliliters', () => {
    const content = getContent('[2026-01-06] ## Nesteytys\nDrinking 500ml | mehu\n', 'drinking');
    expect(content.volume).toBe(500);
    expect(content.volumeUnit).toBe('ml');
  });
});

// =============================================================================
// Expense tests
// =============================================================================

describe('Expense', () => {
  it('parses expense in EUR', () => {
    const content = getContent('[2026-01-06] ## Kulut\nExpense 4.50EUR | Bussilippu\n', 'expense');
    expect(content.amount).toBe(4.50);
    expect(content.currency).toBe('EUR');
    expect(content.description).toBe('Bussilippu');
  });

  it('parses expense in USD', () => {
    const content = getContent('[2026-01-06] ## Kulut\nExpense 5.00USD | Entry fee\n', 'expense');
    expect(content.amount).toBe(5.00);
    expect(content.currency).toBe('USD');
  });

  it('parses expense with € symbol', () => {
    const content = getContent('[2026-01-06] ## Kulut\nExpense 80€ | Fysioterapia\n', 'expense');
    expect(content.amount).toBe(80);
    expect(content.currency).toBe('€');
  });

  it('parses expense with integer amount', () => {
    const content = getContent('[2026-01-06] ## Kulut\nExpense 50EUR | Jäsenmaksu\n', 'expense');
    expect(content.amount).toBe(50);
  });

  it('parses named entry expense', () => {
    const content = getContent('[2026-01-06] ## Kulut\nExpense entry pirkkahalli 5.00USD | sisäänpääsy\n', 'expense');
    expect(content.expenseType).toEqual({ type: 'entry', name: 'pirkkahalli' });
    expect(content.amount).toBe(5);
    expect(content.currency).toBe('USD');
    expect(content.description).toBe('sisäänpääsy');
  });
});

// =============================================================================
// Emojis tests
// =============================================================================

describe('Emojis', () => {
  it('parses single emoji', () => {
    const input = `[2026-01-06] ## Treeni
Emojis 💪
`;
    const result = parseInput(input);
    const emojisContent = result.workouts[0].content.find((c: any) => c.type === 'emojis');
    expect(emojisContent).toBeDefined();
    expect(emojisContent.emojis).toContain('💪');
  });

  it('parses multiple emojis', () => {
    const input = `[2026-01-06] ## Aamupala
Emojis 🍳☕🥛
`;
    const result = parseInput(input);
    const emojisContent = result.workouts[0].content.find((c: any) => c.type === 'emojis');
    expect(emojisContent).toBeDefined();
    expect(emojisContent.emojis).toContain('🍳');
    expect(emojisContent.emojis).toContain('☕');
    expect(emojisContent.emojis).toContain('🥛');
  });

  it('parses emojis with tags together', () => {
    const input = `[2026-01-06] ## Kulut
Tags ruoka, liikenne
Emojis 🍔🚗
Expense 15EUR | Lounas
`;
    const result = parseInput(input);
    const workout = result.workouts[0];
    
    const tagsContent = workout.content.find((c: any) => c.type === 'tags');
    expect(tagsContent).toBeDefined();
    expect(tagsContent.tags).toContain('ruoka');
    expect(tagsContent.tags).toContain('liikenne');
    
    const emojisContent = workout.content.find((c: any) => c.type === 'emojis');
    expect(emojisContent).toBeDefined();
    expect(emojisContent.emojis).toContain('🍔');
    expect(emojisContent.emojis).toContain('🚗');
  });

  it('parses titleless emoji snippets as workouts', () => {
    const input = `Emojis 💪🏋️\n`;
    const result = parseInput(input);

    expect(result.workouts).toHaveLength(1);
    expect(result.workouts[0].title).toBeNull();

    const emojisContent = result.workouts[0].content.find((c: any) => c.type === 'emojis');
    expect(emojisContent).toBeDefined();
    expect(emojisContent.emojis).toContain('💪');
    expect(emojisContent.emojis).toContain('🏋️');
  });
});

// =============================================================================
// Reminder tests
// =============================================================================

describe('Reminder', () => {
  it('parses reminder with date and description', () => {
    const content = getContent('[2026-02-15] ## SM-kilpailut\nReminder 2026-01-15 | Ilmoittautuminen päättyy\n', 'reminder');
    expect(content.date).toEqual({ year: 2026, month: 1, day: 15 });
    expect(content.description).toBe('Ilmoittautuminen päättyy');
  });

  it('parses reminder without description', () => {
    const content = getContent('[2026-02-15] ## Deadline\nReminder 2026-01-31\n', 'reminder');
    expect(content.date).toEqual({ year: 2026, month: 1, day: 31 });
    expect(content.description).toBeNull();
  });
});

// =============================================================================
// URL tests
// =============================================================================

describe('URL', () => {
  it('parses URL with https', () => {
    const content = getContent('[2026-01-06] ## Link\nURL https://kisa.fi/ilmo\n', 'url');
    expect(content.url).toBe('https://kisa.fi/ilmo');
  });

  it('parses URL with http', () => {
    const content = getContent('[2026-01-06] ## Link\nURL http://example.com/path\n', 'url');
    expect(content.url).toBe('http://example.com/path');
  });
});

// =============================================================================
// Location tests
// =============================================================================

describe('Location', () => {
  it('parses location with city and venue', () => {
    const content = getContent('[2026-01-06] ## Tapahtuma\nLocation Tampere, Pirkkahalli\n', 'location');
    expect(content.place).toBe('Tampere, Pirkkahalli');
  });

  it('parses location with simple name', () => {
    const content = getContent('[2026-01-06] ## Treeni\nLocation Kuntosali\n', 'location');
    expect(content.place).toBe('Kuntosali');
  });
});

// =============================================================================
// Body Measurement tests (using Weight and BodyFat keywords)
// =============================================================================

describe('BodyMeasurement', () => {
  it('parses weight in kg', () => {
    const content = getContent('[2026-01-06] ## Mittaus\nWeight 85.2kg\n', 'weight');
    expect(content.measureType).toBe('weight');
    expect(content.value).toBe(85.2);
    expect(content.unit).toBe('kg');
  });

  it('parses weight in lb', () => {
    const content = getContent('[2026-01-06] ## Mittaus\nWeight 185lb\n', 'weight');
    expect(content.measureType).toBe('weight');
    expect(content.value).toBe(185);
    expect(content.unit).toBe('lb');
  });

  it('parses body fat percentage', () => {
    const content = getContent('[2026-01-06] ## Mittaus\nBodyFat 12.5%\n', 'bodyFat');
    expect(content.measureType).toBe('bodyFat');
    expect(content.value).toBe(12.5);
    expect(content.unit).toBe('%');
  });

  it('parses integer body fat', () => {
    const content = getContent('[2026-01-06] ## Mittaus\nBodyFat 15%\n', 'bodyFat');
    expect(content.value).toBe(15);
  });
});

// =============================================================================
// Sleep tests
// =============================================================================

describe('Sleep', () => {
  it('parses sleep with duration and quality', () => {
    const content = getContent('[2026-01-06] ## Uni\nSleep 7.5h quality:good\n', 'sleep');
    expect(content.duration).toBe(7.5);
    expect(content.quality).toBe('good');
  });

  it('parses sleep with duration only', () => {
    const content = getContent('[2026-01-06] ## Uni\nSleep 8h\n', 'sleep');
    expect(content.duration).toBe(8);
    expect(content.quality).toBeNull();
  });

  it('parses sleep with excellent quality', () => {
    const content = getContent('[2026-01-06] ## Uni\nSleep 9h quality:excellent\n', 'sleep');
    expect(content.quality).toBe('excellent');
  });

  it('parses sleep with poor quality', () => {
    const content = getContent('[2026-01-06] ## Uni\nSleep 5h quality:poor\n', 'sleep');
    expect(content.quality).toBe('poor');
  });
});

// =============================================================================
// Health tests
// =============================================================================

describe('Health', () => {
  it('parses health physio entry', () => {
    const content = getContent('[2026-01-06] ## Hoito\nHealth physio | Olkapään mobilisaatio\n', 'health');
    expect(content.healthType).toBe('physio');
    expect(content.description).toBe('Olkapään mobilisaatio');
  });

  it('parses health injury entry', () => {
    const content = getContent('[2026-01-06] ## Vamma\nHealth injury | Polven kipu\n', 'health');
    expect(content.healthType).toBe('injury');
    expect(content.description).toBe('Polven kipu');
  });

  it('parses health medication entry', () => {
    const content = getContent('[2026-01-06] ## Lääke\nHealth medication | Ibuprofeeni 400mg\n', 'health');
    expect(content.healthType).toBe('medication');
  });

  it('parses health supplement entry', () => {
    const content = getContent('[2026-01-06] ## Lisäravinteet\nHealth supplement | Kreatiini 5g\n', 'health');
    expect(content.healthType).toBe('supplement');
  });
});

// =============================================================================
// Combined workout tests
// =============================================================================

describe('Combined PLAN_LIFE workout', () => {
  it('parses full day entry with multiple life tracking items', () => {
    const input = `[2026-01-06T07:30] ## Aamupala
Food 450kcal 30g/prot | kaurapuuro, maitorahka
Drinking 0.5l | vesi

[2026-01-06T08:00] ## Salitreeni
Exercise Penkkipunnerrus|4x5@80kg
Expense 4.50EUR | Bussilippu

[2026-01-06] ## Mittaus
Weight 85.2kg
BodyFat 12.5%
Sleep 7.5h quality:good
`;
    const result = parseInput(input);
    expect(result.workouts).toHaveLength(3);
    
    // Check food entry
    const breakfast = result.workouts[0];
    expect(breakfast.date.type).toBe('datetime');
    expect(breakfast.date.hour).toBe(7);
    const food = breakfast.content.find((c: any) => c.type === 'food');
    expect(food.calories).toBe(450);
    
    // Check exercise + expense
    const gym = result.workouts[1];
    const exercise = gym.content.find((c: any) => c.type === 'exercise');
    expect(exercise.name).toBe('Penkkipunnerrus');
    const expense = gym.content.find((c: any) => c.type === 'expense');
    expect(expense.amount).toBe(4.50);
    
    // Check measurements
    const measurement = result.workouts[2];
    const weight = measurement.content.find((c: any) => c.measureType === 'weight');
    expect(weight.value).toBe(85.2);
    const sleep = measurement.content.find((c: any) => c.type === 'sleep');
    expect(sleep.duration).toBe(7.5);
  });

  it('parses event entry with reminder, URL and location', () => {
    const input = `[2026-02-15] ## SM-kilpailut
Reminder 2026-01-15 | Ilmoittautuminen päättyy
URL https://kisa.fi/ilmo
Location Tampere, Pirkkahalli
`;
    const result = parseInput(input);
    const workout = result.workouts[0];
    
    expect(workout.content).toHaveLength(3);
    
    const reminder = workout.content.find((c: any) => c.type === 'reminder');
    expect(reminder.date.month).toBe(1);
    
    const url = workout.content.find((c: any) => c.type === 'url');
    expect(url.url).toContain('kisa.fi');
    
    const location = workout.content.find((c: any) => c.type === 'location');
    expect(location.place).toContain('Pirkkahalli');
  });
});

// =============================================================================
// Food/Drinking disambiguation tests
// =============================================================================

describe('Food and Drinking disambiguation', () => {
  it('parses Food correctly - not confused with any F alias', () => {
    const content = getContent('[2026-01-12] ## Ravinto\nFood 450kcal 40g/prot | kaurapuuro maitorahkalla ja mustikoilla\n', 'food');
    expect(content.type).toBe('food');
    expect(content.calories).toBe(450);
    expect(content.protein).toBe(40);
    expect(content.description).toBe('kaurapuuro maitorahkalla ja mustikoilla');
  });

  it('parses Drinking correctly - not confused with D (Duration) alias', () => {
    const content = getContent('[2026-01-12] ## Ravinto\nDrinking 3dl | kahvi maidolla\n', 'drinking');
    expect(content.type).toBe('drinking');
    expect(content.volume).toBe(3);
    expect(content.volumeUnit).toBe('dl');
    expect(content.description).toBe('kahvi maidolla');
  });

  it('parses multiple Food entries in one workout', () => {
    const input = `[2026-01-12] ## Ravintopäiväkirja
Food 450kcal 40g/prot | kaurapuuro maitorahkalla
Food 650kcal 45g/prot | grillattu kana, riisi
Food 300kcal 30g/prot | kreikkalainen jogurtti
`;
    const result = parseInput(input);
    const workout = result.workouts[0];
    const foods = workout.content.filter((c: any) => c.type === 'food');
    
    expect(foods).toHaveLength(3);
    expect(foods[0].calories).toBe(450);
    expect(foods[1].calories).toBe(650);
    expect(foods[2].calories).toBe(300);
  });

  it('parses mixed Food and Drinking entries', () => {
    const input = `[2026-01-12] ## Aamupala
Food 450kcal 40g/prot | kaurapuuro maitorahkalla ja mustikoilla
Drinking 3dl | kahvi maidolla
Drinking 2dl | vesi
`;
    const result = parseInput(input);
    const workout = result.workouts[0];
    
    const foods = workout.content.filter((c: any) => c.type === 'food');
    const drinks = workout.content.filter((c: any) => c.type === 'drinking');
    
    expect(foods).toHaveLength(1);
    expect(foods[0].calories).toBe(450);
    expect(foods[0].protein).toBe(40);
    
    expect(drinks).toHaveLength(2);
    expect(drinks[0].description).toBe('kahvi maidolla');
    expect(drinks[1].description).toBe('vesi');
  });
});

// =============================================================================
// Custom field tests
// =============================================================================

describe('Custom', () => {
  it('parses Custom with alphanumeric name like RM1', () => {
    const input = `[2026-02-06] ## Kuntosalitreeni
Custom RM1 89|kg
Exercise penkkipunnerrus|1x4@80kg
`;
    const result = parseInput(input);
    const workout = result.workouts[0];
    const custom = workout.content.find((c: any) => c.type === 'custom');
    
    expect(custom).toBeDefined();
    expect(custom.name).toBe('RM1');
    expect(custom.value).toBe(89);
    expect(custom.unit).toBe('kg');
  });

  it('parses Custom with simple name and unit', () => {
    const input = `[2026-02-06] ## Harjoitus
Custom Treenipaino 85|kg
`;
    const result = parseInput(input);
    const workout = result.workouts[0];
    const custom = workout.content.find((c: any) => c.type === 'custom');
    
    expect(custom).toBeDefined();
    expect(custom.name).toBe('Treenipaino');
    expect(custom.value).toBe(85);
    expect(custom.unit).toBe('kg');
  });

  it('parses Custom with multi-word name', () => {
    const input = `[2026-02-06] ## Harjoitus
Custom Body Weight 75.5|kg
`;
    const result = parseInput(input);
    const workout = result.workouts[0];
    const custom = workout.content.find((c: any) => c.type === 'custom');
    
    expect(custom).toBeDefined();
    expect(custom.name).toBe('Body Weight');
    expect(custom.value).toBe(75.5);
    expect(custom.unit).toBe('kg');
  });

  it('parses Custom without unit', () => {
    const input = `[2026-02-06] ## Harjoitus
Custom Effort 7
`;
    const result = parseInput(input);
    const workout = result.workouts[0];
    const custom = workout.content.find((c: any) => c.type === 'custom');
    
    expect(custom).toBeDefined();
    expect(custom.name).toBe('Effort');
    expect(custom.value).toBe(7);
    expect(custom.unit).toBeNull();
  });

  it('parses Custom with special unit characters', () => {
    const input = `[2026-02-06] ## Harjoitus
Custom Liikelaajuus 90|°
`;
    const result = parseInput(input);
    const workout = result.workouts[0];
    const custom = workout.content.find((c: any) => c.type === 'custom');
    
    expect(custom).toBeDefined();
    expect(custom.name).toBe('Liikelaajuus');
    expect(custom.value).toBe(90);
    expect(custom.unit).toBe('°');
  });

  it('parses multiple Custom fields in one workout', () => {
    const input = `[2026-02-06] ## Uintiharjoitus
Custom Effort 5|Moderate
Custom Altaan-pituus 50|m
Custom Kalorit 251|kcal
Move "rintauinti" 600m
`;
    const result = parseInput(input);
    const workout = result.workouts[0];
    const customs = workout.content.filter((c: any) => c.type === 'custom');
    
    expect(customs).toHaveLength(3);
    expect(customs[0].name).toBe('Effort');
    expect(customs[0].value).toBe(5);
    expect(customs[0].unit).toBe('Moderate');
    expect(customs[1].name).toBe('Altaan-pituus');
    expect(customs[1].value).toBe(50);
    expect(customs[1].unit).toBe('m');
    expect(customs[2].name).toBe('Kalorit');
    expect(customs[2].value).toBe(251);
    expect(customs[2].unit).toBe('kcal');
  });
});
