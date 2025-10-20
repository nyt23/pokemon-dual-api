import React from 'react';
import rightArrowIcon from '../assets/right-arrow.svg';
import leftArrowIcon from '../assets/left-arrow.svg';
import './NavigationButton.css';

interface NavigationButtonProps {
  direction: 'next' | 'prev';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ 
  direction, 
  onClick, 
  disabled = false, 
  loading = false 
}) => {
  const icon = direction === 'next' ? rightArrowIcon : leftArrowIcon;
  const altText = direction === 'next' ? 'Next' : 'Previous';
  
  return (
    <button 
      className={`navigation-button ${direction} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="loading-spinner-small"></div>
      ) : (
        <img 
          src={icon} 
          alt={altText} 
          className="navigation-button-icon"
        />
      )}
    </button>
  );
};

export default NavigationButton;
