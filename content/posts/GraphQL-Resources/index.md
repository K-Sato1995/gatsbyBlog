---
title: 'GraphQL Resources '
slug: graphql-resources
date: 2019-10-12
language: english
category: Resources
tags:
  - graphql
published: true
description: 'Some resources and tips for understanding graphql better.'
---

# Enum type

- [GraphalAPI](https://github.com/K-Sato1995/GraphqlApi/blob/master/app/graphql/types/post_status.rb)

# Union Type

A union type is a set of object types that may appear in the same spot.
That means the spot only returns one object, in this case, either `AudioClilp` or `VideoClip`.

```ruby
module Types
  class AudioClipType < Types::BaseObject
    field :id, Int, null: false
    field :duration, Int, null: false
  end
end

module Types
  class MovieClipType < Types::BaseObject
    field :id, Int, null: false
    field :previewURL, String, null: false
    field :resolution, Int, null: false
  end
end

module Types
  class MediaItemType < Types::BaseUnion
    possible_types Types::AudioClipType, Types::MovieClipType

    def self.resolve_type(object, context)
      if object.is_a?(AudioClip)
        Types::AudioClipType
      else
        Types::MovieClipType
      end
    end
  end
end

module Types
  class PostType < Types::BaseObject
    description 'Post'
    field :id, Int, null: false
    field :media_item, Types::MediaItemType, null: true

    def media_item
      return object.audio_clip if object.audio_clip

      object.video_clip
    end
  end
end
```

- [GraphQL - Object Identification Hooks](https://graphql-ruby.org/schema/definition.html#object-identification-hooks)
- [Youtube video about graphql Union Type](https://www.youtube.com/watch?v=wBrSXBpAd10)
- [Unions and interfaces - Apollo Server - Apollo GraphQL Docs](https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/)
- [GraphQL: Union vs. Interface - Artsy Engineering](https://artsy.github.io/blog/2019/01/14/graphql-union-vs-interface/)

# Interface

Interfaces are a good choice whenever a set of objects are used interchangeably, and they have several significant fields in common. When they don’t have fields in common, use a Union instead.

```graphql
interface Customer {
  name: String!
  outstandingBalance: Int!
}

type Company implements Customer {
  employees: [Individual!]!
  name: String!
  outstandingBalance: Int!
}

type Individual implements Customer {
  company: Company
  name: String!
  outstandingBalance: Int!
}
```

- [GraphQL: Union vs. Interface - Artsy Engineering](https://artsy.github.io/blog/2019/01/14/graphql-union-vs-interface/)

# Fragments

A GraphQL fragment is a shared piece of query logic.

```
fragment NameParts on Person {
  firstName
  lastName
}

query GetPerson {
  people(id: "7") {
    ...NameParts
    avatar(size: LARGE)
  }
}
```

- [Using fragments - Client (React) - Apollo GraphQL Docs](https://www.apollographql.com/docs/react/data/fragments/)

# Connection_type

Connection will help you paginate through the list of comments connected to the post with 4 default arguments (first, last, after and before) in the query, whereas field here would return a basic list of CommentType.

- [Difference between field and connection in Graphql ruby? - Stack Overflow](https://stackoverflow.com/questions/44601890/difference-between-field-and-connection-in-graphql-ruby)

# Relays

A Facebook page contains several elements and React components, which have different data requirements. GraphQL allows to list all the data we need to generate a page in a single top level query. So we save network from sending multiple requests by querying the data we need in a single round-trip.

- [GraphQL and Relay: what are they and why do they matter? - By](https://hackernoon.com/graphql-and-relay-what-are-they-and-why-do-they-matter-d8dfcc3ce2ac)
