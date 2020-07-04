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

# Only use let if necessary

Using let could cause unnecessary complexity in your code.
That said, the important thing is you understand the differences between `let`, `const` and `var` and use them appropriately.

## let

- Variables declared with `let` can not be redeclared. But you can reassign a new value.

```js
let name = 'John'
console.log(name) //=> John

name = 'Mike'
console.log(name) //=> Mike

let name = 'Nick' //=> SyntaxError: redeclaration of let name
```

## const

- Variables declared with `const` can not be redeclared and you can not reassign a new value.

```js
const name = 'John'
console.log(name) //=> John

name = 'Mike' //=> TypeError: invalid assignment to const `name'

const name = 'Nick' //=> SyntaxError: redeclaration of let name
```

# Use Early Return

Use `early return`s to clean up your code.

```js
if (condition) return
```

# Object Destructuring

`Object Destructinrg` is another way to clean up your code.

```js
const { created_at: createdAt, password_updated_at: passwordUpdatedAt } = user
```

```js
const params = { a: "A", b: "B", c: "C" }
const test = ({a, b, c}) => {
  console.log(`${a}${b}${c}`
}
```

# Make your function more succinct

```js
;() => {
  return hoge
}
```

can be written as:

```js
;() => hoge
```

# Use filter to remove empty strings from an array

```js
.filter(string => string)
```

# Short Circuit Conditionals

```js
if (available) {
  addToCart()
}
```

Can be written as:

```js
available && addToCart()
```

# Logical Operators

`!var`: Returns false if its single operand can be converted to true; otherwise, returns true.

```js
if (!user) {
  return 'none'
}
```

# Use a variable for a key in a JavaScript object literal

You can use a variable as a key in object with the brackets notation.

```js
var obj = {
  [key]: value,
}
```

# Conditionally setting a variable

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

# Format number as currency

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

# Check both null and undefined

You can check both null and undefined in one hit with `==`.

```ts
if (x == null)
```

If you use `===`, it will only be true for values set to null and won't evaluate as true for undefined variables.

```ts
if (x === null)
```

- [Is there a way to check for both `null` and `undefined`?](https://stackoverflow.com/questions/28975896/is-there-a-way-to-check-for-both-null-and-undefined)

# Extract certain properties from an object

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

# Add object to an array

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

- [How to add an object to an array](https://stackoverflow.com/questions/6254050/how-to-add-an-object-to-an-array)

# Lookup Tables

```ts
const howIsBoo = (state) => {
  if (state === ‘HUNGRY’) return 'WANTS FOOD';
  if (state === ‘SAD’) return 'CRYING';
  if (state === ‘HAPPY’) return 'LAUGHING'
  return 'SLEEPING'
}
```

The code above can be made more efficient by using Objects.

```ts
const booFeelsTable = {
  HUNGRY: 'WANTS FOOD',
  SAD: 'CRYING',
  HAPPY: 'LAUGHING',
}
const howIsBoo = state => booFeelsTable[state] || 'SLEEPING'
```

- [Javascript Patterns ](https://medium.com/@omwri/javascript-patterns-lookup-tables-26bbaf693e24)

# Naked boolean value

Usually a lot of naked true/false in code is considered a smell.

For instance, the code below

```ts
function isNumber(num: number): boolean {
  if (typeof num === 'number') {
    return true
  }
  return false
}
```

can be written as the code below.

```ts
function isNumber(num: number): boolean {
  return typeof num === 'number'
}
```

# Wrapper Class

You can make the code below more expressive without extending the native number prototype by using a wrapper class.

```ts
function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 400 === 0 || year % 100 !== 0)
}

export default isLeapYear
```

```ts
class Year {
  dividend: number

  constructor(dividend: number) {
    this.dividend = dividend
  }

  isDivisibleBy(divisor: number): boolean {
    return this.dividend % divisor === 0
  }
}

function isLeapYear(num: number): boolean {
  const year: Year = new Year(num)

  return (
    year.isDivisibleBy(4) &&
    (year.isDivisibleBy(400) || !year.isDivisibleBy(100))
  )
}

export default isLeapYear
```

# URL type

URL is a typescript "built-in" feature in TypeScript.

```ts
const url: URL = new URL(`https://urlExample.com`)
```

- [Typescript: What is type URL?](https://stackoverflow.com/questions/38197096/typescript-what-is-type-url)

# Rename & Destructure Variables

You can rename a destructre variabele like the code below.

```ts
const data = {
  data1: 'data1',
  data2: 'data2',
}

const { data1: oldData, data2: newData } = data

console.log(oldData, newData)
```

- [Rename & Destructure Variables in ES6](https://wesbos.com/destructuring-renaming)

# Use incudes for multiple conditions

```js
if (x === 'a' || x === 'b' || x === 'c' || x === 'd' || x === 'e') {
  console.log('ok')
}
```

Can be written as the code below using `includes`.

```js
if (['a', 'b', 'c', 'd', 'e'].includes(x)) {
  console.log('ok')
}
```

# Use ... to convert a string into an array

```js
const str = 'kitty'
var newArr = str.split('') // ['k', 'i', 't', 't', 'y'];
```

can be written as

```js
const newArr = [...str] // ['k', 'i', 't', 't', 'y'];
```

# do something N times

I'll list 2 examples here.

```ts
// create an array
const array: number[] = [...Array(numberOfnestedHeadings)]

// Iterate it with forEach
array.forEach((_: any) => console.log('do something'))
```

```ts
Array.from(Array(3)).forEach((x, i) => {
  console.log('do something')
})
```

- [do <something> N times (declarative syntax)](https://stackoverflow.com/questions/10993824/do-something-n-times-declarative-syntax)

# Use a variable in a regular expressions

You can construct a new RegExp object like the code below.s

```js
var replace = 'regex'
var re = new RegExp(replace, 'g')
'mystring'.replace(re, 'newstring')
```

If you need to use an expression like `/\/word\:\w*$/`, be sure to escape your backslashes: `new RegExp( '\\/word\\:\\w*$' )`.

- [How do you use a variable in a regular expression?](https://stackoverflow.com/questions/494035/how-do-you-use-a-variable-in-a-regular-expression)
