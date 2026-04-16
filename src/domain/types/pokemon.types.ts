import { NamedAPIResource } from './api.types';

// --- Raw API response types (what PokeAPI returns) ---

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface RawPokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: Array<{
    slot: number;
    type: NamedAPIResource;
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
  }>;
  abilities: Array<{
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
  }>;
  sprites: {
    front_default: string | null;
    other: {
      'official-artwork': {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
  species: NamedAPIResource;
}

export interface RawPokemonSpecies {
  evolution_chain: { url: string };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
  }>;
  genera: Array<{
    genus: string;
    language: NamedAPIResource;
  }>;
  color: NamedAPIResource;
  habitat: NamedAPIResource | null;
}

export interface RawEvolutionChain {
  id: number;
  chain: EvolutionLink;
}

export interface EvolutionLink {
  species: NamedAPIResource;
  evolution_details: Array<{
    min_level: number | null;
    trigger: NamedAPIResource;
    item: NamedAPIResource | null;
  }>;
  evolves_to: EvolutionLink[];
}

export interface RawTypeDetail {
  name: string;
  pokemon: Array<{
    pokemon: NamedAPIResource;
    slot: number;
  }>;
}

// --- Clean domain entities (for UI consumption) ---

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  baseExperience: number;
  types: string[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  imageUrl: string;
  shinyImageUrl: string | null;
  spriteUrl: string | null;
  description: string;
  genus: string;
  color: string;
  habitat: string | null;
  evolutionChainUrl: string;
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface EvolutionNode {
  id: number;
  name: string;
  imageUrl: string;
  minLevel: number | null;
  trigger: string;
  evolvesTo: EvolutionNode[];
}

export type PokemonType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy';
