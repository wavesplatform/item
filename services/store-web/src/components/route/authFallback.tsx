import React, { ComponentType } from 'react'
import { UserRole } from '../../__generated__/globalTypes'
import { Loading } from '@item/ui'
import useCurrentUser from '../../hooks/currentUser'

type TSwitchProps = {
  Component: ComponentType<any>
  FallbackComponent: ComponentType<any>
  isDapp: boolean
}

const Switch = (props: TSwitchProps) => {
  const { me, meIsLoading } = useCurrentUser()
  const { Component, FallbackComponent, isDapp, ...rest } = props

  if (meIsLoading) {
    return <Loading/>
    // return <Component {...rest}/>
  }

  if (
    me &&
    (!isDapp || (isDapp && me.role && [UserRole.DAPP, UserRole.TEST].includes(me.role as UserRole)))
  ) {
    return <Component {...rest}/>
  } else {
    return <FallbackComponent {...rest}/>
  }
}

const authFallback = (
  Component: ComponentType<any>,
  FallbackComponent: ComponentType<any>,
  isDapp: boolean = false
) => {
  return (props: any) => (
    <Switch {...props} Component={Component} FallbackComponent={FallbackComponent} isDapp={isDapp}/>
  )
}

export default authFallback
