---
title: 'Create React app with GraphQL + Apollo + Typescript'
slug: create-react-app-with-graphql-apollo-typescript
date: 2019-07-20
language: english
tags:
  - GraphQL
  - Apollo
  - Typescript
published: true
description: 'A quick demonstration of how to create a react app in Typescript with GraphQL + Apollo + Typescript + GraphQLCodeGen.'
---

# Installation

## Run create-react-app

```bash
$ npx create-react-app my-app --template typescript
```

## Install Apollo

```bash
$ npm install apollo-boost react-apollo graphql react-apollo-hooks
```

- `apollo-boost`: Package containing everything you need to set up Apollo Client
- `react-apollo`: View layer integration for React
- `graphql`: Also parses your GraphQL queries

## Install and Run Graphql Codegen

```
$ npm add -D graphql @graphql-codegen/cli
$ npx gql-gen init
```

Might have to download some extra plugins.

```
$ npm i graphql-codegen-typescript-template
$ npm i graphql-codegen-typescript-operations
$ npm i graphql-codegen/introspection
```

`codegen.yml` looks like this.

```yml
overwrite: true
schema:
  - http://localhost:3000/graphql:
documents:
  - './graphql/queries/*.graphql'
  - './graphql/mutations/*.graphql'
generates:
  ./src/generated/graphql.ts:
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'
    config:
      withComponent: false
      withHOC: false
      withHooks: true
  ./graphql/schema.json:
    plugins:
      - 'introspection'
```

Run the command below

```bash
$ npm run generate
```

If it is causing the error below:

```
FetchError: invalid json response body at http://localhost:3000/graphql reason: Unexpected token < in JSON at position 0
```

Try adding the below line in your application_controller.rb

```ruby
# controllers/application_controller.rb
skip_before_action :verify_authenticity_token
```

### Query, Mutation Functions

You have to create `client/graphql/queries/` and `client/graphql/mutations` in your hand if you want to generate functions that send specific queries and mutations.

- [ruby on rails - ActionController::InvalidAuthenticityToken - Stack Overflow](https://stackoverflow.com/questions/3364492/actioncontrollerinvalidauthenticitytoken)

# Implementation

## Create a client

Create a client in `middleware/index.ts`.

```tsx
// middleware/index.ts
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
})
```

### Wrap your app with ApolloClient

```tsx
// client/src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { client } from './middleware'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />/
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
serviceWorker.unregister()
```

## Add Queries

Create `client/graphql/queries/issues.graphql` to create functions that send the specified queries to the server by running `npm run generate`.

```
# client/graphql/queries/issues.graphql
query issues {
  issues {
    title
    description
    status
    priority
    deadline
  }
}
```

and run

```
$ npm run generate
```

## Use generated functions

```tsx
import React from 'react'
import { useIssuesQuery } from '../../generated/graphql'
interface IssueProps {
  title: string
}

const Issue = ({ title }: IssueProps) => {
  const { data, error, loading } = useIssuesQuery()

  if (loading) return <div>Fetching</div>
  if (error) return <div>Error</div>
  if (!data) return <div>Data not found</div>

  return (
    <div>
      {console.log(data)}
      <h1>{title}</h1>
    </div>
  )
}

export default Issue
```

# References

- [Get started - Apollo Docs](https://www.apollographql.com/docs/react/essentials/get-started/)
- [GraphQL Code Generator · Generate code from your GraphQL schema with a single function call](https://graphql-code-generator.com/)
- [client_ts/codegen.yml at master · K-Sato1995/client_ts · GitHub](https://github.com/K-Sato1995/client_ts/blob/master/codegen.yml)
