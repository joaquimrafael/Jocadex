import { POKEMON_TYPE_COLORS } from '@/shared/constants/pokemon.constants';
import { capitalize } from '@/shared/utils/formatters';
import { cn } from '@/shared/utils/cn';

interface PokemonTypesBadgeProps {
  types: string[];
  size?: 'sm' | 'md';
}

export function PokemonTypesBadge({ types, size = 'sm' }: PokemonTypesBadgeProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {types.map((type) => {
        const color = POKEMON_TYPE_COLORS[type] ?? '#888';
        return (
          <span
            key={type}
            style={{ backgroundColor: color }}
            className={cn(
              'rounded-full text-white font-medium',
              size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
            )}
          >
            {capitalize(type)}
          </span>
        );
      })}
    </div>
  );
}
