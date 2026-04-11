import { describe, it, expect } from 'vitest';
import { parseCompact, compareWorkouts, compareCompactTexts } from '../dist/index.js';

describe('similarity scoring', () => {
  it('gives high score for very similar interval workouts', () => {
    const a = `[2026-02-21] ## Intervallit
Run 2x4x500m@4:20/km/60s
`;
    const b = `[2026-02-22] ## Intervalli
Run 2x3x400m@4:25/km/50s
`;

    const parsedA = parseCompact(a);
    const parsedB = parseCompact(b);
    expect(parsedA.success).toBe(true);
    expect(parsedB.success).toBe(true);

    if (parsedA.success && parsedB.success) {
      const score = compareWorkouts(parsedA.document.workouts[0], parsedB.document.workouts[0]);
      expect(score.numericSimilarity).toBeGreaterThan(0.65);
      expect(score.structuralSimilarity).toBeGreaterThan(0.7);
      expect(score.overall).toBeGreaterThan(0.65);
    }
  });

  it('detects shared exercise names strongly', () => {
    const a = `[2026-02-21] ## Voima A
Exercise Penkkipunnerrys|5x5@80kg
Exercise Kyykky|5x5@100kg
`;
    const b = `[2026-02-22] ## Voima B
Exercise Penkkipunnerrys|3x8@70kg
Exercise Kulmasoutu|4x10@55kg
`;

    const parsedA = parseCompact(a);
    const parsedB = parseCompact(b);
    expect(parsedA.success).toBe(true);
    expect(parsedB.success).toBe(true);

    if (parsedA.success && parsedB.success) {
      const score = compareWorkouts(parsedA.document.workouts[0], parsedB.document.workouts[0]);
      expect(score.nameSimilarity).toBeGreaterThan(0.45);
      expect(score.overall).toBeGreaterThan(0.45);
    }
  });

  it('keeps very different workouts lower', () => {
    const a = `[2026-02-21] ## A
Run 10km
`;
    const b = `[2026-02-22] ## B
Exercise Penkkipunnerrys|5x5@80kg
`;

    const score = compareCompactTexts(a, b);
    expect(score.overall).toBeLessThan(0.6);
  });

  it('adds small positive bonuses from tags and emojis', () => {
    const baseA = `[2026-02-21] ## A
Exercise Lankku|3x60s
`;
    const baseB = `[2026-02-21] ## B
Exercise Lankku|3x60s
`;

    const withMetaA = `[2026-02-21] ## A
Tags core, huolto
Emojis 🧩💪
Exercise Lankku|3x60s
`;
    const withMetaB = `[2026-02-21] ## B
Tags core, voima
Emojis 🧩💥
Exercise Lankku|3x60s
`;

    const baseScore = compareCompactTexts(baseA, baseB);
    const metaScore = compareCompactTexts(withMetaA, withMetaB);

    expect(metaScore.tagBonus).toBeGreaterThan(0);
    expect(metaScore.emojiBonus).toBeGreaterThan(0);
    expect(metaScore.overall).toBeGreaterThanOrEqual(baseScore.overall - 0.02);
  });

  it('treats near-matching exercise rows as strong match while ignoring metadata rows', () => {
    const plan = `[2026-02-19] ## Torstai - Lajitekniikka (Kuula)
Tags kuulantyöntö, tekniikka, voima
Emojis ☄️💪
Custom Tonnage 156|kg
Custom RM1-arvio 8.4|kg
Exercise Työntö paikalta|1x8@6kg
Exercise Työntö vauhdilla (lyhyt)|1x12@6kg
Exercise Työntö täydellä vauhdilla|1x6@6kg
`;

    const done = `[2026-02-20] ## Toteuma
Exercise Työntö paikalta|10x@5kg
Exercise Työntö vauhdilla (lyhyt)|1x10@6kg
Exercise Työntö täydellä vauhdilla|1x5@6kg
`;

    const score = compareCompactTexts(plan, done);
    expect(score.nameSimilarity).toBeGreaterThan(0.8);
    expect(score.structuralSimilarity).toBeGreaterThan(0.85);
    expect(score.overall).toBeGreaterThan(0.75);
  });
});
