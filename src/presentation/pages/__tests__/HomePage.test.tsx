import { screen, waitFor, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils/testUtils';
import { HomePage } from '../HomePage';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import { pokemonListPage2Mock } from '@/test/mocks/data/pokemonList.mock';
import { pikachuDetailMock } from '@/test/mocks/data/pokemonDetail.mock';

const BASE = 'https://pokeapi.co/api/v2';

describe('HomePage', () => {
  it('shows skeleton cards while loading', () => {
    renderWithProviders(<HomePage />);
    expect(document.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('renders Pokemon cards after data loads', async () => {
    renderWithProviders(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(screen.getByText('venusaur')).toBeInTheDocument();
  });

  it('shows a "Load More Pokémon" button when there is a next page', async () => {
    renderWithProviders(<HomePage />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /load more pokémon/i })).toBeInTheDocument();
    });
  });

  it('loads more Pokemon when "Load More" is clicked', async () => {
    server.use(
      http.get(`${BASE}/pokemon`, ({ request }) => {
        const url = new URL(request.url);
        const offset = url.searchParams.get('offset');
        if (offset === '20') {
          return HttpResponse.json(pokemonListPage2Mock);
        }
        return HttpResponse.json({
          count: 1302,
          next: `${BASE}/pokemon?offset=20&limit=20`,
          previous: null,
          results: [
            { name: 'bulbasaur', url: `${BASE}/pokemon/1/` },
            { name: 'ivysaur', url: `${BASE}/pokemon/2/` },
          ],
        });
      }),
    );

    renderWithProviders(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /load more pokémon/i }));

    await waitFor(() => {
      expect(screen.getByText('charmander')).toBeInTheDocument();
    });
  });

  it('shows search results when a search term is entered', async () => {
    renderWithProviders(<HomePage />, { route: '/?search=pikachu' });

    server.use(
      http.get(`${BASE}/pokemon/pikachu`, () => {
        return HttpResponse.json(pikachuDetailMock);
      }),
    );

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });

  it('shows "No Pokémon found" when search returns nothing', async () => {
    server.use(
      http.get(`${BASE}/pokemon/zzz`, () =>
        new HttpResponse(null, { status: 404, statusText: 'Not Found' }),
      ),
    );
    renderWithProviders(<HomePage />, { route: '/?search=zzz' });
    await waitFor(() => {
      expect(screen.getByText(/no pokémon found/i)).toBeInTheDocument();
    });
  });

  it('renders the type filter with type buttons', async () => {
    renderWithProviders(<HomePage />);
    // "All" is always shown; "Fire" appears after the types API call resolves
    await waitFor(() => {
      expect(screen.getByText('Fire')).toBeInTheDocument();
    });
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  describe('type filter pagination', () => {
    const waterPokemon = Array.from({ length: 25 }, (_, i) => ({
      pokemon: {
        name: `water-mon-${i + 1}`,
        url: `${BASE}/pokemon/${100 + i}/`,
      },
      slot: 1,
    }));

    beforeEach(() => {
      server.use(
        http.get(`${BASE}/type/water`, () =>
          HttpResponse.json({ name: 'water', pokemon: waterPokemon }),
        ),
      );
    });

    it('shows first 20 Pokémon when a type with >20 members is selected', async () => {
      renderWithProviders(<HomePage />, { route: '/?type=water' });

      await waitFor(() => {
        expect(screen.getByText('water-mon-1')).toBeInTheDocument();
      });

      expect(screen.getByText('water-mon-20')).toBeInTheDocument();
      expect(screen.queryByText('water-mon-21')).not.toBeInTheDocument();
    });

    it('shows more Pokémon after clicking Load More in type filter mode', async () => {
      renderWithProviders(<HomePage />, { route: '/?type=water' });

      await waitFor(() => {
        expect(screen.getByText('water-mon-20')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: /load more pokémon/i }));

      await waitFor(() => {
        expect(screen.getByText('water-mon-25')).toBeInTheDocument();
      });
    });
  });
});
