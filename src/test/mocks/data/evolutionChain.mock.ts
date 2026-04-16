import { RawEvolutionChain } from '@/domain/types/pokemon.types';

export const eeveeEvolutionChainMock: RawEvolutionChain = {
  id: 67,
  chain: {
    species: {
      name: 'eevee',
      url: 'https://pokeapi.co/api/v2/pokemon-species/133/',
    },
    evolution_details: [],
    evolves_to: [
      {
        species: {
          name: 'vaporeon',
          url: 'https://pokeapi.co/api/v2/pokemon-species/134/',
        },
        evolution_details: [
          {
            min_level: null,
            trigger: { name: 'use-item', url: 'https://pokeapi.co/api/v2/evolution-trigger/3/' },
            item: null,
          },
        ],
        evolves_to: [],
      },
      {
        species: {
          name: 'jolteon',
          url: 'https://pokeapi.co/api/v2/pokemon-species/135/',
        },
        evolution_details: [
          {
            min_level: null,
            trigger: { name: 'use-item', url: 'https://pokeapi.co/api/v2/evolution-trigger/3/' },
            item: null,
          },
        ],
        evolves_to: [],
      },
    ],
  },
};

export const bulbasaurEvolutionChainMock: RawEvolutionChain = {
  id: 1,
  chain: {
    species: {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
    },
    evolution_details: [],
    evolves_to: [
      {
        species: {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
        },
        evolution_details: [
          {
            min_level: 16,
            trigger: { name: 'level-up', url: 'https://pokeapi.co/api/v2/evolution-trigger/1/' },
            item: null,
          },
        ],
        evolves_to: [
          {
            species: {
              name: 'venusaur',
              url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
            },
            evolution_details: [
              {
                min_level: 32,
                trigger: { name: 'level-up', url: 'https://pokeapi.co/api/v2/evolution-trigger/1/' },
                item: null,
              },
            ],
            evolves_to: [],
          },
        ],
      },
    ],
  },
};
