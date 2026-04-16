import { POKEMON_TYPE_COLORS } from '@/shared/constants/pokemon.constants';
import { capitalize } from '@/shared/utils/formatters';
import { cn } from '@/shared/utils/cn';

interface TypeFilterProps {
  types: string[];
  selectedType: string | null;
  onTypeSelect: (type: string | null) => void;
}

export function TypeFilter({ types, selectedType, onTypeSelect }: TypeFilterProps) {
  return (
    <div
      className="flex gap-2 pb-2"
      role="group"
      aria-label="Filter by type"
    >
      <button
        onClick={() => onTypeSelect(null)}
        className={cn(
          'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all',
          selectedType === null
            ? 'bg-red-600 text-white ring-2 ring-red-600 ring-offset-1'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        )}
        aria-pressed={selectedType === null}
      >
        All
      </button>

      {types.map((type) => {
        const color = POKEMON_TYPE_COLORS[type] ?? '#888';
        const isSelected = selectedType === type;

        return (
          <button
            key={type}
            onClick={() => onTypeSelect(isSelected ? null : type)}
            style={{
              backgroundColor: color,
              boxShadow: isSelected
                ? 'inset 0 0 0 2px rgba(255,255,255,0.85), inset 0 0 0 4px rgba(0,0,0,0.15)'
                : undefined,
            }}
            className={cn(
              'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium text-white transition-all',
              isSelected ? '' : 'opacity-80 hover:opacity-100',
            )}
            aria-pressed={isSelected}
            aria-label={`Filter by ${type}`}
          >
            {capitalize(type)}
          </button>
        );
      })}
    </div>
  );
}
