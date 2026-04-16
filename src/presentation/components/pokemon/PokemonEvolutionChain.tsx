import { Link } from 'react-router-dom';
import { useEvolutionChain } from '@/presentation/hooks/useEvolutionChain';
import { capitalize } from '@/shared/utils/formatters';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { EvolutionNode } from '@/domain/types/pokemon.types';

interface PokemonEvolutionChainProps {
  evolutionChainUrl: string;
}

function EvolutionNodeView({
  node,
  showArrow,
}: {
  node: EvolutionNode;
  showArrow: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {showArrow && (
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-lg">→</span>
          {node.minLevel && (
            <span className="text-xs">Lv. {node.minLevel}</span>
          )}
        </div>
      )}
      <Link
        to={`/pokemon/${node.name}`}
        className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
        aria-label={`View ${capitalize(node.name)}`}
      >
        <img
          src={node.imageUrl}
          alt={capitalize(node.name)}
          loading="lazy"
          className="w-16 h-16 object-contain"
        />
        <span className="text-xs font-medium text-gray-700 capitalize">
          {node.name}
        </span>
      </Link>
      {node.evolvesTo.length > 0 && (
        <div className="flex flex-col gap-3">
          {node.evolvesTo.map((child) => (
            <EvolutionNodeView key={child.id} node={child} showArrow />
          ))}
        </div>
      )}
    </div>
  );
}

export function PokemonEvolutionChain({ evolutionChainUrl }: PokemonEvolutionChainProps) {
  const { tree, isLoading, isError } = useEvolutionChain(evolutionChainUrl);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (isError || !tree) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <EvolutionNodeView node={tree} showArrow={false} />
    </div>
  );
}
