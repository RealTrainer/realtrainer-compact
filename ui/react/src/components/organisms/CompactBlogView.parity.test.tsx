import { render, screen } from '@testing-library/react';
import { workoutsFromCompact } from '../../preview/fromCompact';
import { CompactBlogView } from './CompactBlogView';

describe('CompactBlogView value parity', () => {
  it('renders 2026-02-09 exercise values like RealTrainer style', () => {
    const input = `[2026-02-09] ## Kontrastivoima (Sali) & Kierto
Tags voima, kontrasti, sali, kuntosali
Emojis 🏋️💥
Exercise Takakyykky|3x5@90kg
Exercise Vauhditon pituus|3x4
Exercise Penkkipunnerrus|3x5@80kg
Exercise Räjähtävä punnerrus|3x5
Exercise Vatsakiertokone|3x20
Exercise Isometrinen kyykkypito seinää vasten|3x45s,45s,0s
Exercise Lankku|2x25s,24s`;

    const parsed = workoutsFromCompact(input);
    expect(parsed.error).toBeNull();
    expect(parsed.workouts.length).toBe(1);

    render(<CompactBlogView workout={parsed.workouts[0]} />);

    expect(screen.getByText('Kontrastivoima (Sali) & Kierto')).toBeInTheDocument();
    expect(screen.getByText('Takakyykky')).toBeInTheDocument();
    expect(screen.getByTestId('row-exercise-2')).toHaveTextContent('3x5x90kg');
    expect(screen.getByText('Vauhditon pituus')).toBeInTheDocument();
    expect(screen.getByText('3x4')).toBeInTheDocument();
    expect(screen.getByText('Penkkipunnerrus')).toBeInTheDocument();
    expect(screen.getByTestId('row-exercise-4')).toHaveTextContent('3x5x80kg');
    expect(screen.getByText('Vatsakiertokone')).toBeInTheDocument();
    expect(screen.getByText('3x20')).toBeInTheDocument();
    expect(screen.getByText('45s, 45s')).toBeInTheDocument();
    expect(screen.getByText('25s, 24s')).toBeInTheDocument();
  });
});
