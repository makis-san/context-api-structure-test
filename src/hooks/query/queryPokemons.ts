import { useMutation } from 'react-query'
import { api } from '../../service/api'

export type ReturnOBJ = {
  name: string
  url: string
}

export interface PaginatedResponse {
  count: number
  next?: string
  previous?: string
  results: ReturnOBJ[]
}

export type QueryResponse<T> = {
  data: T | undefined
  error: unknown
}
export interface QueryPokemonsTypes {
  getPaginated: (
    pageParam?: number,
    callBack?: (data: PaginatedResponse) => void
  ) => QueryResponse<PaginatedResponse>
  getAll: (
    callBack?: (data: PaginatedResponse) => void
  ) => QueryResponse<ReturnOBJ[]>
}

export const queryPokemons = () => {
  const getAllMutation = useMutation('pokemons/all', () =>
    api
      .get<PaginatedResponse>(`/pokemon/?limit=500&offset=500`)
      .then((res) => res.data)
  )
  const getAll = (callBack?: (data: PaginatedResponse) => void) => {
    const data = getAllMutation.mutate(undefined, {
      onSuccess: (res) => {
        if (callBack) callBack(res)
      }
    })

    return { data }
  }

  const paginatedMutation = useMutation(
    'pokemons/paginated',
    (pageParam: number) =>
      api
        .get<PaginatedResponse>(`/pokemon/?limit=20&offset=${20 * pageParam}`)
        .then((res) => res.data)
  )

  const getPaginated = (
    pageParam: number,
    callBack?: (data: PaginatedResponse) => void
  ) => {
    const data = paginatedMutation.mutate(pageParam, {
      onSuccess: (res) => {
        if (callBack) callBack(res)
      }
    })

    return { data }
  }

  return {
    getPaginated,
    getAll
  } as QueryPokemonsTypes
}
