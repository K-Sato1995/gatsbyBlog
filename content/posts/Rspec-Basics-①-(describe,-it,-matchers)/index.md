---
title: 'Rspec Basics ① (describe, it, matchers)'
slug: rspec-basics-describe-it-matchers
date: 2018-09-18
language: english
category: Programming
tags:
  - Rails
  - Ruby
  - Rspec
  - Test
  - Tutorial
published: true
description: 'RSpec is a Behaviour-Driven Development tool for Ruby programmers. BDD is an approach to software development that combines Test-Driven Development, Domain Driven Design, and Acceptance Test-Driven Planning. How to install Rspec on your RoR applications? You have to add rspec-rails to both the :development and :test groups in the Gemfile.'
---

# What is Rspec?

RSpec is a Behaviour-Driven Development tool for Ruby programmers. `BDD` is an approach to software development that combines Test-Driven Development, Domain Driven Design, and Acceptance Test-Driven Planning.

# How to install Rspec on your RoR applications?

You have to add `rspec-rails` to both the `:development` and `:test` groups in the Gemfile.

```ruby
group :develop, :test do
   gem 'rspec-rails'
end
```

You can download and install it by running the line below.

```console
$ bundle install
```

To initialize `spec/` directory(where specs will reside), You can do so by running the command below.

```console
$ rails g rspec:install
```

This will add the following files which are used for configuration.

- `.rspec`
- `spec/spec_helper.rb`
- `spec/rails_helper.rb`

You can run your specs (execute spec files) by running `rspec` command.

```console
$ bundle exec rspec
```

By default, the command above will run all `_spec.rb` files in the spec directory.
You can run only a subset of these specs by specifying the file path like the example below.

```console
# Run only model specs
$ bundle exec rspec spec/models

# Run only specs for PostController
$ bundle exec rspec spec/controllers/posts_controller_spec.rb

#Run only spec on line 8 of PostController
$ bundle exec rspec spec/controllers/posts_controller_spec.rb:8
```

If you want to use classes that are defined in your application, don't forget to add `require 'rails_helper'` to each file.

```Ruby
require 'rails_helper'

describe 'Post' do
  it 'tests type matchers' do
    ins = Post.create(title: 'title', content: 'content')
  end
end
```

# Basic Structure

To show the basic structure of Rspec with real examples, I created a simple CRUD RoR application with `scaffold` command. You can create the same application by running the code below.

```console
$ rails g scaffold Post title:string content:text
```

## Describe

The word `describe` is used to define an `example group` which is the Rspec way of saying a collection of tests. `describe` takes a class name and/or string argument. You can define an `example group` like the code below.

```Ruby
describe Post do
  #tests
end
```

## It

The word `it` is another RSpec keyword which is used to define an `example`. An example is basically a test or a test case. You can define an `example` like the code below.

```Ruby
describe Post do
  it 'test case' do
    #test content
  end
end
```

## Expect & to/not_to

The `expect` keyword is used to define an `expectation` in Rspec. The `to` keyword is also used as part of `expect` statements. You can also use `not_to` keyword when you want the expectation to be false.

```Ruby
describe 'Post' do
  it 'test case' do
    value = 1
    expect(value).to eq(1)
  end
end
```

The `eq` keyword is one of Rspec [matchers](https://relishapp.com/rspec/rspec-expectations/docs/built-in-matchers) . Each matcher can be used with `expect(..).to` or `expect(..).not_to` to define positive and negative expectations respectively on an object.

## Context

The `context` keyword is just an alias method of `describe` that means there is no functional difference between these two methods. However, there is a contextual difference that makes your tests more understandable by using both of them.
Generally speaking, `describe` is used to separate sets of tests based on methods or behavior that is being tested, whereas `context` is used to separate specs based on conditions.

```Ruby
describe 'Post' do

  context 'name == Jim' do
    #tests
  end

  context 'name == John' do
    #tests
  end

end
```

# Matchers

We used a matcher `eq` in the above example. Here, I will introduce other types of matchers.

## Equality matchers

Rspec has several different methods for handling equality.

```Ruby
require 'rails_helper'

describe 'Post' do
  it 'tests equality matchers' do
    a = 'value'
    b = 'value'
    expect(a).not_to equal(b) # object identity - a and b refer to the same object
    expect(a).to eql(b) # object equivalence - a and b have the same value
    expect(a).to be == b # object equivalence - a and b have the same value with type conversions
  end
end
```

## Comparison matchers

RSpec provides a number of matchers that are based on Ruby's built-in operators. These can be used for generalized comparison of values. I'll introduce some of many matchers that I frequently use. For further information regarding this topic, check [Relish](https://relishapp.com/rspec/rspec-expectations/v/3-8/docs/built-in-matchers/comparison-matchers).

```Ruby
require 'rails_helper'

describe 'Post' do
  it 'tests comparison matchers' do
    a = 1
    b = 2
    expect(a).to be > 0
    expect(a).to be < b
    expect(a).to be >= 0
    expect(a).to be <= b
    expect(a).to be == 1
  end
end
```

## Predicate matchers

Ruby objects commonly provide predicate methods like `zero?`, `empty?` and `has_key?`. You can use those methods in Rspec by Simply prefixing the method with `be_` and remove the question mark.

```Ruby
require 'rails_helper'

describe 'Post' do
  it 'tests predicate matchers' do
    a = 1
    arry = []
    hash = { key: 'value' }
    expect(a).not_to be_zero
    expect(arry).to be_empty
    expect(hash).to have_key(:key)
  end
end
```

## Type matchers

You can test the type or class of objects in Rspec by using `be_kind_of()`, `be_instance_of()`.

```Ruby
require 'rails_helper'

describe 'Post' do
  it 'tests type matchers' do
    str = 'string'
    ins = Post.create(title: 'title', content: 'content')
    expect(str).to be_kind_of(String) # same as expect(obj).to be_kind_of(type)
    expect(str).to be_a_kind_of(String) # same as expect(obj).to be_kind_of(type)
    expect(str).to be_a(String) # same as expect(obj).to be_kind_of(type)
    expect(str).to be_an(String) # same as expect(obj).to be_kind_of(type)

    expect(ins).to be_instance_of(Post)
    expect(ins).to be_an_instance_of(Post)  # same as expect(obj).to be_instance_of(type)
  end
end
```

## Be matchers

There are several related `be matchers`.

```Ruby
require 'rails_helper'

describe 'Post' do
  it 'tests be matchers' do
    obj1 = true
    obj2 = false
    obj3 = nil
    expect(obj1).to be_truthy
    expect(obj1).to be #It is the same as be_truthy
    expect(obj2).to be_falsey
    expect(obj3).to be_nil
  end
end
```

## Include matchers

You can use the `include matcher` to specify that a collection includes one or more expected objects.

```Ruby
require 'rails_helper'

describe 'Post' do
  it 'tests include matchers' do
    str = 'String'
    arr = [0,1,2]

    expect(str).to include('S')
    expect(str).to include('St', 'r')
    expect(str).not_to include('A')

    expect(arr).to include(0)
    expect(arr).to include(0, 1)
    expect(arr).not_to include(9)
    expect(arr).to include(be_odd.and be < 10)
    expect(arr).to include(a_kind_of(Integer))
  end
end
```

## Expect error

Use the `raise_error` matcher to specify that a block of code raises an error.

```Ruby
describe 'Post' do
  it 'tests errors' do
    expect { raise "boom" }.to raise_error
    expect { raise "boom" }.to raise_error(RuntimeError)
    expect { raise "boom" }.to raise_error("boom")
    expect { raise "boom" }.to raise_error(/boom/)
    expect { raise "boom" }.to raise_error(RuntimeError, "boom")
  end
end
```

## Respond_to matchers

Use the `respond_to` matcher to specify details of an object's interface.

```Ruby
describe 'Post' do
  it 'tests respond_to matchers' do
    str = 'String'
    expect(str).to respond_to(:split)
    expect(str).to respond_to(:to_i, :to_sym)
  end
end
```

More matchers are listed on [Relish](https://relishapp.com/rspec/rspec-expectations/v/3-8/docs/built-in-matchers).
