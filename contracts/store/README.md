## Store Contract

This package contains implementations of store contract based on [item protocol](https://github.com/wavesplatform/item). Addresses of the deployed contracts can be found in the [deploys](./deploys.json) file within this package.

### Features

*   Sell any item based on [item protocol](https://github.com/wavesplatform/item)
*   Buy an item for sale
*   Cancel sale

## Installation

**Install**

```bash
yarn add @item/contracts-store
```

## Usage

```typescript
import { sell } from '@item/contracts-store'

const seed = 'your seed'

export default async () => {
  const assetId = '2iKLS4iYPU47MtmJYJji5iRPwPiRh1inDMNcX4p7t69W'
  const req = sell(assetId, 10, 'WAVES', 25)
  await req.broadcast(seed)
} 
```

## Contributing

We strongly recommend that the community help us make improvements and determine the future direction of the protocol. To report bugs within this package, please create an issue in this repository.

Please read our [contribution guidelines](../../CONTRIBUTING.md) before getting started.

### Install Dependencies

```bash
yarn install
```

### Build

To build this package, run the following from the monorepo root directory:

```bash
yarn build --scope @item/contracts-store
```

### Run Tests

```bash
yarn test:contract
```

#### About testing

By default, contracts are tested on a private node. To start a node and all dependent services, run the command from the monorepo root directory:

```bash
docker-compose -f docker-compose.devnet.yml up
```

Or you can run tests on testnet, you need to setup the [configuration](./surfboard.config.json) and run:

```bash
yarn test:contract --env=testnet
```
