---
title: "Rspec Basics ③ (Useful Gems)"
slug: rspec-basics-useful-gems
date: 2018-09-21
language: english
cover: ./cover.png
generate-card: false
tags:
  - Rails
  - Ruby
  - Rspec
  - Gem
description: " In this post, I'll introduce 3 extremely useful gems you can use with Rspc. These gems enable you to write better specs and save yourself a lot of time.You need to define multiple sets of data in order to test all the given methods, features and objects. This can be quite tedious and tiring if you have to do it over and over again. This is where factory_bot comes in! It allows you to create an object or a collection of objects with predefined sets of values.

"
---
# Useful gems you can use with Rspec

In this post, I'll introduce 3 extremely useful gems you can use with Rspc. These gems enable you to write better specs and save yourself a lot of time.

# Factory Bot

You need to define multiple sets of data in order to test all given methods, features and objects. This can be quite tedious and tiring if you have to do it over and over again. This is where [`factory_bot`](https://github.com/thoughtbot/factory_bot) comes in! It allows you to create an object or a collection of objects with predefined sets of values.

### Installation

To use `factory_bot` in your RoR applications, you have to add [factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails) to your Gemfile.

```Ruby
require 'factory_bot'

group :development, :test do
  gem 'factory_bot_rails'
end
```

Add the following line to your spec/spec_helper.rb to require all the files under support directory.

```ruby
# spec/spec_helper.rb
Dir[File.dirname(__FILE__) + "/support/**/*.rb"].each {|f| require f }
```

Add the following code to the spec/support/factory_bot.rb file.

```Ruby
# spec/support/factory_bot.rb
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

### Automatic Factory Definition Loading

By default, factory_bot_rails will automatically load factories defined in the following locations, relative to the root of the Rails project.

```Ruby
factories.rb
test/factories.rb
spec/factories.rb
factories/*.rb
test/factories/*.rb
spec/factories/*.rb
```

### Defining factories

Each factory has a name and a set of attributes. The name is used to guess the class of the object by default, but you can also explicitly specify it.

```Ruby
#This will guess the Post class
FactoryBot.define do
  factory :post do
    title { 'Ruby' }
    author { 'Jack' }
  end

#This will use the User class
  factory :user1, class: User do
    name { Jack }
    age { 21 }
  end
end
```

### Using factories

`factory_bot` supports several different build strategies: `build`, `create`, `attributes_for` and `build_stubbed`.

```Ruby
#build returns a Post instance that is not saved in DB
post = build(:post)

#create returns a saved Post instance
post = create(:post)

#attributes_for returns a hash of attributes that can be used to build a Post instance
attrs = attributes_for(:post)

#build_stubbed returns an object with all defined attributes stubbed out.
stub = build_stubbed(:post)

# Passing a block to any of the methods above will yield the return object
create(:user) do |user|
  user.posts.create(:attributes_for(:post))
end
```

Whichever strategy you use, it's possible to override the defined attributes by passing a hash.

```Ruby
post = build(:post, title: 'Javascript')
post.title #=> Javascript
```

For more information regarding `factory_bot_rails`, you can check [here](https://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md)

# Faker

The `factory_bot` gem saves you from writing the same code over and over again by providing predefined values. However, manually writing those predefined values can be very daunting if you want to add hundreds or thousands of records to your database. Fortunately, instead of manually writing all the data, you can use `faker` to create fake data.

### Installation

You have to add `faker` to your Gemfile.

```Ruby
gem `faker`
```

### Usage

Utilizing `faker` is quite simple.
You can create fake data just like the code below.

```Ruby
require 'faker'

Faker::Name.name #This will create a random name

Faker::Internet.email #This will create a random email address.
```

You can create all kinds of data with `faker`. For more types of data, you can check [here](https://github.com/stympy/faker)

### Ensuring unique values

You can specify not to create duplicate values by adding prefix `unique` like the code below.

```Ruby
Faker::Name.unique.name #This will create an unique value
```

For more information regarding this topic, you can check [here](https://github.com/stympy/faker)

# Capybara

`Capybara` helps you test web applications by simulating how a real user would interact with your app.

### Installation

You have to add `capybara` gem to your Gemfile.

```Ruby
gem 'capybara'
```

If the application that you are testing is a Rails app, add this line to your test helper file.

```Ruby
require 'capybara/rails'
```
