import React, { useEffect } from 'react'
import { PokemonBar } from '../../components/PokemonBar'
import { PokemonContainer } from '../../components/PokemonContainer'
import { usePage } from '../../context/PageContext/PageContext'
import { queryPokemons } from '../../hooks/query'

export default () => {
  const { entities, dispatchData } = usePage()
  const { getAll } = queryPokemons()

  useEffect(() => {
    /*
      We need to fetch the main used data for the page
      on the page load.

      Let start a paginated request in the first page
    */
    getAll((data) => dispatchData('pokemons', data.results))
  }, [])
  return (
    <div>
      <h1>HOME</h1>
      <PokemonContainer>
        {entities.pokemons &&
          entities.pokemons.map((value) => (
            <PokemonBar>{value.name}</PokemonBar>
          ))}
      </PokemonContainer>
    </div>
  )
}
