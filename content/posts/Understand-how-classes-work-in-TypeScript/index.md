---
title: 'Understand how classes work in TypeScript'
slug: Understand-how-classes-work-in-typeScript
date: 2020-03-27
language: english
category: TypeScript
tags:
  - TypeScript
published: true
pinned: true
description: 'I wrote this post to understand how classes work in TypeScript. The post contains simple explanation of the basic syntax of a class in TypeScript, Inheretance, access modifiers, readonly modifier and abstract classes.'
---

# Basics

Here is an example of a class in TypeScript.

A class mainly consists of the following:

- Properties
- Constructor
- Methods

The syntax should look somewhat familiar if you have used any OOP language before.

```ts
class Person {
  // (1) Property(ies)
  name: string

  // (2) Constructor
  constructor(name: string) {
    this.name = name
  }

  // (3) Method(s)
  intro(): string {
    return `I'm ${this.name}`
  }
}

const nick = new Person('Nick')
nick.intro() //=> I'm Nick
```

# Inheritance

You can inherit another class using `extends` in TypeScript.
As you can see in the example below, a class inherits all the members(like properties and methods) from the base class.
One thing you should pay attention to here is the `super` keyword in the constructor of the `User` class.
In TypeScript, when you want to initialize its own members in a subclass(child class), you have to use the `super` keyword to call the parent constructor and pass the property values.

```ts
class Person {
  name: string

  constructor(name: string) {
    this.name = name
  }

  intro(): string {
    return `I'm ${this.name}`
  }
}

class User extends Person {
  id: number

  constructor(id: number, name: string) {
    // The super keyword
    super(name)
    this.id = id
  }

  showIdName(): void {
    console.log(this.id, this.name)
  }
}

const user1 = new User(1, 'John')

user1.intro() //=> "I'm John"
user1.showIdName() //=> 1 'John'
```

# Public・Private・Protected modifiers

## Public

All the members of a class in TypeScript are `public` by default.
You can also explicitly declare it like the code below. The `public` members can be accessed anywhere even outside the class. And the values of `public` properties can be changed outside the class as well.

```ts
class Pet {
  public type: string

  constructor(type: string) {
    this.type = type
  }
}

let taro = new Pet('mammal')

taro.type //=> mammal
taro.type = 'reptile'
taro.type //=> reptile
```

## Private

The `private` members are only accessible in its class. It even can't be accessed in a subclass.

```ts
class Pet {
  public type: string
  private name: string

  constructor(type: string, name: string) {
    this.type = type
    this.name = name
  }
}

let taro = new Pet('mammal', 'Taro')
taro.name //=> Property 'name' is private and only accessible within class 'Pet'

// Subclass
class SpecialPet extends Pet {
  roar(): void {
    console.log(this.name) //=> Property 'name' is private and only accessible within class 'Pet'
  }
}
```

Or you can use the `private` keyword in the constructor.

```ts
class Pet {
  public type: string

  constructor(type: string, private name: string) {
    this.type = type
  }
}
```

## Protected

The `protected` members are very much like the ones marked as `private`, except that the `protected` members can be accessed in subclasses.
(Here, I changed `name` to a protected property.)

```ts
class Pet {
  public type: string
  protected name: string

  constructor(type: string, name: string) {
    this.type = type
    this.name = name
  }
}

// Subclass
class SpecialPet extends Pet {
  roar(): void {
    console.log(`${this.name}!!!!!!!!!`)
  }
}

let goro = new SpecialPet('mammal', 'Goro')
goro.roar() //=> "Goro!!!!!!!!!"
```

Or you can use the `protected` keyword in the constructor.

```ts
class Pet {
  public type: string

  constructor(type: string, protected name: string) {
    this.type = type
  }
}
```

# Readonly modifier

The properties declared as `readonly` can be accessed outside the class but their values can not be updated(changed).

```ts
class Person {
  readonly name: string

  constructor(name: string) {
    this.name = name
  }
}

const jenny = new Person('Jenny')
jenny.name
jenny.name = 'Jaz' // Cannot assign to 'name' because it is a read-only property.
```

# Static Properties

In TypeScript, the `static` members are only accessed using the class name and dot notation(`.`), without creating an object of the class.

```ts
class School {
  static startingTime: string = '9am'

  static start(): void {
    console.log(`${School.startingTime}!!!!!!!!`)
  }
}

School.startingTime //=> 9am
School.start() //=> 9am!!!!!!!!
```

# Abstract classes

There are mainly two things you should remember about `abstract classes` in TypeScript.

- (1) Abstract classes are only used for inheritance. Thus, You can not create an instance of an abstract class.
- (2) You can define `abstract methods` within an abstract class. The `abstract methods` do not include any actual implementation in the abstract class and they must be implemented in the derived class.

```ts
abstract class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  scream(): void {
    console.log('AAAAAAAAAA')
  }

  // Abstract method
  // It must be implemented in the derived class.
  abstract shout(): void
}

class Dog extends Animal {
  shout(): void {
    console.log('OOOOOOO')
  }
}

// const animal1 = new Animal("name"); //=> Cannot create an instance of an abstract class.ts(2511)
const dog1 = new Dog('Yoppy')
dog1.scream() //=> AAAAAAAAAA
dog1.shout() //=> OOOOOOO
```

# References

- [TypeScript Class](https://www.tutorialsteacher.com/typescript/typescript-class)
- [Classes · TypeScript](https://www.typescriptlang.org/docs/handbook/classes.html#public-private-and-protected-modifiers)
