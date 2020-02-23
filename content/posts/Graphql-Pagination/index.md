---
title: 'GraphQL Pagination'
slug: graphql-pagination
date: 2020-02-23
language: english
category: Others
tags:
  - GraphQL
published: true
description: 'Here are some resources and short explanations about pagination with Graphql.'
---

# Pagination

# Graphql Connections

The `Graphql Connections` specification aims to provide an option for GraphQL clients to consistently handle pagination best practices(`cursor based pagination`) with support for related metadata via a GraphQL server.

In the response, the connection model provides a standard way of providing cursors, and a way of telling the client when more results are available.

```graphql
{
  user {
    id
    name
    friends(first: 10, after: "opaqueCursor") {
      edges {
        cursor
        node {
          id
          name
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
```

- Slicing is done with the first argument to friends. This asks for the connection to return 10 friends.
- Pagination is done with the after argument to friends. We passed in a cursor, so we asked for the server to return friends after that cursor.
- For each edge in the connection, we asked for a cursor. This cursor is an opaque string, and is precisely what we would pass to the after arg to paginate starting after this edge.
- We asked for hasNextPage; that will tell us if there are more edges available, or if we’ve reached the end of this connection.

# Graphql Relay

Relay is a JavaScript framework for building data-driven React applications powered by GraphQL, designed from the ground up to be easy to use, extensible and, most of all, performant. Relay accomplishes this with static queries and ahead-of-time code generation.

## Resources

- [Introduction to Relay · Relay](https://relay.dev/docs/en/introduction-to-relay)

# Types of pagination's implementations

There are a few ways to implement pagination.

- Cursor-based pagination
- limit/offset pagination

According to the Facebook Graph API documentation,

> Cursor-based pagination is the most efficient method of paging and should always be used where possible.

## Resources

- [GraphQL Cursor Connections Specification](http://facebook.github.io/relay/graphql/connections.htm)

# List of all the resources

## Pagination(GraphQL)

- [Cursor and Offset Pagination Techniques with Hasura GraphQL](https://hasura.io/blog/cursor-offset-pagination-with-hasura-graphql/)
- [Pagination \| GraphQL](https://graphql.org/learn/pagination/)
- [Understanding pagination: REST, GraphQL, and Relay - Apollo GraphQL](https://blog.apollographql.com/understanding-pagination-rest-graphql-and-relay-b10f835549e7)
- [GraphQL Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm)

## Pagination(graphql-ruby)

- [GraphQL pagination in Rails 2n it sp. z o.o.](https://www.2n.pl/blog/graphql-pagination-in-rails)
- [Offset based pagination in GraphQL-ruby - Blog by Abhay Nikam](https://www.abhaynikam.in/posts/offset-based-pagination-in-graphql-ruby/)
- [Cursor based Relay-style pagination in GraphQL-ruby - Blog by Abhay Nikam](https://www.abhaynikam.in/posts/cursor-based-relay-style-pagination-in-graphql/)
- [Generic page number / per-page pagination with GraphQL-Ruby · GitHub](https://gist.github.com/rmosolgo/da1dd95c297d8ed218a319ac83a05d91)
- [feat(ConnectionType) support bi-directional pagination by rmosolgo · Pull Request #960 · rmosolgo/graphql-ruby · GitHub](https://github.com/rmosolgo/graphql-ruby/pull/960)

## GraphQL Connections

- [Explaining GraphQL Connections - Apollo GraphQL](https://blog.apollographql.com/explaining-graphql-connections-c48b7c3d6976)
- [GraphQL Cursor Connections Specification](http://facebook.github.io/relay/graphql/connections.htm)
-

## GraphQL Relaly

- [Effortless Pagination with GraphQL and Relay? Really! - Artsy Engineering](https://artsy.github.io/blog/2020/01/21/graphql-relay-windowed-pagination/)
- [Bi-Directional Cursor Pagination with React.js, Relay, and GraphQL - By](https://hackernoon.com/bi-directional-cursor-pagination-with-react-js-relay-and-graphql-dc4ad6f9cbb0)
- [Effortless Pagination with GraphQL and Relay? Really! - Artsy Engineering](https://artsy.github.io/blog/2020/01/21/graphql-relay-windowed-pagination/)

## Pagination(Apollo)

- [Pagination - Client (React) - Apollo GraphQL Docs](https://www.apollographql.com/docs/react/data/pagination/)
- [Pagination with GraphQL, React & Relay Tutorial](https://www.howtographql.com/react-relay/8-pagination/)
