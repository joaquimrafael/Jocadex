import { screen, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { renderWithProviders } from '@/test/utils/testUtils';
import { PokemonDetailPage } from '../PokemonDetailPage';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';

const BASE = 'https://pokeapi.co/api/v2';

// Helper: renders PokemonDetailPage inside a matched Route so useParams() works
function renderDetailPage(route: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/pokemon/:nameOrId" element={<PokemonDetailPage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>,
    { route },
  );
}

describe('PokemonDetailPage', () => {
  it('shows a skeleton while loading', () => {
    renderDetailPage('/pokemon/bulbasaur');
    // The detail page shows a skeleton (.animate-pulse) before data arrives
    expect(document.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('renders the Pokemon name after data loads', async () => {
    renderDetailPage('/pokemon/bulbasaur');
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  it('renders the Pokemon ID', async () => {
    renderDetailPage('/pokemon/bulbasaur');
    await waitFor(() => {
      expect(screen.getByText('#001')).toBeInTheDocument();
    });
  });

  it('renders type badges', async () => {
    renderDetailPage('/pokemon/bulbasaur');
    await waitFor(() => {
      expect(screen.getByText('Grass')).toBeInTheDocument();
      expect(screen.getByText('Poison')).toBeInTheDocument();
    });
  });

  it('renders stat labels', async () => {
    renderDetailPage('/pokemon/bulbasaur');
    await waitFor(() => {
      expect(screen.getByText('HP')).toBeInTheDocument();
      expect(screen.getByText('Attack')).toBeInTheDocument();
    });
  });

  it('renders abilities', async () => {
    renderDetailPage('/pokemon/bulbasaur');
    await waitFor(() => {
      expect(screen.getByText('overgrow')).toBeInTheDocument();
    });
  });

  it('renders a back link to home', async () => {
    renderDetailPage('/pokemon/bulbasaur');
    await waitFor(() => {
      const backLink = screen.getByRole('link', { name: /back to home/i });
      expect(backLink).toHaveAttribute('href', '/');
    });
  });

  it('renders section titles', async () => {
    renderDetailPage('/pokemon/bulbasaur');
    await waitFor(() => {
      expect(screen.getByText('Base Stats')).toBeInTheDocument();
      expect(screen.getByText('Abilities')).toBeInTheDocument();
    });
  });

  it('shows "Pokémon not found" message for unknown Pokemon', async () => {
    server.use(
      http.get(`${BASE}/pokemon/fakeemon`, () =>
        new HttpResponse(null, { status: 404, statusText: 'Not Found' }),
      ),
    );
    renderDetailPage('/pokemon/fakeemon');
    await waitFor(() => {
      expect(screen.getByText(/pokémon not found/i)).toBeInTheDocument();
    });
  });

  it('shows a link home on the 404 page', async () => {
    server.use(
      http.get(`${BASE}/pokemon/fakeemon`, () =>
        new HttpResponse(null, { status: 404, statusText: 'Not Found' }),
      ),
    );
    renderDetailPage('/pokemon/fakeemon');
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
    });
  });
});
