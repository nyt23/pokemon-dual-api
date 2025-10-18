import React from 'react';

interface TypeIconProps {
  type: string;
  size?: number;
  className?: string;
}

const TypeIcon: React.FC<TypeIconProps> = ({ type, size = 24, className = '' }) => {
  const iconStyle = {
    width: size,
    height: size,
  };

  const normalizedType = type.toLowerCase();
  
  // Map of available type icons
  const typeIconMap: Record<string, string> = {
    normal: '/icons/normal.svg',
    fire: '/icons/fire.svg',
    water: '/icons/water.svg',
    electric: '/icons/electric.svg',
    grass: '/icons/grass.svg',
    ice: '/icons/ice.svg',
    fighting: '/icons/fighting.svg',
    poison: '/icons/poison.svg',
    ground: '/icons/ground.svg',
    flying: '/icons/flying.svg',
    psychic: '/icons/psychic.svg',
    bug: '/icons/bug.svg',
    rock: '/icons/rock.svg',
    ghost: '/icons/ghost.svg',
    dragon: '/icons/dragon.svg',
    dark: '/icons/dark.svg',
    steel: '/icons/steel.svg',
    fairy: '/icons/fairy.svg'
  };

  const iconPath = typeIconMap[normalizedType] || '/icons/normal.svg';

  return (
    <img 
      src={iconPath} 
      alt={`${type} type icon`}
      style={iconStyle}
      className={className}
      onError={(e) => {
        // Fallback to normal type if the specific type icon fails to load
        const target = e.target as HTMLImageElement;
        if (target.src !== typeIconMap.normal) {
          target.src = typeIconMap.normal;
        }
      }}
    />
  );
};

export default TypeIcon;
