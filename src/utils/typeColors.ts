// Utility function to convert hex color to rgba with opacity
export const getTypeColorWithOpacity = (color: string, opacity: number = 0.1): string => {
  if (!color) return `rgba(249, 249, 249, ${opacity})`;
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Get background style for Pokemon cards
export const getPokemonBackgroundStyle = (types: Array<{ color?: string }>) => {
  if (types.length === 0) {
    return { backgroundColor: '#f9f9f9' };
  }
  
  if (types.length === 1) {
    // When single type, solid background with opacity
    const color = types[0].color;
    if (!color) return { backgroundColor: '#f9f9f9' };
    return { backgroundColor: getTypeColorWithOpacity(color, 0.1) };
  }
  
  if (types.length >= 2) {
    // When dual types, split circle background
    const color1 = types[0].color;
    const color2 = types[1].color;
    
    if (!color1 || !color2) return { backgroundColor: '#f9f9f9' };
    
    const rgba1 = getTypeColorWithOpacity(color1, 0.1);
    const rgba2 = getTypeColorWithOpacity(color2, 0.1);
    
    return {
      background: `linear-gradient(135deg, ${rgba1} 0%, ${rgba1} 50%, ${rgba2} 50%, ${rgba2} 100%)`
    };
  }
  
  return { backgroundColor: '#f9f9f9' };
};
