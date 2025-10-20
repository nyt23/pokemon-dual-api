import type { Pokemon, PokemonListItem, ApiError } from '../types';

// Base class with shared functionality for all Pokemon APIs
export abstract class BasePokemonApi {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Abstract methods that must be implemented by subclasses
  abstract getPokemonList(offset: number, limit: number): Promise<{
    results: PokemonListItem[];
    next: string | null;
    previous: string | null;
    count: number;
  }>;

  abstract getPokemonByName(name: string): Promise<Pokemon>;

  // abstract searchPokemon(query: string): Promise<PokemonListItem[]>;

  // abstract getPokemonByType(type: string): Promise<PokemonListItem[]>;

  // Shared utility methods
  protected capitalizeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  protected getTypeColor(type: string): string {
    const typeColors: Record<string, string> = {
      'normal': '#A8A77A',
      'fire': '#EE8130',
      'water': '#6390F0',
      'electric': '#F7D02C',
      'grass': '#7AC74C',
      'ice': '#96D9D6',
      'fighting': '#C22E28',
      'poison': '#A33EA1',
      'ground': '#E2BF65',
      'flying': '#A98FF3',
      'psychic': '#F95587',
      'bug': '#A6B91A',
      'rock': '#B6A136',
      'ghost': '#735797',
      'dragon': '#6F35FC',
      'dark': '#705746',
      'steel': '#B7B7CE',
      'fairy': '#D685AD'
    };
    
    return typeColors[type.toLowerCase()] || '#68A090';
  }

  protected handleError(error: unknown, errorCode: string = 'API_ERROR'): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: errorCode
      };
    }
    
    return {
      message: 'An unknown error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }

  // Common method to extract base stats from stats array
  protected extractBaseStats(stats: any[]): Pokemon['baseStats'] {
    const statsMap: Record<string, number> = {};
    
    stats.forEach(stat => {
      const statName = stat.stat.name;
      // Convert to camelCase
      const camelCaseName = statName.replace(/-([a-z])/g, (_: string, letter: string) => letter.toUpperCase());
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

  // Common method to transform raw data to PokemonListItem
  protected transformToListItem(rawData: any): PokemonListItem {
    return {
      name: this.capitalizeName(rawData.name),
      image: rawData.sprites.other.dream_world?.front_default || 
             rawData.sprites.other['official-artwork']?.front_default || 
             rawData.sprites.front_default,
      types: rawData.types.map((type: any) => ({
        name: this.capitalizeName(type.type?.name || type),
        color: this.getTypeColor(type.type?.name || type)
      }))
    };
  }

  // Common method to transform raw data to full Pokemon object
  protected transformToPokemon(rawData: any): Pokemon {
    const stats = this.extractBaseStats(rawData.stats);
    
    return {
      name: this.capitalizeName(rawData.name),
      image: rawData.sprites.other.dream_world?.front_default || 
             rawData.sprites.other['official-artwork']?.front_default || 
             rawData.sprites.front_default,
      types: rawData.types.map((type: any) => ({
        name: this.capitalizeName(type.type?.name || type),
        color: this.getTypeColor(type.type?.name || type)
      })),
      height: rawData.height,
      weight: rawData.weight,
      baseStats: stats
    };
  }
}