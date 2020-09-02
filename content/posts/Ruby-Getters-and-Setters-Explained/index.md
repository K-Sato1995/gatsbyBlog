---
title: 'Ruby Getters and Setters Explained'
slug: ruby-getters-and-setters-explained
date: 2018-09-17
language: english
category: Programming
tags:
  - Ruby
  - getter-setter
  - Tutorial
published: true
pinned: true
description: 'In this post, I will explain how getters and setters work in Ruby. A getter method is a method that gets a value of an instance variable. Without a getter method, you can not retrieve a value of an instance variable outside the class the instance variable is instantiated from.'
---

# What is a getter method?

**A getter method** is a method that gets a value of an instance variable.
Without a getter method, you can not retrieve a value of an instance variable outside the class the instance variable is instantiated from.

Here is an example.

```Ruby
class Movie
  def initialize(name)
    @name = name
  end
end

obj1 = Movie.new('Forrest Gump')
p obj1.name #=> undefined method `name' for #<Movie:0x007fecd08cb288 @name="Forrest Gump"> (NoMethodError)
```

As you can see, the value of `obj1` (`name`) can not be retrieved outside `Movie` class. if you try to retrive a value of an instance variable outside its class without a getter method, Ruby raises [No Mothod Error](http://ruby-doc.org/core-2.5.0/NoMethodError.html).

Now, Let's see how to retrieve the value of `obj1` outside `Movie` class with a getter method.
All you have to do here is to define a `getter method` named `name`. Though the name of a getter method can be anything, it is common practice to name a getter method the instance variable’s name.

```Ruby
 class Movie
  def initialize(name)
    @name = name
  end

  def name
    @name
  end
end

obj1 = Movie.new('Forrest Gump')
p obj1.name #=> "Forrest Gump"
```

# What is a setter method?

**A setter** is a method that sets a value of an instance variable.
Without a setter method, you can not assign a value to an instance variable outside its class.
if you try to set a value of an instance variable outside its class, Ruby raises [No Method Error](http://ruby-doc.org/core-2.5.0/NoMethodError.html) just like it does when you try to retrieve a value of an instance variable outside its class without a getter method.

```Ruby
class Movie
  def initialize(name)
    @name = name
  end

  def name #getter method
    @name
  end
end

obj1 = Movie.new('Forrest Gump')
p obj1.name #=> "Forrest Gump"
obj1.name = 'Fight Club' #=> undefined method `name=' for #<Movie:0x007f9937053368 @name="Forrest Gump"> (NoMethodError)
```

Defining a setter method inside a class makes it possible to set a value of an instance variable outside the class.
You can define a setter method like the code below.

```Ruby
 class Movie
  def initialize(name)
    @name = name
  end

  def name #getter method
    @name
  end

  def name=(name) #setter method
    @name = name
  end
end

obj1 = Movie.new('Forrest Gump')
p obj1.name #=> "Forrest Gump"
obj1.name = 'Fight Club'
p obj1.name #=> "Fight Club"
```

By using `name=`, you can now assign a new value `Fight Club` to `obj1`.

# What are accessors?

`Accessors` are a way to create getter and setter methods without explicitly defining them in a class.
There are three types fo accessors in Ruby.

- `attr_reader` automatically generates a getter method for each given attribute.
- `attr_writer` automatically generates a setter method for each given attribute.
- `attr_accessor` automatically generates a getter and setter method for each given attribute.

First, let's take a look at `attr_reader`!
As you can see in the code below, `name` and `year` are retrieved outside `Movie` class even though there is no getter method for either of them. This is because `attr_reader` generates a getter method for each given attribute.

```ruby
class Movie
 attr_reader :name, :year

 def initialize(name, year)
   @name = name
   @year = year
 end
end
obj1 = Movie.new('Forrest Gump', 1994)
p obj1.name #=> Forrest Gump
p obj1.year #=> 1994
```

Second, let's see how `attr_writer` works!
As I mentioned above, `attr_witer` generates a setter method for each given attribute. Therefore you can assign new values to `ob1` without explicitly writing setter methods for `name` and `year`!

```ruby
class Movie
  attr_reader :name, :year
  attr_writer :name, :year

  def initialize(name, year)
    @name = name
    @year = year
  end
end
obj1 = Movie.new('Forrest Gump', 1994)
obj1.name = 'Fight Club'
obj1.year = 1999
p obj1.name #=> "Fight Club"
p obj1.year #=> 1999
```

Last but certainly not least, `attr_accessor` does what `attr_reader` and `attr_writer` do with just one line of code! It will automatically generate a getter and setter mehod for each given attribute.

```Ruby
class Movie
  attr_accessor :name, :year

  def initialize(name, year)
    @name = name
    @year = year
  end
end
obj1 = Movie.new('Forrest Gump', 1994)
obj1.name = 'Fight Club'
obj1.year = 1999
p obj1.name #=> "Fight Club"
p obj1.year #=> 1999
```

# References

- [How getter/setter methods work in Ruby](https://medium.com/@rondwalker22/how-getter-setter-methods-work-in-ruby-c5f5da07f99) .
- [What is attr_accessor in Ruby?](https://stackoverflow.com/questions/4370960/what-is-attr-accessor-in-ruby) .
- [rubylearning.com](http://rubylearning.com/satishtalim/ruby_syntactic_sugar.html)
