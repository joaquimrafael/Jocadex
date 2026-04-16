import {
  mapToPokemon,
  mapToPokemonFromListItem,
  mapToPokemonDetail,
  mapToEvolutionTree,
} from '../pokemonMapper';
import { bulbasaurDetailMock } from '@/test/mocks/data/pokemonDetail.mock';
import { bulbasaurSpeciesMock } from '@/test/mocks/data/pokemonSpecies.mock';
import {
  bulbasaurEvolutionChainMock,
  eeveeEvolutionChainMock,
} from '@/test/mocks/data/evolutionChain.mock';

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

describe('mapToEvolutionTree', () => {
  it('maps the Bulbasaur root node correctly', () => {
    const tree = mapToEvolutionTree(bulbasaurEvolutionChainMock.chain);
    expect(tree.id).toBe(1);
    expect(tree.name).toBe('bulbasaur');
    expect(tree.minLevel).toBeNull();
    expect(tree.trigger).toBe('none');
    expect(tree.imageUrl).toContain('official-artwork/1.png');
    expect(tree.evolvesTo).toHaveLength(1);
  });

  it('maps the second node (ivysaur) with level requirement', () => {
    const tree = mapToEvolutionTree(bulbasaurEvolutionChainMock.chain);
    const ivysaur = tree.evolvesTo[0];
    expect(ivysaur.id).toBe(2);
    expect(ivysaur.name).toBe('ivysaur');
    expect(ivysaur.minLevel).toBe(16);
    expect(ivysaur.trigger).toBe('level-up');
    expect(ivysaur.evolvesTo).toHaveLength(1);
  });

  it('maps the third node (venusaur) correctly', () => {
    const tree = mapToEvolutionTree(bulbasaurEvolutionChainMock.chain);
    const venusaur = tree.evolvesTo[0].evolvesTo[0];
    expect(venusaur.id).toBe(3);
    expect(venusaur.name).toBe('venusaur');
    expect(venusaur.minLevel).toBe(32);
    expect(venusaur.evolvesTo).toHaveLength(0);
  });

  it('maps branching evolutions (Eevee) with multiple children', () => {
    const tree = mapToEvolutionTree(eeveeEvolutionChainMock.chain);
    expect(tree.name).toBe('eevee');
    expect(tree.evolvesTo.length).toBeGreaterThanOrEqual(2);
    const names = tree.evolvesTo.map((n) => n.name);
    expect(names).toContain('vaporeon');
    expect(names).toContain('jolteon');
  });
});
