import { MeQuery } from '../../graphql/queries/__generated__/MeQuery'
import { IUser } from '@item-protocol/types'
import { useQuery } from '@apollo/react-hooks'
import { getMeQuery } from '../../graphql/queries/getMe'
import React, { ComponentType } from 'react'

type TData = MeQuery

export type TCurrentUser = {
  me: IUser
  meIsLoading: boolean
}

export const useCurrentUser = (): TCurrentUser => {
  const { data, loading } = useQuery<TData>(getMeQuery, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'ignore',
  })

  const me = data && data.me

  return { me: me as IUser, meIsLoading: loading }
}

export type WithCurrentUserProps<T = {}> = T & TCurrentUser
export const withCurrentUser = <TProps extends {}>(WrappedComponent: ComponentType<WithCurrentUserProps<TProps>>) => {
  return (props: TProps) => {
    const { me, meIsLoading } = useCurrentUser()
    return <WrappedComponent me={me} meIsLoading={meIsLoading} {...props}/>
  }
}

export default useCurrentUser