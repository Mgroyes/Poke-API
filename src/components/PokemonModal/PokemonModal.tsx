import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import { PokemonDetails } from '@/types/pokemon'

type Props = {
  isOpen: boolean
  onClose: () => void
  pokemon: PokemonDetails | null
}

const PokemonModal: React.FC<Props> = ({ isOpen, onClose, pokemon }) => {
  // Siempre llamamos al hook, controlamos lógica dentro
  useEffect(() => {
    if (!isOpen || !pokemon) return

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, pokemon])

  if (!isOpen || !pokemon) return null

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2rem',
          maxWidth: '400px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{ float: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <h2 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h2>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={120}
            height={120}
            priority
          />
        </div>

        <p>ID: #{pokemon.id}</p>
        <p>Tipo(s): {pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p>Altura: {(pokemon.height / 10).toFixed(1)} m</p>
        <p>Peso: {(pokemon.weight / 10).toFixed(1)} kg</p>

        <h3>Estadísticas base</h3>
        <ul>
          {pokemon.stats.map(s => (
            <li key={s.stat.name}>
              {s.stat.name}: {s.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  )
}

export default PokemonModal
