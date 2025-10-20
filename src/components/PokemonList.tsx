import React from 'react';
import PokemonListCard from './PokemonListCard';
import NavigationButton from './NavigationButton';
import type { PokemonListItem } from '../types';
import './PokemonList.css';

interface PokemonListProps {
  pokemon: PokemonListItem[];
  onPokemonClick?: (pokemon: PokemonListItem) => void;
  loading?: boolean;
  error?: string;
  hasNext?: boolean;
  onNextClick?: () => void;
  nextLoading?: boolean;
  onPrevClick?: () => void;
  prevLoading?: boolean;
  offset?: number;
}

const PokemonList: React.FC<PokemonListProps> = ({ 
  pokemon, 
  onPokemonClick, 
  loading = false, 
  error,
  hasNext = false,
  onNextClick,
  nextLoading = false,
  onPrevClick,
  prevLoading = false,
  offset = 0
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
          <PokemonListCard
            key={`${pokemonItem.name}-${index}`}
            pokemon={pokemonItem}
            onClick={onPokemonClick}
          />
        ))}
      </div>
      <div className="navigation-buttons">
        {hasNext && onNextClick && (
          <>
            <NavigationButton 
              direction="prev"
              onClick={onPrevClick || (() => {})}
              disabled={offset === 0}
              loading={prevLoading}
            />
            <NavigationButton 
              direction="next"
              onClick={onNextClick}
              loading={nextLoading}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
