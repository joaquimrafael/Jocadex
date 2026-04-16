import { Pokemon } from '@/domain/types/pokemon.types';
import { PokemonCard } from './PokemonCard';
import { SkeletonCard } from '../ui/SkeletonCard';

interface PokemonGridProps {
  pokemonList: Pokemon[];
  isLoading: boolean;
}

const SKELETON_COUNT = 8;

export function PokemonGrid({ pokemonList, isLoading }: PokemonGridProps) {
  if (isLoading && pokemonList.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && pokemonList.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg">No Pokémon found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
