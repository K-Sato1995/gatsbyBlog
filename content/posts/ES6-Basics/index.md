---
title: 'ES6 Basics'
slug: es6-basics
date: 2018-10-12
language: english
category: JavaScript
tags:
  - ES6
  - JavaScript
published: true
description: 'Some new features were introduced in ES6. I will cover some of the most fundemental ones in this post.'
---

# Variable declaration with const and let

You can use `var`, `let` or `const` to declare a variable.

## Let

Variables declared with `let` can not be redeclared. But you can reassingn a new value.

```javascript
let name = 'John'
console.log(name) //=> John

name = 'Mike'
console.log(name) //=> Mike

let name = 'Nick' //=> SyntaxError: redeclaration of let name
```

## Const

Variables declared with `const` can not be redeclared. And you can not reassingn a new value.

```javascript
const name = 'John'
console.log(name) //=> John

name = 'Mike' //=> TypeError: invalid assignment to const `name'

const name = 'Nick' //=> SyntaxError: redeclaration of let name
```

# The scope of let and const

The `let` and `const` statements declare block scope local variables unlike `var`.

**Example of var**

```javascript
var x = 10
console.log(x) //=>10

{
  var x = 5
  console.log(x) //=>5
}

console.log(x) //=> 5
```

**Example of let**

```javascript
let x = 10
console.log(x) //=>10

{
  let x = 5
  console.log(x) //=>5
}

console.log(x) //=> 10
```

**Example of const**

```javascript
const x = 10
console.log(x) //=> 10

{
  const x = 5
  console.log(x) //=> 5
}

console.log(x) //=> 10
```

# String Interpolation

You can use `template literals` to read the value of a variable in a string.

```javascript
let name = 'Mike'

console.log(`I am ${name}`) //=> I am Mike
```

# Arrow function

`Arrow Function` was introduced in ES6.

**ES5 style function**

```javascript
function greeting(name) {
  console.log('Hello' + ' ' + name)
}

greeting('Mike') //=>Hello Mike
```

**ES6 style function**

```javascript
const greeting = name => {
  console.log(`Hello ${name}`)
}

greeting('Mike') //=> Hello Mike
```

# Default parameters

You can assign the default value to an argument.

```javascript
const add = (x, y = 10) => {
  console.log(x + y)
}

add(5) //=> 15
```

# Class Expression

The class expressiong is syntactical sugar over JavaScript's existing prototype-based inheritance.

```javascript
class Car {
  constructor(name) {
    this.name = name
  }

  displayinfo() {
    console.log(this.name)
  }
}

const car1 = new Car('Honda')

car1.displayinfo() //=> Honda
```

# Class Inheritance

Classes can extend one another using `extends`.

```javascript
class Car {
  constructor(name) {
    this.name = name
  }

  displayinfo(name) {
    console.log(this.name)
  }
}

class Track extends Car {
  constructor(name) {
    super()
    this.name = name
  }
}

track1 = new Track('TL')
track1.displayinfo() //=> TL
```

# Spread Operator

Here are some usages of the `spread operator`.

## Spread an array

```javascript
const arr = [2, 3]

console.log(...arr) //=> 2, 3
```

## Combine arrays

```javascript
const arr = [2, 3]
const arr2 = [1, ...arr, 4, 5]

console.log(arr2) //=> Array(5) [ 1, 2, 3, 4, 5 ]
```

## Get multiple arguments as an array

```javascript
const arr = (arg1, ...args) => {
  console.log(arg1, args)
}

arr(1, 2, 3, 4, 5) //=> 1 Array(4) [ 2, 3, 4, 5 ]
```
