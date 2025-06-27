import React, { useEffect } from 'react'
import { Modal, Image, Text, Badge, Group, Progress, Stack } from '@mantine/core'
import { PokemonDetails } from '@/types/pokemon'

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
  fighting: 'red',
  rock: 'orange',
  ghost: 'indigo',
  ice: 'cyan',
  dragon: 'teal',
  dark: 'dark',
  steel: 'gray',
  flying: 'blue',
}

type Props = {
  isOpen: boolean
  onClose: () => void
  pokemon: PokemonDetails | null
}

const PokemonModal: React.FC<Props> = ({ isOpen, onClose, pokemon }) => {
  useEffect(() => {
    if (!isOpen || !pokemon) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, pokemon])

  if (!pokemon) return null

  const getStatColor = (value: number): string => {
    if (value > 100) return '#4ade80'
    if (value < 50) return '#f87171'
    return '#facc15'
  }

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<Text fw={600} tt="capitalize">{pokemon.name}</Text>}
      centered
      size="md"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      radius="md"
      padding={24} // Aumenta espacio general interno
      style={{ position: 'relative' }}
    >
      {/* Fondo gris claro desde mitad del muñeco hacia abajo */}
      <div
        style={{
          position: 'absolute',
          top: 150 / 2 + 56, // puedes ajustar este valor si el muñeco cambia de tamaño
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f1f3f5',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          zIndex: 0,
        }}
      />

      <Stack gap="md" style={{ position: 'relative', zIndex: 1 }}>
        {/* Imagen */}
        <Group justify="center" mb="sm">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={120}
            height={120}
            fit="contain"
          />
        </Group>

        {/* ID y Tipos */}
        <Group justify="space-between" px="xs">
          <Text size="sm">ID: #{pokemon.id}</Text>
          <Group gap="xs">
            {pokemon.types.map((t) => (
              <Badge
                key={t.type.name}
                color={typeColors[t.type.name] || 'blue'}
                variant="light"
                style={{ textTransform: 'capitalize' }}
              >
                {t.type.name}
              </Badge>
            ))}
          </Group>
        </Group>

        {/* Altura y Peso */}
        <Stack gap={6} px="xs">
          <Text size="sm">Altura: {(pokemon.height / 10).toFixed(1)} m</Text>
          <Text size="sm">Peso: {(pokemon.weight / 10).toFixed(1)} kg</Text>
        </Stack>

        {/* Estadísticas */}
        <Stack gap="xs" mt="md" px="xs">
          <Text fw={600}>Estadísticas base</Text>
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name}>
              <Group justify="space-between" mb={4}>
                <Text size="xs" c="dimmed">{stat.stat.name}</Text>
                <Text size="xs">{stat.base_stat}</Text>
              </Group>
              <Progress
                value={(stat.base_stat / 150) * 100}
                color={getStatColor(stat.base_stat)}
                radius="xl"
              />
            </div>
          ))}
        </Stack>
      </Stack>
    </Modal>
  )
}

export default PokemonModal
