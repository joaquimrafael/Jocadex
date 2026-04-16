import { PokemonAbility } from '@/domain/types/pokemon.types';

interface PokemonAbilitiesProps {
  abilities: PokemonAbility[];
}

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <ul className="space-y-2">
      {abilities.map((ability) => (
        <li key={ability.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" aria-hidden="true" />
          <span className="text-gray-800 capitalize">
            {ability.name.replace(/-/g, ' ')}
          </span>
          {ability.isHidden && (
            <span className="text-xs text-gray-400 italic">(Hidden)</span>
          )}
        </li>
      ))}
    </ul>
  );
}
