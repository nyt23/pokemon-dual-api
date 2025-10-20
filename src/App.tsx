import Header from './components/Header'
import SearchSection from './components/SearchSection'
import PokemonList from './components/PokemonList'
import PokemonDetailModal from './components/PokemonDetailModal'
import { usePokemonData } from './hooks/usePokemonData'
import { usePokemonModal } from './hooks/usePokemonModal'
import { ApiSourceProvider } from './contexts/ApiSourceContext'
import './App.css'

function AppContent() {
  const {
    pokemon,
    loading,
    error,
    offset,
    totalCount,
    hasNext,
    nextLoading,
    prevLoading,
    handleApiSourceChange,
    handleNextClick,
    handlePrevClick,
    setError
  } = usePokemonData();

  const {
    selectedPokemon,
    modalOpen,
    handlePokemonClick,
    handleCloseModal
  } = usePokemonModal();

  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log('Search query:', query)
  }

  const handleFilterClick = () => {
    // TODO: Implement filter functionality
    console.log('Filter clicked')
  }

  return (
    <div className="app">
      <Header />
      <SearchSection 
        onSearch={handleSearch}
        onFilterClick={handleFilterClick}
        onApiSourceChange={handleApiSourceChange}
      />
      <main className="main-content">
        <PokemonList 
          pokemon={pokemon}
          loading={loading}
          error={error || undefined}
          onPokemonClick={(pokemon) => handlePokemonClick(pokemon, setError)}
          hasNext={hasNext}
          onNextClick={handleNextClick}
          nextLoading={nextLoading}
          onPrevClick={handlePrevClick}
          prevLoading={prevLoading}
          offset={offset}
        />
      </main>
      <div className="count-footer">
        {totalCount > 0 && (
          <>Showing {offset + 1}
          -{Math.min(offset + 12, totalCount)} of {totalCount} Pokémon</>
        )}
      </div>
      
      <PokemonDetailModal 
        pokemon={selectedPokemon}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

function App() {
  return (
    <ApiSourceProvider>
      <AppContent />
    </ApiSourceProvider>
  )
}

export default App
