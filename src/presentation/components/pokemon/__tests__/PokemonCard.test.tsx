import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils/testUtils';
import { PokemonCard } from '../PokemonCard';
import { Pokemon } from '@/domain/types/pokemon.types';

const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  types: ['grass', 'poison'],
};

describe('PokemonCard', () => {
  it('displays the Pokemon name capitalized', () => {
    renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('displays the formatted Pokemon ID', () => {
    renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText('#001')).toBeInTheDocument();
  });

  it('renders the Pokemon image with correct src and alt', () => {
    renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
    const img = screen.getByRole('img', { name: 'Bulbasaur' });
    expect(img).toHaveAttribute('src', mockPokemon.imageUrl);
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('renders a link to the Pokemon detail page', () => {
    renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
    const link = screen.getByRole('link', { name: /view details for bulbasaur/i });
    expect(link).toHaveAttribute('href', '/pokemon/bulbasaur');
  });

  it('renders type badges', () => {
    renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByText('Poison')).toBeInTheDocument();
  });

  it('does not render type badges when types array is empty', () => {
    const pokemonNoTypes = { ...mockPokemon, types: [] };
    renderWithProviders(<PokemonCard pokemon={pokemonNoTypes} />);
    expect(screen.queryByText('Grass')).not.toBeInTheDocument();
  });
});
