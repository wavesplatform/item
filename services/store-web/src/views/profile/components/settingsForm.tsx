import React, { FormEvent, useState } from 'react'
import useCurrentUser from '../../../hooks/currentUser'
import { useMutation } from '@apollo/react-hooks'
import { updateUserInfoMutation } from '../../../graphql/mutations/updateUserInfo'
import { UpdateUserInfo, UpdateUserInfoVariables } from '../../../graphql/mutations/__generated__/UpdateUserInfo'
import { Box } from 'rebass'
import { Button, TextInput } from '@item-protocol/ui'

export const SettingsForm = () => {
  const { me } = useCurrentUser()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(me.name || '')
  const [email, setEmail] = useState(me.email || '')

  const [updateUserInfo] = useMutation<UpdateUserInfo, UpdateUserInfoVariables>(updateUserInfoMutation, {
    refetchQueries: () => ['MeQuery'],
    onCompleted: () => {
      setIsLoading(false)
    },
    onError: (err) => {
      console.log(err)
      setIsLoading(false)
    },
  })

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    setIsLoading(true)

    await updateUserInfo({
      variables: {
        input: {
          name,
          email,
        },
      },
    })
  }

  return (
    <Box
      as={'form'}
      onSubmit={(ev: FormEvent) => handleSubmit(ev)}
    >
      <TextInput value={me.address} disabled={true} mb={'md'}>Account Address</TextInput>
      <TextInput value={name}
                 placeholder={'Your username'}
                 onChange={ev => setName(ev.target.value)}
                 mb={'md'}
      >Name</TextInput>
      <TextInput value={email}
                 placeholder={'Your email'}
                 onChange={ev => setEmail(ev.target.value)}
      >Email</TextInput>
      <Button
        type='submit'
        variant='primary'
        width={'110px'}
        mt={'lg'}
        disabled={isLoading}
        isLoading={isLoading}
      >
        Save
      </Button>
    </Box>
  )
}

export default SettingsForm
