---
title: 'JavaScript Logical Operators'
slug: javascript-logical-operators
date: 2019-11-14
language: english
category: Javascript
tags:
  - Javascript
published: true
description: 'The post is about what a !(exclamation mark) means in JS'
---

# What an exclamation mark means in JS/TS

```
!var: Returns false if its single operand can be converted to true; otherwise, returns true.
```

That means if `var` is either `null`, `false` or `undefined`, the result of `!var` would be `true`.
And if `var` is something else, the result of `!var` is `false`.

Here is an example.

When the variable is not `null`, `false` or `undefined`, it does not execute the code in the condition.

```js
var user = { name: 'K-Sato', age: 23 }

if (!user) {
  console.log('Not executed')
}
```

But if the variable is `null`, `false` or `undefined`, the code in the condition gets executed.

```js
var user = null

if (!user) {
  console.log('Executed')
}
```

# Resources

- [Logical operators - JavaScript \| MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)
