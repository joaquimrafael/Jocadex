export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

export function cleanFlavorText(text: string): string {
  return text.replace(/[\n\f]/g, ' ').replace(/\s+/g, ' ').trim();
}
