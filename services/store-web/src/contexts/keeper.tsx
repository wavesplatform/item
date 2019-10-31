import React, { Component, ComponentType, createContext, PureComponent, ReactNode } from 'react'
import { getPublicState, initKeeper, IPublicState, IWavesKeeperOptions, setPublicState } from '../helpers/keeper'
import { withApollo, WithApolloClient } from '@apollo/react-hoc'
import { withCurrentUser, WithCurrentUserProps } from '../hooks/currentUser'
import { removeToken } from '../helpers/auth'

type TProps = WithCurrentUserProps

interface IKeeperState extends Partial<IPublicState> {
}

export interface IKeeperContext {
  api?: IWavesKeeperOptions,
  installed: boolean
  hasAccounts: boolean
  publicState: IKeeperState
  checkPublicState: () => void
}

const defaultKeeperContext: IKeeperContext = {
  installed: false,
  hasAccounts: false,
  publicState: {},
  checkPublicState: () => {
  },
}

/**
 * @deprecated keeper support will be stopped in the next development iteration
 */
export const KeeperContext = createContext<IKeeperContext>(defaultKeeperContext)

class KeeperProviderBase extends Component<WithApolloClient<TProps>, IKeeperContext> {
  state: IKeeperContext = defaultKeeperContext

  checkPublicState = async () => {
    const { account } = this.state.publicState
    const keeperApi = this.state.api

    if (!account && keeperApi) {
      try {
        const publicState = await keeperApi.publicState()
        setPublicState(publicState)
        this.setState({ publicState, hasAccounts: true })
      } catch (err) {
        if (err.code === 14) {
          this.setState({ hasAccounts: false })
        }
      }
    }
  }

  async componentDidMount() {
    try {
      const keeper = await initKeeper()
      if (!keeper) {
        return
      }

      console.info('Keeper initialized')
      this.setState({ api: keeper, installed: true })

      keeper.on('update', (publicState: IPublicState) => {
        const { me, client } = this.props
        const { account } = publicState

        // TODO: temp check changes
        if (account && this.state.publicState && this.state.publicState.account) {
          if (
            account.address === this.state.publicState.account.address &&
            account.balance === this.state.publicState.account.balance
          ) {
            return
          }
        }

        setPublicState(publicState)

        if (account && me && account.address !== me.address) {
          removeToken()
          client.writeData({ data: { me: null } })
        }

        this.setState({ publicState, hasAccounts: !!account })
      })

      // Get public state from local storage
      const publicState = getPublicState()
      publicState && this.setState({ publicState, hasAccounts: !!publicState.account })
    } catch (err) {
      // TODO: need replace to const
      if (err.code === 14) {
        this.setState({ hasAccounts: false })
      }

      console.warn(err)
    }
  }

  render() {
    const { publicState, hasAccounts, installed, api } = this.state
    return (
      <KeeperContext.Provider value={{
        api,
        publicState,
        checkPublicState: this.checkPublicState,
        hasAccounts,
        installed,
      }}>
        {this.props.children}
      </KeeperContext.Provider>
    )
  }
}

const KeeperProvider = withApollo(withCurrentUser(KeeperProviderBase))
const KeeperConsumer = KeeperContext.Consumer

const withKeeperContext = <P extends {}>(WrappedComponent: ComponentType<P & IKeeperContext>) =>
  class WithKeeperContext extends PureComponent<P> {
    render(): ReactNode {
      return (
        <KeeperConsumer>
          {(context: IKeeperContext) => <WrappedComponent {...this.props} {...context} />}
        </KeeperConsumer>
      )
    }
  }

export {
  KeeperProvider,
  KeeperConsumer,
  withKeeperContext,
}
