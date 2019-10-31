import React, { FormEvent, useContext } from 'react'
import { KeeperContext } from '../../contexts/keeper'
import { signinMutation } from '../../graphql/mutations/signIn'
import { Signin, SigninVariables } from '../../graphql/mutations/__generated__/Signin'
import { useHistory } from 'react-router'
import { useMutation } from '@apollo/react-hooks'
import config from '../../config'
import { setToken } from '../../helpers/auth'
import { Button, TextInput, Toast } from '@item/ui'
import { Box } from 'rebass'
import { isFirefox } from '../../helpers/browser'

type TProps = {
  redirectUrl: string
}

export const SigninForm = ({ redirectUrl }: TProps) => {
  const { installed, hasAccounts, publicState, checkPublicState, api: keeperApi } = useContext(KeeperContext)
  const history = useHistory()
  checkPublicState()

  const { account, network } = publicState
  const [signin] = useMutation<Signin, SigninVariables>(signinMutation, {
    update: (cache, { data }) => {
      if (!data) {
        return
      }

      const { token } = data.signin
      setToken(token)
    },
    refetchQueries: () => ['MeQuery'],
    onCompleted: () => {
      history.push(redirectUrl)
    },
    onError: (err) => console.log(err),
  })

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!keeperApi) return

    // Auth by Keeper
    const auth = await keeperApi.auth({
      data: config.authData,
    })
    const { address, publicKey, signature, host } = auth

    await signin({
      variables: {
        input: {
          address,
          publicKey,
          sign: signature,
          webappHost: host,
        },
      },
    })
  }

  if (!installed) {
    return (
      <>
        <Toast mb={'base'}>
          Interaction with Items Market requires a free browser extention Waves Keeper.<br/><br/>
          You can also create a new account there.
        </Toast>
        <Button
          as={'a'}
          variant='primary'
          mt={'lg'}
          href={
            isFirefox() ?
              'https://addons.mozilla.org/ru/firefox/addon/waves-keeper/' :
              'https://chrome.google.com/webstore/detail/waves-keeper/lpilbniiabackdjcionkobglmddfbcjo'
          }
          target='_blank'
        >Install Keeper</Button>
      </>
    )
  } else if (!hasAccounts) {
    return <Toast mb={'base'}>
      Please add your account to Keeper to access the vault.
    </Toast>
  }

  if (network && network.code !== config.chainId) {
    return (
      <>
        <Toast mb={'base'}>
          Incorrect Waves network.<br/>
          Please select another network.
        </Toast>
      </>
    )
  }

  return (
    <Box as={'form'}
         onSubmit={(ev: FormEvent) => handleSubmit(ev)}
    >
      {account && <TextInput value={account.address} disabled={true}>Account Address</TextInput>}
      <Button type='submit' variant='primary' size={'lg'} width={1} mt={'lg'}>Sign In via Keeper</Button>
    </Box>
  )
}

export default SigninForm
