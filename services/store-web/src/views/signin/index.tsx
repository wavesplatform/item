import React, { useEffect, useState } from 'react'
import { Container, ViewWrapper } from '../../components/layout'
import { Redirect, RouteComponentProps } from 'react-router'
import SigninForm from '../../components/signinForm'
import { Box, Heading } from 'rebass'
import useCurrentUser from '../../hooks/currentUser'

type TProps = RouteComponentProps

export const SigninView = ({ location }: TProps) => {
  const [redirectUrl, setRedirectUrl] = useState('/')
  const { me } = useCurrentUser()

  useEffect(() => {
    if (location.state !== undefined) {
      setRedirectUrl(location.state.from)
    }
  }, [location])

  if (me) {
    return <Redirect to={redirectUrl}/>
  }

  return (
    <ViewWrapper>
      <Container maxWidth={'420px'}>
        <Heading as={'h1'} mb={'md'}>Sign In</Heading>
        <Box mb={'lg'}>
          <SigninForm redirectUrl={redirectUrl}/>
        </Box>
      </Container>
    </ViewWrapper>
  )
}

export default SigninView
