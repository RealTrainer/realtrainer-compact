/**
 * Tests for Split functionality
 * Splits are child entries of a Move that are NOT counted in statistics
 */

import { describe, it, expect } from 'vitest';
import { parseCompact } from '../src/index';
import type { Move, Split } from '../src/types';

describe('Split parsing', () => {
  it('should parse a Move with simple splits', () => {
    const input = `[2026-02-03] ## Uinti
Run "rintauinti" 800m | yhteensä
> 150m | sarja 1
> 450m | sarja 2
> 100m | sarja 3
> 100m | sarja 4
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const workout = result.document.workouts[0];
    expect(workout.content.length).toBe(1);

    const move = workout.content[0] as Move;
    expect(move.type).toBe('move');
    expect(move.sport).toBe('rintauinti');
    expect(move.distance?.value).toBe(800);
    expect(move.distance?.unit).toBe('m');

    // Check splits
    expect(move.splits).toBeDefined();
    expect(move.splits?.length).toBe(4);

    const split1 = move.splits?.[0] as Split;
    expect(split1.type).toBe('split');
    expect(split1.distance?.value).toBe(150);
    expect(split1.distance?.unit).toBe('m');
    expect(split1.note).toBe('sarja 1');
  });

  it('should parse splits with explicit Split keyword', () => {
    const input = `[2026-02-03] ## Juoksu
Run 5km | intervallit
> Split 1km | lämmittely
> Split 3km | pääosa
> Split 1km | jäähdyttely
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const move = result.document.workouts[0].content[0] as Move;
    expect(move.splits?.length).toBe(3);
    expect(move.splits?.[0].distance?.value).toBe(1);
    expect(move.splits?.[0].distance?.unit).toBe('km');
  });

  it('should parse Move without splits (backwards compatible)', () => {
    const input = `[2026-02-03] ## Juoksu
Run 10km | helppo lenkki
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const move = result.document.workouts[0].content[0] as Move;
    expect(move.type).toBe('move');
    expect(move.distance?.value).toBe(10);
    expect(move.splits).toBeNull();
  });

  it('should parse multiple Moves, each with their own splits', () => {
    const input = `[2026-02-03] ## Uinti
Run "vapaauinti" 400m | lämmittely
> 100m | 1. sata
> 100m | 2. sata
> 100m | 3. sata
> 100m | 4. sata
Run "rintauinti" 200m | tekniikka
> 50m | kädet
> 50m | jalat
> 100m | yhdistelmä
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const workout = result.document.workouts[0];
    expect(workout.content.length).toBe(2);

    const move1 = workout.content[0] as Move;
    expect(move1.sport).toBe('vapaauinti');
    expect(move1.splits?.length).toBe(4);

    const move2 = workout.content[1] as Move;
    expect(move2.sport).toBe('rintauinti');
    expect(move2.splits?.length).toBe(3);
  });

  it('should parse nested splits (> >)', () => {
    const input = `[2026-02-03] ## Maratooni
Run 42km | kokonaisaika 3:45:00
> 21km | puoliväli
> > 10km | ensimmäinen kymppi
> > 11km | toinen osuus
> 21km | loppumatka
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const move = result.document.workouts[0].content[0] as Move;
    expect(move.splits?.length).toBe(2);

    // First split has nested splits
    const split1 = move.splits?.[0] as Split;
    expect(split1.distance?.value).toBe(21);
    expect(split1.splits?.length).toBe(2);
    expect(split1.splits?.[0].distance?.value).toBe(10);
    expect(split1.splits?.[1].distance?.value).toBe(11);

    // Second split has no nested splits
    const split2 = move.splits?.[1] as Split;
    expect(split2.distance?.value).toBe(21);
    expect(split2.splits).toBeNull();
  });

  it('should handle splits with intensity', () => {
    const input = `[2026-02-03] ## Intervallit
Run 3km | intervalliharjoitus
> 400m@Z4 | nopea
> 200m@Z2 | palautus
> 400m@Z4 | nopea
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const move = result.document.workouts[0].content[0] as Move;
    expect(move.splits?.length).toBe(3);

    const split1 = move.splits?.[0] as Split;
    expect(split1.distance?.value).toBe(400);
    expect(split1.intensity).toBeDefined();
    expect((split1.intensity as any)?.hrZone?.min).toBe(4);
  });

  it('should parse swim workout with splits after Section (as standalone splits)', () => {
    // Real-world case: splits come after a Section header
    // Section breaks split attachment to the previous Move
    // But standalone splits are now parsed as type: 'split' content entries
    const input = `[2026-02-03T19:00+02] ## Rintauinti
Tags uinti, rintauinti, tampere
Emojis 🏊‍♂️
Text Rasitus: Moderate (4). Aktiiviset kalorit: 332 kcal. Keskisyke: 124 bpm.
Run "rintauinti" 800m | 27min 9s, avg 3'23"/100m
Section Sarjat
> 150m 3'39"/100m
> 450m 2'55"/100m
> 100m 3'31"/100m
> 100m 3'12"/100m
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const workout = result.document.workouts[0];
    expect(workout.title).toBe('Rintauinti');
    
    // Find the move
    const move = workout.content.find(c => c.type === 'move') as Move;
    expect(move).toBeDefined();
    expect(move.sport).toBe('rintauinti');
    expect(move.distance?.value).toBe(800);
    expect(move.distance?.unit).toBe('m');
    
    // Section breaks split attachment - splits are NOT on the move
    expect(move.splits).toBeNull();
    
    // The > lines are now parsed as standalone split content entries
    const splits = workout.content.filter(c => c.type === 'split') as Split[];
    expect(splits.length).toBe(4);
    
    expect(splits[0].distance?.value).toBe(150);
    expect(splits[0].pace?.minutes).toBe(3);
    expect(splits[0].pace?.seconds).toBe(39);
    expect(splits[0].pace?.perDistance?.value).toBe(100);
    expect(splits[0].pace?.perDistance?.unit).toBe('m');
    
    expect(splits[1].distance?.value).toBe(450);
    expect(splits[1].pace?.minutes).toBe(2);
    expect(splits[1].pace?.seconds).toBe(55);
    
    expect(splits[2].distance?.value).toBe(100);
    expect(splits[2].pace?.minutes).toBe(3);
    expect(splits[2].pace?.seconds).toBe(31);
    
    expect(splits[3].distance?.value).toBe(100);
    expect(splits[3].pace?.minutes).toBe(3);
    expect(splits[3].pace?.seconds).toBe(12);
  });

  it('should parse swim workout with splits directly after Run', () => {
    // Preferred format: splits immediately follow the Run
    const input = `[2026-02-03T19:00+02] ## Rintauinti
Tags uinti, rintauinti, tampere
Emojis 🏊‍♂️
Text Rasitus: Moderate (4). Aktiiviset kalorit: 332 kcal. Keskisyke: 124 bpm.
Run "rintauinti" 800m | 27min 9s
> 150m 3'39"/100m
> 450m 2'55"/100m
> 100m 3'31"/100m
> 100m 3'12"/100m
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const workout = result.document.workouts[0];
    const move = workout.content.find(c => c.type === 'move') as Move;
    
    expect(move.sport).toBe('rintauinti');
    expect(move.distance?.value).toBe(800);
    expect(move.splits).toBeDefined();
    expect(move.splits?.length).toBe(4);
    
    // First split: 150m at 3'39"/100m pace
    expect(move.splits?.[0].distance?.value).toBe(150);
    expect(move.splits?.[0].pace?.minutes).toBe(3);
    expect(move.splits?.[0].pace?.seconds).toBe(39);
    expect(move.splits?.[0].pace?.perDistance?.value).toBe(100);
    expect(move.splits?.[0].pace?.perDistance?.unit).toBe('m');
    
    // Second split: 450m at 2'55"/100m pace
    expect(move.splits?.[1].distance?.value).toBe(450);
    expect(move.splits?.[1].pace?.minutes).toBe(2);
    expect(move.splits?.[1].pace?.seconds).toBe(55);
    
    expect(move.splits?.[2].distance?.value).toBe(100);
    expect(move.splits?.[3].distance?.value).toBe(100);
  });

  it('should parse splits with pace in colon format', () => {
    const input = `[2026-02-03] ## Juoksu
Run 10km | tempo
> 5km 4:30/km | lämmittely
> 5km 4:00/km | kiihdytys
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const move = result.document.workouts[0].content[0] as Move;
    expect(move.splits?.length).toBe(2);
    
    const split1 = move.splits?.[0] as Split;
    expect(split1.distance?.value).toBe(5);
    expect(split1.distance?.unit).toBe('km');
    expect(split1.pace?.minutes).toBe(4);
    expect(split1.pace?.seconds).toBe(30);
    expect(split1.pace?.perDistance?.value).toBe(1);
    expect(split1.pace?.perDistance?.unit).toBe('km');
    expect(split1.note).toBe('lämmittely');
  });

  it('should parse splits with HR', () => {
    const input = `[2026-02-03] ## Uinti
Run "vapaauinti" 400m | intervallit
> 100m 1'45"/100m 135bpm | sarja 1
> 100m 1'40"/100m 142bpm | sarja 2
> 100m 1'38"/100m 148bpm | sarja 3
> 100m 1'35"/100m 155bpm | sarja 4
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const move = result.document.workouts[0].content[0] as Move;
    expect(move.splits?.length).toBe(4);

    const split1 = move.splits?.[0] as Split;
    expect(split1.distance?.value).toBe(100);
    expect(split1.pace?.minutes).toBe(1);
    expect(split1.pace?.seconds).toBe(45);
    expect(split1.hr).toBe(135);
    expect(split1.note).toBe('sarja 1');

    const split4 = move.splits?.[3] as Split;
    expect(split4.hr).toBe(155);
    expect(split4.pace?.minutes).toBe(1);
    expect(split4.pace?.seconds).toBe(35);
  });

  it('should parse splits with custom fields', () => {
    const input = `[2026-02-03] ## Uinti
Run "vapaauinti" 200m | tekniikka
> 50m [[käsiräpylät]] | kädet
> 50m [[jalkapotkut]] | jalat
> 100m | yhdistelmä
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const move = result.document.workouts[0].content[0] as Move;
    expect(move.splits?.length).toBe(3);

    const split1 = move.splits?.[0] as Split;
    expect(split1.distance?.value).toBe(50);
    expect(split1.customFields).toBeDefined();
    expect(split1.customFields?.length).toBe(1);
    expect(split1.customFields?.[0].name).toBe('käsiräpylät');
    expect(split1.customFields?.[0].value).toBe(true);
    expect(split1.note).toBe('kädet');

    const split2 = move.splits?.[1] as Split;
    expect(split2.customFields?.[0].name).toBe('jalkapotkut');
  });

  it('should parse standalone splits with all features', () => {
    const input = `[2026-02-03] ## Uinti
Run "rintauinti" 800m | yhteensä
Section Sarjat
> 150m 3'39"/100m 130bpm [[räpylät]] | sarja 1
> 450m 2'55"/100m 145bpm | sarja 2
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const workout = result.document.workouts[0];
    const splits = workout.content.filter(c => c.type === 'split') as Split[];
    expect(splits.length).toBe(2);

    // Full-featured split
    const split1 = splits[0];
    expect(split1.distance?.value).toBe(150);
    expect(split1.pace?.minutes).toBe(3);
    expect(split1.pace?.seconds).toBe(39);
    expect(split1.pace?.perDistance?.value).toBe(100);
    expect(split1.hr).toBe(130);
    expect(split1.customFields?.length).toBe(1);
    expect(split1.customFields?.[0].name).toBe('räpylät');
    expect(split1.note).toBe('sarja 1');
  });

  it('should parse standalone splits after Text with @HR format', () => {
    const input = `[2026-03-28] ## Ulkojuoksu
Run 8.45min 1.03km
Text Reppu selassa, paras vauhti lopussa vahan alle 6min/km, polville ihan OK
> 1km 8'11"@140bpm
> 0.03km 0'13"@156bpm
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const workout = result.document.workouts[0];
    const move = workout.content.find(c => c.type === 'move') as Move;
    const text = workout.content.find(c => c.type === 'text');
    const splits = workout.content.filter(c => c.type === 'split') as Split[];
    const unknowns = workout.content.filter(c => c.type === 'unknown');

    expect(move).toBeDefined();
    expect(text).toBeDefined();
    expect(splits.length).toBe(2);
    expect(unknowns.length).toBe(0);

    expect(splits[0].distance?.value).toBe(1);
    expect(splits[0].distance?.unit).toBe('km');
    expect(splits[0].duration?.value).toBe(491);
    expect(splits[0].duration?.unit).toBe('s');
    expect(splits[0].hr).toBe(140);

    expect(splits[1].distance?.value).toBe(0.03);
    expect(splits[1].distance?.unit).toBe('km');
    expect(splits[1].duration?.value).toBe(13);
    expect(splits[1].duration?.unit).toBe('s');
    expect(splits[1].hr).toBe(156);
  });

  it('should parse standalone swim splits with mm:ss durations', () => {
    const input = `[2026-03-24T19:03+02] ## Uintiharjoitus (Rintauinti)
Tags uinti, kuntoutus, Tampere
Emojis 🏊‍♂️🌊🩹
Run "rintauinti" 21.083333333333332min 600m | Tampere
> 200m 06:58 | set 1
> 250m 07:45 | set 2
> 150m 04:33 | set 3
`;

    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (!result.success) return;

    const workout = result.document.workouts[0];
    const move = workout.content.find(c => c.type === 'move') as Move;
    const splits = move.splits as Split[];
    const unknowns = workout.content.filter(c => c.type === 'unknown');

    expect(move).toBeDefined();
    expect(move.sport).toBe('rintauinti');
    expect(splits?.length).toBe(3);
    expect(unknowns.length).toBe(0);

    expect(splits[0].distance?.value).toBe(200);
    expect(splits[0].duration?.value).toBe(418);
    expect(splits[0].duration?.unit).toBe('s');
    expect(splits[0].note).toBe('set 1');

    expect(splits[1].distance?.value).toBe(250);
    expect(splits[1].duration?.value).toBe(465);
    expect(splits[1].note).toBe('set 2');

    expect(splits[2].distance?.value).toBe(150);
    expect(splits[2].duration?.value).toBe(273);
    expect(splits[2].note).toBe('set 3');
  });
});
