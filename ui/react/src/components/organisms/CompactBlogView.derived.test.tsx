import { render, screen } from '@testing-library/react';
import { CompactBlogView } from './CompactBlogView';
import type { CompactWorkoutModel } from '../../lib/types';

describe('CompactBlogView derived section', () => {
  it('renders derived values at the end of the card', () => {
    const workout: CompactWorkoutModel = {
      title: 'Uinti',
      date: '10.04.2026',
      tags: ['uinti'],
      rows: [
        { id: 'exercise-1', type: 'exercise', name: 'Lankku', sets: 3, reps: 10 },
      ],
      derivedValues: [
        { name: 'endurance.zone2_minutes', value: 15, unit: 'min', goodness: 5 },
        { name: 'strength.neural_stress', value: 5, unit: 'score', goodness: 5 },
      ],
    };

    render(<CompactBlogView workout={workout} />);

    expect(screen.getByText('Johdetut arvot')).toBeInTheDocument();
    expect(screen.getByText('Zone2')).toBeInTheDocument();
    expect(screen.getByText('hermokuorma')).toBeInTheDocument();
    expect(screen.getAllByText('top')).toHaveLength(2);
  });
});
