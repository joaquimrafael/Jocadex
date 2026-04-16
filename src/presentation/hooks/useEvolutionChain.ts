import { useQuery } from '@tanstack/react-query';
import { getEvolutionChain } from '@/data/repositories/pokemonRepository';
import { mapToEvolutionTree } from '@/data/mappers/pokemonMapper';
import { EvolutionNode } from '@/domain/types/pokemon.types';

export function useEvolutionChain(evolutionChainUrl: string) {
  const query = useQuery({
    queryKey: ['evolution-chain', evolutionChainUrl],
    queryFn: () => getEvolutionChain(evolutionChainUrl),
    enabled: Boolean(evolutionChainUrl),
    staleTime: Infinity,
  });

  const tree: EvolutionNode | null = query.data
    ? mapToEvolutionTree(query.data.chain)
    : null;

  return {
    tree,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
