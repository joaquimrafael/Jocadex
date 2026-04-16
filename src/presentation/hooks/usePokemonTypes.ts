import { useQuery, useQueries } from '@tanstack/react-query';
import { getAllTypes, getTypeDetail } from '@/data/repositories/typeRepository';
import { mapToPokemonFromListItem } from '@/data/mappers/pokemonMapper';
import { Pokemon } from '@/domain/types/pokemon.types';

const EXCLUDED_TYPES = new Set(['stellar', 'unknown']);

function intersectPokemonLists(lists: Pokemon[][]): Pokemon[] {
  if (lists.length === 0) return [];
  const [first, ...rest] = lists;
  const nameSets = rest.map((list) => new Set(list.map((p) => p.name)));
  return first.filter((p) => nameSets.every((s) => s.has(p.name)));
}

export function usePokemonTypes(selectedTypes: string[] = []) {
  const typesQuery = useQuery({
    queryKey: ['pokemon-types'],
    queryFn: getAllTypes,
    staleTime: Infinity,
  });

  const types =
    typesQuery.data?.results
      .map((t) => t.name)
      .filter((name) => !EXCLUDED_TYPES.has(name)) ?? [];

  const typeDetailQueries = useQueries({
    queries: selectedTypes.map((type) => ({
      queryKey: ['type-detail', type],
      queryFn: () => getTypeDetail(type),
      enabled: selectedTypes.length > 0,
      staleTime: 1000 * 60 * 30,
    })),
  });

  const allLoaded =
    selectedTypes.length > 0 && typeDetailQueries.every((q) => q.data != null);
  const anyLoading = typeDetailQueries.some((q) => q.isLoading);

  let typePokemonList: Pokemon[] | null = null;
  if (allLoaded) {
    const lists = typeDetailQueries.map((q) =>
      q.data!.pokemon.map((entry) => mapToPokemonFromListItem(entry.pokemon)),
    );
    typePokemonList = intersectPokemonLists(lists);
  }

  return {
    types,
    typePokemonList,
    isLoading: typesQuery.isLoading || anyLoading,
  };
}
