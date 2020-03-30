---
title: 'GraphQL Ruby(Class-based API)'
slug: graphql-ruby-class-based-api
date: 2018-12-18
language: english
category: Others
tags:
  - GraphQL
  - Tutorial
published: true
description: 'This post mainly focuses on how to use GraphQL on the back-end(specifically Ruby on Rails). '
---

# Introduction

In the [previous post](<[K-Blog](https://k-blog0130.herokuapp.com/en/posts/64)>) about `GraphQL`, I focused on how to utilize `GraphQl` on the front-side of a web application.  
 In this post, I'll mainly talk about how to use it on your back-end(in this case Ruby on Rails).

# Basic concepts

Let's cover some of the very fundamental concepts of `GraphQL`

## Schema

The schema defines the server’s API.  
It provides the point of contact between the server and the client. You have to create one for queries and another for mutations.

## Type

The shape of everything composing the schema.  
Each type has a set of `fields` which defines the data and the types of each field.

## Resolver

Resolvers are `functions` that the GraphQL server uses to execute fetching(`queries`) or mutating(`mutations`) the data.  
Each field of your GraphQL types needs a corresponding resolver function.

For more information about the basic concepts of GraphQL, Check the [official guide](https://graphql.org/learn/queries/).

# GraphQL with Ruby on Rails

In this section, I'll walk you through how to use GraphQL in your rails applications using [GraphQL Ruby](http://graphql-ruby.org/).  
We will create a very simple api which users can get, create, update and delete posts.  
You can check the source code [here](https://github.com/K-Sato1995/GraphqlApi)

## Installation

Simply, add `graphql` and `graphql-rail` to your `Gemfile`.

```ruby
# Gemfile
gem 'graphql'
gem 'graphiql-rails'
```

If you want to use graphiql-rails for your api only rails application, add the following line to your `config/application.rb`.

```ruby
# config/application.rb
require "sprockets/railtie"
```

After adding the gems and the line, run the commands below. The second command will create the `app/graphql` folder.  
All the graphql related files will be held under this directory.

```console
$ bundle install
$ rails generate graphql:install
```

## Queries

In `GraphQL`, `Queries` are used to fetch data and `Mutations` are used to create, update and delete data.
In this section, we will focus on the `queries`.

Create a model `post` and run `rake db:migrate`.

```console
$ rails g model Post title:string description:text
$ rake db:migrate
```

Create some data on `rails console`.

```console
$ rails c
$ Post.create(title: "What is Ruby?", description:"Ruby is a programming language")
$ Post.create(title: "How to learn Ruby", description:"Read some books brah")
```

Define the `GraphQL Type` for `Post` in `app/graphql/types/post_type.rb`.
If you run the command below, it will automatically create `Post Type` for you.

```
$ rails g graphql:object Post id:ID! title:String! description:String!
```

The command above will generate this.

```ruby
# app/graphql/types/post_type.rb
module Types
  class PostType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: false
  end
end
```

If you want to know the details about `Class-based` system, read [official graphql-ruby document.](http://graphql-ruby.org/schema/class_based_api.html#classes).

## Query Resolver

The type is now defined, but the server still doesn’t know how to handle it. We use `resolvers` for executing the `queries`.  
All GraphQL queries start from a root type called `Query`. When you previously ran `rails g graphql:install`, it created the root query type in `app/graphql/types/query_type.rb` for you.  
With the code below, you can retrieve all posts and each specific post using its unique id.

```ruby
# app/graphql/types/query_type.rb
module Types
  class QueryType < Types::BaseObject
    field :posts, [Types::PostType], null: false
    def posts
      Post.all
    end

    field :post, Types::PostType, null: false do
      argument :id, Int, required: false
    end
    def post(id:)
      Post.find(id)
    end
  end
end
```

### Testing with GraphiQL

Add the following code to your `routes.rb`.

```ruby
Rails.application.routes.draw do
  post '/graphql', to: 'graphql#execute'

  if Rails.env.development?
    # add the url of your end-point to graphql_path.
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
end
```

You can test your progress using `http://localhost:3000/graphiql` after you start your rails server with `rails s`.  
If you want to get all the posts, send the query below.

```
# Query for posts
{
 posts {
   id
   title
   description
 }
}

################ Result #####################
{
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "title1",
        "description": "description1"
      },
      {
        "id": 2,
        "title": "title2",
        "description": "description2"
      },
      {
        "id": 3,
        "title": "title3",
        "description": "description3"
      },
     ]
   }
}
```

If you want to get a specific post, send the query below.

```
# Query for a post
{
 post(id:1) {
   id
   title
   description
 }
}

################ Result #####################
{
  "data": {
    "post": {
      "id": 1,
      "title": "title1",
      "description": "description1"
    }
  }
}

```

## Mutations

All GraphQL mutations start from a root type called `Mutation`.
This type is auto generated in `app/graphql/types/mutation_type.rb`.

```ruby
module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
```

### Mutation Create

Run the command below to generate a mutation for creating a post.

```console
$ rails g graphql:mutation CreatePost
```

The command above will do the folliwing two things.

- (1) Create `graphql/mutations/create_post.rb`.
- (2) Add `field :createPost, mutation: Mutations::CreatePost` to `graphql/types/mutations_type.rb`.

```ruby
# (1) Create graphql/mutations/create_post.rb.
# graphql/mutations/create_post.rb
module Mutations
  class CreatePost < GraphQL::Schema::RelayClassicMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    # TODO: define arguments
    # argument :name, String, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
  end
end
```

```ruby
# (2) Add  field :createPost, mutation: Mutations::CreatePost to graphql/types/mutations_type.rb.
# app/graphql/types/mutation_type.rb
module Types
  class MutationType < Types::BaseObject
    field :createPost, mutation: Mutations::CreatePost
  end
end
```

**This part is optional!!!**  
You can create `graphql/mutations/base_mutation.rb` and make `graphql/mutations/create_post.rb` inherit from it.

```ruby
# graphql/mutations/base_mutation.rb
class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
end
```

```ruby
# graphql/mutations/create_post.rb
module Mutations
  class CreatePost < Mutations::BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    # TODO: define arguments
    # argument :name, String, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
  end
end
```

After making `create_post.rb` inherit from `Mutations::BaseMutation`, let's follow the `TODOs` in `create_post.rb` and modify the file like the code below.
(If you did not follow the optional part, `create_post.rb` still inherits from `GraphQL::Schema::RelayClassicMutation` in your file.)

```ruby
module Mutations
  class CreatePost < Mutations::BaseMutation
    graphql_name 'CreatePost'

    field :post, Types::PostType, null: true
    field :result, Boolean, null: true

    argument :title, String, required: false
    argument :description, String, required: false

    def resolve(**args)
      post = Post.create(title: args[:title], description: args[:description])
      {
        post: post,
        result: post.errors.blank?
      }
    end
  end
end
```

That's it! Now you are ready to create a post!.

### Testing with GraphiQL

You can test your progress using [GraphQL](http://localhost:3000/graphiql) after you start your rails server.
Make a request like the code below and check the result.

```
mutation {
  createPost(
    input:{
      title: "title1"
      description: "description1"
    }
  ){
    post {
      id
      title
      description
    }
  }
}

################ Result #####################
{
  "data": {
    "createPost": {
      "post": {
        "id": 15,
        "title": "title1",
        "description": "description1"
      }
    }
  }
}
```

### Mutation Update

Run the code below to generate a mutation for updating a post.

```console
$ rails g graphql:mutation UpdatePost
```

Modify `/graphql/mutations/update_post.rb` like the code below. It is very similar to the code in `/graphql/mutations/create_post.rb`. The only significant difference is that it requires `id` as an argument to update a specific post.

```ruby
module Mutations
  class UpdatePost < Mutations::BaseMutation
    graphql_name 'UpdatePost'

    field :post, Types::PostType, null: true
    field :result, Boolean, null: true

    argument :id, ID, required: true
    argument :title, String, required: false
    argument :description, String, required: false

    def resolve(**args)
      post = Post.find(args[:id])
      post.update(title: args[:title], description: args[:description])
      {
        post: post,
        result: post.errors.blank?
      }
    end
  end
end
```

### Testing with GraphiQL

Make a request like the code below and check the result.

```
mutation {
  updatePost(
    input:{
      id: 1
      title: "Updated"
      description: "UPdated"
    }
  ){
    post {
      id
      title
      description
    }
  }
}

################ Result #####################
{
  "data": {
    "updatePost": {
      "post": {
        "id": 1,
        "title": "Updated",
        "description": "UPdated"
      }
    }
  }
}
```

### Mutation Delete

Do pretty much the same as you did to create `create` and `update` mutations.
Run the command below and modify the generated file.

```console
$ rails g graphql:mutation DeletePost
```

This time, all you need is one argument `id` to delete a post!

```ruby
# graphql/mutations/delete_post.rb
module Mutations
  class DeletePost < Mutations::BaseMutation
    graphql_name 'DeletePost'

    field :post, Types::PostType, null: true
    field :result, Boolean, null: true

    argument :id, ID, required: true

    def resolve(**args)
      post = Post.find(args[:id])
      post.destroy
      {
        post: post,
        result: post.errors.blank?
      }
    end
  end
end
```

### Testing with GraphiQL

Make a request like the code below and check the result.

```
mutation {
  deletePost(
    input:{
      id: 1
    }
  ){
    post {
      id
      title
      description
    }
  }
}

################ Result #####################
{
  "data": {
    "posts": [
      {
        "id": 2,
        "title": "How to learn Ruby"
      },
      {
        "id": 3,
        "title": "title1"
      }]
  }
}
```

## Connection fields(1)

Once you understand how `types`, `queries` and `mutations` work, it is easy to work with associations.
Let's make it able to retrieve comments that are posted on each post with the corresponding post.
First, create the comment model and set up the `has_many` association with the Post model and create some data to check the query later on.

```console
$ rails g model Comment content:string post:references
```

```ruby
# app/models/comment.rb
class Comment < ApplicationRecord
  belongs_to :post
end

# app/models/post.rb
class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
end
```

```ruby
# db/seeds.rb
Post.new.tap do |post|
  post.title = 'title'
  post.description = 'description'
  post.comments.build(content: 'comment1')
  post.save!
end
```

```console
$ rake db:seed
```

Secondly, Create the comment type by running the command below.

```console
$ rails g graphql:object Comment id:ID! content:String!
```

The command will create a file which looks like the code below.

```ruby
# app/graphql/types/comment_type.rb
module Types
  class CommentType < Types::BaseObject
    description 'Comment'

    field :id, ID, null: false
    field :content, String, null: false
  end
end
```

Lastly, add the comments field to post type.

```ruby
# app/graphql/types/post_type.rb
module Types
  class PostType < Types::BaseObject
    description 'Post'

    field :id, Int, null: false
    field :title, String, null: false
    field :description, String, null: false
    field :comments, [Types::CommentType], null: false
  end
end
```

### Testing with GraphiQL

Make a request like the code below and check the result.

```
{
  posts {
    id
    title
    comments {
      id
      content
    }
  }
}

################ Result #####################
{
  "data": {
    "posts": [
      {
        "id": "1",
        "title": "title",
        "comments": [
          {
            "id": "1",
            "content": "comment1"
          }
        ]
      }
    ]
  }
}
```

## Connection fields(2)

Let's make it able to create a new comment.
First things first, run the command below to create `CreateComment` mutation and add that to `/graphql/types/mutation_type.rb`.

```console
$ rails g graphql:mutation CreateComment
```

Next, add `field :post, Types::PostType, null: false` to `app/graphql/types/comment_type.rb`.

```ruby
# app/graphql/types/comment_type.rb
module Types
  class CommentType < Types::BaseObject
    description 'Comment'
    field :id, ID, null: false
    field :content, String, null: false
    field :post, Types::PostType, null: false
  end
end
```

Lastly, modify `app/graphql/mutations/create_comment.rb` like the code below.

```ruby
# app/graphql/mutations/create_comment.rb
module Mutations
  class CreateComment < Mutations::BaseMutation
    graphql_name 'CreateComment'

    field :comment, Types::CommentType, null: true
    field :result, Boolean, null: true

    argument :post_id, ID, required: true
    argument :content, String, required: true

    def resolve(**args)
      post = Post.find(args[:post_id])
      comment = post.comments.build(content: args[:content])
      comment.save
      {
        comment: comment,
        result: post.errors.blank?
      }
    end
  end
end
```

### Testing with GraphiQL

Make a request like the code below and check the result.

```
mutation {
  createComment(
    input:{
      postId: 1
      content: "NEW COMMENT"
    }
  ){
    comment {
      id
      content
      post {
        id
        title
        comments {
          id
          content
        }
      }
    }
  }
}

################ Result #####################
{
  "data": {
    "createComment": {
      "comment": {
        "id": "2",
        "content": "NEW COMMENT",
        "post": {
          "id": "1",
          "title": "title",
          "comments": [
            {
              "id": "1",
              "content": "comment1"
            },
            {
              "id": "2",
              "content": "NEW COMMENT"
            }
          ]
        }
      }
    }
  }
}
```

# Utilizing resolvers directory

First, Create `app/graphql/resolvers/` and create `app/graphql/resolvers/base_resolver.rb`.

```ruby
module Resolvers
  class BaseResolver < GraphQL::Schema::Resolver
  end
end
```

Secondly, create `app/graphql/resolvers/query_type` and also create `posts_resolver.rb` and `post_resolver.rb` under the directory.

```
-- graphql
   -- resolvers
      -- query_type
       - posts_resolver.rb
       - post_resolver.rb
```

Modify `posts_resolver.rb` and `post_resolver.rb` llike the code below respectively.

```ruby
# app/graphql/resolvers/query_type/posts_resolver.rb

module Resolvers
  module QueryType
    class PostsResolver < Resolvers::BaseResolver
      type [Types::PostType], null: false

      def resolve(**_args)
        Post.all
      end
    end
  end
end
```

```ruby
# app/graphql/resolvers/query_type/post_resolver.rb

module Resolvers
  module QueryType
    class PostResolver < Resolvers::BaseResolver
      type Types::PostType, null: false
      argument :id, ID, required: false

      def resolve(**args)
        Post.find(args[:id])
      end
    end
  end
end
```

Lastly, connect them with the `query_type.rb`.
You can use the same requests to retrieve posts and each post now!

```ruby
# app/graphql/types/query_type.rb

module Types
  class QueryType < Types::BaseObject
    field :posts, resolver: Resolvers::QueryType::PostsResolver
    field :post, resolver: Resolvers::QueryType::PostResolver
  end
end
```

# References

- [Building a GraphQL Server with Ruby Backend Tutorial](https://www.howtographql.com/graphql-ruby/0-introduction/)
- [A Guide to GraphQL in Plain English – freeCodeCamp.org](https://medium.freecodecamp.org/a-beginners-guide-to-graphql-60e43b0a41f5)
- [GraphQL Ruby](http://graphql-ruby.org/)
- [How to Implement a GraphQL API in Rails - via @codeship | via @codeship](https://blog.codeship.com/how-to-implement-a-graphql-api-in-rails/)
- [When you use graphiql-rails for your api only rails application](https://github.com/rmosolgo/graphiql-rails/issues/13)
