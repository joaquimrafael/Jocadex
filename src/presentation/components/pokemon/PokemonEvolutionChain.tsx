import { Link } from 'react-router-dom';
import { useEvolutionChain } from '@/presentation/hooks/useEvolutionChain';
import { capitalize } from '@/shared/utils/formatters';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface PokemonEvolutionChainProps {
  evolutionChainUrl: string;
}

export function PokemonEvolutionChain({ evolutionChainUrl }: PokemonEvolutionChainProps) {
  const { stages, isLoading, isError } = useEvolutionChain(evolutionChainUrl);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (isError || stages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {stages.map((stage, index) => (
        <div key={stage.id} className="flex items-center gap-2">
          {index > 0 && (
            <div className="flex flex-col items-center text-gray-400">
              <span className="text-lg">→</span>
              {stage.minLevel && (
                <span className="text-xs text-gray-400">Lv. {stage.minLevel}</span>
              )}
            </div>
          )}

          <Link
            to={`/pokemon/${stage.name}`}
            className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
            aria-label={`View ${capitalize(stage.name)}`}
          >
            <img
              src={stage.imageUrl}
              alt={capitalize(stage.name)}
              loading="lazy"
              className="w-16 h-16 object-contain"
            />
            <span className="text-xs font-medium text-gray-700 capitalize">
              {stage.name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}
