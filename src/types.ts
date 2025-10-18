// Raw Pokemon data from your JSON files (PokeAPI format)
export interface RawPokemonData {
  name: string;
  height: number; // in decimeters
  weight: number; // in hectograms
  types: string[]; // array of type names
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
}

// Unified Pokemon data model (transformed for UI)
export interface Pokemon {
  name: string;
  image: string;
  types: PokemonType[];
  height: number; // in decimeters
  weight: number; // in hectograms
  baseStats: BaseStats;
}

export interface PokemonType {
  name: string;
  color?: string; // for UI styling
}

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

// For the list view (minimal data)
export interface PokemonListItem {
  name: string;
  image: string;
  types: PokemonType[];
}

// API response types
export interface PokemonListResponse {
  pokemon: PokemonListItem[];
}

export interface PokemonDetailResponse {
  pokemon: Pokemon;
}

// Error handling
export interface ApiError {
  message: string;
  code?: string;
}

// API configuration
export interface ApiConfig {
  baseUrl?: string;
  timeout?: number;
}
