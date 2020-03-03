---
title: "GraphQL Basics"
slug: graphql-basics
date: 2018-12-17
language: english
category: Others
tags:
  - GraphQL
published: true
description: "One of the projects that I involved with at work used GraphQl and I spent a decent amount of time learning the basic concept of the tool and how to actually use it in applications. I am writing this post so that I can retain my knowledge of the technology and use it in my personal projects in the future.
This post will mainly focus on the basic concept of `GraphQL` and how to use it on the front-end of your application."
---

# Introduction

One of the projects that I was involved in at work used GraphQl and I spent a decent amount of time learning the basic concept of it and how to actually use it in web-applications.  
I am writing this post to retain and solidify my knowledge about the technology.  
This post will mainly focus on the basic concept of `GraphQL` and how to utilize it on the front-end of web-applications.

## Basic concept

GraphQL allows the client to specify exactly what it needs, avoiding over‐fetching and under‐fetching of data.
GraphQL has two types of operations which are `Query` and `Mutation`.

## Query

```
query {
  client(id:1) {
    id
    name
  }
}
```

In the code above, `client` is the query operation.  
`(id: 1)` contains arguments that we want to be passed to the query.

The query above returns a response like below.

```
{
  "data": {
    "client": {
      "id": "1",
      "name": "Steve Jobs"
    }
  }
}
```

## GraphQL is just a query language specification

GraphQL is just a query language specification. Meaning, all the operations, arguments tha may be passed, and all the fields that may be used in the selection set have to be defined in **your GraphQL server**.

One of the principles that drives GraphQL specification is `strong-typing`.

Every GraphQL server defines an application‐specific `type` system.(everything has a type)  
`Queries` are executed within the context of that type system.

That means that your selection set can query fields of Scalar type which are primitive types like `Int`, `Float`, `String`, `Boolean` and `ID`.

## Variables

If you want to reduce repetitions on our query statements, you can use `variables`.  
For instace, both `(id:1)` and `(client_id:1)` represent the same thing in the code below.

```
{
  client(id:1) {
    name
  }

  products(client_id:1) {
    price
    quontity
    parts {
      name
      price
    }
  }
}
```

You can reduce the repetition by using the variables like the code below.

```
query ($clientId: Int!) {
  client(id: $clientId) {
    name
  }
  products(client_id: $clientId) {
    price
    quontity
    parts {
      name
      price
    }
  }
}
```

You can also specify a default value for a variable.

```
query ($clientId: Int! = "1") {
  client(id: $clientId) {
    name
  }
}
```

## Mutations

GraphQL uses `mutations` to create, update and delete data.

```
mutation {
  create_client(
    name: "Jack"
    age: "24"
  ){
    id
    name
    age
  }
}
```

We passed the arguments we wanted the new record to be saved with and, finally, our selection set is defining which fields we want to return after the record is created.
The query above would create a record like the code below.

```
{
  "data": {
    "create_client": {
      "id": "1",
      "name": "Jack",
      "age": "24"
    }
  }
}
```

You can update data like the query below.

```
mutation {
  update_client(
    id: 1
    age: "26"
  ){
    id
    name
    age
  }
}
```

The response would be like this.

```
{
  "data": {
    "create_client": {
      "id": "1",
      "name": "Jack",
      "age": "25"
    }
  }
}
```

If you want to delete the data, you can do so like the code below.

```
mutation {
  destroy_client (
    id: 1
  ){
    name
    age
  }
}
```

## Introspection

A great feature of GraphQL is the ability to query its own schema, allowing you to view many of its details like which query and mutation operations are available, which arguments they accept and even which available fields we can query.

For `queries`.

```
{
  __schema {
    queryType {
      name
      fields {
        name
      }
    }
  }
}
```

For `mutations`.

```
{
  __schema {
    mutationType {
      name
      fields {
        name
      }
    }
  }
}
```

## References

- [OK GROW! - GraphQL Basics](https://www.okgrow.com/posts/graphql-basics)
