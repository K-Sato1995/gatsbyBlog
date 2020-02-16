---
title: "TypeScript 101"
slug: typescript-101
date: 2019-11-11
language: english
cover: ./cover.png
generate-card: false
tags:
  - TypeScript
description: "Some important concepts in TypeScrips "
---
# Types

## Union Type

Quite commonly in JavaScript you want to allow a property to be one of multiple types e.g. a string or a number. This is where the union type (denoted by `|` in a type annotation e.g. `string|number`) comes in handy.

```ts
function formatCommandline(command: string[] | string) {
  var line = "";
  if (typeof command === "string") {
    line = command.trim();
  } else {
    line = command.join(" ").trim();
  }

  // Do stuff with line: string
}
```

## Type Alias

TypeScript provides convenient syntax for providing names for type annotations that you would like to use in more than one place. The aliases are created using the type SomeName = someValidTypeAnnotation syntax. An example is demonstrated below:

```ts
type StrOrNum = string | number;

// Usage: just like any other notation
var sample: StrOrNum;
sample = 123;
sample = "123";

// Just checking
sample = true; // Error!
```

## Sample Code

```ts
// Basic Types
var nickName: string = "K-Sato";
const age: number = 24;
let male: boolean = true;
let extraInfo: any = { natinality: "Japan", pet: "Dog" };

console.log(nickName, age, male, extraInfo); //=> K-Sato 123 true { natinality: 'Japan', pet: 'Dog' }

// Arrays
const strArray: string[] = ["A", "B"];
let numArray: number[] = [1, 2, 3];
let numArray2: Array<number> = [1, 2, 3];

console.log(strArray, numArray, numArray2); ///=> [ 'A', 'B' ] [ 1, 2, 3 ] [ 1, 2, 3 ]

// Enums
enum Color {
  Red,
  Green,
  Blue
}

console.log(Color.Red); //=> 0

// Union Type
let year: string | number;
year = 24;
year = "24";
console.log(typeof year); //=> string

function me(info: string | number): void {
  console.log(info);
}
console.log(me("K-Sato")); //=> K-Sato
console.log(me(24)); //=> 24

// Tuple Type
let person: [string, number] = ["K-Sato", 234];
console.log(person); //=> [ 'K-Sato', 234 ]

// Type Alias
type StNum = string | number;
var log: StNum = 2;
console.log(log); //=> 2
```

# Interfaces

Interfaces have zero runtime JS impact. There is a lot of power in TypeScript interfaces to declare the structure of variables.

The following two are equivalent declarations, the first uses an inline annotation, the second uses an interface:

```ts
// Sample A
declare var myPoint: { x: number; y: number };

// Sample B
interface Point {
  x: number;
  y: number;
}
declare var myPoint: Point;
```

However, the beauty of Sample B is that if someone authors a library that builds on the myPoint library to add new members, they can easily add to the existing declaration of myPoint:

## Function Types

`Interfaces` are also capable of describing function types.

To describe a function type with an interface, we give the interface a call signature

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

Once defined, we can use this function type interface like we would other interfaces.

```ts
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
```

## References

- [Interfaces · TypeScript](https://www.typescriptlang.org/docs/handbook/interfaces.html)

## Sample Code 

```ts
// Interfaces
interface Person {
  name: string;
  age?: number; // ? means that the propery is optionable
}

var ken: Person = {
  name: "K-Sato",
  age: 25
};

function fullName(p: Person): string {
  return `I'm ${p.name} and I'm ${p.age} years old.`; //=> I'm K-Sato and I'm 25 years old.
}

console.log(fullName(ken));

// Array as a property
interface CredentialInfo {
  id: number;
  tokens: string[];
}

var items: CredentialInfo = {
  id: 2,
  tokens: ["token1", "token2"]
};

console.log(items); //=> { id: 2, tokens: [ 'token1', 'token2' ] }

// Array of object as a property
interface Post {
  title: string;
  content: string;
}
interface User {
  id: number;
  name: string;
  posts: Post[];
}

var post1: Post = {
  title: "Title",
  content: "BORING"
};
var post2: Post = {
  title: "Title",
  content: "BORING"
};

var currentUser: User = {
  id: 1,
  name: "K-Sato",
  posts: [post1, post2]
};

console.log(currentUser);
// => { id: 1, name: 'K-Sato', posts: [ { title: 'Title', content: 'BORING' }, { title: 'Title', content: 'BORING' } ] }

// Function Interfaces
interface satoFunc {
  (name: string, age: number): string;
}

let myFunc: satoFunc;
myFunc = function(name: string, age: number) {
  return `I'm ${name}, I'm ${age}`;
};
console.log(myFunc("K-Sato", 24));
```

# Generics

The implementation of generics in Typescript give us the ability to pass in a range of types to a component, adding an extra layer of abstraction and re-usability to your code. Generics can be applied to functions, interfaces and classes in Typescript.

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

We’ve now added a type variable `T` to the identity function. This `T` allows us to capture the type the user provides.

It works over a range of types. Unlike using any, it’s also just as precise (ie, it doesn’t lose any information) as the first identity function that used numbers for the argument and return type.

Once we’ve written the generic identity function, we can call it in one of two ways.

```ts
let output = identity<string>("myString"); // type of output will be 'string'
let output = identity("myString"); // type of output will be 'string'
```

## References

- [Generics explained](https://medium.com/@rossbulat/typescript-generics-explained-15c6493b510f)
- [Typescript Generics](https://www.typescriptlang.org/docs/handbook/generics.html)

## Sample Code

```ts
// Basics
function identity<T>(arg: T): T {
  return arg;
}
/* The T allows us to capture the type the user provides */
console.log(identity<string>("K-Sato"));
console.log(identity<number>(2));
console.log(identity<boolean>(true));
console.log(identity("K-Sato"));
interface Article {
  title: string;
  views: number;
}
console.log(identity<Article>({ title: "title", views: 2 }));

// Working with arrays
function arr<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

arr<number>([2, 3, 4]);
arr<string>(["A", "B"]);

// Generic Types
interface GenericIntentity {
  <T>(arg: T): T;
}
let myIdentity: GenericIntentity = identity;
console.log(myIdentity<number>(2));

// Generic Interfaces
interface Identities<V, W> {
  id1: V;
  id2: W;
}

function showIdentities<T, U>(arg1: T, arg2: U): Identities<T, U> {
  let values: Identities<T, U> = {
    id1: arg1,
    id2: arg2
  };
  return values;
}
console.log(showIdentities(<string>"test", <number>2)); //=> { id1: 'test', id2: 2 }
```

# Functions

## Sample Code 

```ts
// Named Function
function add(x: number, y: number): number {
  return x + y;
}
console.log(add(2, 4)); //=> 6

// Arrow Function
const add2 = (x: number, y: number): number => {
  return x + y;
};
console.log(add2(2, 4)); //=> 6

// Optional Parameters
const add3 = (x?: number, y?: number): number => {
  if (y) return x + y;
  else return 100;
};
console.log(add3(2)); //=> 100

// Default Parameters
const add4 = (x: number, y = 10): number => {
  return x + y;
};
console.log(add4(2)); //=> 12

// Object as an argument
const showPost = (thing: { name: string }): string => {
  return thing.name;
};
console.log(showPost({ name: "NAME" })); //=> NAME

const showObject = (ob: { name: string; age: number | string }): any => {
  return { name: ob.name, age: ob.age };
};
console.log(showObject({ name: "test", age: 23 })); //=> { name: 'test', age: 23 }
```

# References 
- [TS Dojo](https://github.com/K-Sato1995/ts_dojo)
