import { capitalize, formatPokemonId, cleanFlavorText } from '../formatters';

describe('capitalize', () => {
  it('capitalizes the first letter of a lowercase string', () => {
    expect(capitalize('bulbasaur')).toBe('Bulbasaur');
  });

  it('returns an already-capitalized string unchanged', () => {
    expect(capitalize('Pikachu')).toBe('Pikachu');
  });

  it('handles a single character', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('returns an empty string unchanged', () => {
    expect(capitalize('')).toBe('');
  });

  it('does not change the rest of the string', () => {
    expect(capitalize('charmander')).toBe('Charmander');
    expect(capitalize('special-attack')).toBe('Special-attack');
  });
});

describe('formatPokemonId', () => {
  it('pads single digit IDs to 3 digits', () => {
    expect(formatPokemonId(1)).toBe('#001');
  });

  it('pads two digit IDs to 3 digits', () => {
    expect(formatPokemonId(25)).toBe('#025');
  });

  it('formats three digit IDs correctly', () => {
    expect(formatPokemonId(150)).toBe('#150');
  });

  it('formats IDs greater than 999 without truncating', () => {
    expect(formatPokemonId(1000)).toBe('#1000');
  });
});

describe('cleanFlavorText', () => {
  it('replaces newline characters with spaces', () => {
    expect(cleanFlavorText('Some\ntext')).toBe('Some text');
  });

  it('replaces form feed characters with spaces', () => {
    expect(cleanFlavorText('Some\ftext')).toBe('Some text');
  });

  it('collapses multiple spaces into one', () => {
    expect(cleanFlavorText('Some  text')).toBe('Some text');
  });

  it('trims leading and trailing whitespace', () => {
    expect(cleanFlavorText('  text  ')).toBe('text');
  });

  it('handles combined newlines and form feeds', () => {
    const raw = 'A strange\nseed was\fplanted';
    expect(cleanFlavorText(raw)).toBe('A strange seed was planted');
  });
});
