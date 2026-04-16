import { useQuery } from '@tanstack/react-query';
import { getAllTypes, getTypeDetail } from '@/data/repositories/typeRepository';
import { extractIdFromUrl } from '@/shared/utils/urlHelpers';

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

  const typePokemonIds: number[] | null = typeDetailQuery.data
    ? typeDetailQuery.data.pokemon.map((p) =>
        extractIdFromUrl(p.pokemon.url),
      )
    : null;

  return {
    types,
    typePokemonIds,
    isLoading: typesQuery.isLoading || typeDetailQuery.isLoading,
  };
}
