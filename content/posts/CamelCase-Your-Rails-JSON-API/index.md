---
title: CamelCase Your Rails JSON API 
description: Here is how to make your rails app respond with camel-cased keys.
slug: camelcase-your-rails-json-api
date: 2020-01-28
language: english
cover: ./cover.png
tags: 
  - Rails
---
# Installation

Add the gem to your Gemfile and run `bundle install`.

```ruby
gem "olive_branch"
```

Add the following line to your `config/application.rb`

```ruby
config.middleware.use OliveBranch::Middleware
```

# Usage

Include a `Key-Inflection` header with values of `camel`, `dash`, `snake` or `pascal` in your JSON API requests on the frontend.

```javascript
 headers: {
   'Key-Inflection': 'camel',
 }
```

# Resources 
- [olive_branch gem](https://github.com/vigetlabs/olive_branch)
- [CamelCase Your Rails JSON API With OliveBranch](https://www.viget.com/articles/introducing-olivebranch/)
