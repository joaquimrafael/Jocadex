import { LoadingSpinner } from './LoadingSpinner';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export function LoadMoreButton({ onClick, isLoading, hasMore }: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        disabled={isLoading}
        aria-label="Load more Pokémon"
        className="px-8 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm"
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" />
            <span>Loading...</span>
          </>
        ) : (
          'Load More Pokémon'
        )}
      </button>
    </div>
  );
}
