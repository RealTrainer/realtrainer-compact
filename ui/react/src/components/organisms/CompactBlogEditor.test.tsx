import { fireEvent, render, screen } from '@testing-library/react';
import { CompactBlogEditor } from './CompactBlogEditor';
import { sampleWorkout } from '../../preview/fixtures';

describe('CompactBlogEditor', () => {
  it('updates title via onChange', () => {
    const onChange = vi.fn();
    render(<CompactBlogEditor workout={sampleWorkout} onChange={onChange} />);

    fireEvent.change(screen.getByDisplayValue('Voima- ja Kestavyysharjoitus'), {
      target: { value: 'Uusi Otsikko' },
    });

    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(lastCall.title).toBe('Uusi Otsikko');
  });
});
