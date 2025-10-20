import React from 'react';
import TypeIcon from './TypeIcon';
import type { PokemonListItem } from '../types';
import { getPokemonBackgroundStyle } from '../utils/typeColors';
import './PokemonListCard.css';

interface PokemonListCardProps {
  pokemon: PokemonListItem;
  onClick?: (pokemon: PokemonListItem) => void;
}

const PokemonListCard: React.FC<PokemonListCardProps> = ({ pokemon, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
  };

  // Get background styling using shared utility
  const getBackgroundStyle = () => getPokemonBackgroundStyle(pokemon.types);

  return (
    <div 
      className="pokemon-card" 
      onClick={handleClick}
      style={getBackgroundStyle()}
    >
      <div className="pokemon-image-container">
        <img 
          src={pokemon.image} 
          alt={pokemon.name}
          className="pokemon-image"
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIyNCIgeT0iMjQiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo8L3N2Zz4K';
          }}
        />
      </div>
      <div className="pokemon-info">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <div key={index} className="type-icon-container">
              <TypeIcon type={type.name} size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonListCard;


