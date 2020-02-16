---
title: "Rake tasks "
slug: rake-tasks
date: 2019-09-27
language: english
tags:
  - Rake
published: true
description: "Simple post about rake."
---
# What is rake 

`Rake` is a task runner.

# How to Write a Rake Task

Here’s a simple Rake task:

```ruby
namespace :greet do
  desc "Say Hello"
  task hello: :environment do
    puts "Hello"
  end
end
```

You can put this code inside a file named `Rakefile`, or if you’re using Rails, you can save this under     `lib/tasks/apple.rake`.

To run this task:

```
$ rake greet:hello
```


# Dependent Tasks
Rake allows you to define a list of other tasks that must run before the current task.

Example:

```ruby
task :first do
  puts "Run this task first"
end

task :second => [:first] do
  puts "Should put this after :first"
end
```

This would return:

```
Run this task first
Should put this after :first
```

# Execute something after migration 

```ruby
namespace :db do
  def my_appended_code
    puts 'this code gets run after the original rails db:migrate task'
    puts 'it only runs if the migration did not throw any exceptions'
  end

  task :migrate do
    my_appended_code
  end
end
```

- [Adding a post execution hook to the rails db:migrate task (Example)](https://coderwall.com/p/qhdhgw/adding-a-post-execution-hook-to-the-rails-db-migrate-task)

# References
- [What is Rake in Ruby & How to Use it - RubyGuides](https://www.rubyguides.com/2019/02/ruby-rake/)
- [Using Rake to Automate Tasks - Field Notes](https://www.stuartellis.name/articles/rake/)
- [What the heck is Rake? - Craft Academy - Medium](https://medium.com/craft-academy/what-the-heck-is-rake-b44d4210922b)
