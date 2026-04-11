import { fireEvent, render, screen } from '@testing-library/react';
import { CompactBlogView } from './CompactBlogView';
import { sampleWorkout } from '../../preview/fixtures';

describe('CompactBlogView interactions', () => {
  it('emits click, press and hover row events', () => {
    const onRowInteraction = vi.fn();
    render(<CompactBlogView workout={sampleWorkout} onRowInteraction={onRowInteraction} />);

    const targetRow = screen.getByTestId('row-exercise-1');

    fireEvent.click(targetRow);
    fireEvent.keyDown(targetRow, { key: 'Enter' });
    fireEvent.mouseEnter(targetRow);

    expect(onRowInteraction).toHaveBeenCalledWith('exercise-1', 'click');
    expect(onRowInteraction).toHaveBeenCalledWith('exercise-1', 'press');
    expect(onRowInteraction).toHaveBeenCalledWith('exercise-1', 'hover');
  });
});
