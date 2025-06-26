export interface PokemonBasic {
  name: string
  url: string
}

export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface PokemonType {
  type: {
    name: string
  }
}

export interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
  }
  types: PokemonType[]
  stats: PokemonStat[]
  base_experience: number
}
