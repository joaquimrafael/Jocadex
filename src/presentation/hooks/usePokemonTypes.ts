import { useQuery } from '@tanstack/react-query';
import { getAllTypes, getTypeDetail } from '@/data/repositories/typeRepository';
import { mapToPokemonFromListItem } from '@/data/mappers/pokemonMapper';
import { Pokemon } from '@/domain/types/pokemon.types';

const EXCLUDED_TYPES = new Set(['stellar', 'unknown']);

export function usePokemonTypes(selectedType: string | null = null) {
  const typesQuery = useQuery({
    queryKey: ['pokemon-types'],
    queryFn: getAllTypes,
    staleTime: Infinity,
  });

  const types =
    typesQuery.data?.results
      .map((t) => t.name)
      .filter((name) => !EXCLUDED_TYPES.has(name)) ?? [];

  const typeDetailQuery = useQuery({
    queryKey: ['type-detail', selectedType],
    queryFn: () => getTypeDetail(selectedType!),
    enabled: Boolean(selectedType),
    staleTime: 1000 * 60 * 30,
  });

  // Build the full Pokémon list for the selected type directly from the type
  // endpoint — which returns ALL Pokémon of that type, not just the paginated ones.
  const typePokemonList: Pokemon[] | null = typeDetailQuery.data
    ? typeDetailQuery.data.pokemon.map((entry) =>
        mapToPokemonFromListItem(entry.pokemon),
      )
    : null;

  return {
    types,
    typePokemonList,
    isLoading: typesQuery.isLoading || typeDetailQuery.isLoading,
  };
}
