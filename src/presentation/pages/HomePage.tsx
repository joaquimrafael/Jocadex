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
  const selectedTypes = searchParams.getAll('type');

  const {
    pokemonList,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isListLoading,
    isError: isListError,
  } = usePokemonList();

  const { result: searchResult, isLoading: isSearchLoading } =
    usePokemonSearch(searchTerm);

  const { types, typePokemonList, isLoading: isTypesLoading } =
    usePokemonTypes(selectedTypes);

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

  function handleTypeSelect(types: string[]) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('type');
      types.forEach((t) => next.append('type', t));
      next.delete('search');
      return next;
    });
  }

  // Determine which Pokemon list to display
  let displayList: Pokemon[] = pokemonList;
  let isLoading = isListLoading;

  if (searchTerm) {
    // Search mode
    const searchCount = isSearchLoading ? null : searchResult ? 1 : 0;
    return (
      <div className="space-y-6">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <div className="-mx-4 px-4 overflow-x-auto py-1">
          <TypeFilter
            types={types}
            selectedTypes={selectedTypes}
            onTypeSelect={handleTypeSelect}
          />
        </div>

        <p className="text-center text-sm text-gray-400">
          {searchCount === null ? '\u00a0' : `${searchCount} Pokémon`}
        </p>

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

  if (selectedTypes.length > 0) {
    // Type filter mode: use the intersection of Pokémon from selected type endpoints.
    displayList = typePokemonList ?? [];
    isLoading = isTypesLoading;
  }

  if (isListError) {
    return (
      <div className="space-y-6">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <div className="-mx-4 px-4 overflow-x-auto py-1">
          <TypeFilter
            types={types}
            selectedTypes={selectedTypes}
            onTypeSelect={handleTypeSelect}
          />
        </div>
        <ErrorMessage
          message="Failed to load Pokémon. Please try again."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  const countLabel = isLoading
    ? '\u00a0'
    : selectedTypes.length > 0
      ? `${displayList.length} Pokémon`
      : `${pokemonList.length} of ${totalCount} Pokémon`;

  return (
    <div className="space-y-6">
      <SearchBar value={searchTerm} onChange={handleSearchChange} />

      <div className="-mx-4 px-4 overflow-x-auto py-1">
        <TypeFilter
          types={types}
          selectedTypes={selectedTypes}
          onTypeSelect={handleTypeSelect}
        />
      </div>

      <p className="text-center text-sm text-gray-400">{countLabel}</p>

      <PokemonGrid pokemonList={displayList} isLoading={isLoading} />

      {selectedTypes.length === 0 && (
        <LoadMoreButton
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          hasMore={hasNextPage}
        />
      )}
    </div>
  );
}
