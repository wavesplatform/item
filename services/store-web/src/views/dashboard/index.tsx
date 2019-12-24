import React from 'react'
import { ViewContainer } from '../../components/layout'
import { Box } from 'rebass'
import { useState } from 'react'
import { useCurrentUser } from '../../hooks/currentUser'
import { IconButton, TabsList, TabsItem, TabsItemProps } from '@item-protocol/ui'
import { EditDappModal } from '../../components/modals/editDapp'
import { GameHeading } from '../../components/gameHeading'
import { Route, Link as RouterLink, Switch, Redirect } from 'react-router-dom'
import { DashboardItems } from './items'
import { ItemForm } from './components/itemForm'

export const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { me } = useCurrentUser()

  if (!me) return null

  return (
    <>
      <Box sx={{ borderBottom: ({ colors }) => `1px solid ${colors.secondary}` }}>
        <ViewContainer minHeight={128} display='flex' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <GameHeading dapp={me} />
          <IconButton glyph='mode_edit' onClick={() => setModalVisible(true)} sx={{ zIndex: 1 }} />
          <EditDappModal dapp={me} isOpen={modalVisible} onClose={() => setModalVisible(false)} />
        </ViewContainer>
      </Box>

      <Box sx={{ borderBottom: ({ colors }) => `1px solid ${colors.secondary}` }}>
        <ViewContainer>
          <TabsList height={52}>
            <TabLink to='/dashboard/items'>Items</TabLink>
            <TabLink to='/dashboard/create-item'>Create Item</TabLink>
          </TabsList>
        </ViewContainer>
      </Box>

      <ViewContainer>
        <Box py='lg'>
          <Switch>
            <Route key='edit-item' path='/dashboard/item/:assetId' component={ItemForm} />
            <Route key='create-item' path='/dashboard/create-item' component={ItemForm} />
            <Route path='/dashboard/items' component={DashboardItems} />
            <Redirect to='/dashboard/items' />
          </Switch>
        </Box>
      </ViewContainer>
    </>
  )
}

const TabLink = ({ to, ...props }: TabsItemProps & { to: string }) => (
  <Route path={to}>
    {({ match }) => (
      <RouterLink to={to}>
        <TabsItem px={'xl'} isActive={!!match} {...props} />
      </RouterLink>
    )}
  </Route>
)
