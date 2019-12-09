import React, { Component, Fragment, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import Routes from './routes'
import { globalStyle } from '@item-protocol/ui'
import { Global } from '@emotion/core'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import { ApolloLink, from } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from './config'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { theme } from './styles/theme'
import { KeeperProvider } from './contexts/keeper'
import { getToken } from './helpers/auth'
import { DiscordWidget } from './components/widgets/discord'

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }: Record<string, any>) => {
    // const user = authHelper.getUser()
    const token = getToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  //@ts-ignore
  return forward(operation)
})

const httpLink = createUploadLink({
  uri: config.apiEndpoint,
})

const cache = new InMemoryCache()
const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache,
})

cache.writeData({
  data: {},
})

class App extends Component {
  render(): ReactNode {
    console.info(`API endpoint: ${config.apiEndpoint}`)

    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Global styles={globalStyle}/>
          <ApolloProvider client={client}>
            <KeeperProvider>
              <Router>
                <Routes/>
              </Router>
              <DiscordWidget url={config.discordUrl}>
                Talk to us on
                <br />
                Discord
              </DiscordWidget>
            </KeeperProvider>
          </ApolloProvider>
        </Fragment>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
