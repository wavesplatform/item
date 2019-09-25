import React, { Component, Fragment, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import Routes from './routes'
import { baseTheme, globalStyle } from '@item/ui'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

class App extends Component {
  render(): ReactNode {
    return (
      <ThemeProvider theme={baseTheme}>
        <Fragment>
          <Global styles={globalStyle}/>
          <Routes/>
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
