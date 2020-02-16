---
title: Active Record Query Interface(Conditions)
description: This is a pure copy&paste of a part from Active Record Query Interface — Ruby on Rails Guides. The guide is very thorough and super informative.
slug: active-record-query-interface-conditions
date: 2019-02-08
language: english
cover: ./cover.png
tags: 
  - ActiveRecord
  - Rails
---
## Introduction

This is a pure copy&paste of a part from [Active Record Query Interface — Ruby on Rails Guides](https://guides.rubyonrails.org/active_record_querying.html#conditions). The guide is very thorough and super informative.

## Array Conditions

What if that number could vary, say as an argument from somewhere? The find would then take the form:

```ruby
Client.where("orders_count = ?", params[:orders])
```

Active Record will take the first argument as the conditions string and any additional arguments will replace the question marks (?) in it.

If you want to specify multiple conditions:

```ruby
Client.where("orders_count = ? AND locked = ?", params[:orders], false)
```

In this example, the first question mark will be replaced with the value in `params[:orders]` and the second will be replaced with the SQL representation of false, which depends on the adapter.

The first code is highly preferable to the second code.

```ruby
# (1)
Client.where("orders_count = ?", params[:orders])
```

```ruby
#(2)
Client.where("orders_count = #{params[:orders]}")
```

because of argument safety. Putting the variable directly into the conditions string will pass the variable to the database as-is. This means that it will be an unescaped variable directly from a user who may have malicious intent. If you do this, you put your entire database at risk because once a user finds out they can exploit your database they can do just about anything to it. Never ever put your arguments directly inside the conditions string.

# Scope

Adds a class method for retrieving and querying objects. The method is intended to return an `ActiveRecord::Relation object`, which is composable with other scopes. If it returns nil or false, an all scope is returned instead.

```ruby
class Shirt < ActiveRecord::Base
  scope :red, -> { where(color: 'red') }
  scope :dry_clean_only, -> { joins(:washing_instructions).where('washing_instructions.dry_clean_only = ?', true) }
end
```

The above calls to scope define class methods `Shirt.red` and `Shirt.dry_clean_only`.
`Shirt.red`, in effect, represents the query `Shirt.where(color: 'red')`.

Note that this is simply `syntactic sugar` for defining an actual class method:

```ruby
class Shirt < ActiveRecord::Base
  def self.red
    where(color: 'red')
  end
end
```

# References

- [Active Record Query Interface — Ruby on Rails Guides](https://guides.rubyonrails.org/active_record_querying.html#conditions)
- [Ruby on Rails 5.2.2](https://api.rubyonrails.org/classes/ActiveRecord/Scoping/Named/ClassMethods.html)
