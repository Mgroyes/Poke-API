import React from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import { PokemonDetails } from '@/types/pokemon'
import Image from 'next/image'

type Props = {
  data: PokemonDetails[]
  onOpenModal: (pokemon: PokemonDetails) => void
}

const TableView: React.FC<Props> = ({ data, onOpenModal }) => {
  // Obtener el valor de una estadística específica
  const getStatValue = (stats: PokemonDetails['stats'], statName: string): number => {
    const stat = stats.find(s => s.stat.name === statName)
    return stat ? stat.base_stat : 0
  }

  // Columnas de la tabla
  const columns: TableColumn<PokemonDetails>[] = [
    {
      name: 'Imagen',
      selector: row => row.sprites.front_default,
      cell: row => (
        <Image
          src={row.sprites.front_default}
          alt={row.name}
          width={50}
          height={50}
          unoptimized
        />
      ),
      sortable: false,
      width: '80px',
    },
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Tipo 1',
      selector: row => row.types[0]?.type.name || '',
      sortable: true,
    },
    {
      name: 'Tipo 2',
      selector: row => row.types[1]?.type.name || '',
      sortable: true,
    },
    {
      name: 'Peso (kg)',
      selector: row => row.weight / 10,
      sortable: true,
      format: row => `${row.weight / 10} kg`,
    },
    {
      name: 'Altura (m)',
      selector: row => row.height / 10,
      sortable: true,
      format: row => `${row.height / 10} m`,
    },
    {
      name: 'Salud Base',
      selector: row => getStatValue(row.stats, 'hp'),
      sortable: true,
    },
    {
      name: 'Experiencia Base',
      selector: row => row.base_experience,
      sortable: true,
    },
    {
      name: 'Ataque Base',
      selector: row => getStatValue(row.stats, 'attack'),
      sortable: true,
    },
    {
      name: 'Defensa Base',
      selector: row => getStatValue(row.stats, 'defense'),
      sortable: true,
    },
    {
      name: 'Ataque Especial',
      selector: row => getStatValue(row.stats, 'special-attack'),
      sortable: true,
    },
    {
      name: 'Defensa Especial',
      selector: row => getStatValue(row.stats, 'special-defense'),
      sortable: true,
    },
    {
      name: 'Velocidad',
      selector: row => getStatValue(row.stats, 'speed'),
      sortable: true,
    },
    {
      name: 'Ver detalles',
      cell: row => (
        <button
          onClick={() => onOpenModal(row)}
          className="btn btn-primary"
          type="button"
        >
          Ver detalles
        </button>
      ),
      ignoreRowClick: true,
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[10, 20, 50]}
      responsive
      highlightOnHover
      pointerOnHover
      dense
      defaultSortFieldId={2}
    />
  )
}

export default TableView
