import { useState, useEffect } from 'react';
import type { PokemonListItem } from '../types';
import { getPokemonList } from '../api';
import { useApiSource, ApiSource } from '../contexts/ApiSourceContext';

export const usePokemonData = () => {
  const { currentSource, setCurrentSource } = useApiSource();
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [prevLoading, setPrevLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const handleApiSourceChange = (source: ApiSource) => {
    setCurrentSource(source);
    setOffset(0);
    setPokemon([]);
    // Always refresh data, even if the source is the same
    setLoading(true);
    fetchPokemonData(0).finally(() => setLoading(false));
  };

  const fetchPokemonData = async (newOffset: number) => {
    try {
      setError(null);
      const data = await getPokemonList(newOffset, 12);
      
      setPokemon(data.results);
      setHasNext(!!data.next);
      setTotalCount(data.count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Pokémon');
    }
  };

  const handleNextClick = async () => {
    setNextLoading(true);
    const newOffset = offset + 12;
    await fetchPokemonData(newOffset);
    setOffset(newOffset);
    setNextLoading(false);
  };

  const handlePrevClick = async () => {
    setPrevLoading(true);
    const newOffset = Math.max(0, offset - 12);
    await fetchPokemonData(newOffset);
    setOffset(newOffset);
    setPrevLoading(false);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchPokemonData(0);
      setLoading(false);
    };

    loadInitialData();
  }, [currentSource]);

  return {
    pokemon,
    loading,
    error,
    offset,
    hasNext,
    nextLoading,
    prevLoading,
    totalCount,
    currentApiSource: currentSource,
    handleApiSourceChange,
    handleNextClick,
    handlePrevClick,
    setError
  };
};
