import React from 'react'
import { ViewContainer, ViewWrapper } from '../../components/layout'
import { Box, Flex } from 'rebass'
import { UserHeading } from '@item-protocol/ui'
import { Redirect, Route, Switch } from 'react-router'
import useCurrentUser from '../../hooks/currentUser'
import { TabsItem, TabsList } from '@item-protocol/ui'
import { Link as RouterLink } from 'react-router-dom'
import SettingsView from './settings'
import InventoryView from './inventory'
import SellsView from './sells'

export const ProfileView = () => {
  const { me } = useCurrentUser()

  return (
    <ViewWrapper py={0}>
      <Flex sx={{
        minHeight: '128px',
        alignItems: 'center',
        borderWidth: '0 0 1px',
        borderStyle: 'solid',
        borderColor: 'grays.7',
        py: 'lg',
      }}>
        <ViewContainer>
          <UserHeading user={me} size={'lg'}/>
        </ViewContainer>
      </Flex>
      <Box sx={{ borderBottom: '1px solid', borderColor: 'grays.7' }}>
        <ViewContainer>
          <TabsList height={'52px'}>
            <Route path={'/profile/settings'}>
              {({ match }) => (
                <RouterLink to={'/profile/settings'}>
                  <TabsItem isActive={!!match}>Settings</TabsItem>
                </RouterLink>
              )}
            </Route>
            <Route path={'/profile/inventory'}>
              {({ match }) => (
                <RouterLink to={'/profile/inventory'}>
                  <TabsItem isActive={!!match}>Inventory</TabsItem>
                </RouterLink>
              )}
            </Route>
            <Route path={'/profile/sells'}>
              {({ match }) => (
                <RouterLink to={'/profile/sells'}>
                  <TabsItem isActive={!!match}>Sells</TabsItem>
                </RouterLink>
              )}
            </Route>
          </TabsList>
        </ViewContainer>
      </Box>
      <ViewContainer py={'lg'}>
        <Switch>
          <Route key='route-profile-settings' path='/profile/settings' component={SettingsView}/>
          <Route key='route-profile-inventory' path='/profile/inventory' component={InventoryView}/>
          <Route key='route-profile-sells' path='/profile/sells' component={SellsView}/>
          <Redirect from='*' to='/profile/settings'/>
        </Switch>
      </ViewContainer>
    </ViewWrapper>
  )
}

export default ProfileView