import React, { Component, ReactNode } from 'react'
import { Container, Section, ViewContainer, ViewWrapper } from '../../components/layout'
import { RouteComponentProps } from 'react-router'
import { Subscription, timer } from 'rxjs'
import { Box, Flex, Heading, Text } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import queryString from 'query-string'
import { Stats } from './components/stats'
import { Button, themeGet } from '@item/ui'
import Support from '../../components/support'
import styled from '@emotion/styled'
import Search from './components/search'

class HomeView extends Component<RouteComponentProps> {
  _searchSub?: Subscription

  componentWillUnmount(): void {
    if (this._searchSub) {
      this._searchSub.unsubscribe()
    }
  }

  render(): ReactNode {
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
              <Search onSearch={this._onSearch}/>
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
                  items
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
            <Title>Popular Dapps</Title>
            dapps
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

  _onSearch = (searchString: string) => {
    const { history } = this.props

    if (this._searchSub) {
      this._searchSub.unsubscribe()
    }

    if (searchString.length < 3) {
      return
    }

    this._searchSub = timer(200)
      .subscribe(() => {
        history.push({
          pathname: '/items',
          search: queryString.stringify({ search: searchString }),
        })
      })
  }
}

export default HomeView

const Title = styled(Heading)`
  font-size: 1.5rem;
`

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