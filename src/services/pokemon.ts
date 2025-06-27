import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const getAllPokemonBasic = async () => {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=151`)
  return response.data.results 
}

export const getPokemonDetails = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}
