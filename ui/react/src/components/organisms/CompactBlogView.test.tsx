import { render, screen } from '@testing-library/react';
import { CompactBlogView } from './CompactBlogView';
import { sampleWorkout } from '../../preview/fixtures';
import { workoutsFromCompact } from '../../preview/fromCompact';

describe('CompactBlogView', () => {
  it('renders title and key rows', () => {
    render(<CompactBlogView workout={sampleWorkout} />);

    expect(screen.getByText('Voima- ja Kestavyysharjoitus')).toBeInTheDocument();
    expect(screen.getByText('Penkkipunnerrus kasipainoin')).toBeInTheDocument();
    expect(screen.getByText('rintauinti')).toBeInTheDocument();
    expect(screen.getByText('12min')).toBeInTheDocument();
    expect(screen.getByText('500m')).toBeInTheDocument();
    expect(screen.getByText('@2:24/100m')).toBeInTheDocument();
    expect(screen.getByText('CrossTrainer')).toBeInTheDocument();
    expect(screen.queryByText('1x1')).not.toBeInTheDocument();
    expect(screen.getByText("3'12\"/100m")).toBeInTheDocument();
    expect(screen.getByTestId('pyramid-name')).toHaveTextContent('Alataljasoutu');
    expect(screen.getByTestId('pyramid-sets')).toHaveTextContent('12x52.5kg');
    expect(screen.getByText('Kalorit:')).toBeInTheDocument();
    expect(screen.getByText('~239kcal')).toBeInTheDocument();
    expect(screen.getByText('Blorple this should be unknown line and highlighted as error')).toBeInTheDocument();
    expect(screen.getByTestId('duration-badge')).toHaveTextContent('20min');
    expect(screen.getByTestId('duration-description')).toHaveTextContent('Kestavyysosio');
  });

  it('renders standalone split durations in clock format', () => {
    const input = `[2026-03-28] ## Ulkojuoksu
Run 8.45min 1.03km
Text Reppu selassa, paras vauhti lopussa vahan alle 6min/km, polville ihan OK
> 1km 8'11"@140bpm
> 0.03km 0'13"@156bpm`;

    const parsed = workoutsFromCompact(input);
    expect(parsed.error).toBeNull();
    expect(parsed.workouts.length).toBe(1);

    render(<CompactBlogView workout={parsed.workouts[0]} />);

    expect(screen.getByText('1km')).toBeInTheDocument();
    expect(screen.getByText("8'11\"")).toBeInTheDocument();
    expect(screen.getByText('140bpm')).toBeInTheDocument();
    expect(screen.getByText('0.03km')).toBeInTheDocument();
    expect(screen.getByText("0'13\"")).toBeInTheDocument();
    expect(screen.getByText('156bpm')).toBeInTheDocument();
    expect(screen.getByTestId('standalone-splits-group')).toBeInTheDocument();
  });

  it('renders metadata strip and unsupported life-tracking entries when header is hidden', () => {
    const input = `[2026-03-28] ## Arki
Tags recovery, daily
Emojis 😴💧
Section Paaosa
Time 20min | Crosstrainer
Food 450kcal 30g/prot | Chicken salad
Expense 14.90EUR | groceries
Health physio | Shoulder mobility
Weight 85.2kg`;

    const parsed = workoutsFromCompact(input);
    expect(parsed.error).toBeNull();
    expect(parsed.workouts.length).toBe(1);

    render(
      <CompactBlogView
        workout={parsed.workouts[0]}
        showHeader={false}
        headerOptions={{ showMetaStrip: true }}
      />,
    );

    expect(screen.getByTestId('workout-meta-strip')).toBeInTheDocument();
    expect(screen.getAllByText('recovery')).toHaveLength(1);
    expect(screen.getAllByText('😴💧')).toHaveLength(1);
    expect(screen.queryByTestId('row-tags-0')).not.toBeInTheDocument();
    expect(screen.queryByTestId('row-emojis-1')).not.toBeInTheDocument();
    expect(screen.getByText('Paaosa')).toBeInTheDocument();
    expect(screen.getByText('Crosstrainer')).toBeInTheDocument();
    expect(screen.getByText('Food 450kcal 30g/prot | Chicken salad')).toBeInTheDocument();
    expect(screen.getByText('Expense 14.9EUR | groceries')).toBeInTheDocument();
    expect(screen.getByText('Health physio | Shoulder mobility')).toBeInTheDocument();
    expect(screen.getByText('weight 85.2kg')).toBeInTheDocument();
  });

  it('combines multiple emoji lines into one visible emoji badge', () => {
    const input = `[2026-03-28] ## Arki
Emojis 💪🧙
Emojis 🏊🌊
Text Good session overall`;

    const parsed = workoutsFromCompact(input);
    expect(parsed.error).toBeNull();
    expect(parsed.workouts.length).toBe(1);

    render(
      <CompactBlogView
        workout={parsed.workouts[0]}
        showHeader={false}
        headerOptions={{ showMetaStrip: true }}
      />,
    );

    expect(screen.getByText('💪🧙🏊🌊')).toBeInTheDocument();
  });

  it('omits the title completely when compact input has no title', () => {
    const input = `[2026-03-28]
Run 8km | Rauhallinen lenkki`;

    const parsed = workoutsFromCompact(input);
    expect(parsed.error).toBeNull();
    expect(parsed.workouts.length).toBe(1);

    render(<CompactBlogView workout={parsed.workouts[0]} />);

    expect(screen.queryByText(/untitled workout/i)).not.toBeInTheDocument();
    expect(screen.getByText('28.03.2026')).toBeInTheDocument();
    expect(screen.getByText('juoksu')).toBeInTheDocument();
  });

  it('renders measured bilateral exercise recovery', () => {
    const input = `[2026-03-28] ## Core
Exercise Side Plank|2x20s+37s,23s+21s/60s`;

    const parsed = workoutsFromCompact(input);
    expect(parsed.error).toBeNull();
    expect(parsed.workouts.length).toBe(1);
    expect(parsed.workouts[0].rows[0]).toMatchObject({
      type: 'exercise',
      recovery: { value: 60, max: null, unit: 'sec' },
    });

    render(<CompactBlogView workout={parsed.workouts[0]} />);

    expect(screen.getByText('Side Plank')).toBeInTheDocument();
    expect(screen.getByTestId('row-exercise-0')).toHaveTextContent('20s+37s, 23s+21s • / palautus 60s');
  });

  it('supports custom exercise scheme rendering', () => {
    const input = `[2026-03-28] ## Core
Exercise Side Plank|2x20s+37s,23s+21s/60s`;

    const parsed = workoutsFromCompact(input);
    expect(parsed.error).toBeNull();
    expect(parsed.workouts.length).toBe(1);

    render(
      <CompactBlogView
        workout={parsed.workouts[0]}
        renderers={{
          renderExerciseScheme: (row) => <span data-testid="custom-scheme">custom scheme for {row.name}</span>,
        }}
      />,
    );

    expect(screen.getByTestId('custom-scheme')).toHaveTextContent('custom scheme for Side Plank');
  });
});
