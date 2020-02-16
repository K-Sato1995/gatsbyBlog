---
title: "Creating a Database Diagram with rails-erd"
slug: creating-a-database-diagram-with-rails-erd
date: 2019-07-17
language: english
cover: ./cover.png
generate-card: false
tags:
  - Documents
description: "Quick post about how to create a ER chart with a rails gem."
---
# Add rails-erd

```ruby 
group :development do
  gem 'rails-erd'
end
```

# Install Dependency

```bash
$ brew install graphviz
```

# Run the command 

```bash 
$ bundle exec erd
```
That's it !!

# References 
- [Creating a Database Diagram with Rails-ERD](https://ryanboland.com/blog/creating-a-database-diagram-with-rails-erd/)
