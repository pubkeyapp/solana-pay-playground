# SolanaPay Playground

## Getting Started

Clone the repository and install the dependencies:

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or higher)
- [PNPM](https://pnpm.io/) (v8 or higher)
- [Git](https://git-scm.com/)

> [!TIP]
> If you don't have PNPM installed, you can install it using `corepack`:
>
> ```sh
> corepack enable
> corepack prepare pnpm@8 --activate
> ```

### Installation

1. Clone the repository:

```sh
git clone https://github.com/pubkeyapp/solana-pay-playground
cd solana-pay-playground
pnpm install
```

### Development

Start the API

```sh
pnpm dev:api
```

Start the web app

```sh
pnpm dev:web
```

Solana Pay requires https to work, so in development you need something like [ngrok](https://ngrok.com/) to expose your local server to the internet.

Be sure to update the `allowedHosts` property in `web/project.json` to allow the ngrok URL.
