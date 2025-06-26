import { useEffect, useState } from 'react'
import { getAllPokemonBasic, getPokemonDetails } from '@/services/pokemon'
import { PokemonDetails } from '@/types/pokemon'

type PokemonBasic = {
  name: string
  url: string
}

export const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const basics: PokemonBasic[] = await getAllPokemonBasic()
      const details = await Promise.all(
        basics.map((p: PokemonBasic) => getPokemonDetails(p.url))
      )
      setPokemonList(details)
      setLoading(false)
    }

    fetchData()
  }, [])

  return { pokemonList, loading }
}
