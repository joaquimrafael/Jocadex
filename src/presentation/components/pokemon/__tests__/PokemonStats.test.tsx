import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { PokemonStats } from '../PokemonStats';
import { PokemonStat } from '@/domain/types/pokemon.types';

const mockStats: PokemonStat[] = [
  { name: 'hp', baseStat: 45 },
  { name: 'attack', baseStat: 49 },
  { name: 'defense', baseStat: 49 },
  { name: 'special-attack', baseStat: 65 },
  { name: 'special-defense', baseStat: 65 },
  { name: 'speed', baseStat: 45 },
];

describe('PokemonStats', () => {
  it('renders all 6 stats', () => {
    render(<PokemonStats stats={mockStats} />);
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.getByText('Sp. Atk')).toBeInTheDocument();
    expect(screen.getByText('Sp. Def')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
  });

  it('renders the numeric base stat values', () => {
    render(<PokemonStats stats={mockStats} />);
    const values = screen.getAllByText('45');
    expect(values.length).toBeGreaterThanOrEqual(1);
    const values49 = screen.getAllByText('49');
    expect(values49.length).toBeGreaterThanOrEqual(1);
  });

  it('renders progress bars with aria attributes', () => {
    render(<PokemonStats stats={mockStats} />);
    const bars = screen.getAllByRole('progressbar');
    expect(bars).toHaveLength(6);
    expect(bars[0]).toHaveAttribute('aria-valuenow', '45');
  });
});
