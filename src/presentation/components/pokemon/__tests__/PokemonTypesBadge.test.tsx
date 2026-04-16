import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { PokemonTypesBadge } from '../PokemonTypesBadge';
import { POKEMON_TYPE_COLORS } from '@/shared/constants/pokemon.constants';

describe('PokemonTypesBadge', () => {
  it('renders all type names capitalized', () => {
    render(<PokemonTypesBadge types={['grass', 'poison']} />);
    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByText('Poison')).toBeInTheDocument();
  });

  it('applies the correct background color for each type', () => {
    render(<PokemonTypesBadge types={['fire']} />);
    const badge = screen.getByText('Fire');
    expect(badge).toHaveStyle({
      backgroundColor: POKEMON_TYPE_COLORS.fire,
    });
  });

  it('renders nothing when types array is empty', () => {
    const { container } = render(<PokemonTypesBadge types={[]} />);
    expect(container.querySelector('span')).toBeNull();
  });

  it('renders a single type', () => {
    render(<PokemonTypesBadge types={['water']} />);
    expect(screen.getByText('Water')).toBeInTheDocument();
  });
});
