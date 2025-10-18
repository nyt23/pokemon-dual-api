import type { Pokemon, PokemonListItem, RawPokemonData, ApiError } from '../types';

// Custom API adapter for local JSON files
export class CustomPokemonApi {
  private baseUrl: string;

  constructor(baseUrl: string = '/public/pokemon-data') {
    this.baseUrl = baseUrl;
  }

  // Fetch list of all Pokemon (from pockemons.json)
  async getPokemonList(): Promise<PokemonListItem[]> {
    try {
      const response = await fetch(`${this.baseUrl}/pockemons.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon list: ${response.status} ${response.statusText}`);
      }

      const pockemonsData: { name: string }[] = await response.json();
      const pokemonNames: string[] = pockemonsData.map(pokemon => pokemon.name);
      
      // Fetch basic info for each Pokemon to build the list
      const pokemonList: PokemonListItem[] = [];
      for (const name of pokemonNames) {
        try {
          const pokemonData = await this.fetchRawPokemonData(name);
          pokemonList.push(this.transformToListItem(pokemonData));
        } catch (error) {
          console.warn(`Failed to fetch data for ${name}:`, error);
        }
      }
      
      return pokemonList;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw this.handleError(error);
    }
  }

  // Fetch detailed Pokemon data by name
  async getPokemonByName(name: string): Promise<Pokemon> {
    try {
      const rawData = await this.fetchRawPokemonData(name);
      return this.transformToPokemon(rawData);
    } catch (error) {
      console.error(`Error fetching Pokemon ${name}:`, error);
      throw this.handleError(error);
    }
  }


  // Search Pokemon by name (case-insensitive)
  async searchPokemon(query: string): Promise<PokemonListItem[]> {
    try {
      const pokemonList = await this.getPokemonList();
      const lowercaseQuery = query.toLowerCase();
      
      return pokemonList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error(`Error searching Pokemon with query "${query}":`, error);
      throw this.handleError(error);
    }
  }

  // Filter Pokemon by type
  async getPokemonByType(type: string): Promise<PokemonListItem[]> {
    try {
      const pokemonList = await this.getPokemonList();
      
      return pokemonList.filter(pokemon => 
        pokemon.types.some(pokemonType => 
          pokemonType.name.toLowerCase() === type.toLowerCase()
        )
      );
    } catch (error) {
      console.error(`Error filtering Pokemon by type "${type}":`, error);
      throw this.handleError(error);
    }
  }

  // Helper method to fetch raw Pokemon data
  private async fetchRawPokemonData(name: string): Promise<RawPokemonData> {
    const response = await fetch(`${this.baseUrl}/${name.toLowerCase()}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon ${name}: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }


  // Transform raw data to PokemonListItem
  private transformToListItem(rawData: RawPokemonData): PokemonListItem {
    return {
      name: this.capitalizeName(rawData.name),
      image: rawData.sprites.other['official-artwork'].front_default || rawData.sprites.front_default,
      types: rawData.types.map(type => ({
        name: this.capitalizeName(type),
        color: this.getTypeColor(type)
      }))
    };
  }

  // Transform raw data to full Pokemon object
  private transformToPokemon(rawData: RawPokemonData): Pokemon {
    const stats = this.extractBaseStats(rawData.stats);
    
    return {
      name: this.capitalizeName(rawData.name),
      image: rawData.sprites.other['official-artwork'].front_default || rawData.sprites.front_default,
      types: rawData.types.map(type => ({
        name: this.capitalizeName(type),
        color: this.getTypeColor(type)
      })),
      height: rawData.height,
      weight: rawData.weight,
      baseStats: stats
    };
  }

  // Extract base stats from the stats array
  private extractBaseStats(stats: RawPokemonData['stats']): Pokemon['baseStats'] {
    const statsMap: Record<string, number> = {};
    
    stats.forEach(stat => {
      const statName = stat.stat.name;
      // Convert to camelCase
      const camelCaseName = statName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      statsMap[camelCaseName] = stat.base_stat;
    });

    return {
      hp: statsMap.hp || 0,
      attack: statsMap.attack || 0,
      defense: statsMap.defense || 0,
      specialAttack: statsMap.specialAttack || 0,
      specialDefense: statsMap.specialDefense || 0,
      speed: statsMap.speed || 0
    };
  }

  // Capitalize Pokemon names and types
  private capitalizeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Get type colors for UI styling
  private getTypeColor(type: string): string {
    const typeColors: Record<string, string> = {
      'normal': '#A8A878',
      'fire': '#F08030',
      'water': '#6890F0',
      'electric': '#F8D030',
      'grass': '#78C850',
      'ice': '#98D8D8',
      'fighting': '#C03028',
      'poison': '#A040A0',
      'ground': '#E0C068',
      'flying': '#A890F0',
      'psychic': '#F85888',
      'bug': '#A8B820',
      'rock': '#B8A038',
      'ghost': '#705898',
      'dragon': '#7038F8',
      'dark': '#705848',
      'steel': '#B8B8D0',
      'fairy': '#EE99AC'
    };
    
    return typeColors[type.toLowerCase()] || '#68A090';
  }

  // Error handling helper
  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'CUSTOM_API_ERROR'
      };
    }
    
    return {
      message: 'An unknown error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }
}

// Export a default instance
export const customPokemonApi = new CustomPokemonApi();
