import React, { useEffect } from 'react'
import { Container, Section, ViewContainer, ViewWrapper } from '../../components/layout'
import { useHistory } from 'react-router'
import { Subject, timer } from 'rxjs'
import { Box, Flex, Heading, HeadingProps, Text } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import queryString from 'query-string'
import { Stats } from './components/stats'
import { Button, themeGet } from '@item/ui'
import Support from '../../components/support'
import styled from '@emotion/styled'
import Search from './components/search'
import { debounce } from 'rxjs/operators'
import Items from './components/items'
import Dapps from './components/dapps'

const searchParam$ = new Subject<string>()

export const HomeView = () => {
  const history = useHistory()

  useEffect(() => {
    const searchParamSub = searchParam$
      .pipe(
        debounce(() => timer(200)),
      )
      .subscribe(search => {
        if (search.length < 3) return

        // Update state & url
        history.push({
          pathname: '/items',
          search: queryString.stringify({ search }),
        })
      })

    return () => {
      if (searchParamSub) {
        searchParamSub.unsubscribe()
      }
    }
  }, [history])

  return (
    <ViewWrapper>
      <Section
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container>
          <Heading as={'h1'} textAlign={'center'} mb={6}>
            A safe place to trade <Text color={'primary'} as={'span'}>your</Text> digital posessions.
          </Heading>
          <Container maxWidth={'840px'}>
            <Search onSearch={newSearchString => searchParam$.next(newSearchString)}/>
          </Container>
          <Box mt={'xl'}>
            <Stats/>
          </Box>
        </Container>
      </Section>
      <ItemsSection>
        <ViewContainer>
          <Box mt={'xl'}>
            <ItemsWrapper>
              <ItemsWrapperInner>
                <Items/>
              </ItemsWrapperInner>
            </ItemsWrapper>
          </Box>
          <Flex mt={'xl'} justifyContent={'center'}>
            <RouterLink to={'/items'}>
              <Button size={'lg'} width={'128px'} variant={'primary'}>Show All</Button>
            </RouterLink>
          </Flex>
        </ViewContainer>
      </ItemsSection>
      <Section>
        <ViewContainer>
          <Heading sx={{ fontSize: 'h1', mb: 'lg' }}>Popular Dapps</Heading>
          <Dapps/>
        </ViewContainer>
      </Section>
      <Section>
        <ViewContainer>
          <Support/>
        </ViewContainer>
      </Section>
    </ViewWrapper>
  )
}

export default HomeView

const ItemsSection = styled(Section)`
  background: linear-gradient(
      15deg,
      #0d1424 0%, 
      ${themeGet('colors.background')} 40%,
      ${themeGet('colors.background')} 100%
    );
`

const ItemsWrapper = styled(Box)`
  position: relative;
  margin: 0 -1280px;
  overflow-x: hidden;
`

const ItemsWrapperInner = styled(Container)`
  margin: 0 auto;
  width: 1280px;
  min-height: 240px;
`