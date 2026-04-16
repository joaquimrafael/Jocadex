import { extractIdFromUrl, getPokemonImageUrl } from '../urlHelpers';

describe('extractIdFromUrl', () => {
  it('extracts the ID from a standard PokeAPI URL', () => {
    expect(
      extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/'),
    ).toBe(25);
  });

  it('extracts the ID from a URL without trailing slash', () => {
    expect(
      extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/1'),
    ).toBe(1);
  });

  it('extracts the ID from an evolution-chain URL', () => {
    expect(
      extractIdFromUrl('https://pokeapi.co/api/v2/evolution-chain/1/'),
    ).toBe(1);
  });

  it('extracts large IDs correctly', () => {
    expect(
      extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/1010/'),
    ).toBe(1010);
  });

  it('throws an error when the URL has no numeric ID', () => {
    expect(() => extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/bulbasaur/')).toThrow(
      'Could not extract ID from URL',
    );
  });
});

describe('getPokemonImageUrl', () => {
  it('returns the correct official-artwork URL for a given ID', () => {
    expect(getPokemonImageUrl(1)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    );
  });

  it('returns the correct URL for Pikachu (ID 25)', () => {
    expect(getPokemonImageUrl(25)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    );
  });
});
