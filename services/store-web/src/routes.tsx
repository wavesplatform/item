import React, { Component, ReactNode } from 'react'
import { Box } from 'rebass'
import { Redirect, Switch } from 'react-router'
import { Route } from 'react-router-dom'
import HomeView from './views/home'
import { Header } from './components/header'
import SigninView from './views/signin'
import BrowseView from './views/browse'
import ItemView from './views/item'
import ProfileView from './views/profile'
import authFallback from './components/route/authFallback'
import { Footer } from './components/footer'

const ProfileFallback = authFallback(ProfileView, () => <Redirect to={'/signin'} />)

class Routes extends Component {
  render(): ReactNode {
    return (
      <Box variant='body'>
        <Header />
        <Switch>
          <Route exact={true} key='route-home' path='/' component={HomeView} />

          {/*Items*/}
          <Route key='route-items' path='/items/:address([0-9a-fA-f]{35})' component={BrowseView} />
          <Route key='route-items' path='/items' component={BrowseView} />
          <Route key='route-item' path='/item/:assetId([0-9a-fA-f]{42,44})' component={ItemView} />

          {/*User*/}
          <Route key='route-signin' path='/signin' component={SigninView} />
          <Route key='route-profile' path='/profile' component={ProfileFallback} />

          {/*Not found*/}
          <Redirect from='*' to='/' />
        </Switch>
        <Footer />
      </Box>
    )
  }
}

export default Routes
