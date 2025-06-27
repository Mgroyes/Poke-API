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
      justify="center" 
      style={{ 
        paddingInline: '5rem',  
        paddingBlock: '4rem', 
      }} 
    >
      {data.map(pokemon => (
        <Grid.Col
          key={pokemon.id}
          span={{ base: 12, 
                  sm: 6, 
                  md: 4, 
                  lg: 3 
                }} 
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
