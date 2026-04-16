import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { createTestQueryClient } from '@/test/utils/testUtils';
import { usePokemonList } from '../usePokemonList';

function createWrapper() {
  const queryClient = createTestQueryClient();
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('usePokemonList', () => {
  it('starts in loading state', () => {
    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.pokemonList).toHaveLength(0);
  });

  it('returns a list of Pokemon after data loads', async () => {
    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.pokemonList).toHaveLength(3);
    expect(result.current.pokemonList[0].name).toBe('bulbasaur');
    expect(result.current.pokemonList[0].id).toBe(1);
  });

  it('constructs imageUrl from list item URL', async () => {
    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.pokemonList[0].imageUrl).toContain(
      'official-artwork/1.png',
    );
  });

  it('sets hasNextPage when next page exists', async () => {
    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.hasNextPage).toBe(true);
  });
});
