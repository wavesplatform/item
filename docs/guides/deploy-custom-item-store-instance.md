# Deploy Custom Item Store instance

You can use the Item instance as your own market but with the support of **Item Store Api**.

## Clone the Item Protocol GitHub Repository

After installing the prerequisites, Clone the [item protocol repository](https://github.com/wavesplatform/item) by running the following command:

```
git clone https://github.com/wavesplatform/item
```

## Host your website and web service on ZEIT

Sign up by creating an account on [ZEIT](https://zeit.co/docs).

To deploy with **ZEIT Now**, you will need to install [Now CLI](https://zeit.co/download).

Run the following command from your terminal:

```
npm i -g now
```
To login run:

```
now login
```

To deploy your app:

```
now
```

## Configure now.json file

After cloning the item repository and installing the [Now CLI](https://zeit.co/download), you can configure the **now.json** file depending on your preferable Customization (now.json is in the directory (**item/services/store-web/now.json**). For example, you can change the Waves blockchain network type from testnet to mainnet by modifing the **CHAID_ID**:

* For testnet, "CHAIN_ID": "T"
* For mainnet, "CHAIN_ID": "W"

```
{
  "version": 2,
  "name": "item-store",
  "build": {
    "env": {
      "REACT_APP_NODE_ENV": "production",
      "REACT_APP_GRAPHQL_ENDPOINT": "/api/graphql",
      "REACT_APP_DOCS_URL": "https://docs.item.market",
      "REACT_APP_DISCORD_URL": "https://discord.gg/ArJm2gm",
      "CHAIN_ID": "T",
      "DAPP_ADDRESS_STORE": "3MrDcz4LFFjPhXdtu7YCqFSnHc3pD1tcWLa"
    }
  },
  "routes": [
    {
      "src": "/api",
      "dest": "https://api.item.sh"
    },
    {
      "src": "/api/(.*)",
      "dest": "https://api.item.sh/$1"
    }
  ]
}
```

## Deploy Item Instance

The last step is easy, Move to the item project directory and then deploy the custom **Item Store** instance by running the following command:

```
now
```
