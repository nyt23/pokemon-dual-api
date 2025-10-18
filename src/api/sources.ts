// API source types and configuration
export const ApiSource = {
  CUSTOM: 'custom',
  POKEAPI: 'pokeapi'
} as const;

export type ApiSource = typeof ApiSource[keyof typeof ApiSource];

export interface ApiSourceConfig {
  [ApiSource.CUSTOM]: {
    baseUrl: string;
    pokemonDataPath: string;
  };
  [ApiSource.POKEAPI]: {
    baseUrl: string;
    apiVersion: string;
  };
}

export const API_CONFIG: ApiSourceConfig = {
  [ApiSource.CUSTOM]: {
    baseUrl: '/public/pokemon-data',
    pokemonDataPath: '/public/pokemon-data'
  },
  [ApiSource.POKEAPI]: {
    baseUrl: 'https://pokeapi.co/api/v2',
    apiVersion: 'v2'
  }
};

// Helper function to get current API source
export const getCurrentApiSource = (): ApiSource => {
  // For now, default to custom API
  // This will be managed by the app state later
  return ApiSource.CUSTOM;
};
