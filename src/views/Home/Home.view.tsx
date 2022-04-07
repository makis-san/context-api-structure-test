import React, { useEffect, useState } from 'react'
import { PokemonBar } from '../../components/PokemonBar'
import { PokemonContainer } from '../../components/PokemonContainer'
import { usePage } from '../../context/PageContext/PageContext'
import { queryPokemons } from '../../hooks/query'

export default () => {
  const { entities, dispatchData } = usePage()
  const { getAll, getPaginated } = queryPokemons()

  const [page, setPage] = useState(1)

  useEffect(() => {
    /*
      We need to fetch the main used data for the page
      on the page load.

      Let start a paginated request in the first page
    */
  }, [])

  const handleLoadAll = () =>
    getAll((data) => dispatchData('pokemons', data.results))

  const handleLoadPaginated = (pageParam: number, keepLast = true) =>
    getPaginated(pageParam, (data) =>
      dispatchData('pokemons', data.results, {
        keepLast
      })
    )

  const handleNextPage = () => {
    setPage(page + 1)
    handleLoadPaginated(page + 1)
  }

  const handleBackPage = () => {
    setPage(page - 1)
    handleLoadPaginated(page - 1)
  }

  return (
    <div>
      <h1>HOME</h1>
      <button type='button' onClick={() => handleLoadAll()}>
        Load All
      </button>
      <button type='button' onClick={() => handleLoadPaginated(1, false)}>
        Load Paginated
      </button>
      <button type='button' onClick={() => handleBackPage()}>
        {'<'}
      </button>
      <button type='button' onClick={() => handleNextPage()}>
        {'>'}
      </button>
      <PokemonContainer>
        {entities.pokemons &&
          entities.pokemons.map((value) => (
            <PokemonBar>{value.name}</PokemonBar>
          ))}
      </PokemonContainer>
    </div>
  )
}
