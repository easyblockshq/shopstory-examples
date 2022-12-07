This is a [Shopstory](https://shopstory.app/) demo using next.js and Contentful.

## Getting Started

Before you start please make sure you have 2 tokens from Shopstory team:
1. npm token
2. Shopstory access token

If you don't have them, please contact Shopstory team: [simon@shopstory.app](simon@shopstory.app)

### Add npm token

Shopstory package is private (it's gonna change soon) so in order to be able to access it please activate the npm token you got from Shopstory team. Usually it requires adding new line to your `~/.npmrc` file:
```
//registry.npmjs.org/:_authToken={YOUR_NPM_TOKEN}
```

### Run `npm install`

```bash
npm run dev
# or
yarn dev
```

### Install Shopstory in your Contentful 

Follow the steps from Shopstory docs (https://docs.shopstory.app) to install Shopstory app in the Contentful.

### Add `.env` file and populate it with correct environment variables

```
NEXT_PUBLIC_CONTENTFUL_SPACE="{SPACE_ID}"
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT="{ENVIRONMENT}}"
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN="{ACCESS_TOKEN}}"
NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN="{PREVIEW_ACCESS_TOKEN}"
```

### Run the development server

Run 

```
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Go to [http://localhost:3000/shopstory-canvas](http://localhost:3000/shopstory-canvas) to enter the Shopstory playground mode.

