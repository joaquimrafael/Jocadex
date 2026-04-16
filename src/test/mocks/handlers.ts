import { http, HttpResponse } from 'msw';
import { pokemonListMock } from './data/pokemonList.mock';
import { bulbasaurDetailMock, pikachuDetailMock } from './data/pokemonDetail.mock';
import { bulbasaurSpeciesMock, pikachuSpeciesMock } from './data/pokemonSpecies.mock';
import { bulbasaurEvolutionChainMock } from './data/evolutionChain.mock';
import { pokemonTypesMock, fireTypeDetailMock } from './data/pokemonTypes.mock';

const BASE = 'https://pokeapi.co/api/v2';

export const handlers = [
  http.get(`${BASE}/pokemon`, () => {
    return HttpResponse.json(pokemonListMock);
  }),

  http.get(`${BASE}/pokemon/bulbasaur`, () => {
    return HttpResponse.json(bulbasaurDetailMock);
  }),

  http.get(`${BASE}/pokemon/1`, () => {
    return HttpResponse.json(bulbasaurDetailMock);
  }),

  http.get(`${BASE}/pokemon/pikachu`, () => {
    return HttpResponse.json(pikachuDetailMock);
  }),

  http.get(`${BASE}/pokemon/25`, () => {
    return HttpResponse.json(pikachuDetailMock);
  }),

  http.get(`${BASE}/pokemon/nonexistentmon`, () => {
    return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
  }),

  http.get(`${BASE}/pokemon-species/bulbasaur`, () => {
    return HttpResponse.json(bulbasaurSpeciesMock);
  }),

  http.get(`${BASE}/pokemon-species/1`, () => {
    return HttpResponse.json(bulbasaurSpeciesMock);
  }),

  http.get(`${BASE}/pokemon-species/pikachu`, () => {
    return HttpResponse.json(pikachuSpeciesMock);
  }),

  http.get(`${BASE}/pokemon-species/25`, () => {
    return HttpResponse.json(pikachuSpeciesMock);
  }),

  http.get(`${BASE}/evolution-chain/1`, () => {
    return HttpResponse.json(bulbasaurEvolutionChainMock);
  }),

  http.get(`${BASE}/evolution-chain/:id`, () => {
    return HttpResponse.json(bulbasaurEvolutionChainMock);
  }),

  http.get(`${BASE}/type`, () => {
    return HttpResponse.json(pokemonTypesMock);
  }),

  http.get(`${BASE}/type/fire`, () => {
    return HttpResponse.json(fireTypeDetailMock);
  }),
];
