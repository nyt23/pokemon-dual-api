import React, { useEffect } from 'react';
import TypeIcon from './TypeIcon';
import type { Pokemon } from '../types';
import { getTypeColorWithOpacity } from '../utils/typeColors';
import './PokemonDetailModal.css';

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({ pokemon, isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store original styles
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;
      
      // Get current scroll position
      const scrollY = window.scrollY;
      
      // Apply scroll lock styles
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Store values for cleanup
      document.body.setAttribute('data-scroll-lock', 'true');
      document.body.setAttribute('data-scroll-y', scrollY.toString());
      document.documentElement.setAttribute('data-scroll-lock', 'true');
      
      // Cleanup function
      return () => {
        // Restore original styles
        document.body.style.overflow = originalStyle;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        
        // Restore scroll position
        const savedScrollY = document.body.getAttribute('data-scroll-y');
        if (savedScrollY) {
          window.scrollTo(0, parseInt(savedScrollY, 10));
        }
        
        // Remove data attributes
        document.body.removeAttribute('data-scroll-lock');
        document.body.removeAttribute('data-scroll-y');
        document.documentElement.removeAttribute('data-scroll-lock');
      };
    }
  }, [isOpen]);

  if (!isOpen || !pokemon) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent touch scrolling on the modal backdrop
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  // Get type colors with 10% opacity using shared utility
  const typeColor1 = pokemon.types[0] ? getTypeColorWithOpacity(pokemon.types[0].color || '', 0.1) : 'rgba(249, 249, 249, 0.1)';
  const typeColor2 = pokemon.types[1] ? getTypeColorWithOpacity(pokemon.types[1].color || '', 0.1) : typeColor1;

  const formatHeight = (height: number) => {
    const meters = height / 10;
    return `${height} decimeters (${meters} m)`;
  };

  const formatWeight = (weight: number) => {
    const kg = weight / 10;
    return `${weight} hectograms (${kg} kg)`;
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      onTouchMove={handleTouchMove}
    >
      <div className="pokemon-modal">
        <div 
          className="modal-content"
          style={{
            '--type-color-1': typeColor1,
            '--type-color-2': typeColor2
          } as React.CSSProperties}
        >
          <div className="pokemon-header">
            <h2 className="modal-pokemon-name">{pokemon.name}</h2>
            <div className="modal-pokemon-image-container">
              <img 
                src={pokemon.image} 
                alt={pokemon.name}
                className="modal-pokemon-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIyNCIgeT0iMjQiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                }}
              />
            </div>
          </div>

          <div className="pokemon-details">
            <div className="detail-section">
              <div className="detail-label">Type:</div>
              <div className="type-info">
                {pokemon.types.map((type, index) => (
                  <div key={index} className="type-item">
                    <TypeIcon type={type.name} size={16} />
                    <span className="type-name">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <div className="detail-label">Physical characteristics:</div>
              <div className="physical-info">
                <div className="physical-item">Height: {formatHeight(pokemon.height)}</div>
                <div className="physical-item">Weight: {formatWeight(pokemon.weight)}</div>
              </div>
            </div>

            <div className="detail-section">
              <div className="detail-label">Base stats:</div>
              <div className="stats-info">
                <div className="stat-item">HP: {pokemon.baseStats.hp}</div>
                <div className="stat-item">Attack: {pokemon.baseStats.attack}</div>
                <div className="stat-item">Defense: {pokemon.baseStats.defense}</div>
                <div className="stat-item">Special Attack: {pokemon.baseStats.specialAttack}</div>
                <div className="stat-item">Special Defense: {pokemon.baseStats.specialDefense}</div>
                <div className="stat-item">Speed: {pokemon.baseStats.speed}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;


