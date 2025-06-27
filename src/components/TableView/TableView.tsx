import React, { useState } from 'react'
import {
  Table,
  ScrollArea,
  Group,
  Button,
  Avatar,
  Box,
} from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import { PokemonDetails } from '@/types/pokemon'

type Props = {
  data: PokemonDetails[]
  onOpenModal: (pokemon: PokemonDetails) => void
}

const TableView: React.FC<Props> = ({ data, onOpenModal }) => {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const getStat = (pokemon: PokemonDetails, statName: string) =>
    pokemon.stats.find((s) => s.stat.name === statName)?.base_stat || 0

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0

    let aValue: number | string = ''
    let bValue: number | string = ''

    switch (sortField) {
      case 'name':
        aValue = a.name
        bValue = b.name
        break
      case 'type1':
        aValue = a.types[0]?.type.name || ''
        bValue = b.types[0]?.type.name || ''
        break
      case 'type2':
        aValue = a.types[1]?.type.name || ''
        bValue = b.types[1]?.type.name || ''
        break
      case 'weight':
        aValue = a.weight
        bValue = b.weight
        break
      case 'height':
        aValue = a.height
        bValue = b.height
        break
      case 'base_experience':
        aValue = a.base_experience
        bValue = b.base_experience
        break
      case 'hp':
      case 'attack':
      case 'defense':
      case 'special-attack':
      case 'special-defense':
      case 'speed':
        aValue = getStat(a, sortField)
        bValue = getStat(b, sortField)
        break
      default:
        return 0
    }

    if (typeof aValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue as string)
        : (bValue as string).localeCompare(aValue)
    }

    return sortDirection === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number)
  })

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const pagination = usePagination({
    total: totalPages,
    page: currentPage,
    onChange: setCurrentPage,
    siblings: 1,
    boundaries: 1,
  })

  const paginated = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <>
      <ScrollArea type="always" offsetScrollbars>
        <Box w="max-content" miw="100%">
          <Table striped highlightOnHover withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Imagen</Table.Th>
                <Table.Th onClick={() => handleSort('name')}>Nombre</Table.Th>
                <Table.Th onClick={() => handleSort('type1')}>Tipo 1</Table.Th>
                <Table.Th onClick={() => handleSort('type2')}>Tipo 2</Table.Th>
                <Table.Th onClick={() => handleSort('weight')}>Peso (kg)</Table.Th>
                <Table.Th onClick={() => handleSort('height')}>Altura (m)</Table.Th>
                <Table.Th onClick={() => handleSort('hp')}>Salud Base</Table.Th>
                <Table.Th onClick={() => handleSort('base_experience')}>XP Base</Table.Th>
                <Table.Th onClick={() => handleSort('attack')}>Ataque</Table.Th>
                <Table.Th onClick={() => handleSort('defense')}>Defensa</Table.Th>
                <Table.Th onClick={() => handleSort('special-attack')}>Ataque Esp.</Table.Th>
                <Table.Th onClick={() => handleSort('special-defense')}>Defensa Esp.</Table.Th>
                <Table.Th onClick={() => handleSort('speed')}>Velocidad</Table.Th>
                <Table.Th>Ver detalles</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginated.map((pokemon) => (
                <Table.Tr key={pokemon.id}>
                  <Table.Td>
                    <Avatar
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      size="md"
                    />
                  </Table.Td>
                  <Table.Td>{pokemon.name}</Table.Td>
                  <Table.Td>{pokemon.types[0]?.type.name || '-'}</Table.Td>
                  <Table.Td>{pokemon.types[1]?.type.name || '-'}</Table.Td>
                  <Table.Td>{pokemon.weight / 10}</Table.Td>
                  <Table.Td>{pokemon.height / 10}</Table.Td>
                  <Table.Td>{getStat(pokemon, 'hp')}</Table.Td>
                  <Table.Td>{pokemon.base_experience}</Table.Td>
                  <Table.Td>{getStat(pokemon, 'attack')}</Table.Td>
                  <Table.Td>{getStat(pokemon, 'defense')}</Table.Td>
                  <Table.Td>{getStat(pokemon, 'special-attack')}</Table.Td>
                  <Table.Td>{getStat(pokemon, 'special-defense')}</Table.Td>
                  <Table.Td>{getStat(pokemon, 'speed')}</Table.Td>
                  <Table.Td>
                    <Button size="xs"variant="outline"color="blue"
                     onClick={() => onOpenModal(pokemon)}>
                      Ver detalles
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      </ScrollArea>

      
      <Group justify="center" mt="lg" gap="xs" wrap="wrap">
        {pagination.range.map((page, index) =>
          page === 'dots' ? (
            <Button key={`dots-${index}`} variant="subtle" disabled size="xs">
              ...
            </Button>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? 'filled' : 'light'}
              color="blue"
              size="xs"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          )
        )}
      </Group>
    </>
  )
}

export default TableView
