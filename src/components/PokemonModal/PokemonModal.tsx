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
  useEffect(() => {
    if (!isOpen || !pokemon) return

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, pokemon])

  if (!isOpen || !pokemon) return null

  // 🎨 Función para obtener color basado en el valor
  const getStatColor = (value: number): string => {
    if (value > 100) return '#4ade80' // Verde claro
    if (value < 50) return '#f87171' // Rojo claro
    return '#facc15' // Amarillo claro
  }

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
        onClick={(e) => e.stopPropagation()}
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
        <p>Tipo(s): {pokemon.types.map((t) => t.type.name).join(', ')}</p>
        <p>Altura: {(pokemon.height / 10).toFixed(1)} m</p>
        <p>Peso: {(pokemon.weight / 10).toFixed(1)} kg</p>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: '600' }}>
          Estadísticas base
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {pokemon.stats.map((s) => (
            <div key={s.stat.name}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                }}
              >
                <span>{s.stat.name}</span>
                <span>{s.base_stat}</span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                }}
              >
                <div
                  style={{
                    width: `${(s.base_stat / 150) * 100}%`,
                    height: '100%',
                    backgroundColor: getStatColor(s.base_stat),
                    borderRadius: '4px',
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default PokemonModal
