import type { Pokemon, PokemonListItem, RawPokemonData } from '../types';
import { BasePokemonApi } from './base';

// Custom API adapter for local JSON files
export class CustomApiAdapter extends BasePokemonApi {
  constructor(baseUrl: string = '/pokemon-data') {
    super(baseUrl);
  }

  // Helper method to fetch raw Pokemon data
  private async fetchRawPokemonData(name: string): Promise<RawPokemonData> {
    const response = await fetch(`${this.baseUrl}/${name.toLowerCase()}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon ${name}: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // Fetch list of all Pokemon (from pockemons.json)
  async getPokemonList(offset: number = 0, limit: number = 12): Promise<{
    results: PokemonListItem[];
    next: string | null;
    previous: string | null;
    count: number;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/pockemons.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon list: ${response.status} ${response.statusText}`);
      }

      const pockemonsData: { name: string }[] = await response.json();
      const pokemonNames: string[] = pockemonsData.map(pokemon => pokemon.name);
      const totalCount = pokemonNames.length;
      
      // Apply pagination
      const paginatedNames = pokemonNames.slice(offset, offset + limit);
      
      // Fetch basic info for each Pokemon to build the list
      const pokemonList: PokemonListItem[] = [];
      for (const name of paginatedNames) {
        try {
          const pokemonData = await this.fetchRawPokemonData(name);
          pokemonList.push(this.transformToListItem(pokemonData));
        } catch (error) {
          console.warn(`Failed to fetch data for ${name}:`, error);
        }
      }
      
      // Calculate pagination URLs
      const hasNext = offset + limit < totalCount;
      const hasPrevious = offset > 0;
      
      return {
        results: pokemonList,
        next: hasNext ? `?offset=${offset + limit}&limit=${limit}` : null,
        previous: hasPrevious ? `?offset=${Math.max(0, offset - limit)}&limit=${limit}` : null,
        count: totalCount
      };
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw this.handleError(error, 'CUSTOM_API_ERROR');
    }
  }

  // Fetch detailed Pokemon data by name
  async getPokemonByName(name: string): Promise<Pokemon> {
    try {
      const rawData = await this.fetchRawPokemonData(name);
      return this.transformToPokemon(rawData);
    } catch (error) {
      console.error(`Error fetching Pokemon ${name}:`, error);
      throw this.handleError(error, 'CUSTOM_API_ERROR');
    }
  }


  // Search Pokemon by name (case-insensitive)
  // async searchPokemon(query: string): Promise<PokemonListItem[]> {
  //   try {
  //     const response = await this.getPokemonList(0, 1000); // Get all Pokemon for search
  //     const lowercaseQuery = query.toLowerCase();
      
  //     return response.results.filter(pokemon => 
  //       pokemon.name.toLowerCase().includes(lowercaseQuery)
  //     );
  //   } catch (error) {
  //     console.error(`Error searching Pokemon with query "${query}":`, error);
  //     throw this.handleError(error, 'CUSTOM_API_ERROR');
  //   }
  // }

  // Filter Pokemon by type
  // async getPokemonByType(type: string): Promise<PokemonListItem[]> {
  //   try {
  //     const response = await this.getPokemonList(0, 1000); // Get all Pokemon for filtering
  //     
  //     return response.results.filter(pokemon => 
  //       pokemon.types.some(pokemonType => 
  //         pokemonType.name.toLowerCase() === type.toLowerCase()
  //       )
  //     );
  //   } catch (error) {
  //     console.error(`Error filtering Pokemon by type "${type}":`, error);
  //     throw this.handleError(error, 'CUSTOM_API_ERROR');
  //   }
  // }
}

export const customApiAdapter = new CustomApiAdapter();
