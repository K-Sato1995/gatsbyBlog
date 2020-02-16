---
title: "Ruby Exception handling"
slug: ruby-exception-handling
date: 2019-05-21
language: english
cover: ./cover.png
generate-card: false
tags: 
  - Ruby
  - Exception
description: Explaining how to handle exceptions in Ruby.
---
# Basic Syntax

The basic syntax of ruby's exception handling looks like this.

```ruby
begin 
  # Code that potentially raises an error  
rescue => e # variable
  # Excecute if there was any error between begin and rescue.
end
```

## Example

```ruby
begin 
  raise 
rescue => e
  p e #=> RuntimeError
end
```

# Relevant methods


| Method 	| Explanation 	| 
|---	|---|	
| Object#class 	|Returns the class of the receiver.  	|  
| Kernel#raise 	| Raise an error. 	|  	 
| Exception#backtrace 	  	|Returns the backtrace of the error.  	|
| Exception#message 	  	|  	Returns the error message.|

## Example

```ruby
begin 
  raise StandardError.new("Message")
rescue => e
  p e.class #=> StandardError
  p e.message #=> "Message"
  p e.backtrace #=> ["(repl):4:in `<main>'", "/run_dir/repl.rb:41:in `eval'", "/run_dir/repl.rb:41:in `run'", "/run_dir/repl.rb:57:in `handle_eval'", "/run_dir/repl.rb:170:in `start'", "/run_dir/repl.rb:177:in `start'", "/run_dir/repl.rb:181:in `<main>'"]
end
```

# Ensure
You can run something regardless of the existence of any error with `ensure`

## Example 

```ruby
begin 
  "no Error"
rescue => e
  p e.message
ensure 
  p "Ensured" #=> Ensured
end
```

## Example2

```ruby
begin 
  raise StandardError.new('error')
rescue => e
  p e.message #=> error
ensure 
  p "Ensured" #=> Ensured
end
```

# retry
Literally `re-try` the execution.

## Example

```ruby
file = ARGV[0]

begin
  # Open a file.
  io = File.open( file )
rescue
  # If there was an error during opening the file, this part gets executed.

  sleep( 10 )
  # Goes back to begin and re-try the execution.
  retry
end
```

# Rescue modifier
You can write `begin ~ rescue` in one sentence just like `if ~ end` in Ruby.

## Example

```ruby
raise "Error" rescue p "rescued" #=> rescued
```

# Exception in methods

You don't need to write `begin and end` to do exception handling in methods.

## Example

``` ruby
def method
 raise 'error'
 rescue => e 
  p e.message #=> error
 ensure
  p 'ensured' #=> ensured
end
method #=> "error"
```

# Multiple Exceptions

You can write rescue multiple times for each corresponding error.

```ruby
begin 
  rescue Exception1, Exception2 => e
  # For Exception1 or Exception2
  rescue Exception3 => e
  # For Exception3
  rescue => e
   # For other errors.
end
```


## Example

```ruby
begin 
  raise StandardError
  rescue StandardError, RangeError   
    p 'Standard or Ranage Error'
  rescue RuntimeError
    p 'Runtime Error'
  rescue => e
    p 'some other error'
end

#=> "Standard or Ranage Error"
```

# Custom Exception

Simply Follow the steps below.

(1) Make a new Class

```ruby
class CustomError < StandardError
end
```

(2) Add a message

```ruby
class CustomError < StandardError
  def initialize(msg="My Error")
    super
  end
end
```

(3) Add custom data attributes to your exception
 
 ```ruby
class CustomError < StandardError
  attr_reader :atr
  def initialize(msg="My Error", atr="atrribute")
    @atr = atr
    super(msg)
  end
end
```

## Example

```ruby
class CustomError < StandardError
  attr_reader :atr

  def initialize(msg="My Error", atr="atrribute")
    @atr = atr
    super(msg)
  end
end


begin
  raise CustomError.new("CustomMessage", "Custom Attribute")
rescue => e
  p e.message #=> "CustomMessage"
  p e.atr  #=> "Custom Attribute"
end
```

# References
- [【Ruby】例外処理 - Qiita](https://qiita.com/tsubasakat/items/6825bcefcad26da3471b)
- [Custom exceptions in Ruby - Honeybadger Developer Blog](https://www.honeybadger.io/blog/ruby-custom-exceptions/)
