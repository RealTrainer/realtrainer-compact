import { render, screen } from '@testing-library/react';
import { CompactRowView } from './CompactRowView';

describe('CompactRowView', () => {
  it('renders parser-native phase rows directly', () => {
    render(
      <CompactRowView
        row={{
          type: 'phase',
          number: 2,
          name: 'Main Work',
          details: 'Heavy sets',
        }}
      />,
    );

    expect(screen.getByText('Phase2')).toBeInTheDocument();
    expect(screen.getByText('Main Work')).toBeInTheDocument();
    expect(screen.getByText('Heavy sets')).toBeInTheDocument();
  });

  it('renders parser-native text rows directly', () => {
    render(
      <CompactRowView
        row={{
          type: 'text',
          value: 'Knee felt better after warm-up',
        }}
      />,
    );

    expect(screen.getByText('Knee felt better after warm-up')).toBeInTheDocument();
  });
});