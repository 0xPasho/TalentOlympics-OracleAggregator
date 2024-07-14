# Oracle Aggregator

## The Problem

Design and develop an explorer or dashboard that fetches data from RPC and/or API sources. The UI should offer a clear and easy-to-use experience for a broad range of users.

Requirements:

- Data Fetching: Retrieve data from RPC and/or API endpoints.
- User Experience: Create an intuitive and user-friendly interface.
- Deployment: Ensure the explorer or dashboard can be tested and deployed on Cloudflare or Vercel.

## Demo video

```
https://www.loom.com/share/1871aca777d4494bb258be692b54abc4
```

## Proposed solution

This solution integrates Pyth Network and Chainlink to display a site with real-time prices of BTC, ETH, USDC, DAI, and AUD. It aggregates prices, generating an average each time the prices are retrieved, and includes a graph to visualize price trends. Additionally, it integrates CoinGecko to fetch and display the current price of Solana. This solution can be easily deployed on services like Vercel.

## Technologies

- NextJs App Routing(v14)
- Typescript
- Tailwind
- Zustand
- Solana/Web3
- Pyth Network
- Chainlink
- Pnpm

## Characteristics of this solution

- Fully typed solution
- Standardized(Atomic) components across the platform
- Dark/Light theme integration
- Modularized and well-organized code structure
- Accessibility compliance
- Fully responsive design
- Harmonious design
- Real-time data fetching
- Ready for future feature enhancements
- Easy integration with Vercel and similar platforms

## Install dependencies

```shell
pnpm install
```

## Configure environment variables

```shell
cp .env.example .env
vim .env
```

## Project Structure

```

/src
  env.mjs            - Contains all variables typed for platform
  constants.ts       - Any global variable for app, like APP_NAME
  /app               - Contains all routes, integrated using the new Next.js version
  /components/ui     - Houses all standardized atomic components
  /modules           - Each platform topic is organized into a specific folder
    /some-module
      /components    - Contains components specific to that topic
      /utils         - Contains utilities specific to that topic
      /data          - Contains data specific to that topic
      /store         - Contains state management for that topic
      /types         - Contains type definitions for that topic
```

Set the values of the environment variables in the .env file. Currently, there are no values, but this setup will allow for easy configuration in the future. Ensure integration with src/env.mjs for proper typing.

## Routes

The site is structured with a single main route, "/", which serves as the primary entry point. Additional visualizations, such as displaying graph content, are accessible by interacting with elements like tables within this main route.

## Running the project

To run the project in development mode, use:

```sh
pnpm dev
```

This runs the dev script specified in our package.json and will start a server that reloads the page as files are saved. The server typically runs at http://localhost:3000.

## Creating a production build

To create a production build, run:

```sh
pnpm build
```

This will generate an optimized build in the ./dist directory.

To serve the production build, use:

```sh
pnpm start
```

This will start a server to view the production build.
