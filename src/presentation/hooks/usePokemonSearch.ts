import { useQuery } from '@tanstack/react-query';
import { getPokemonDetail } from '@/data/repositories/pokemonRepository';
import { mapToPokemon } from '@/data/mappers/pokemonMapper';
import { ApiError } from '@/data/api/pokeApiClient';
import { useDebounce } from './useDebounce';
import { Pokemon } from '@/domain/types/pokemon.types';

export function usePokemonSearch(searchTerm: string) {
  const debouncedTerm = useDebounce(searchTerm.trim().toLowerCase(), 400);

  const query = useQuery({
    queryKey: ['pokemon-search', debouncedTerm],
    queryFn: async () => {
      try {
        const raw = await getPokemonDetail(debouncedTerm);
        return mapToPokemon(raw);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: debouncedTerm.length > 0,
    retry: false,
  });

  const result: Pokemon | null = query.data ?? null;

  return {
    result,
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
    isError: query.isError,
    searchTerm: debouncedTerm,
  };
}
