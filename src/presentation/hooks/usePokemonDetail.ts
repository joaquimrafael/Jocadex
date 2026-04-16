import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  getPokemonDetail,
  getPokemonSpecies,
} from '@/data/repositories/pokemonRepository';
import { mapToPokemonDetail } from '@/data/mappers/pokemonMapper';
import { PokemonDetail } from '@/domain/types/pokemon.types';

export function usePokemonDetail(nameOrId: string | number) {
  const detailQuery = useQuery({
    queryKey: ['pokemon-detail', nameOrId],
    queryFn: () => getPokemonDetail(nameOrId),
    enabled: Boolean(nameOrId),
  });

  const speciesQuery = useQuery({
    queryKey: ['pokemon-species', nameOrId],
    queryFn: () => getPokemonSpecies(nameOrId),
    enabled: Boolean(nameOrId),
  });

  const pokemon: PokemonDetail | undefined = useMemo(() => {
    if (!detailQuery.data || !speciesQuery.data) return undefined;
    return mapToPokemonDetail(detailQuery.data, speciesQuery.data);
  }, [detailQuery.data, speciesQuery.data]);

  const isLoading = detailQuery.isLoading || speciesQuery.isLoading;
  const isError = detailQuery.isError || speciesQuery.isError;
  const error = detailQuery.error ?? speciesQuery.error;

  return { pokemon, isLoading, isError, error };
}
