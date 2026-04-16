import { useState } from 'react';
import { capitalize } from '@/shared/utils/formatters';

interface PokemonSpritesProps {
  imageUrl: string;
  shinyImageUrl: string | null;
  name: string;
}

export function PokemonSprites({ imageUrl, shinyImageUrl, name }: PokemonSpritesProps) {
  const [showShiny, setShowShiny] = useState(false);

  const currentImage = showShiny && shinyImageUrl ? shinyImageUrl : imageUrl;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
        <img
          src={currentImage}
          alt={`${capitalize(name)}${showShiny ? ' (Shiny)' : ''}`}
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>

      {shinyImageUrl && (
        <button
          onClick={() => setShowShiny((prev) => !prev)}
          className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
          aria-pressed={showShiny}
        >
          {showShiny ? '✨ Show Normal' : '✨ Show Shiny'}
        </button>
      )}
    </div>
  );
}
