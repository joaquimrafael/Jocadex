import {
  Pokemon,
  PokemonDetail,
  PokemonListItem,
  RawPokemonDetail,
  RawPokemonSpecies,
  EvolutionLink,
  EvolutionStage,
} from '@/domain/types/pokemon.types';
import {
  extractIdFromUrl,
  getPokemonImageUrl,
} from '@/shared/utils/urlHelpers';
import { cleanFlavorText } from '@/shared/utils/formatters';

export function mapToPokemon(raw: RawPokemonDetail): Pokemon {
  return {
    id: raw.id,
    name: raw.name,
    imageUrl:
      raw.sprites.other['official-artwork'].front_default ??
      raw.sprites.front_default ??
      getPokemonImageUrl(raw.id),
    types: raw.types.map((t) => t.type.name),
  };
}

export function mapToPokemonFromListItem(item: PokemonListItem): Pokemon {
  const id = extractIdFromUrl(item.url);
  return {
    id,
    name: item.name,
    imageUrl: getPokemonImageUrl(id),
    types: [],
  };
}

export function mapToPokemonDetail(
  raw: RawPokemonDetail,
  species: RawPokemonSpecies,
): PokemonDetail {
  const englishFlavor = species.flavor_text_entries.find(
    (e) => e.language.name === 'en',
  );
  const description = englishFlavor
    ? cleanFlavorText(englishFlavor.flavor_text)
    : '';

  const englishGenus = species.genera.find((g) => g.language.name === 'en');
  const genus = englishGenus ? englishGenus.genus : '';

  return {
    id: raw.id,
    name: raw.name,
    height: raw.height,
    weight: raw.weight,
    baseExperience: raw.base_experience,
    types: raw.types.map((t) => t.type.name),
    stats: raw.stats.map((s) => ({
      name: s.stat.name,
      baseStat: s.base_stat,
    })),
    abilities: raw.abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
    imageUrl:
      raw.sprites.other['official-artwork'].front_default ??
      raw.sprites.front_default ??
      getPokemonImageUrl(raw.id),
    shinyImageUrl: raw.sprites.other['official-artwork'].front_shiny,
    spriteUrl: raw.sprites.front_default,
    description,
    genus,
    color: species.color.name,
    habitat: species.habitat?.name ?? null,
    evolutionChainUrl: species.evolution_chain.url,
  };
}

export function mapToEvolutionStages(chain: EvolutionLink): EvolutionStage[] {
  const stages: EvolutionStage[] = [];

  function traverse(link: EvolutionLink, isFirst: boolean) {
    const id = extractIdFromUrl(link.species.url);
    const detail = link.evolution_details[0];

    stages.push({
      id,
      name: link.species.name,
      imageUrl: getPokemonImageUrl(id),
      minLevel: detail?.min_level ?? null,
      trigger: detail?.trigger.name ?? (isFirst ? 'none' : 'level-up'),
    });

    for (const next of link.evolves_to) {
      traverse(next, false);
    }
  }

  traverse(chain, true);
  return stages;
}
