import type { Pokemon, PokemonListItem } from '../types';
import { ApiSource, getCurrentApiSource } from './sources';
import { customPokemonApi } from './custom';

// Unified API interface that abstracts different Pokemon data sources
export interface PokemonApi {
  getPokemonList(): Promise<PokemonListItem[]>;
  getPokemonByName(name: string): Promise<Pokemon>;
  searchPokemon(query: string): Promise<PokemonListItem[]>;
  getPokemonByType(type: string): Promise<PokemonListItem[]>;
}

export const createPokemonApi = (source: ApiSource = getCurrentApiSource()): PokemonApi => {
  switch (source) {
    case ApiSource.CUSTOM:
      return customPokemonApi;
    case ApiSource.POKEAPI:
      // TODO: Implement PokeAPI adapter
      throw new Error('PokeAPI adapter not implemented yet');
    default:
      throw new Error(`Unknown API source: ${source}`);
  }
};

// Default API instance using current source
export const pokemonApi = createPokemonApi();


export const getPokemonList = (): Promise<PokemonListItem[]> => 
  pokemonApi.getPokemonList();

export const getPokemonByName = (name: string): Promise<Pokemon> => 
  pokemonApi.getPokemonByName(name);

export const searchPokemon = (query: string): Promise<PokemonListItem[]> => 
  pokemonApi.searchPokemon(query);

export const getPokemonByType = (type: string): Promise<PokemonListItem[]> => 
  pokemonApi.getPokemonByType(type);