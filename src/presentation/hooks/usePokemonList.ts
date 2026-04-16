import { useInfiniteQuery } from '@tanstack/react-query';
import { getPokemonList } from '@/data/repositories/pokemonRepository';
import { mapToPokemonFromListItem } from '@/data/mappers/pokemonMapper';
import { POKEMON_LIST_LIMIT } from '@/shared/constants/api.constants';
import { Pokemon } from '@/domain/types/pokemon.types';

function getOffsetFromUrl(url: string | null): number | undefined {
  if (!url) return undefined;
  const params = new URL(url).searchParams;
  return parseInt(params.get('offset') ?? '0', 10);
}

export function usePokemonList() {
  const query = useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: ({ pageParam }) =>
      getPokemonList(pageParam as number, POKEMON_LIST_LIMIT),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => getOffsetFromUrl(lastPage.next),
  });

  const pokemonList: Pokemon[] =
    query.data?.pages.flatMap((page) =>
      page.results.map(mapToPokemonFromListItem),
    ) ?? [];

  const totalCount = query.data?.pages[0]?.count ?? 0;

  return {
    pokemonList,
    totalCount,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
