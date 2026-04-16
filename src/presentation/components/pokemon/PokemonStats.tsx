import { PokemonStat } from '@/domain/types/pokemon.types';
import { STAT_NAMES, MAX_STAT_VALUE } from '@/shared/constants/pokemon.constants';
import { cn } from '@/shared/utils/cn';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

function getBarColor(value: number): string {
  if (value >= 100) return 'bg-green-500';
  if (value >= 50) return 'bg-yellow-400';
  return 'bg-red-400';
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  const total = stats.reduce((sum, stat) => sum + stat.baseStat, 0);

  return (
    <div className="space-y-3">
      {stats.map((stat) => {
        const displayName = STAT_NAMES[stat.name] ?? stat.name;
        const percentage = Math.min((stat.baseStat / MAX_STAT_VALUE) * 100, 100);

        return (
          <div key={stat.name} className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium w-20 text-right flex-shrink-0">
              {displayName}
            </span>
            <span className="text-sm font-bold text-gray-800 w-8 text-right flex-shrink-0">
              {stat.baseStat}
            </span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', getBarColor(stat.baseStat))}
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={stat.baseStat}
                aria-valuemin={0}
                aria-valuemax={MAX_STAT_VALUE}
                aria-label={displayName}
              />
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <span className="text-sm text-gray-500 font-medium w-20 text-right flex-shrink-0">
          Total
        </span>
        <span className="text-sm font-bold text-gray-800 w-8 text-right flex-shrink-0">
          {total}
        </span>
      </div>
    </div>
  );
}
