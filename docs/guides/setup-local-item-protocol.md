# Set up a Local Item Protocol
As a developer, you can set up a local item protocol locally by following this guide.
## Install all required prerequisites
1.  [Download Node.js](https://nodejs.org/en/download/)  source code or a pre-built installer (node version must be >= 8.10).
2.  [Install Docker](https://docs.docker.com/v17.09/engine/installation/) on your system.
3.  [Install Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) on your system.
## Clone the Item Protocol GitHub Repository
After installing the prerequisites, Clone the  [item protocol repository](https://github.com/wavesplatform/item)  by executing this command:
```
git clone https://github.com/wavesplatform/item
```
## Declare default environment variables
After cloning the item protocol repository, you will need to create two files into the project root:
1.  The  **.env**  file.
2.  The  **.env.secrets**  file.

The **.env**  file must contain the following variables:
```
DEBUG=observer,combine,writer,api,media-preserver
PRISMA_ENDPOINT=http://prisma:4466
REDIS_URL=redis://redis:6379
CHAIN_ID=T
DAPP_ADDRESS_STORE=3MrDcz4LFFjPhXdtu7YCqFSnHc3pD1tcWLa
```
Where:
| Environment variable | Description | Default value |
| -- | -- | -- |
| DEBUG | To display logs from the micro-services | observer,combine,writer,api,media-preserver |
| PRISMA_ENDPOINT | To match the URL of a running Prisma server | http://prisma:4466 |
| REDIS_URL | To connect to Redis server at the localhost:6379 | redis://redis:6379 |
| CHAIN_ID | To connect to the [blockchain network](https://confluence.wavesplatform.com/display/MAIN/Blockchain+Network) | T |
| DAPP_ADDRESS_STORE | The DApp address of store contract based on the item protocol | 3MrDcz4LFFjPhXdtu7YCqFSnHc3pD1tcWLa |


The  **.env.secrets**  file can be empty or filled up with the following variables:
```
S3_TOKEN=***
S3_SECRET=***
BUCKET_NAME=***
ALGOLIA_APP_ID=***
ALGOLIA_API_SECRET=***
JWT_SECRET=***
```
## Install dependencies globally
Install [Prisma services](https://www.prisma.io/docs/1.1/tutorials/prisma-basics/getting-started-ouzia3ahqu#installing-the-prisma-cli)  by executing the following command ([Lerna](https://lerna.js.org/)  is used to optimize the management of multiple packages):
```
yarn global add lerna prisma
```
## Start and deploy the services
Install  [bootstrap](https://getbootstrap.com/docs/4.2/getting-started/download/#yarn) by executing the following command
```
yarn add bootstrap
```
Start the containers for the prisma services in the background and leave them running by executing this command:
```
docker-compose up -d prisma
```
[Deploy Prisma service](https://www.prisma.io/docs/prisma-cli-and-configuration/cli-command-reference/prisma-deploy-xcv9/#$-prisma-deploy) by executing this command:
```
yarn prisma:deploy
```
Start the linked services and aggregates the output of each docker container by executing this command:
```
docker-compose up
```
## Run the Item Store locally
The last step is to run the Item store, you can achieve that by executing this command:
```
yarn build:packages
yarn start:web
```
Congrats, you have successfully set up a local item protocol. You can now view **@item-protocol/store-web** in the browse: `http://localhost:3000/`