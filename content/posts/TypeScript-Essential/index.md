---
title: 'TypeScript Essential'
slug: typeScript-essential
date: 2020-05-03
language: english
category: TypeScript
tags:
  - TypeScript
published: true
description: 'This is a post for me to solidify the basic knowledge about Typescript I learnt from TypeScript Handbook'
---

# About this post

This is a post for me to solidify the basic knowledge about Typescript I learnt from [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html).

**Everything you see here can be found in [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) with more detailed explanations.**

# Basic types

## Tuple

`Tuple` types allow you to express an array with a fixed number of elements whose types are known, but need not be the same.

```ts
// Declare a tuple type
let x: [string, number]
// Initialize it
x = ['hello', 10] // OK
// Initialize it incorrectly
x = [10, 'hello'] // Error
```

## Never

The `never` type represents the type of values that never occur.
For instance, never is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns.

```ts
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message)
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
  while (true) {}
}
```

## Object

`object` is a type that represents the non-primitive type, i.e. anything that is not `number`, `string`, `boolean`, `bigint`, `symbol`, `null`, or `undefined`.

```ts
declare function create(o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK

create(42) // Error
create('string') // Error
create(false) // Error
create(undefined) // Error
```

## Type assertions

Type assertions are a way to tell the compiler “trust me, I know what I’m doing.”.

It has no runtime impact, and is used purely by the compiler. TypeScript assumes that you, the programmer, have performed any special checks that you need.

```ts
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length
```

And the other is the as-syntax:

```ts
let someValue: any = 'this is a string'

let strLength: number = (someValue as string).length
```

The two samples are equivalent. Using one over the other is mostly a choice of preference.
However, when using TypeScript with JSX, only as-style assertions are allowed.

# Interfaces

## Readonly propertyies

Some properties should only be modifiable when an object is first created. You can specify this by putting readonly before the name of the property.

```ts
interface Point {
  readonly x: number
  readonly y: number
}
```

You can construct a `Point` by assigning an object literal.
After the assignment, `x` and `y` can’t be changed.

```ts
let p1: Point = { x: 10, y: 20 }
p1.x = 5 // error!
```

TypeScript comes with a `ReadonlyArray<T>` type that is the same as `Array<T>` with all mutating methods removed.

```ts
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // error!
ro.push(5) // error!
ro.length = 100 // error!
a = ro // error!
```

On the last line of the snippet you can see that even assigning the entire `ReadonlyArray` back to a normal array is illegal.

You can still override it with a type assertion, though.

```ts
a = ro as number[]
```

### readonly vs const

The easiest way to remember whether to use `readonly` or `const` is to ask whether you’re using it on a `variable` or a `property`.

Variables use `const` whereas properties use `readonly`.

## Index signatures

Here we’re saying a SquareConfig can have any number of properties, and as long as they aren’t color or width, their types don’t matter.

```ts
interface SquareConfig {
  color?: string
  width?: number
  [propName: string]: any
}
```

## Indexable Types

we can also describe types that we can “index into” like `a[10]`, or `ageMap["daniel"]`.

Indexable types have an index signature that describes the types we can use to index into the object, along with the corresponding return types when indexing.

```ts
interface StringArray {
  [index: number]: string
}

let myArray: StringArray
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]
```
