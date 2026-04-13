import { render, screen } from '@testing-library/react';
import { parseCompact } from '@parser';
import { CompactView } from './CompactView';

describe('CompactView', () => {
  it('renders from compact text directly', () => {
    render(<CompactView data={`[2026-04-12] ## Test
Exercise Kyykky|3x5@100kg`} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Kyykky')).toBeInTheDocument();
  });

  it('renders from parseCompact result directly', () => {
    const result = parseCompact(`[2026-04-12] ## Test
Run 5km | Rauhallinen`);

    render(<CompactView data={result} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('juoksu')).toBeInTheDocument();
  });

  it('renders only selected workout by index from a parsed document', () => {
    const result = parseCompact(`[2026-04-12] ## First
Exercise A|1x1

[2026-04-13] ## Second
Exercise B|2x2`);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    render(<CompactView data={result.document} workoutIndex={1} />);

    expect(screen.queryByText('First')).not.toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});