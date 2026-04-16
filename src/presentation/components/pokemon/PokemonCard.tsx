import { Link } from 'react-router-dom';
import { Pokemon } from '@/domain/types/pokemon.types';
import { capitalize, formatPokemonId } from '@/shared/utils/formatters';
import { PokemonTypesBadge } from './PokemonTypesBadge';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
      aria-label={`View details for ${capitalize(pokemon.name)}`}
    >
      <div className="aspect-square w-full flex items-center justify-center bg-gray-50 rounded-lg mb-3 overflow-hidden">
        <img
          src={pokemon.imageUrl}
          alt={capitalize(pokemon.name)}
          loading="lazy"
          className="w-full h-full object-contain p-2"
        />
      </div>
      <p className="text-xs text-gray-400 font-medium mb-0.5">
        {formatPokemonId(pokemon.id)}
      </p>
      <p className="font-semibold text-gray-800 mb-2 capitalize">{pokemon.name}</p>
      {pokemon.types.length > 0 && (
        <PokemonTypesBadge types={pokemon.types} size="sm" />
      )}
    </Link>
  );
}
