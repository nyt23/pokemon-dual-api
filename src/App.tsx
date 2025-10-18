import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import PokemonList from './components/PokemonList'
import type { PokemonListItem } from './types'
import { getPokemonList } from './api'
import { getCurrentApiSource, ApiSource } from './api/sources'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getPokemonList()
        setPokemon(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Pokémon')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log('Search query:', query)
  }

  const handleFilterClick = () => {
    // TODO: Implement filter functionality
    console.log('Filter clicked')
  }

  const handlePokemonClick = (pokemon: PokemonListItem) => {
    // TODO: Implement Pokémon detail view
    console.log('Pokémon clicked:', pokemon)
  }


  return (
    <div className="app">
      <Header />
      <SearchSection 
        onSearch={handleSearch}
        onFilterClick={handleFilterClick}
        dataSource={getCurrentApiSource() === ApiSource.CUSTOM ? "Custom API" : "PokeAPI"}
      />
      <main className="main-content">
        <PokemonList 
          pokemon={pokemon}
          loading={loading}
          error={error || undefined}
          onPokemonClick={handlePokemonClick}
        />
      </main>
    </div>
  )
}

export default App
