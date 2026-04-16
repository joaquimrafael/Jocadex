import { useParams, Link } from 'react-router-dom';
import { usePokemonDetail } from '@/presentation/hooks/usePokemonDetail';
import { PokemonSprites } from '@/presentation/components/pokemon/PokemonSprites';
import { PokemonTypesBadge } from '@/presentation/components/pokemon/PokemonTypesBadge';
import { PokemonStats } from '@/presentation/components/pokemon/PokemonStats';
import { PokemonAbilities } from '@/presentation/components/pokemon/PokemonAbilities';
import { PokemonEvolutionChain } from '@/presentation/components/pokemon/PokemonEvolutionChain';
import { ApiError } from '@/data/api/pokeApiClient';
import { formatPokemonId } from '@/shared/utils/formatters';

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-16" />
      <div className="flex flex-col items-center gap-4">
        <div className="w-48 h-48 bg-gray-200 rounded-lg" />
        <div className="h-6 bg-gray-200 rounded w-32" />
      </div>
      <div className="h-24 bg-gray-200 rounded-xl" />
      <div className="h-48 bg-gray-200 rounded-xl" />
    </div>
  );
}

export function PokemonDetailPage() {
  const { nameOrId = '' } = useParams<{ nameOrId: string }>();
  const { pokemon, isLoading, isError, error } = usePokemonDetail(nameOrId);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  const is404 =
    isError && error instanceof ApiError && error.status === 404;

  if (is404 || (isError && !pokemon)) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-6xl">🤷</p>
        <p className="text-xl font-semibold text-gray-700">Pokémon not found</p>
        <p className="text-gray-500">
          &quot;{nameOrId}&quot; doesn&apos;t exist in the Pokédex.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium"
        aria-label="Back to home"
      >
        ← Back
      </Link>

      {/* Hero section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
        <PokemonSprites
          imageUrl={pokemon.imageUrl}
          shinyImageUrl={pokemon.shinyImageUrl}
          name={pokemon.name}
        />
        <p className="text-gray-400 text-sm font-medium mt-4">
          {formatPokemonId(pokemon.id)}
        </p>
        <h1 className="text-3xl font-bold text-gray-800 capitalize mt-1">
          {pokemon.name}
        </h1>
        {pokemon.genus && (
          <p className="text-gray-500 text-sm mt-1">{pokemon.genus}</p>
        )}
        <div className="flex justify-center mt-3">
          <PokemonTypesBadge types={pokemon.types} size="md" />
        </div>
        {pokemon.description && (
          <p className="text-gray-600 text-sm mt-4 leading-relaxed max-w-sm mx-auto">
            {pokemon.description}
          </p>
        )}
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Height</p>
          <p className="font-bold text-gray-800">{(pokemon.height / 10).toFixed(1)}m</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Weight</p>
          <p className="font-bold text-gray-800">{(pokemon.weight / 10).toFixed(1)}kg</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Base Exp</p>
          <p className="font-bold text-gray-800">{pokemon.baseExperience}</p>
        </div>
      </div>

      {/* Stats */}
      <DetailSection title="Base Stats">
        <PokemonStats stats={pokemon.stats} />
      </DetailSection>

      {/* Abilities */}
      <DetailSection title="Abilities">
        <PokemonAbilities abilities={pokemon.abilities} />
      </DetailSection>

      {/* Evolution Chain */}
      {pokemon.evolutionChainUrl && (
        <DetailSection title="Evolution Chain">
          <PokemonEvolutionChain evolutionChainUrl={pokemon.evolutionChainUrl} />
        </DetailSection>
      )}
    </div>
  );
}
