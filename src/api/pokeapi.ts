import type { Pokemon, PokemonListItem, PokeApiRawPokemonData } from '../types';
import { BasePokemonApi } from './base';

// PokeAPI adapter for fetching Pokemon data from the official PokeAPI
export class PokeApiAdapter extends BasePokemonApi {
  constructor(baseUrl: string = 'https://pokeapi.co/api/v2') {
    super(baseUrl);
  }

  // Helper method to fetch raw Pokemon data
  private async fetchRawPokemonData(url: string): Promise<PokeApiRawPokemonData> {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon data: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // Fetch paginated list of Pokemon
  async getPokemonList(offset: number = 0, limit: number = 12): Promise<{
    results: PokemonListItem[];
    next: string | null;
    previous: string | null;
    count: number;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon list: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Fetch detailed data for each Pokemon
      const pokemonList: PokemonListItem[] = [];
      for (const pokemon of data.results) {
        try {
          const pokemonData = await this.fetchRawPokemonData(pokemon.url);
          pokemonList.push(this.transformToListItem(pokemonData));
        } catch (error) {
          console.warn(`Failed to fetch data for ${pokemon.name}:`, error);
        }
      }

      return {
        results: pokemonList,
        next: data.next,
        previous: data.previous,
        count: data.count
      };
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw this.handleError(error, 'POKEAPI_ERROR');
    }
  }

  // Fetch detailed Pokemon data by name
  async getPokemonByName(name: string): Promise<Pokemon> {
    try {
      const rawData = await this.fetchRawPokemonData(`${this.baseUrl}/pokemon/${name.toLowerCase()}`);
      return this.transformToPokemon(rawData);
    } catch (error) {
      console.error(`Error fetching Pokemon ${name}:`, error);
      throw this.handleError(error, 'POKEAPI_ERROR');
    }
  }

  // Search Pokemon by name (case-insensitive)
  // async searchPokemon(query: string): Promise<PokemonListItem[]> {
  //   try {
  //     // For search, we'll fetch a larger set and filter client-side
  //     // In a real implementation, you might want to use a search endpoint if available
  //     const { results } = await this.getPokemonList(0, 1000); // Get more results for search
  //     const lowercaseQuery = query.toLowerCase();
      
  //     return results.filter(pokemon => 
  //       pokemon.name.toLowerCase().includes(lowercaseQuery)
  //     );
  //   } catch (error) {
  //     console.error(`Error searching Pokemon with query "${query}":`, error);
  //     throw this.handleError(error, 'POKEAPI_ERROR');
  //   }
  // }

  // Filter Pokemon by type
  // async getPokemonByType(type: string): Promise<PokemonListItem[]> {
  //   try {
  //     // Fetch Pokemon by type from PokeAPI
  //     const response = await fetch(`${this.baseUrl}/type/${type.toLowerCase()}`);
      
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch Pokemon by type: ${response.status} ${response.statusText}`);
  //     }

  //     const data = await response.json();
  //     const pokemonList: PokemonListItem[] = [];
      
  //     // Fetch detailed data for each Pokemon of this type
  //     for (const pokemon of data.pokemon.slice(0, 12)) { // Limit to 12 for performance
  //       try {
  //         const pokemonData = await this.fetchRawPokemonData(pokemon.pokemon.url);
  //         pokemonList.push(this.transformToListItem(pokemonData));
  //       } catch (error) {
  //         console.warn(`Failed to fetch data for ${pokemon.pokemon.name}:`, error);
  //       }
  //     }

  //     return pokemonList;
  //   } catch (error) {
  //     console.error(`Error filtering Pokemon by type "${type}":`, error);
  //     throw this.handleError(error, 'POKEAPI_ERROR');
  //   }
  // }

}

export const pokeApiAdapter = new PokeApiAdapter();
