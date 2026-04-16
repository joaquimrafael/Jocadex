import { PaginatedResponse } from '@/domain/types/api.types';
import { PokemonListItem } from '@/domain/types/pokemon.types';

export const pokemonListMock: PaginatedResponse<PokemonListItem> = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  ],
};

export const pokemonListPage2Mock: PaginatedResponse<PokemonListItem> = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=40&limit=20',
  previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
  results: [
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
  ],
};
