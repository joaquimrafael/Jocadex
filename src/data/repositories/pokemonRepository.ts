import { pokeApiClient } from '@/data/api/pokeApiClient';
import { PaginatedResponse } from '@/domain/types/api.types';
import {
  PokemonListItem,
  RawPokemonDetail,
  RawPokemonSpecies,
  RawEvolutionChain,
} from '@/domain/types/pokemon.types';
import { ENDPOINTS } from '@/shared/constants/api.constants';

export async function getPokemonList(
  offset: number,
  limit: number,
): Promise<PaginatedResponse<PokemonListItem>> {
  return pokeApiClient.get(ENDPOINTS.POKEMON, { offset, limit });
}

export async function getPokemonDetail(
  nameOrId: string | number,
): Promise<RawPokemonDetail> {
  return pokeApiClient.get(`${ENDPOINTS.POKEMON}/${nameOrId}`);
}

export async function getPokemonSpecies(
  nameOrId: string | number,
): Promise<RawPokemonSpecies> {
  return pokeApiClient.get(`${ENDPOINTS.POKEMON_SPECIES}/${nameOrId}`);
}

export async function getEvolutionChain(
  url: string,
): Promise<RawEvolutionChain> {
  return pokeApiClient.getByUrl(url);
}
