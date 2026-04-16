import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils/testUtils';
import { PokemonGrid } from '../PokemonGrid';
import { Pokemon } from '@/domain/types/pokemon.types';

const mockPokemonList: Pokemon[] = [
  { id: 1, name: 'bulbasaur', imageUrl: 'url1', types: ['grass'] },
  { id: 2, name: 'ivysaur', imageUrl: 'url2', types: ['grass'] },
  { id: 3, name: 'venusaur', imageUrl: 'url3', types: ['grass'] },
];

describe('PokemonGrid', () => {
  it('renders the correct number of cards', () => {
    renderWithProviders(
      <PokemonGrid pokemonList={mockPokemonList} isLoading={false} />,
    );
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  it('renders skeleton cards when loading with no data', () => {
    renderWithProviders(<PokemonGrid pokemonList={[]} isLoading={true} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(document.querySelectorAll('.animate-pulse')).toHaveLength(8);
  });

  it('shows "No Pokémon found" message when not loading and list is empty', () => {
    renderWithProviders(<PokemonGrid pokemonList={[]} isLoading={false} />);
    expect(screen.getByText(/no pokémon found/i)).toBeInTheDocument();
  });

  it('renders cards even while loading if data already exists', () => {
    renderWithProviders(
      <PokemonGrid pokemonList={mockPokemonList} isLoading={true} />,
    );
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});
