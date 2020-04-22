---
title: 'JS-TS Tips'
slug: js-ts-tips
date: 2019-12-09
language: english
category: TypeScript
tags:
  - JavaScript
  - TypeScript
  - Tips
published: true
description: 'Here are some tips about JavaScript I learned while I was working on some projects.'
---

# Tips Related to JS/TS Syntax

## Only use let if necessary

Using let could cause unnecessary complexity in your code.
That said, the important thing is that you understand the differences of `let`, `const` and `var` and use them appropriately based on what you are trying to do.

Here are the diffenreces between `let` and `const`.

### let

- Variables declared with `let` can not be redeclared. But you can reassign a new value.

```js
let name = 'John'
console.log(name) //=> John

name = 'Mike'
console.log(name) //=> Mike

let name = 'Nick' //=> SyntaxError: redeclaration of let name
```

### const

- Variables declared with `const` can not be redeclared and you can not reassign a new value.

```js
const name = 'John'
console.log(name) //=> John

name = 'Mike' //=> TypeError: invalid assignment to const `name'

const name = 'Nick' //=> SyntaxError: redeclaration of let name
```

## Use Early Return

Use an `early return` to clean up your code.

```js
if (condition) return
```

## Object Destructuring

`Object Destructinrg` is another way to clean up your code and make it easier for other people to understand and read.

```js
const { created_at: createdAt, password_updated_at: passwordUpdatedAt } = user
```

```js
const params = { a: "A", b: "B", c: "C" }
const test = ({a, b, c}) => {
  console.log(`${a}${b}${c}`
}
```

## Make your function more succinct

```js
;() => {
  return hoge
}
```

can be written as:

```js
;() => hoge
```

## Use filter to remove empty strings from an array

```js
.filter(string => string)
```

## Short Circuit Conditionals

```js
if (available) {
  addToCart()
}
```

Can be written as:

```js
available && addToCart()
```

## Logical Operators

`!var`: Returns false if its single operand can be converted to true; otherwise, returns true.

```js
if (!user) {
  return 'none'
}
```

## Use a variable for a key in a JavaScript object literal

You can use a variable as a key in object with the brackets notation.

```js
var obj = {
  [key]: value,
}
```

## Conditionally setting a variable

You don't need to write an extra if-statement if you use this solution.

```js
const timezone = user.preferred_timezone || 'America/New_York'
```

The code above looks much cleaner compared to the one below.

```js
let timezone = 'America/New_York'
if (user.preferred_timezone) {
  timezone = user.preferred_timezone
}
```

## Format number as currency

```js
number.toLocaleString('en-GB', {
  style: 'currency',
  currency: 'GBP',
})

number.toLocaleString('ja-JP', {
  style: 'currency',
  currency: 'JPY',
})
```

- [An Awesome Way to Format Numbers in JavaScript](https://dev.to/sudo_kaizen/using-tolocalestring-for-number-objects-in-javascript-1bfh)

## Check both null and undefined

You can check both null and undefined in one hit with `==`.

```ts
if (x == null)
```

If you use `===`, it will only be true for values set to null and won't evaluate as true for undefined variables.

```ts
if (x === null)
```

- [Is there a way to check for both `null` and `undefined`?](https://stackoverflow.com/questions/28975896/is-there-a-way-to-check-for-both-null-and-undefined)

## Extract certain properties from an object

You can do this by using Object Destructuring and Property Shorthand.

```js
const object = { a: 5, b: 6, c: 7 }
const picked = (({ a, c }) => ({ a, c }))(object)

console.log(picked) // { a: 5, c: 7 }
```

or

```ts
interface ISpecific {
  name: string
}

const someObject = {
  name: 'Fenton',
  age: 21,
}

let { age, ...subset } = someObject
```

- [How to get a subset of a javascript object's properties](https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties)
- [TypeScript - extract interface members only - possible?](https://stackoverflow.com/questions/50839597/typescript-extract-interface-members-only-possible)

## Add object to an array

```ts
interface Obj {
  name: string
}

const arr: Obj[] = []

const obj1 = { name: 'K-Sato' }

const newArray = [...arr, obj1]
console.log(newArray) //=> [{{ name: "K-Sato" }}]
```

or

```ts
arr.concat(obj1)

console.log(newArray)
```

# TS Types

## Differences between interfaces and types in TypeScript

- TypeScript Type declaration can introduce a name for any kind of type including primitive, union or intersection type. Interface declaration always introduced the named object type.
- The syntax for Type can be written as ‘type ABC = {a: number; b: number;}’. The syntax for interface can be written as ‘interface ABC = {a: number; b: number;}’.
- In TypeScript, type does not create a new name for instance. In TypeScript, an interface can create the new name that can be used everywhere.
- Type does not have a functionality of extending. An interface can extend multiple interfaces and class as well.
- Type is mainly used when a union or tuple type needs to be used. In typescript, sometimes developers cannot express some of the shapes with an interface.

[TypeScript Type vs Interface](https://www.educba.com/typescript-type-vs-interface/)

## 可変長引数

TS では可変長引数の部分の型は配列にします。次の例では`...bar`に`number[]`型が付いているため、2 番目以降の引数は全て数値でなければいけません。

```typescript
const func = (foo: string, ...bar: number[]) => bar

func('foo')
func('bar', 1, 2, 3)
// エラー: Argument of type '"hey"' is not assignable to parameter of type 'number'.
func('baz', 'hey', 2, 3)
```

## インデックスシグネチャ

オブジェクト型には実は今まで紹介した他にも記法があります。その一つがインデックスシグネチャです。

```typescript
interface MyObj {
  [key: string]: number
}

const obj: MyObj = {}

const num: number = obj.foo
const num2: number = obj.bar
```

## 関数シグネチャ

実は、オブジェクト型の記法で関数型を表現する方法があります。

```typescript
interface Func {
  (arg: number): void
}

const f: Func = (arg: number) => {
  console.log(arg)
}
```

## Resources

- [TS 型の入門](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a)
- [TS 型の初級](https://qiita.com/uhyo/items/da21e2b3c10c8a03952f)
