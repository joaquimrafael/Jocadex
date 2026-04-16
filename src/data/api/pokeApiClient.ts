import { POKEAPI_BASE_URL } from '@/shared/constants/api.constants';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class PokeApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = POKEAPI_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>,
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, String(value)),
      );
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }
    return response.json() as Promise<T>;
  }

  async getByUrl<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }
    return response.json() as Promise<T>;
  }
}

export const pokeApiClient = new PokeApiClient();
