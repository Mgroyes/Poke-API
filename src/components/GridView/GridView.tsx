import React from 'react'
import { PokemonDetails } from '@/types/pokemon'
import PokemonCard from '../PokemonCard/PokemonCard'
import { Grid } from '@mantine/core'

type Props = {
  data: PokemonDetails[]
  onOpenModal: (pokemon: PokemonDetails) => void
}

const GridView: React.FC<Props> = ({ data, onOpenModal }) => {
  return (
    <Grid
      gutter="lg"
      justify="center" // centra el grid si hay espacio horizontal
      style={{ 
        paddingInline: '10rem',  
        paddingBlock: '6rem', 
      }} // aire a los lados del DOM
    >
      {data.map(pokemon => (
        <Grid.Col
          key={pokemon.id}
          span={{ base: 12, 
                  sm: 6, 
                  md: 4, 
                  lg: 3 
                }} // ⬅️ Máximo 4 cards por fila (12 / 3)
        >
          <PokemonCard
            pokemon={pokemon}
            onClick={() => onOpenModal(pokemon)}
          />
        </Grid.Col>
      ))}
    </Grid>
  )
}

export default GridView
