---
title: "Build a simple API using RoR5"
slug: build-a-simple-api-using-ror5
date: 2018-09-17
language: english
category: Rails
tags:
  - API
  - Ruby
  - Tutorial
published: true
description: "Here is a simple guideline to create a simple API with RoR5. In this post, I'll create a simple blog like application that users can read, create, update and delete posts on.
"
---

# Overview

Here is a simple guideline to create a simple API with RoR5. In this post, I'll create a simple blog like application that users can read, create, update and delete posts on.

# Create the application

You can make an API-only RoR application by just adding `--api` at the end of `rails new` command.

```console
$ rails new blog --api
```

# Create the controller and model for Post

You can generate the `Post Controller` and `Post Model` by running commands below.

```console
$ rails g model post title:string
$ rails g controller posts
$ rake db:migrate
```

# Set up Routes with namespaces

`Namespaces` enable you to easily control the version of your API.

```Ruby
Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :posts
    end
  end
end
```

The code above creates routes like this. (You can check the routes of your application with `rake routes` command.)

```console
$ rake routes
api_v1_posts GET    /api/v1/posts(.:format)     api/v1/posts#index
             POST   /api/v1/posts(.:format)     api/v1/posts#create
 api_v1_post GET    /api/v1/posts/:id(.:format) api/v1/posts#show
             PATCH  /api/v1/posts/:id(.:format) api/v1/posts#update
             PUT    /api/v1/posts/:id(.:format) api/v1/posts#update
             DELETE /api/v1/posts/:id(.:format) api/v1/posts#destroy
```

# Set up the Post controller.

Create the `api` and `v1` directories under your _controllers directory_. Your _controllers directory_ should look like this.

```Ruby
---- controllers

      --- api

        -- v1

         - posts_controller.rb
```

Create methods for getting, creating, updating and deleting posts like the code below.

```Ruby
module Api
  module V1
    class PostsController < ApplicationController
      def index
        posts = Post.order(created_at: :desc)
        render json: { status: 'SUCCESS', message: 'loaded posts', data: posts }
      end

      def show
        post = Post.find(params[:id])
        render json: { status: 'SUCCESS', message: 'loaded the post', data: post }
      end

      def create
        post = Post.new(post_params)
        if post.save
          render json: { status: 'SUCCESS', message: 'loaded the post', data: post }
        else
          render json: { status: 'ERROR', message: 'post not saved', data: post.errors }
        end
      end

      def destroy
        post = Post.find(params[:id])
        post.destroy
        render json: { status: 'SUCCESS', message: 'deleted the post', data: post }
      end

      def update
        post = Post.find(params[:id])
        if post.update(post_params)
          render json: { status: 'SUCCESS', message: 'updated the post', data: post }
        else
          render json: { status: 'SUCCESS', message: 'loaded the post', data: post }
        end
      end

      private

      def post_params
        params.require(:post).permit(:title)
      end
    end
  end
end
```

# Test the api using [postman](https://www.getpostman.com/)

Let's create some data we can play with on `rails console`.

```
$ rails c
2.4.4 :001 > Post.create(title:'title1')
2.4.4 :001 > Post.create(title:'title2')
```

Next, Run the api!

```console
$ rails s
```

Open [postman](https://www.getpostman.com/) and test the following requests.

### Get(http://localhost:3000/api/v1/posts)

You can retrieve 2 sets of data you have created on the console.

![image.png](https://qiita-image-store.s3.amazonaws.com/0/258219/bd494dc7-7303-c48b-f0d5-a784331f1c50.png)

### GET(http://localhost:3000/api/v1/posts/:id)

You can retrieve one specific data that has `id = 1`.

![image.png](https://qiita-image-store.s3.amazonaws.com/0/258219/0f35b92e-f51c-4bba-1db4-69ac07035b19.png)

### POST (http://localhost:3000/api/v1/posts)

Let's create data!
When you create data, you have to send a `POST` request.  
So change the selected option in the box on the right from `GET` to `POST` and pass json data in the body.

![image.png](https://qiita-image-store.s3.amazonaws.com/0/258219/0fb6d53a-f0f8-fdef-170e-3ca79d7457b7.png)

### PUT(http://localhost:3000/api/v1/posts/:id)

Let's Update data!
Change the selected option to `PUT` and pass json data.

![image.png](https://qiita-image-store.s3.amazonaws.com/0/258219/76d01d80-99ea-0980-2042-b52971dd2a05.png)

### DELETE(http://localhost:3000/api/v1/posts/:id)

Lastly, let's try to delete data.
Change the selected option to `DELETE` and pass json data.

![image.png](https://qiita-image-store.s3.amazonaws.com/0/258219/d37392ff-eb77-14fc-17d1-86a42a9adcd6.png)

I've usded `postman` in this post, but you can of course use [curl command](https://curl.haxx.se/docs/manpage.html) to do the same.
