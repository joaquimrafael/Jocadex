import { RawPokemonSpecies } from '@/domain/types/pokemon.types';

export const bulbasaurSpeciesMock: RawPokemonSpecies = {
  evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' },
  flavor_text_entries: [
    {
      flavor_text:
        'A strange seed was\nplanted on its\nback at birth.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
      version: { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' },
    },
    {
      flavor_text: 'Un drôle de graine',
      language: { name: 'fr', url: 'https://pokeapi.co/api/v2/language/5/' },
      version: { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' },
    },
  ],
  genera: [
    {
      genus: 'Seed Pokémon',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
    {
      genus: 'Pokémon Graine',
      language: { name: 'fr', url: 'https://pokeapi.co/api/v2/language/5/' },
    },
  ],
  color: { name: 'green', url: 'https://pokeapi.co/api/v2/pokemon-color/5/' },
  habitat: { name: 'grassland', url: 'https://pokeapi.co/api/v2/pokemon-habitat/3/' },
};

export const pikachuSpeciesMock: RawPokemonSpecies = {
  evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/10/' },
  flavor_text_entries: [
    {
      flavor_text: 'When several of\nthese POKéMON gather,\ntheir electricity',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
      version: { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' },
    },
  ],
  genera: [
    {
      genus: 'Mouse Pokémon',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
  color: { name: 'yellow', url: 'https://pokeapi.co/api/v2/pokemon-color/10/' },
  habitat: { name: 'forest', url: 'https://pokeapi.co/api/v2/pokemon-habitat/2/' },
};
