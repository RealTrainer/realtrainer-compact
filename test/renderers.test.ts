/**
 * Renderer tests
 * Tests for COMPACT serializer, Markdown renderer, and Plain text renderer
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseCompact } from '../dist/index.js';
import { serializeDocument } from '../dist/renderers/compact.js';
import { renderDocumentToMarkdown } from '../dist/renderers/markdown.js';
import { renderDocumentToPlainText } from '../dist/renderers/plaintext.js';
import type { Document, Workout, Exercise, Section, Note } from '../dist/types.js';

// =============================================================================
// COMPACT Serializer tests
// =============================================================================

describe('COMPACT Serializer', () => {
  it('round-trips simple exercise', () => {
    const input = `[2025-12-31] ## Test
Exercise hauiskääntö|3x10@60kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const serialized = serializeDocument(result.document);
    const reparsed = parseCompact(serialized);
    
    expect(reparsed.success).toBe(true);
    const ex1 = result.document.workouts[0].content[0] as Exercise;
    const ex2 = reparsed.document.workouts[0].content[0] as Exercise;
    
    expect(ex2.name).toBe(ex1.name);
    expect(ex2.sets).toBe(ex1.sets);
    expect(ex2.reps).toBe(ex1.reps);
  });

  it('round-trips exercise with bodyweight', () => {
    const input = `[2025-12-31] ## Test
Exercise punnerrukset|3x20@bw
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('@bw');
  });

  it('round-trips exercise with percentage', () => {
    const input = `[2025-12-31] ## Test
Exercise penkki|5x5@80%
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('@80%');
  });

  it('serializes sections correctly', () => {
    const input = `[2025-12-31] ## Test
Section Lämmittely
Exercise juoksu|10min
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Section Lämmittely');
  });

  it('serializes run/move correctly', () => {
    const input = `[2025-12-31] ## Test
Run 4x400m@80%/2m
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Run');
    expect(serialized).toContain('4x400m');
  });

  it('serializes swim move pace per 100m', () => {
    const input = `[2026-02-20] ## Uintiharjoitus
Run "rintauinti" 1x450m@3:11/100m
> 100m 3'12"/100m
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Run "rintauinti" 1x450m@3:11/100m');

    const reparsed = parseCompact(serialized);
    expect(reparsed.success).toBe(true);
    if (reparsed.success) {
      const move = reparsed.document.workouts[0].content.find((c: any) => c.type === 'move') as any;
      expect(move.intensity?.paceMin?.minutes).toBe(3);
      expect(move.intensity?.paceMin?.seconds).toBe(11);
      expect(move.intensity?.pacePerDistance?.value).toBe(100);
      expect(move.intensity?.pacePerDistance?.unit).toBe('m');
    }
  });

  it('serializes complex workout', () => {
    const input = `[2025-12-31] ## Jalkatreeni
Section Lämmittely
Time 10min | juoksu
Section Pääosa
Exercise kyykky|5x5@100kg
Exercise jalkaprässi|4x10@150kg
Exercise lunges|3x12@bw
Section Venyttely
Time 5min | jalkavenytykset
Tags voima, jalat
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const serialized = serializeDocument(result.document);
    
    // Should contain all sections
    expect(serialized).toContain('Section Lämmittely');
    expect(serialized).toContain('Section Pääosa');
    expect(serialized).toContain('Section Venyttely');
    
    // Should contain all exercises
    expect(serialized).toContain('kyykky');
    expect(serialized).toContain('jalkaprässi');
    expect(serialized).toContain('lunges');
    
    // Should contain tags
    expect(serialized).toContain('Tags');
  });

  it('serializes measured durations correctly', () => {
    const input = `[2025-12-31] ## Test
Exercise lankku|3x45s,45s,30s
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const ex = result.document.workouts[0].content[0] as any;
    expect(ex.specType).toBe('measured');
    expect(ex.measuredDurations).toHaveLength(3);
    
    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('3x45s,45s,30s');
  });

  it('preserves planned duration unit for multi-set exercises', () => {
    const input = `[2025-12-31] ## Test
Exercise Isometrinen seinäkyykky|3x45s
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    const ex = result.document.workouts[0].content[0] as any;
    expect(ex.unit).toBe('s');
    expect(ex.sets).toBe(3);
    expect(ex.reps).toBe(45);

    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Exercise Isometrinen seinäkyykky|3x45s');
  });

  it('serializes single measured duration with trailing comma', () => {
    const input = `[2025-12-31] ## Test
Exercise lankku|41s,
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const ex = result.document.workouts[0].content[0] as any;
    expect(ex.specType).toBe('measured');
    expect(ex.measuredDurations).toHaveLength(1);
    
    const serialized = serializeDocument(result.document);
    // Single measured duration should have trailing comma to distinguish from planned
    expect(serialized).toContain('1x41s,');
  });

  it('serializes AI-formatted measured durations', () => {
    // AI outputs "3x45s,45s,0s" format with Nx prefix
    const input = `[2025-12-31] ## Test
Exercise kyykkypito|3x45s,45s,0s
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const ex = result.document.workouts[0].content[0] as any;
    expect(ex.specType).toBe('measured');
    
    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('kyykkypito');
    expect(serialized).toContain('45s');
  });

  it('serializes interval with numeric intensity', () => {
    const input = `[2025-12-31] ## Test
Interval 4x400m@80%/2min
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Interval 4x400m@80%/2min');
  });

  it('serializes interval with text intensity', () => {
    const input = `[2025-12-31] ## Test
Interval 6x3min@Ylämäki/2m palautus
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Interval 6x3min@Ylämäki/2m');
    expect(serialized).toContain('palautus');
  });

  it('serializes interval with recovery range', () => {
    const input = `[2025-12-31] ## Test
Interval 4x400m@80-90%/2-3min
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Interval 4x400m@80-90%/2-3min');
  });

  it('serializes interval without recovery', () => {
    const input = `[2025-12-31] ## Test
Interval 6x200m@Ylämäki
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Interval 6x200m@Ylämäki');
    expect(serialized).not.toContain('/');
  });

  it('serializes bilateral pyramid reps', () => {
    const input = `[2025-12-31] ## Test
Pyramid yhden jalan prässi|20+20x45,20+20x80,20+20x105,20+20x120,20+20x135kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Pyramid yhden jalan prässi|20+20x45,20+20x80,20+20x105,20+20x120,20+20x135kg');
  });

  it('preserves food and drinking nutrients with international names', () => {
    const input = `[2026-02-21] ## Lounas
Food 620kcal 32g/prot 58g/carb 28g/fat 6g/fiber 1.2g/omega3 | Tonnikala-pastasalaatti
Drinking 4dl 0kcal 0g/prot 0g/carb 0g/fat water | Vesi
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Food 620kcal 32g/prot 58g/carb 28g/fat 6g/fiber 1.2g/omega3 | Tonnikala-pastasalaatti');
    expect(serialized).toContain('Drinking 4dl 0kcal 0g/prot 0g/carb 0g/fat water | Vesi');

    const reparsed = parseCompact(serialized);
    expect(reparsed.success).toBe(true);
    if (reparsed.success) {
      const workout = reparsed.document.workouts[0];
      const food = workout.content.find((c: any) => c.type === 'food') as any;
      expect(food.protein).toBe(32);
      expect(food.carbs).toBe(58);
      expect(food.fat).toBe(28);
      expect(Array.isArray(food.nutrients)).toBe(true);
      expect(food.nutrients.some((n: any) => n.name === 'fiber')).toBe(true);
      expect(food.nutrients.some((n: any) => n.name === 'omega3')).toBe(true);
    }
  });

  it('round-trips Derived with full metadata', () => {
    const input = `[2026-02-21] ## Hermostokuorma
Derived strength.neural_stress 72|score basis:entity confidence:88% source:"exercise+load" goodness:4 | raskas päivä
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Derived strength.neural_stress 72|score basis:entity confidence:88% source:exercise+load goodness:4 | raskas päivä');

    const reparsed = parseCompact(serialized);
    expect(reparsed.success).toBe(true);
    if (reparsed.success) {
      const derived = reparsed.document.workouts[0].content.find((c: any) => c.type === 'derived') as any;
      expect(derived.name).toBe('strength.neural_stress');
      expect(derived.basis).toBe('entity');
      expect(derived.confidence).toBe(88);
      expect(derived.goodness).toBe(4);
      expect(derived.note).toBe('raskas päivä');
    }
  });

  it('serializes Derived day-basis aggregate', () => {
    const input = `[2026-02-21] ## PK-päivä
Derived endurance.zone2_minutes 95|min basis:day confidence:74 source:"all workouts" goodness:5
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    const serialized = serializeDocument(result.document);
    expect(serialized).toContain('Derived endurance.zone2_minutes 95|min basis:day confidence:74% source:"all workouts" goodness:5');
  });
});

// =============================================================================
// Markdown Renderer tests
// =============================================================================

describe('Markdown Renderer', () => {
  it('renders minimonster fixture without crashing', () => {
    const input = readFileSync(new URL('../data/minimonster.compact', import.meta.url), 'utf8');
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    const render = () => renderDocumentToMarkdown(result.document);
    expect(render).not.toThrow();

    const markdown = render();
    expect(markdown.length).toBeGreaterThan(0);
    expect(markdown).toContain('MINIMONSTER - All Content Types');
  });

  it('renders workout with title as heading', () => {
    const input = `[2025-12-31] ## Voimatreeni
Exercise penkki|3x10@60kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const markdown = renderDocumentToMarkdown(result.document);
    expect(markdown).toContain('Voimatreeni');
    expect(markdown).toContain('##'); // Should have heading markers
  });

  it('renders sections as subheadings', () => {
    const input = `[2025-12-31] ## Test
Section Lämmittely
Exercise juoksu|10min
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const markdown = renderDocumentToMarkdown(result.document);
    expect(markdown).toContain('## Lämmittely');
  });

  it('renders exercises as list items', () => {
    const input = `[2025-12-31] ## Test
Exercise penkki|3x10@60kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const markdown = renderDocumentToMarkdown(result.document, { useBullets: true });
    expect(markdown).toContain('- ');
    expect(markdown).toContain('penkki');
  });

  it('includes date when option is set', () => {
    const input = `[2025-12-31] ## Test
Exercise penkki|3x10@60kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const markdown = renderDocumentToMarkdown(result.document, { includeDate: true });
    expect(markdown).toContain('2025-12-31');
  });

  it('renders tags', () => {
    const input = `[2025-12-31] ## Test
Tags voima, jalat
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const markdown = renderDocumentToMarkdown(result.document, { includeTags: true });
    expect(markdown).toContain('voima');
    expect(markdown).toContain('jalat');
  });

  it('renders notes correctly', () => {
    const input = `[2025-12-31] ## Test
Note Hyvä treeni!
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const markdown = renderDocumentToMarkdown(result.document);
    expect(markdown).toContain('Hyvä treeni!');
  });

  it('formats decimal minute durations as min\'sec in runs', () => {
    const input = `[2026-02-23] ## Test
Run 9km 41'34" | matka + min'sec
Run 9km 41min34s | matka + min+sec ilman väliä
Run 9km 41min 34s | matka + min + sec välilyönnillä
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    const markdown = renderDocumentToMarkdown(result.document);
    expect(markdown).toContain("41'34\"");
    expect(markdown).not.toContain('41.56666666666667min');
  });
});

// =============================================================================
// Plain Text Renderer tests
// =============================================================================

describe('Plain Text Renderer', () => {
  it('renders workout title', () => {
    const input = `[2025-12-31] ## Voimatreeni
Exercise penkki|3x10@60kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const text = renderDocumentToPlainText(result.document);
    expect(text).toContain('Voimatreeni');
  });

  it('renders exercises with details', () => {
    const input = `[2025-12-31] ## Test
Exercise penkki|3x10@60kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const text = renderDocumentToPlainText(result.document);
    expect(text).toContain('penkki');
    expect(text).toContain('3x10');
    expect(text).toContain('60kg');
  });

  it('renders sections', () => {
    const input = `[2025-12-31] ## Test
Section Lämmittely
Exercise juoksu|10min
Section Pääosa
Exercise penkki|3x10@60kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const text = renderDocumentToPlainText(result.document);
    expect(text).toContain('Lämmittely');
    expect(text).toContain('Pääosa');
  });

  it('renders run/move with distance', () => {
    const input = `[2025-12-31] ## Test
Run 4x400m@80%
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const text = renderDocumentToPlainText(result.document);
    expect(text).toContain('400m');
  });
});

// =============================================================================
// Edge cases
// =============================================================================

describe('Renderer Edge Cases', () => {
  it('handles empty workout', () => {
    const input = `[2025-12-31] ## Empty
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const compact = serializeDocument(result.document);
    const markdown = renderDocumentToMarkdown(result.document);
    const text = renderDocumentToPlainText(result.document);
    
    expect(compact).toContain('Empty');
    expect(markdown).toContain('Empty');
    expect(text).toContain('Empty');
  });

  it('handles multiple workouts', () => {
    const input = `[2025-12-31] ## Aamu
Exercise punnerrus|3x20@bw

[2025-12-31] ## Ilta
Exercise juoksu|5km
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const compact = serializeDocument(result.document);
    const markdown = renderDocumentToMarkdown(result.document);
    
    expect(compact).toContain('Aamu');
    expect(compact).toContain('Ilta');
    expect(markdown).toContain('Aamu');
    expect(markdown).toContain('Ilta');
  });

  it('handles exercise with note', () => {
    const input = `[2025-12-31] ## Test
Exercise kyykky|5x5@100kg|tempo hidas
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const compact = serializeDocument(result.document);
    expect(compact).toContain('tempo hidas');
  });

  it('handles weight ranges', () => {
    const input = `[2025-12-31] ## Test
Exercise vipuvarsi|3x10@20-25kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    
    const compact = serializeDocument(result.document);
    expect(compact).toContain('20-25kg');
  });
});
