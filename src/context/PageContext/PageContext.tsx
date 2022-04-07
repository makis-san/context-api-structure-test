import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { ReturnOBJ } from '../../hooks/query/queryPokemons'

declare interface EntitiesType {
  pokemons: ReturnOBJ
  student: string
}

declare type EntitiesOBJType = {
  [Property in keyof EntitiesType]-?: EntitiesType[Property][]
}

interface PageContextTypes {
  entities: EntitiesOBJType
  dispatchData: (
    entity: keyof EntitiesType,
    data: EntitiesType[keyof EntitiesType][],
    options?: {
      keepLast?: boolean
    }
  ) => void
}

const PageContext = createContext({} as PageContextTypes)

export const usePage = () => useContext(PageContext)

export const PageContextWrapper: React.FC = ({ children }) => {
  const [entities, setEntities] = useState<EntitiesOBJType>(
    {} as EntitiesOBJType
  )

  // Set entities value
  const dispatchData = useCallback(
    (
      entity: keyof EntitiesType,
      data: EntitiesType[keyof EntitiesType][],
      options?: {
        keepLast?: boolean
      }
    ) => {
      if (
        options?.keepLast &&
        entities[entity] &&
        entities[entity].length > 0
      ) {
        return setEntities((cur) => ({
          ...cur,
          [entity]: [...cur[entity], ...data]
        }))
      }
      return setEntities((cur) => ({
        ...cur,
        [entity]: data
      }))
    },
    [entities]
  )

  const ctxValue = useMemo(
    () => ({
      dispatchData,
      entities
    }),
    [dispatchData, entities]
  )
  return (
    <PageContext.Provider value={ctxValue}>{children}</PageContext.Provider>
  )
}
