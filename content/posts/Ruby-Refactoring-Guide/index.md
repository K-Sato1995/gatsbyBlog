---
title: 'Ruby Refactoring Guide'
slug: ruby-refactoring-guide
date: 2019-03-21
language: english
category: Programming
tags:
  - Ruby
  - Tips
published: true
description: 'Useful refactoring methods in Ruby.'
---

# Common Refactoring approaches

## Extract Method

You move some code from an old method into a new method. This will allow you to have smaller methods with descriptive names.

### Before

```ruby
def report
  sold_items = %w[apples lemons grapes]
  puts "*** Sales Report for #{Time.now.strftime("%d/%m/%Y")} ***"
  sold_items.each { |i| puts i }
  puts '*** End Of The Report ***'
end
```

### After

```ruby
def report
  sold_items = %w[apples lemons grapes]
  puts "*** Sales Report for #{current_date} ***"
  print_items(sold_items)
  puts '*** End Of The Report ***'
end

def current_date
  Time.now.strftime("%d/%m/%Y")
end

def print_items(items)
  items.each { |i| puts i }
end

```

## Refactoring Conditionals

You can also refactor complicated conditionals into methods to make them more readable.

### Before

```ruby
def check_working_hour
  if Time.now.hour >= 9 && Time.now.hour <= 17
    'You should be working.'
  end
end
```

### After

```ruby
def check_working_hour
  if working_hour?
    'You should be working.'
  end
end

def working_hour?
  Time.now.hour >= 3 && Time.now.hour <= 17
end
```

## Inline Method

When a method body is more obvious than the method itself, jsut directory write the content of the method instead of creating an unecessary method.

### Before

```ruby
def result(score)
  if check(score)
    "Pass"
  end
end

def check(score)
  score > 70
end
```

### After

```ruby
def new_result(score)
  if score > 70
   "Pass"
  end
end
```

## Extract variable

You move some code into a new variable for better readability.

### Before

```ruby
def yesterday
  (Time.now - 86400).strftime("%d/%m/%Y")
end
```

### After

```ruby
def new_yesterday
  one_day = 86400
  (Time.now - one_day).strftime("%d/%m/%Y")
end
```

# Other refactoring approaches

## Use default values

You can set a default value for an argument to make your code simpler.

### Before

```ruby
module TwoFer
  def self.two_fer(name = '')
    if name.empty?
      'One for you, one for me.'
    else
      "One for #{name}, one for me."
    end
  end
end
```

### After

```ruby
module TwoFer
  def self.two_fer(name = 'you')
    "One for #{name}, one for me."
  end
end
```

## scan() to get the first letter of each word

With `String#scan` and a regex, you can get the first letter of each word. For instance, scan with the regex `/\b\w` will catch `word boundaries` (space, - and more) followed by a word character.

### Before

```ruby
def abbreviate(phrase)
  abbreviation_array = phrase.split(/[\s|-]/).map { |word| word[0] }
  abbreviation_array.flatten.join('').upcase
end
```

### After

```ruby
def abbreviate(phrase)
  phrase.scan(/\b\w/).join('').upcase
end
```

## Use attr_reader to access instance variables

[Why I always use attr_reader to access instance variables - ivo's awfully random tech blog](https://ivoanjo.me/blog/2017/09/20/why-i-always-use-attr_reader-to-access-instance-variables/)

### Before

```ruby
class Car
  def initialize(name)
    @name = name
  end

  def name
    @name
  end
end
```

### After

```ruby
class Car
  attr_reader :name

  def initialize(name)
    @name = name
  end
end
```

## lines or each_line to split multiline strings

Using `String#lines/each_line` is more intention revealing.

### Before

```ruby
def rows(nums)
  nums.split(/\n/)
end
```

### After

```ruby
def rows(nums)
  nums.lines
end
```

## chars over split

Using `String#chars` is more intention revealing.

### Before

```ruby
"test".split('')
```

### After

```ruby
"test".chars
```

## each_with_object

Just read this article! Incredibly easy to understand how each_with_object works and what it is good for .

- [Quick overview Ruby each_with_object method – Woman on Rails - web development from woman perspective](https://womanonrails.com/each-with-object)

### Usage

The most useful and I think the most popular usage of `each_with_object` is putting hash or array as an argument.  
You don't need to declare array or hash before your loops.

```ruby
# Hash
%w[string1 string2 string3].each_with_object({}){
  |item, hash| hash[item] = item.upcase
}

# Array
(1..10).each_with_object([]) do |item, array|
  array << item ** 2
end

# Hash.each_with_object
{key: "value", key2: "value2"}.each_with_object({}) do |(key, value), hash|
  hash[value] = key
end
#=> {"value"=>:key, "value2"=>:key2}
```

## Instance method in a class method

### Before

```ruby
class Foo
  def self.bar
    'BAR'
  end

  def bar
    'BAR'
  end
end
```

### After

This class method is called a concenience method.

```ruby
class Foo
  def self.bar
    Foo.new.bar
  end

  def bar
    'BAR'
  end
end
```

## count all? any? none? and one?

### Example

```ruby

# Evaluate the number of different letters.
'aaa'.chars.zip('ass'.chars).count { |a, b| a != b }

# Check if all elements are 'a'.
'aaas'.chars.all? { |letter| letter == 'a' } #=> false

# Check if there is any 'a'.
'aaas'.chars.any? { |letter| letter == 'a' } #=> true

# Check if there is no 'a'.
'aaas'.chars.none? { |letter| letter == 'a' } #=> false

# Check if there is only one 'a'.
'aaas'.chars.one? { |letter| letter == 'a' } #=> false
```

## scan to make an array

### Before

```ruby
'word'.chars.select { |letter| /\w/ === letter}
```

### After

```ruby
'word'.scan(/[a-z]/)
```

## sum for cleaner caliculations

### Before

```ruby
POINTS_AND_LETTERS = {'A'=> 1, 'B'=> 2, 'C'=> 3}

def score
result = 0
'ABC'.strip.upcase.chars.each do |letter|
  result += POINTS_AND_LETTERS[letter]
end
result
end

p score #=> 6
```

### After

```ruby
POINTS_AND_LETTERS = {'A'=> 1, 'B'=> 2, 'C'=> 3}

def score
  result = 'ABC'.strip.upcase.chars.sum do |letter|
    POINTS_AND_LETTERS[letter]
  end
end

p score
```

## Dynamically call and define methods

You can dinamically define methods using `Module#define_method` and call methods with `Object#send`

### define_method

```ruby
class Klass
  define_method :my_method do |arg|
    arg * 2
  end
end

Klass.new.my_method(2) #=> 4
```

### send

```ruby
class Klass
 def p_name(name)
  name
 end
end

# Dinamically call a method
Klass.new.send(:p_name, "test") #=> test
```

## Practical Example

### Before

```ruby
class Klass
  def ken
    "Ken"
  end

  def jack
    "Jack"
  end
end
```

### After

```ruby
class Klass
  def self.define_name(name)
    define_method(name) do
      name.to_s
    end
  end

  define_name :ken
  define_name :jack
end

Klass.new.ken #=> ken
klass.new.jack #=> jack
```

## Tap

### Before

```ruby
user = User.new
user.username = "kartik"
user.save!
```

### After

```ruby
user = User.new.tap do |u|
  u.username = "kartik"
  u.save!
end
```

# Small Tips

## super

The `super` method calls the parent class method.

```ruby
class A
  def test
    p 'A'
  end
end

class B < A
  def test
    super
    p 'B'
  end
end

B.new.test #=> A B
```

- [What is `super` in Ruby? - Stack Overflow](https://stackoverflow.com/questions/31019009/what-is-super-in-ruby)

# Safe navigation operator

If you want to be safe and not risk a nil error, you would write something like the following:

```ruby
if account && account.owner && account.owner.address
....
end
```

with the `Safe navigation operator (&.)` you can write it like the code below.

```ruby
account&.owner&.address
```

- [The Safe Navigation Operator (&.) in Ruby – Georgi Mitrev](http://mitrev.net/ruby/2015/11/13/the-operator-in-ruby/)

# References

- [Introduction to Refactoring - RubyGuides](https://www.rubyguides.com/2015/12/ruby-refactoring/)
- [Refactoring Techniques](https://refactoring.guru/refactoring/techniques)
