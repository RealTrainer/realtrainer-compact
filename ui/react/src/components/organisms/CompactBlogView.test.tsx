import { render, screen } from '@testing-library/react';
import { CompactBlogView } from './CompactBlogView';
import { sampleWorkout } from '../../preview/fixtures';

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
  });
});
