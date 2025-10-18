import React from 'react';
import PokemonCard from './PokemonCard';
import type { PokemonListItem } from '../types';
import './PokemonList.css';

interface PokemonListProps {
  pokemon: PokemonListItem[];
  onPokemonClick?: (pokemon: PokemonListItem) => void;
  loading?: boolean;
  error?: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ 
  pokemon, 
  onPokemonClick, 
  loading = false, 
  error 
}) => {
  if (loading) {
    return (
      <div className="pokemon-list-container">
        <div className="loading-message">
          <div className="loading-spinner"></div>
          <p>Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-list-container">
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!pokemon || pokemon.length === 0) {
    return (
      <div className="pokemon-list-container">
        <div className="empty-message">
          <p>No Pokémon found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-grid">
        {pokemon.map((pokemonItem, index) => (
          <PokemonCard
            key={`${pokemonItem.name}-${index}`}
            pokemon={pokemonItem}
            onClick={onPokemonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
