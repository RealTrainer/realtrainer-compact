import { render, screen } from '@testing-library/react';
import { normalizeCompactText } from '@parser';
import { NormalizedCompactView } from './NormalizedCompactView';

describe('NormalizedCompactView', () => {
  it('renders from legacy compact text via migration', () => {
    render(<NormalizedCompactView data={`[2026-04-12] ## Test
Exercise Kyykky|3x5@100kg
Run 5km | Rauhallinen`} showHeader />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Kyykky')).toBeInTheDocument();
    expect(screen.getByText('Run')).toBeInTheDocument();
  });

  it('shows migration warnings for ambiguous interval sport', () => {
    const migrated = normalizeCompactText(`[2026-04-12] ## Test
Interval 5x1km@Z4/3min`);

    render(<NormalizedCompactView data={migrated} showHeader />);

    expect(screen.getByTestId('normalized-warnings')).toBeInTheDocument();
    expect(screen.getByText(/cannot infer run vs swim vs bike safely/i)).toBeInTheDocument();
  });
});