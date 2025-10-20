import React, { createContext, useContext, useState } from 'react';

export const ApiSource = {
  CUSTOM: 'custom',
  POKEAPI: 'pokeapi'
} as const;

export type ApiSource = typeof ApiSource[keyof typeof ApiSource];


interface ApiSourceContextType {
  currentSource: ApiSource;
  setCurrentSource: (source: ApiSource) => void;
}

const ApiSourceContext = createContext<ApiSourceContextType | undefined>(undefined);

export const ApiSourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSource, setCurrentSource] = useState<ApiSource>(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem('pokemon-api-source');
    if (stored && Object.values(ApiSource).includes(stored as ApiSource)) {
      return stored as ApiSource;
    }
    return ApiSource.CUSTOM;
  });

  const handleSetCurrentSource = (source: ApiSource) => {
    setCurrentSource(source);
    localStorage.setItem('pokemon-api-source', source);
  };

  return (
    <ApiSourceContext.Provider value={{ currentSource, setCurrentSource: handleSetCurrentSource }}>
      {children}
    </ApiSourceContext.Provider>
  );
};

export const useApiSource = () => {
  const context = useContext(ApiSourceContext);
  if (!context) {
    throw new Error('useApiSource must be used within ApiSourceProvider');
  }
  return context;
};

// Legacy functions for backward compatibility
export const getCurrentApiSource = (): ApiSource => {
  const stored = localStorage.getItem('pokemon-api-source');
  if (stored && Object.values(ApiSource).includes(stored as ApiSource)) {
    return stored as ApiSource;
  }
  return ApiSource.CUSTOM;
};

export const setApiSource = (source: ApiSource): void => {
  localStorage.setItem('pokemon-api-source', source);
};
