import React from 'react';
import './SearchSection.css';
import searchIcon from '../assets/search-icon.svg';
import filterIcon from '../assets/filter-icon.svg';

interface SearchSectionProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  dataSource?: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, onFilterClick, dataSource }) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <h2 className="search-title">Who's that Pokémon?</h2>
        {dataSource && (
          <div className="data-source data-source-mobile">
            <span className="data-source-label">Data Source:</span>
            <button className="data-source-button">{dataSource}</button>
          </div>
        )}
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
        {dataSource && (
          <div className="data-source data-source-desktop">
            <span className="data-source-label">Data Source:</span>
            <button className="data-source-button">{dataSource}</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
