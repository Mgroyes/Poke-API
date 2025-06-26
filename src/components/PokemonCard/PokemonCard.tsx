import React from 'react'
import { PokemonDetails } from '@/types/pokemon'
import Image from 'next/image'

type Props = {
  pokemon: PokemonDetails
  onClick: () => void
}

const PokemonCard: React.FC<Props> = ({ pokemon, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        textAlign: 'center',
        position: 'relative',
        backgroundColor: '#f9f9f9',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '5px',
          right: '8px',
          fontWeight: 'bold',
          fontSize: '0.8rem',
          color: '#555',
        }}
      >
        #{pokemon.id}
      </span>
      <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={96} height={96} unoptimized />
      <h4
        style={{
          marginTop: '0.5rem',
          textTransform: 'capitalize',
          fontWeight: '600',
          fontSize: '1rem',
        }}
      >
        {pokemon.name}
      </h4>
    </div>
  )
}

export default PokemonCard
