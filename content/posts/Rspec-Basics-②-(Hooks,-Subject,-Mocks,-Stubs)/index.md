---
title: "Rspec Basics ② (Hooks, Subject, Mocks, Stubs)"
description: You can specify when to run a set of code by using hooks. The most common hooks in Rspec are before and after hooks. With before and after hooks, you can create, delete or update the data very flexibly.  The Let keyword helps DRY up your tests.  If you write let(:foo){ ... }, you can retribute values that are defines in { ... } from foo.
 
slug: rspec-basics-hooks-subject-mocks-stubs
date: 2018-09-20
language: english
cover: ./cover.png
tags: 
  - Rails
  - Ruby
  - Rspec
  - Test
  - Tutorial
---
# Before and After hooks

You can specify when to run a set of code by using `hooks`.
The most common hooks in Rspec are `before` and `after` hooks.

```ruby
before(:example) #run before each example
before(:each) #run before each example
before(:context) # run one time only, before all of the examples in a group
before(:all) # run one time only, before all of the examples in a group

after(:example) # run after each example
after(:each) # run after each example
after(:context) # run one time only, after all of the examples in a group
after(:all) # run one time only, after all of the examples in a group
```

`before` and `after` blocks are called in the fallowing order.

```ruby
before :context(all)
before :example(each)
after  :example(each)
after  :context(all)
```

Let's see some examples below.

```Ruby
describe 'Post' do
  before(:each) do
    puts 'before(:each)'
  end
  before(:all) do
    puts 'before(:all)'
  end
  after(:each) do
    puts 'after(:each)'
  end
  after(:all) do
    puts 'after(:all)'
  end

  it 'tests hooks' do
    puts 'test case1'
  end

  it 'tests hooks' do
    puts 'test case2'
  end
end
```

The result of the above code would be like this.

```Ruby
before(:all)
before(:each)
test case1
after(:each)
before(:each)
test case2
after(:each)
after(:all)
```

With `before` and `after` hooks, you can create, delete or update the data very flexibly.

```Ruby
  describe 'Hooks' do
    before(:all) do
      @obj1 = 'string'
    end

    it 'tests before(all)' do
      expect(@obj1).to include('s')
    end
  end
```

# Let

`let` helps DRY up your tests. If you write `let(:foo){ ... }`, you can retribute values that are defines in `{ ... }` from `foo`.

Here is what I mean.

```Ruby
  describe 'Let' do
    let(:post) { Post.new(title: 'Ruby', author: 'J') }

    it 'tests let' do
      puts post.title #=> Ruby
      puts post.author #=> J
    end
  end
```

As you can see in the code above, `post` has `{ title: 'Ruby, author: 'J' }` and you can retrieve those values with `post.title` and `post.author`.

## Let is lazily evaluated

One thing you should keep in your mind about `let` is that it is lazily evaluated that means it is not evaluated until the first time it's invoked. You can use `let!` to force the method's invocation before each example.

```Ruby
 describe 'Let' do
    let(:post) { Post.new(title: 'Ruby', author: 'J') } #let is not evaluated here.

    it 'tests let' do
      puts post.title #=> Ruby #let(:post) is evaluated here.
      puts post.author #=> J
    end
  end
```

The value will be cached across multiple calls in the same example but **not across examples**.

```Ruby
$count = 0

describe "let" do
  let(:count) { $count += 1 } #Add 1 to count every time let is evaluated.

  it "memoizes the value" do
    count.should == 1
    count.should == 1 #The value will be cached across multiple calls in the same example.
  end

  it "is not cached across examples" do
    count.should == 2 #The value is NOT cached across examples
  end
end
```

## Practical examples of "let"

I am going to compare two sets of code to show how `let` DRYs your code up.
In **Example①**, I'll write specs without `let`, while in **Example②**, I'll test the same things with `let`.

**Example①**

```Ruby
describe 'Post' do

  context 'When the author is Jack' do
    before(:all) do
      post = Post.new(title: 'Ruby', author: 'Jack')
    end

    it 'was posted by Jack' do
      expect(post.author).to eq 'Jack'
    end
  end

  context 'When the author is Mike' do
    before(:all) do
      post = Post.new(title: 'Ruby', author: 'Mike')
    end

    it 'was posted by Mike' do
      expect(post.author).to eq 'Mike'
    end
  end
end
```

In **Example①**, there are two `before` blocks that virtually do the same thing and it seems very redundant. So I'll DRY it up in the **Example②**.

**Example②**

```Ruby
describe 'Post' do
  let(:post) { Post.new(params) }
  let(:params) { { title: 'Ruby', author: author } }

  context 'When the author is Jack' do
    let(:author) { 'Jack' }

    it 'was posted by Jack' do
      expect(post.author).to eq 'Jack'
    end
  end

  context 'When the author is Mike' do
    let(:author) { 'Mike' }

    it 'was posted by Mike' do
      expect(post.author).to eq 'Mike'
    end
  end
end
```

In **Example②**, I defined `let` before two example-groups and only changed the `author` of `post` in each context. This prevents you from defining essentially the same thing over and over again.

# Subject

The `subject` keyword refers to the object being tested. For instance, `Post` is the subject of this example group in the code below.

```Ruby
describe Post do
  #tests
end
```

## Implicitly defined subject

By default, If the first argument to the outermost example group is a class, RSpec implicitly creates an instance of that class and assigns it to the subject.

```Ruby
describe Post do
  it 'is implicitly instatiated by Rspec' do
    expect(subject).to be_an(Post) #You can refer to the object as 'subject'
  end
end
```

In the code above, `subject` is used in the example even though it is not defined anywhere in the code. This is because Rspec implicitly created an instance from `Post` and assigned it to `subject`.

## Explicit subject

`subject` also can be defined explicitly. Readers can see how it's instantiated.

```Ruby
describe Post do
  subject { Post.new }
  it 'tests subject' do
    expect(subject).to be_a(Post)
  end
end
```

You can give the subject a name.

```Ruby
describe Post do
  subject(:post) { Post.new }
  it 'tests subject' do
    expect(post).to be_a(Post)
  end
end
```

Even if you name the subject, you can still refer to it anonymously:

```Ruby
describe Post do
  subject(:post) { Post.new }
  it 'tests subject' do
    expect(subject).to be_a(Post)
  end
end
```

## One-liner syntax

RSpec supports a `one-liner syntax` for setting an expectation on the
subject. With Rspec `one-liner syntax`, you can make code like **Example③** shorter like **Example④**.

**Example③**

```Ruby
describe Post do
  it 'is implicitly instantiated by Rspec' do
    expect(subject).to be_an(Post)
  end
end
```

**Example④**

```Ruby
describe Post do
  it { is_expected.to be_a(Post) }
end
```

You can see more information about `subject` and `one-liner syntax` [here](https://relishapp.com/rspec/rspec-core/v/3-8/docs/subject/one-liner-syntax)

# Mocks and Stubs

## Test Doubles

A test `double` is an object that stands in for another object in your system during a code
example.

```ruby
# ex1
book = double("book", name: 'bookName')
book #=> #<Double "book">
book.name #=> bookName

# ex2
book = instance_double("Book", pages: 250)
book #=> #<InstanceDouble(Book) (anonymous)>
book.pages #=> 250
```

## Method Stubs

A `method stub` is an instruction to an object (real or test double) to return a
known value in response to a message.

```ruby
# ex1
book = double("Book")
allow(book).to receive(:sell).and_return("The book is sold")
book.sell #=> The book is sold"

# ex2
client = double("ClamAV::Client", execute: [response]) # bouble
allow(ClamAV::Client).to receive(:new).and_return(client) # stub

# ex3 (Arguments)
allow(obj).to receive(:message).with('an argument') { ... }
obj.stub(:message).with('an argument') { ... }
obj.stub(:message).with('more_than', 'one_argument') { ... }

# ex4 (any_instance_of)
allow_any_instance_of(Object).to receive(:foo).and_return(true)
allow_any_instance_of(Object).to receive(:foo).with(:param_one, :param_two).and_return(:result_one)
```

Check out the links below for more information about mocks and stubs.

- [RSpec Mocks 3.8](https://relishapp.com/rspec/rspec-mocks/docs)
- [Method stubs](https://relishapp.com/rspec/rspec-mocks/v/2-14/docs/method-stubs)
- [Any Instance](https://relishapp.com/rspec/rspec-mocks/docs/working-with-legacy-code/any-instance)
