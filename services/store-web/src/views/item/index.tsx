import React from 'react'
import { useRouteMatch } from 'react-router'
import { Container, ViewContent, ViewGrid, ViewSide, ViewWrapper } from '../../components/layout'
import DappNav from '../../components/dappNav'
import Item from './components/item'
import { Box } from 'rebass'

type MatchParams = {
  assetId: string
}

export const ItemView = () => {
  const match = useRouteMatch<MatchParams>()!
  const { assetId } = match.params

  return (
    <ViewWrapper py={0}>
      <ViewGrid>
        <ViewSide>
          <DappNav/>
        </ViewSide>
        <ViewContent>
          <Container maxWidth={'720px'}>
            <Box py={'lg'}>
              <Item assetId={assetId}/>
            </Box>
          </Container>
        </ViewContent>
      </ViewGrid>
    </ViewWrapper>
  )
}

export default ItemView