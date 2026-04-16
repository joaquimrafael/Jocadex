import { RawPokemonDetail } from '@/domain/types/pokemon.types';

export const bulbasaurDetailMock: RawPokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  types: [
    { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
    { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } },
  ],
  stats: [
    { base_stat: 45, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
    { base_stat: 49, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } },
    { base_stat: 49, effort: 0, stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' } },
    { base_stat: 65, effort: 1, stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' } },
    { base_stat: 65, effort: 0, stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' } },
    { base_stat: 45, effort: 0, stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' } },
  ],
  abilities: [
    { ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' }, is_hidden: false, slot: 1 },
    { ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' }, is_hidden: true, slot: 3 },
  ],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png',
      },
    },
  },
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  },
};

export const pikachuDetailMock: RawPokemonDetail = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 112,
  types: [
    { slot: 1, type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' } },
  ],
  stats: [
    { base_stat: 35, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
    { base_stat: 55, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } },
    { base_stat: 40, effort: 0, stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' } },
    { base_stat: 50, effort: 0, stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' } },
    { base_stat: 50, effort: 0, stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' } },
    { base_stat: 90, effort: 2, stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' } },
  ],
  abilities: [
    { ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' }, is_hidden: false, slot: 1 },
    { ability: { name: 'lightning-rod', url: 'https://pokeapi.co/api/v2/ability/31/' }, is_hidden: true, slot: 3 },
  ],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/25.png',
      },
    },
  },
  species: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
  },
};
