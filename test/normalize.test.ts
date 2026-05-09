import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { normalizeCompactText } from '../dist/index.js';

describe('normalization', () => {
  it('normalizes core strength and endurance rows into canonical syntax', () => {
    const input = `[2026-04-12] ## Vanhasta uuteen
Tags voima, sali
Emojis 🏋️
Section Lämmittely
Exercise Penkki|5x5@50kg/2min
Pyramid Kyykky|10x40,8x50,6x60kg
Run "rintauinti" 800m | aerobic
`;

    const result = normalizeCompactText(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.warnings).toHaveLength(0);
    expect(result.text).toContain('Format compact');
    expect(result.text).toContain('Tags voima, sali');
    expect(result.text).toContain('Lift Penkki | 5x5 @ 50kg / 2min');
    expect(result.text).toContain('Lift Kyykky | 10@40kg, 8@50kg, 6@60kg');
    expect(result.text).toContain('Swim rintauinti | 800m | aerobic');
    expect(result.text).toContain('Section Lämmittely');
  });

  it('warns when interval sport cannot be inferred safely', () => {
    const input = `[2026-04-12] ## Epäselvä interval
Interval 5x1km@Z4/3min
`;

    const result = normalizeCompactText(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].code).toBe('ambiguous-endurance-sport');
    expect(result.text).toContain('Endurance | 5x1km / 3min | Z4');
  });

  it('ships a curated canonical minimonster fixture without known placeholder artifacts', () => {
    const text = readFileSync(new URL('../data/minimonster-canonical.compact', import.meta.url), 'utf8');

    expect(text.match(/Format compact/g)?.length ?? 0).toBe(1);
    expect(text).not.toContain('[object Object]');
    expect(text).not.toContain('nullx');
    expect(text).not.toContain('Section Section 2');
    expect(text).toContain('Lift Takakyykky | 3x8 @ 100kg | hyvä fiilis');
    expect(text).toContain('Swim rintauinti | 450m / 20s | 3:11/100m | tekniikka');
    expect(text).toContain('Exercise Penkkipunnerrus|3x8@{{Number:80}}kg | template paino');
  });
});