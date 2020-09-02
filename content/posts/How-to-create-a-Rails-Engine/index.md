---
title: ' How to create a Rails Engine '
slug: how-to-create-a-rails-engine
date: 2019-07-03
language: english
category: Programming
tags:
  - Rails
published: true
description: 'The post is about how to create a rails engine.'
---

# What are engines

`Rails Engines` can be considered miniature applications that provide the functionality to their host applications.

# Generate an engine

## Generate the foundation of the engine

Run the command below to generate an engine called `blorph`.

> The `--mountable` option tells the generator that you want to create a "mountable" and namespace-isolated engine.

More about options [here](https://guides.rubyonrails.org/engines.html#generating-an-engine).

```
$ rails plugin new engine_name --mountable
```

## Install dependencies

Fix `TODOs` in `.gemspec` and run `bundle install`.

# Adding functionalities

You can add models or controllers to the engine using the commands below.

```
$ rails g model
$ rails g controller
```

# Hooking into Applications

## Mounting the engine

It is as easy as installing a gem in your application.
Simply, add the engine to your Gemfile and run `bundle install`.

```
# .Gemfile
gem 'engine_name'
```

To make the engine's functionality accessible from within an application, it needs to be mounted in that application's `config/routes.rb` file.

```
# config/routes.rb
mount ENGINE_NAME::Engine, at: "/engine_name", as: 'engine'
```

## Engine setup

You can run `migration` for the engine like the command below.

```
$ rails engine_name:install:migrations
```

# References

- [Getting Started with Engines — Ruby on Rails Guides](https://guides.rubyonrails.org/engines.html)
