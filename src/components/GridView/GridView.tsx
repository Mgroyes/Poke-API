import React from 'react'
import { PokemonDetails } from '@/types/pokemon'
import PokemonCard from '../PokemonCard/PokemonCard'

type Props = {
  data: PokemonDetails[]
  onOpenModal: (pokemon: PokemonDetails) => void
}

const GridView: React.FC<Props> = ({ data, onOpenModal }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
        gap: '1rem',
      }}
    >
      {data.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => onOpenModal(pokemon)} />
      ))}
    </div>
  )
}

export default GridView
