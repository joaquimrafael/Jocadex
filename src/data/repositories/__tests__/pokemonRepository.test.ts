import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import {
  getPokemonList,
  getPokemonDetail,
  getPokemonSpecies,
  getEvolutionChain,
} from '../pokemonRepository';
import { ApiError } from '@/data/api/pokeApiClient';
import { bulbasaurDetailMock } from '@/test/mocks/data/pokemonDetail.mock';
import { pokemonListMock } from '@/test/mocks/data/pokemonList.mock';
import { bulbasaurSpeciesMock } from '@/test/mocks/data/pokemonSpecies.mock';
import { bulbasaurEvolutionChainMock } from '@/test/mocks/data/evolutionChain.mock';

const BASE = 'https://pokeapi.co/api/v2';

describe('getPokemonList', () => {
  it('fetches the list and returns paginated results', async () => {
    const result = await getPokemonList(0, 20);
    expect(result.count).toBe(pokemonListMock.count);
    expect(result.results).toHaveLength(3);
    expect(result.results[0].name).toBe('bulbasaur');
  });

  it('throws ApiError on non-OK response', async () => {
    server.use(
      http.get(`${BASE}/pokemon`, () =>
        new HttpResponse(null, { status: 500, statusText: 'Server Error' }),
      ),
    );
    await expect(getPokemonList(0, 20)).rejects.toThrow(ApiError);
  });
});

describe('getPokemonDetail', () => {
  it('fetches Pokemon detail by name', async () => {
    const result = await getPokemonDetail('bulbasaur');
    expect(result.id).toBe(bulbasaurDetailMock.id);
    expect(result.name).toBe('bulbasaur');
  });

  it('fetches Pokemon detail by ID', async () => {
    const result = await getPokemonDetail(1);
    expect(result.id).toBe(1);
  });

  it('throws ApiError with status 404 for unknown Pokemon', async () => {
    let thrownError: ApiError | null = null;
    try {
      await getPokemonDetail('nonexistentmon');
    } catch (e) {
      thrownError = e as ApiError;
    }
    expect(thrownError).toBeInstanceOf(ApiError);
    expect(thrownError?.status).toBe(404);
  });
});

describe('getPokemonSpecies', () => {
  it('fetches species data for bulbasaur', async () => {
    const result = await getPokemonSpecies('bulbasaur');
    expect(result.evolution_chain.url).toBe(
      bulbasaurSpeciesMock.evolution_chain.url,
    );
  });
});

describe('getEvolutionChain', () => {
  it('fetches evolution chain by URL', async () => {
    const result = await getEvolutionChain(
      'https://pokeapi.co/api/v2/evolution-chain/1/',
    );
    expect(result.id).toBe(bulbasaurEvolutionChainMock.id);
    expect(result.chain.species.name).toBe('bulbasaur');
  });
});
