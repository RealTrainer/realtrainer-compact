import type { CompactWorkoutModel } from '../lib/types';

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
