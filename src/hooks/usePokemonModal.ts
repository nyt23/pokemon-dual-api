import { useState } from 'react';
import type { Pokemon, PokemonListItem } from '../types';
import { getPokemonByName } from '../api';

export const usePokemonModal = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePokemonClick = async (pokemon: PokemonListItem, setError: (error: string | null) => void) => {
    try {
      setError(null);
      const detailedPokemon = await getPokemonByName(pokemon.name);
      setSelectedPokemon(detailedPokemon);
      setModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Pokémon details');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPokemon(null);
  };

  return {
    selectedPokemon,
    modalOpen,
    handlePokemonClick,
    handleCloseModal
  };
};
