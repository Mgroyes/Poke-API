import React from 'react'
import { Card, Image, Text, Badge, Group, Button } from '@mantine/core'
import { PokemonDetails } from '@/types/pokemon'

type Props = {
  pokemon: PokemonDetails
  onClick: () => void
}

const typeColors: Record<string, string> = {
  fire: 'red',
  water: 'blue',
  grass: 'green',
  electric: 'yellow',
  bug: 'lime',
  normal: 'gray',
  poison: 'grape',
  ground: 'orange',
  fairy: 'pink',
  psychic: 'violet',
  fighting: 'orange',
  rock: 'sand',
  ghost: 'indigo',
  ice: 'cyan',
  dragon: 'teal',
  dark: 'dark',
  steel: 'metal',
  flying: 'azure',
}

const PokemonCard: React.FC<Props> = ({ pokemon, onClick }) => {
  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      style={{
        transition: 'transform 0.2s, box-shadow 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)'
        e.currentTarget.style.transform = 'scale(1.03)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = ''
        e.currentTarget.style.transform = ''
      }}
    >
      {/* Fondo inferior gris extendido */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '70%',
          backgroundColor: '#f1f3f5',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          zIndex: 0,
        }}
      />

      {/* ID Badge */}
      <Badge
        color="blue"
        variant="light"
        size="sm"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          fontWeight: 'bold',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        #{pokemon.id}
      </Badge>

      {/* Imagen */}
      <Card.Section style={{ position: 'relative', height: 120, zIndex: 2 }}>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          fit="contain"
          height={120}
        />
      </Card.Section>

      {/* Nombre */}
      <Text fw={700} ta="center" mt="md" style={{ textTransform: 'capitalize', zIndex: 2, position: 'relative' }}>
        {pokemon.name}
      </Text>

      {/* Tipos */}
      <Group justify="center" mt="sm" gap="xs" style={{ zIndex: 2, position: 'relative' }}>
        {pokemon.types.map((typeInfo) => (
          <Badge
            key={typeInfo.type.name}
            color={typeColors[typeInfo.type.name] || 'blue'}
            variant="light"
          >
            {typeInfo.type.name}
          </Badge>
        ))}
      </Group>

      {/* Botón Ver detalle */}
      <Group justify="center" mt="md" style={{ zIndex: 2, position: 'relative' }}>
        <Button
          size="xs"
          variant="outline"
          color="blue"
          onClick={onClick}
          styles={{
            root: {
              transition: 'background-color 0.2s, color 0.2s',
              '&:hover': {
                backgroundColor: '#041f3b',
                color: 'white',
              },
            },
          }}
        >
          Ver detalle
        </Button>
      </Group>
    </Card>
  )
}

export default PokemonCard
