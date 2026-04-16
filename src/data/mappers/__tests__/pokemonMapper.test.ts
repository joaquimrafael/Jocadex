import {
  mapToPokemon,
  mapToPokemonFromListItem,
  mapToPokemonDetail,
  mapToEvolutionStages,
} from '../pokemonMapper';
import { bulbasaurDetailMock } from '@/test/mocks/data/pokemonDetail.mock';
import { bulbasaurSpeciesMock } from '@/test/mocks/data/pokemonSpecies.mock';
import { bulbasaurEvolutionChainMock } from '@/test/mocks/data/evolutionChain.mock';

describe('mapToPokemon', () => {
  it('maps raw detail to a clean Pokemon entity', () => {
    const result = mapToPokemon(bulbasaurDetailMock);
    expect(result.id).toBe(1);
    expect(result.name).toBe('bulbasaur');
    expect(result.types).toEqual(['grass', 'poison']);
    expect(result.imageUrl).toContain('official-artwork/1.png');
  });

  it('falls back to front_default sprite when official-artwork is null', () => {
    const raw = {
      ...bulbasaurDetailMock,
      sprites: {
        front_default: 'https://example.com/front.png',
        other: {
          'official-artwork': {
            front_default: null,
            front_shiny: null,
          },
        },
      },
    };
    const result = mapToPokemon(raw);
    expect(result.imageUrl).toBe('https://example.com/front.png');
  });
});

describe('mapToPokemonFromListItem', () => {
  it('extracts ID from URL and constructs image URL', () => {
    const item = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };
    const result = mapToPokemonFromListItem(item);
    expect(result.id).toBe(1);
    expect(result.name).toBe('bulbasaur');
    expect(result.imageUrl).toContain('official-artwork/1.png');
    expect(result.types).toEqual([]);
  });

  it('works for Pikachu (ID 25)', () => {
    const item = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' };
    const result = mapToPokemonFromListItem(item);
    expect(result.id).toBe(25);
    expect(result.imageUrl).toContain('official-artwork/25.png');
  });
});

describe('mapToPokemonDetail', () => {
  it('combines raw detail and species into a PokemonDetail', () => {
    const result = mapToPokemonDetail(bulbasaurDetailMock, bulbasaurSpeciesMock);

    expect(result.id).toBe(1);
    expect(result.name).toBe('bulbasaur');
    expect(result.height).toBe(7);
    expect(result.weight).toBe(69);
    expect(result.baseExperience).toBe(64);
    expect(result.types).toEqual(['grass', 'poison']);
  });

  it('maps stats correctly', () => {
    const result = mapToPokemonDetail(bulbasaurDetailMock, bulbasaurSpeciesMock);
    expect(result.stats).toHaveLength(6);
    expect(result.stats[0]).toEqual({ name: 'hp', baseStat: 45 });
    expect(result.stats[1]).toEqual({ name: 'attack', baseStat: 49 });
  });

  it('maps abilities with hidden flag', () => {
    const result = mapToPokemonDetail(bulbasaurDetailMock, bulbasaurSpeciesMock);
    expect(result.abilities).toHaveLength(2);
    expect(result.abilities[0]).toEqual({ name: 'overgrow', isHidden: false });
    expect(result.abilities[1]).toEqual({ name: 'chlorophyll', isHidden: true });
  });

  it('extracts the English flavor text and cleans it', () => {
    const result = mapToPokemonDetail(bulbasaurDetailMock, bulbasaurSpeciesMock);
    expect(result.description).toBe('A strange seed was planted on its back at birth.');
  });

  it('extracts the English genus', () => {
    const result = mapToPokemonDetail(bulbasaurDetailMock, bulbasaurSpeciesMock);
    expect(result.genus).toBe('Seed Pokémon');
  });

  it('sets color and habitat from species', () => {
    const result = mapToPokemonDetail(bulbasaurDetailMock, bulbasaurSpeciesMock);
    expect(result.color).toBe('green');
    expect(result.habitat).toBe('grassland');
  });

  it('sets null habitat when species habitat is null', () => {
    const speciesNoHabitat = { ...bulbasaurSpeciesMock, habitat: null };
    const result = mapToPokemonDetail(bulbasaurDetailMock, speciesNoHabitat);
    expect(result.habitat).toBeNull();
  });

  it('sets evolutionChainUrl from species', () => {
    const result = mapToPokemonDetail(bulbasaurDetailMock, bulbasaurSpeciesMock);
    expect(result.evolutionChainUrl).toBe('https://pokeapi.co/api/v2/evolution-chain/1/');
  });
});

describe('mapToEvolutionStages', () => {
  it('flattens the Bulbasaur chain into 3 stages', () => {
    const stages = mapToEvolutionStages(bulbasaurEvolutionChainMock.chain);
    expect(stages).toHaveLength(3);
  });

  it('correctly maps the first stage (base form)', () => {
    const stages = mapToEvolutionStages(bulbasaurEvolutionChainMock.chain);
    expect(stages[0].id).toBe(1);
    expect(stages[0].name).toBe('bulbasaur');
    expect(stages[0].minLevel).toBeNull();
    expect(stages[0].imageUrl).toContain('official-artwork/1.png');
  });

  it('correctly maps the second stage with level requirement', () => {
    const stages = mapToEvolutionStages(bulbasaurEvolutionChainMock.chain);
    expect(stages[1].id).toBe(2);
    expect(stages[1].name).toBe('ivysaur');
    expect(stages[1].minLevel).toBe(16);
    expect(stages[1].trigger).toBe('level-up');
  });

  it('correctly maps the third stage with level requirement', () => {
    const stages = mapToEvolutionStages(bulbasaurEvolutionChainMock.chain);
    expect(stages[2].id).toBe(3);
    expect(stages[2].name).toBe('venusaur');
    expect(stages[2].minLevel).toBe(32);
  });
});
