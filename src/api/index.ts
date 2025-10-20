import type { Pokemon, PokemonListItem } from '../types';
import { ApiSource, getCurrentApiSource } from '../contexts/ApiSourceContext';
import { customApiAdapter } from './customapi';
import { pokeApiAdapter } from './pokeapi';

// Base API interface
export interface BasePokemonApiInterface {
  getPokemonByName(name: string): Promise<Pokemon>;
  // searchPokemon(query: string): Promise<PokemonListItem[]>;
  // getPokemonByType(type: string): Promise<PokemonListItem[]>;
}

// Unified API interface
export interface PokemonApiInterface extends BasePokemonApiInterface {
  getPokemonList(offset?: number, limit?: number): Promise<{
    results: PokemonListItem[];
    next: string | null;
    previous: string | null;
    count: number;
  }>;
}

// Union type for all API types
export type PokemonApi = PokemonApiInterface;

export const createPokemonApi = (source: ApiSource = getCurrentApiSource()): PokemonApi => {
  switch (source) {
    case ApiSource.CUSTOM:
      return customApiAdapter;
    case ApiSource.POKEAPI:
      return pokeApiAdapter;
    default:
      throw new Error(`Unknown API source: ${source}`);
  }
};


// Helper function to get Pokemon list with pagination support
export const getPokemonList = async (offset: number = 0, limit: number = 12): Promise<{
  results: PokemonListItem[];
  next: string | null;
  previous: string | null;
  count: number;
}> => {
  const api = createPokemonApi();
  return api.getPokemonList(offset, limit);
};

export const getPokemonByName = (name: string): Promise<Pokemon> => {
  const api = createPokemonApi();
  return api.getPokemonByName(name);
};

// export const searchPokemon = (query: string): Promise<PokemonListItem[]> => {
//   const api = createPokemonApi();
//   return api.searchPokemon(query);
// };

// export const getPokemonByType = (type: string): Promise<PokemonListItem[]> => {
//   const api = createPokemonApi();
//   return api.getPokemonByType(type);
// };