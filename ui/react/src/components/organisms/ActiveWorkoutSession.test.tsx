import { fireEvent, render, screen } from '@testing-library/react';
import { parseCompact } from '@parser';

import { ActiveWorkoutSession } from './ActiveWorkoutSession';

function parseWorkouts(source: string) {
  const result = parseCompact(source);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.document.workouts;
}

describe('ActiveWorkoutSession', () => {
  it('renders Play button initially and shows exercise after starting', () => {
    const workouts = parseWorkouts(`[2026-04-15] ## Warmup
Exercise March|30s
`);

    render(<ActiveWorkoutSession workouts={workouts} />);

    // Initially only Play button visible
    expect(screen.getByRole('button', { name: 'Aloita harjoitus' })).toBeInTheDocument();
    expect(screen.getByText('Paina Play aloittaaksesi')).toBeInTheDocument();
    
    // Click Play to start
    fireEvent.click(screen.getByRole('button', { name: 'Aloita harjoitus' }));
    
    // Now exercise name visible (not workout title)
    expect(screen.getByText('March')).toBeInTheDocument();
    expect(screen.getByText('1/1')).toBeInTheDocument();
  });

  it('navigates between exercises using buttons', () => {
    const workouts = parseWorkouts(`[2026-04-15] ## Warmup
Exercise March|30s
Exercise Pushup|3x20
`);

    render(<ActiveWorkoutSession workouts={workouts} />);

    // Start the session first
    fireEvent.click(screen.getByRole('button', { name: 'Aloita harjoitus' }));
    
    // Initially on first exercise (timed - no reps prefix)
    expect(screen.getByText('March')).toBeInTheDocument();
    expect(screen.getByText('1/2')).toBeInTheDocument();
    
    // Navigate to next exercise
    fireEvent.click(screen.getByRole('button', { name: /Seuraava/i }));

    // Now shows second exercise (rep exercise - with reps prefix)
    expect(screen.getByText('20 x Pushup')).toBeInTheDocument();
    expect(screen.getByText('2/2')).toBeInTheDocument();
  });

  it('uses arrow keys to skip between exercises', () => {
    const workouts = parseWorkouts(`[2026-04-15] ## Warmup
Exercise March|30s
Exercise Pushup|3x20
Exercise Squat|2x15
`);

    render(<ActiveWorkoutSession workouts={workouts} />);

    // Start the session
    fireEvent.click(screen.getByRole('button', { name: 'Aloita harjoitus' }));
    expect(screen.getByText('March')).toBeInTheDocument();
    expect(screen.getByText('1/3')).toBeInTheDocument();

    // Arrow right to skip to next exercise (rep exercise - with reps prefix)
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('20 x Pushup')).toBeInTheDocument();
    expect(screen.getByText('2/3')).toBeInTheDocument();

    // Arrow right again (rep exercise - with reps prefix)
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('15 x Squat')).toBeInTheDocument();
    expect(screen.getByText('3/3')).toBeInTheDocument();

    // Arrow left to go back
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('20 x Pushup')).toBeInTheDocument();
  });
});