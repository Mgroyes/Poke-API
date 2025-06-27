import React, { useState, useEffect } from 'react'
import { usePokemon } from '@/hooks/usePokemon'
import TableView from '@/components/TableView/TableView'
import GridView from '@/components/GridView/GridView'
import PokemonModal from '@/components/PokemonModal/PokemonModal'
import { PokemonDetails } from '@/types/pokemon'
import TypeFilter from '@/components/TypeFilter/TypeFilter'

const HomePage = () => {
  const { pokemonList, loading } = usePokemon()

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 20

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedType, searchTerm])

  const handleOpenModal = (pokemon: PokemonDetails) => {
    setSelectedPokemon(pokemon)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPokemon(null)
  }

  if (loading) return <p className="p-8">Cargando Pokémon...</p>

  const allTypes = Array.from(
    new Set(pokemonList.flatMap(p => p.types.map(t => t.type.name)))
  )

  const filteredByType = selectedType
    ? pokemonList.filter(p => p.types.some(t => t.type.name === selectedType))
    : pokemonList

  const searchedPokemon = filteredByType.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(searchedPokemon.length / ITEMS_PER_PAGE)
  const paginatedData = searchedPokemon.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <main className="mx-auto max-w-7xl p-10 sm:p-10">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <h1 className="text-2xl font-bold">Pokémon Explorer</h1>
        <button
          onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Cambiar a {viewMode === 'table' ? 'Grid' : 'Tabla'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <TypeFilter
          options={allTypes}
          selectedType={selectedType}
          onChange={setSelectedType}
        />

        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full sm:max-w-xs"
        />
      </div>

      {searchedPokemon.length === 0 ? (
        <p>No se encontraron Pokémon.</p>
      ) : viewMode === 'table' ? (
        <TableView data={searchedPokemon} onOpenModal={handleOpenModal} />
      ) : (
        <>
          <GridView data={paginatedData} onOpenModal={handleOpenModal} />

          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      <PokemonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pokemon={selectedPokemon}
      />
    </main>
  )
}

export default HomePage
