# 🔒 Password Vault

![Version](https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D16.0.0-blue.svg)

> A password vault made with Next.js and Fastify. Just for learning purposes not
> for actual use.

## ✨ Demo

[![Password Vault Homepage](../media/password-vault-desktop.webp?raw=true)](https://password-vault-client.vercel.app/)

### Prerequisites

- node >=22.0.0

### Apps and Packages

- `client`: a [Next.js](https://nextjs.org) app with
  [ChakraUI](https://chakra-ui.com/), and
  [React Query](https://tanstack.com/query/latest).
- `server`: a [Fastify](https://www.fastify.io) server with
  [MongoDB](https://www.mongodb.com/) and [Vite](https://vitejs.dev/).
- `ui`: a stub React component library to share components.
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next`
  and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo.

### Install

```sh
pnpm install
```

### Build

To build all apps and packages, run the following command:

```sh
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```sh
pnpm dev
```

### Production

```sh
pnpm start
```

### Run tests

```sh
pnpm test
```

### Run e2e tests

For the first time, install Playwright browsers:

```sh
pnpm exec playwright install
```

Then:

```sh
pnpm test:e2e
```

### Lint

```sh
pnpm lint
```

### To [install package](https://turbo.build/repo/docs/handbook/package-installation#addingremovingupgrading-packages) in workspace (`client` | `server`)

```sh
pnpm add <package> --filter=<workspace>
```

### To upgrade dependencies

Check outdated deps:

```sh
pnpm outdated
```

Select which deps to upgrade:

```sh
pnpm update --interactive --latest
```

## Deployment

### Client

1. Link `github repo` to [Vercel](https://vercel.com/).
2. Set `FRAMEWORK PRESET` to Next.js.
3. Set `ROOT DIRECTORY` as `apps/client`.
4. Override `BUILD COMMAND` with
   [command](https://turbo.build/repo/docs/core-concepts/monorepos/filtering#include-dependencies-of-matched-workspaces):

```sh
cd ../.. && turbo run build --filter={/apps/client}...
```

or

```sh
cd ../.. && npx turbo run build --scope=client --include-dependencies --no-deps
```

but the second one is apparently deprecated.

5. Add `client environment variables`.

### Server

1. Link github repo to [Render](https://render.com/).
2. Set `ROOT DIRECTORY` as `apps/server`.
3. Override `BUILD COMMAND` with
   [command](https://turbo.build/repo/docs/core-concepts/monorepos/filtering#include-dependencies-of-matched-workspaces):

```sh
cd ../.. && turbo run build --filter={/apps/server}...
```

or

```sh
cd ../.. && npx turbo run build --scope=server --include-dependencies --no-deps
```

4. Add `HEALTH CHECK PATH` to `/ping`.
5. Add `server environment variables`.
6. Add `NODE_VERSION` with desired version (node >=22.0.0) to environment
   variables. Otherwise it defaults to `14.17.5`.
7. Add secret/cert files with new
   [generated private/public keys](https://rietta.com/blog/openssl-generating-rsa-key-from-command/).

## 📖 Lessons Learned

- Working with Hashing and Encrytion.
- [Generating](https://rietta.com/blog/openssl-generating-rsa-key-from-command/)
  and handling private/public keys.
- How to setup and use a monorepo with turborepo.
- How to make and test a fastify server.
- Testing with Playwright
- Using ChakraUI with a custom theme.
- Using react-query within Next.js with error handling and custom toasts.
- Client deployment to [Vercel](https://vercel.com/) from turborepo.
- Server deployment to [Render](https://render.com/) from turborepo.
- Using domains in the
  [Public Suffixes List](https://github.com/publicsuffix/list) (ex.
  herokuapp.com, onrender.com, vercel.app.)
  [doesn't let you set cookies](https://devcenter.heroku.com/articles/cookies-and-herokuapp-com).
  This can be fixed using a custom domain.

## ✏️ TODO

- ~~Add more tests~~
- Add more tests for testing vaults
- ~~Add demo image for README.md~~
- Add 404 page
- Add github actions for deployments
- Improve server side validations

## Acknowledgements

- [TomDoesTech](https://www.youtube.com/watch?v=wHVzfjrD1Xg)
