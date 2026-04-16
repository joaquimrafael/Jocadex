import { pokeApiClient } from '@/data/api/pokeApiClient';
import { PaginatedResponse, NamedAPIResource } from '@/domain/types/api.types';
import { RawTypeDetail } from '@/domain/types/pokemon.types';
import { ENDPOINTS } from '@/shared/constants/api.constants';

export async function getAllTypes(): Promise<
  PaginatedResponse<NamedAPIResource>
> {
  return pokeApiClient.get(ENDPOINTS.TYPE);
}

export async function getTypeDetail(name: string): Promise<RawTypeDetail> {
  return pokeApiClient.get(`${ENDPOINTS.TYPE}/${name}`);
}
