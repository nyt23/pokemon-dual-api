import React, { useState, useEffect, useRef } from 'react';
import './SearchSection.css';
import searchIcon from '../assets/search-icon.svg';
import filterIcon from '../assets/filter-icon.svg';
import { ApiSource, useApiSource } from '../contexts/ApiSourceContext';

interface SearchSectionProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  onApiSourceChange?: (source: ApiSource) => void;
  currentApiSource?: ApiSource;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, onFilterClick, onApiSourceChange }) => {
  const { currentSource, setCurrentSource } = useApiSource();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleApiSourceChange = (source: ApiSource) => {
    setCurrentSource(source);
    setIsDropdownOpen(false);
    if (onApiSourceChange) {
      onApiSourceChange(source);
    }
  };

  const getDataSourceLabel = (source: ApiSource): string => {
    return source === ApiSource.CUSTOM ? "Custom API" : "PokéAPI";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(target);
      const isOutsideDesktop = desktopDropdownRef.current && !desktopDropdownRef.current.contains(target);
      
      if (isOutsideMobile && isOutsideDesktop) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <section className="search-section">
      <div className="search-container">
        <h2 className="search-title">Who's that Pokémon?</h2>
        <div className="data-source data-source-mobile">
          <span className="data-source-label">Data Source:</span>
          <div className="data-source-dropdown" ref={mobileDropdownRef}>
            <button 
              className="data-source-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {getDataSourceLabel(currentSource)}
            </button>
            {isDropdownOpen && (
              <div className="data-source-dropdown-menu">
                <button
                  className={`data-source-option ${currentSource === ApiSource.CUSTOM ? 'active' : ''}`}
                  onClick={() => handleApiSourceChange(ApiSource.CUSTOM)}
                >
                  Custom API
                </button>
                <button
                  className={`data-source-option ${currentSource === ApiSource.POKEAPI ? 'active' : ''}`}
                  onClick={() => handleApiSourceChange(ApiSource.POKEAPI)}
                >
                  PokéAPI
                </button>
              </div>
            )}
          </div>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-container">
            <input
              type="text"
              name="search"
              placeholder="Enter your target Pokémon..."
              className="search-input"
            />
          </div>
          <div className="search-buttons">
            <button type="submit" className="search-button" title="Search Pokémon">
              <img src={searchIcon} alt="Search" width="26" height="26" />
            </button>
            <button type="button" className="filter-button" onClick={onFilterClick} title="Filter Pokémon">
              <img src={filterIcon} alt="Filter" width="32" height="32" />
            </button>
          </div>
        </form>
        <div className="data-source data-source-desktop">
          <span className="data-source-label">Data Source:</span>
          <div className="data-source-dropdown" ref={desktopDropdownRef}>
            <button 
              className="data-source-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {getDataSourceLabel(currentSource)}
            </button>
            {isDropdownOpen && (
              <div className="data-source-dropdown-menu">
                <button
                  className={`data-source-option ${currentSource === ApiSource.CUSTOM ? 'active' : ''}`}
                  onClick={() => handleApiSourceChange(ApiSource.CUSTOM)}
                >
                  Custom API
                </button>
                <button
                  className={`data-source-option ${currentSource === ApiSource.POKEAPI ? 'active' : ''}`}
                  onClick={() => handleApiSourceChange(ApiSource.POKEAPI)}
                >
                  PokéAPI
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
