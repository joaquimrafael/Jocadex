import { useSearchParams } from 'react-router-dom';
import { usePokemonList } from '@/presentation/hooks/usePokemonList';
import { usePokemonSearch } from '@/presentation/hooks/usePokemonSearch';
import { usePokemonTypes } from '@/presentation/hooks/usePokemonTypes';
import { SearchBar } from '@/presentation/components/ui/SearchBar';
import { TypeFilter } from '@/presentation/components/ui/TypeFilter';
import { PokemonGrid } from '@/presentation/components/pokemon/PokemonGrid';
import { LoadMoreButton } from '@/presentation/components/ui/LoadMoreButton';
import { ErrorMessage } from '@/presentation/components/ui/ErrorMessage';
import { PokemonCard } from '@/presentation/components/pokemon/PokemonCard';
import { LoadingSpinner } from '@/presentation/components/ui/LoadingSpinner';
import { Pokemon } from '@/domain/types/pokemon.types';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') ?? '';
  const selectedType = searchParams.get('type');

  const {
    pokemonList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isListLoading,
    isError: isListError,
  } = usePokemonList();

  const { result: searchResult, isLoading: isSearchLoading } =
    usePokemonSearch(searchTerm);

  const { types, typePokemonIds, isLoading: isTypesLoading } =
    usePokemonTypes(selectedType);

  function handleSearchChange(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set('search', value);
      } else {
        next.delete('search');
      }
      next.delete('type');
      return next;
    });
  }

  function handleTypeSelect(type: string | null) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (type) {
        next.set('type', type);
      } else {
        next.delete('type');
      }
      next.delete('search');
      return next;
    });
  }

  // Determine which Pokemon list to display
  let displayList: Pokemon[] = pokemonList;
  let isLoading = isListLoading;

  if (searchTerm) {
    // Search mode
    return (
      <div className="space-y-6">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <TypeFilter
          types={types}
          selectedType={selectedType}
          onTypeSelect={handleTypeSelect}
        />

        {isSearchLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : searchResult ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <PokemonCard pokemon={searchResult} />
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">
              No Pokémon found for &quot;{searchTerm}&quot;.
            </p>
          </div>
        )}
      </div>
    );
  }

  if (selectedType && typePokemonIds) {
    // Type filter mode
    displayList = pokemonList.filter((p) => typePokemonIds.includes(p.id));
    isLoading = isListLoading || isTypesLoading;
  }

  if (isListError) {
    return (
      <div className="space-y-6">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <TypeFilter
          types={types}
          selectedType={selectedType}
          onTypeSelect={handleTypeSelect}
        />
        <ErrorMessage
          message="Failed to load Pokémon. Please try again."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchBar value={searchTerm} onChange={handleSearchChange} />

      <TypeFilter
        types={types}
        selectedType={selectedType}
        onTypeSelect={handleTypeSelect}
      />

      <PokemonGrid pokemonList={displayList} isLoading={isLoading} />

      {!selectedType && (
        <LoadMoreButton
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          hasMore={hasNextPage}
        />
      )}
    </div>
  );
}
