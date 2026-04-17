import { render, screen } from '@testing-library/react';

import App from './App';

describe('App gallery', () => {
  it('renders the ActiveWorkoutSession demo section when selected by hash', () => {
    window.history.replaceState(null, '', '#organism-active-workout-session');

    render(<App />);

    expect(screen.getByRole('heading', { name: 'ActiveWorkoutSession' })).toBeInTheDocument();
    // Component now shows Play button initially (not workout name)
    expect(screen.getByText('Paina Play aloittaaksesi')).toBeInTheDocument();
    expect(screen.getByText('Session speed')).toBeInTheDocument();
  });
});