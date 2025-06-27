import React, { useState, useEffect } from 'react'
import { usePokemon } from '@/hooks/usePokemon'
import TableView from '@/components/TableView/TableView'
import GridView from '@/components/GridView/GridView'
import PokemonModal from '@/components/PokemonModal/PokemonModal'
import { PokemonDetails } from '@/types/pokemon'
import TypeFilter from '@/components/TypeFilter/TypeFilter'
import { Text } from '@mantine/core'
import { IconLayoutGrid, IconTable } from '@tabler/icons-react'

import {
  Card,
  Group,
  TextInput,
  Stack,
  Center,
  Button,
  Title,
  Container,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

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
    <main>
      <Container size="xl" py="xl">
        {/* Título y botón centrados */}
        <Stack align="center" gap="sm" mb="lg">
          <Title order={2}>PokeAPI</Title>
          <Button
            onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
            color="blue"
            leftSection={
              viewMode === 'table' ? (
                <IconLayoutGrid size={16} />
              ) : (
                <IconTable size={16} />
              )
            }
          >
            Cambiar a {viewMode === 'table' ? 'Grid' : 'Tabla'}
          </Button>
        </Stack>

        {/* Card con inputs uno debajo del otro */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Stack gap="md">
            <div>
              <Text size="sm" fw={500} mb={4}>
                Buscar por tipo
              </Text>
              <TypeFilter
                options={allTypes}
                selectedType={selectedType}
                onChange={setSelectedType}
              />
            </div>

            <TextInput
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              leftSection={<IconSearch
                size={16}
                color="#aaa"
                style={{ width: 12, height: 12 }}
                stroke-width={4}
              />}
              label="Buscar"
            />
          </Stack>
        </Card>

        {/* Resultados */}
        {searchedPokemon.length === 0 ? (
          <Center>No se encontraron Pokémon.</Center>
        ) : viewMode === 'table' ? (
          <TableView data={searchedPokemon} onOpenModal={handleOpenModal} />
        ) : (
          <>
            <GridView data={paginatedData} onOpenModal={handleOpenModal} />

            <Group justify="center" mt="lg" gap="xs" wrap="wrap">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? 'filled' : 'light'}
                  color="blue"
                  size="xs"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </Group>
          </>
        )}

        <PokemonModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          pokemon={selectedPokemon}
        />
      </Container>
    </main>
  )
}

export default HomePage
