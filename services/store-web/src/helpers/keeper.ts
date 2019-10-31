import { Observable, timer } from 'rxjs'
import { delay, map, retryWhen, take } from 'rxjs/operators'

declare const WavesKeeper: IWavesKeeperOptions

export type IWavesNetworkCode = 'W' | 'T'

export interface IPublicState {
  initialized: boolean
  locked?: boolean
  account?: {
    address: string
    balance: { available: string, leasedOut: string }
    name: string
    networkCode: string
    publicKey: string
    type: string
  }
  network?: {
    code: IWavesNetworkCode,
    matcher: string
    server: string
  }
}

export interface IWavesKeeperAuthData {
  data: string
  name?: string
  referrer?: string
  icon?: string
}

export interface IWavesKeeperAuthResult {
  address: string
  data: string
  host: string
  prefix: string
  publicKey: string
  signature: string
}

export interface IWavesKeeperOptions {
  auth: (authData: IWavesKeeperAuthData) => Promise<IWavesKeeperAuthResult>
  publicState: () => Promise<IPublicState>
  signAndPublishOrder: (order: { type: number, data: any }) => Promise<string>
  signAndPublishTransaction: (transaction: { type: number, data: any }) => Promise<string>
  on: (ev: 'update', cb: (state: IPublicState) => void) => void
  initialPromise: Promise<IWavesKeeperOptions>
}

const KEEPER_NOT_FOUND = 'No Keeper detected'

export const initKeeper = async (): Promise<IWavesKeeperOptions | undefined> => {
  return new Promise(async (resolve, reject) => {
    const proxy = getKeeperProxy()
    if (!proxy) {
      waitKeeperProxy()
        .subscribe(
          async val => {
            const keeper = await getKeeperFromProxy(val!)
            resolve(keeper)
          },
          err => {
            reject(err)
          },
          () => {
            if (!getKeeperProxy()) {
              reject(KEEPER_NOT_FOUND)
            }
          }
        )
    } else {
      const keeper = await getKeeperFromProxy(proxy)
      resolve(keeper)
    }
  })
}

export const getPublicState = (): IPublicState => {
  const storageItem = localStorage.getItem('publicState')
  return storageItem && JSON.parse(storageItem)
}

export const setPublicState = (publicState: IPublicState | null): void => {
  localStorage.setItem('publicState', JSON.stringify(publicState))
}

const getKeeperProxy = (): IWavesKeeperOptions | null => {
  if (typeof WavesKeeper === 'undefined' || !WavesKeeper || !WavesKeeper.publicState) {
    return null
  } else {
    return WavesKeeper as IWavesKeeperOptions
  }
}

const waitKeeperProxy = (): Observable<IWavesKeeperOptions | undefined> => {
  return timer(200)
    .pipe(
      map(() => {
        const proxy = getKeeperProxy()
        if (!proxy) {
          throw new Error(KEEPER_NOT_FOUND)
        }
        return proxy
      }),
      retryWhen(
        errs => errs.pipe(
          delay(200),
          take(4)
        )
      )
    )
}

const getKeeperFromProxy = async (proxy: IWavesKeeperOptions): Promise<IWavesKeeperOptions> => {
  return new Promise((resolve, reject) => {
    proxy.initialPromise
      .then((keeper: IWavesKeeperOptions) => {
        resolve(keeper)
      })
  })
}
