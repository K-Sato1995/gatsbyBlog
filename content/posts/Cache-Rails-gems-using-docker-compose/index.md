---
title: "Cache Rails gems using docker-compose"
slug: cache-rails-gems-using-docker-compose
date: 2019-05-28
language: english
tags:
  - Docker
published: true
description: "How to cache gems so that you don't have to run docker-compose build over and over again"
---
# Introduction
Let's suppose you have a `docker-compose.yml` like the one below.
You have to run `docker-compose build` every time you add/remove a gem to/from your `Gemfile` and it is very time-consuming.
It would be great if I could just run `bundle install` and get back to developing the application. 
Well... I'll show you exactly that in this post.


```yml
version: "3"
services:
  app:
    build: .
    volumes:
      - .:/app
    depends_on:
      - postgres
  postgres:
    image: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

# Set up your docker-compose.yml
Follow the steps below.

- (1) Set up `BUNDLE_PATH` using `environment`. 
- (2) Set up the named volume `bundle_path` and add it to the top level `volumes`.

Here is the modified `docker-compose.yml`.

```yml
version: "3"
services:
  app:
    build: .
    volumes:
      - .:/app
      - bundle_path:/bundle # New
    environment:
      - BUNDLE_PATH=/bundle #New
    depends_on:
      - postgres
  postgres:
    image: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  bundle_path: # New
  postgres-data:
```

# How to use it?
## Create the cache of the gems

Run the command below to create the cache of the gems after you modified your `docker-compose.yml`.

```
$ docker-compose app bundle install
```

## Add or Remove a gem

- (1) Stop running containers.
 
```
$ docker-compose down
```

- (2) Add a new gem and run the command below.

```
$ docker-compose run app bundle install
```

- (3) Run the containers again.

```
$ docker-compose up
```

# References
- [Zero to Up and Running a Rails Project only using Docker](https://blog.codeminer42.com/zero-to-up-and-running-a-rails-project-only-using-docker-20467e15f1be)



