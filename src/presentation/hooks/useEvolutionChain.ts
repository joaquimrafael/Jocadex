import { useQuery } from '@tanstack/react-query';
import { getEvolutionChain } from '@/data/repositories/pokemonRepository';
import { mapToEvolutionStages } from '@/data/mappers/pokemonMapper';
import { EvolutionStage } from '@/domain/types/pokemon.types';

export function useEvolutionChain(evolutionChainUrl: string) {
  const query = useQuery({
    queryKey: ['evolution-chain', evolutionChainUrl],
    queryFn: () => getEvolutionChain(evolutionChainUrl),
    enabled: Boolean(evolutionChainUrl),
    staleTime: Infinity,
  });

  const stages: EvolutionStage[] = query.data
    ? mapToEvolutionStages(query.data.chain)
    : [];

  return {
    stages,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
