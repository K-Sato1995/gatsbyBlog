---
title: 'JS-TS Tips'
slug: js-ts-tips
date: 2019-12-09
language: english
category: Javascript
tags:
  - JavaScript
  - Tips
published: true
description: 'Here are some tips about JavaScript I learned while I was working on some projects.'
---

# Tips Related to JS/TS Syntax

## Only use let if necessary

Using let could cause unnecessary complexity in your code.
What's the difference between them?

- Variables declared with `let` can not be redeclared. But you can reassign a new value.

```js
let name = 'John'
console.log(name) //=> John

name = 'Mike'
console.log(name) //=> Mike

let name = 'Nick' //=> SyntaxError: redeclaration of let name
```

- Variables declared with `const` can not be redeclared. And you can not reassign a new value.

```js
const name = 'John'
console.log(name) //=> John

name = 'Mike' //=> TypeError: invalid assignment to const `name'

const name = 'Nick' //=> SyntaxError: redeclaration of let name
```

## Use Early Return

```js
if (condition) return
```

## Object Destructuring

Here are some examples.

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

can be writte n as:

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

!var: Returns false if its single operand can be converted to true; otherwise, returns true.

```js
if (!user) {
  return 'none'
}
```

## Differences between interfaces and types in TypeScript

- TypeScript Type declaration can introduce a name for any kind of type including primitive, union or intersection type. Interface declaration always introduced the named object type.
- The syntax for Type can be written as ‘type ABC = {a: number; b: number;}’. The syntax for interface can be written as ‘interface ABC = {a: number; b: number;}’.
- In TypeScript, type does not create a new name for instance. In TypeScript, an interface can create the new name that can be used everywhere.
- Type does not have a functionality of extending. An interface can extend multiple interfaces and class as well.
- Type is mainly used when a union or tuple type needs to be used. In typescript, sometimes developers cannot express some of the shapes with an interface.

[TypeScript Type vs Interface](https://www.educba.com/typescript-type-vs-interface/)

## Use a variable for a key in a JavaScript object literal?

You can use a variable as a key in object with the brackets notation.

```js
var obj = {
  [key]: value,
}
```

# TS Types

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
