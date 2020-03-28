---
title: 'Understand how promises work in JavaScript'
slug: understand-how-promises-work-in-javaScript
date: 2019-06-17
language: english
category: Javascript
tags:
  - Promise
published: true
description: 'I wrote this post to understand how promises work in JavaScript.'
---

# What is a promise?

A `promise` is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: `fulfilled`, `rejected`, or `pending`. Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.

# How to use it

`new Promise` creates a promise object with a function that gets executed right after the promise object is called with `then`, `catch` or `finally`.
You can, for instance, pass a function that fetches data from a server to `new Promise` and use the created promise object to call other functions with the data you fetched.
The function that is passed to `new Promise` should call `resolve` or `reject` to indicate the state of the promise object.

- resolve(value) — if the job finished successfully, with result value.
- reject(error) — if an error occurred, error is the error object.

```js
const DATA = { name: 'K-Sato', age: 24 }

let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(DATA), 1000)
})

promise.then(result => console.log(result))
```

Just changed the name of the promise object.

```js
const DATA = { name: 'K-Sato', age: 24 }

let dataFetch = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(DATA), 1000)
})

dataFetch.then(result => console.log(result))
```

## Properties

The resulting promise object has internal properties:

- `state` — initially “pending”, then changes to either “fulfilled” or “rejected”,
- `result` — an arbitrary value, initially undefined.

When the executor finishes the job, it should call one of the functions that it gets as arguments:

- `resolve(value)` — to indicate that the job finished successfully:
  - sets state to "fulfilled",
  - sets result to value.
- `reject(error)` — to indicate that an error occurred:
  - sets state to "rejected",
  - sets result to error.

The function passed to `new Promise` is called the executor. When the promise is created, this executor function runs automatically.
The executor should do a job (something that takes time usually) and then call resolve or reject to change the state of the corresponding Promise object.

```javascript
let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed
  // executor
  setTimeout(() => resolve('done'), 1000)
})
```

## then

The syntax is:

```javascript
promise.then(
  function(result) {
    /* handle a successful result */
  },
  function(error) {
    /* handle an error */
  }
)
```

## The first argument of `then` is a function that

- runs when the promise is resolved, and
- receives the result.

## The second argument of `then` is a function that

- runs when the promise is rejected, and
- receives the error.

```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve('done!'), 1000)
})

// resolve runs the first function in .then
promise.then(
  result => alert(result), // shows "done!" after 1 second
  error => alert(error) // doesn't run
)
```

## catch

If we’re interested only in errors, then we can use null as the first argument: `.then(null, errorHandlingFunction)`. Or we can use `.catch(errorHandlingFunction)`, which is exactly the same:

```javascript
let promise = new Promise((resolve, reject) => {
 setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
The call .catch(f) is a complete analog of .then(null, f), it’s just a shorthand.
```

## finally

Just like there’s a `finally` clause in a regular `try {...} catch {...}`, there’s finally in promises.

The call `.finally(f)` is similar to `.then(f, f)` in the sense that it **always** runs when the promise is settled: be it resolve or reject.

`finally` is a good handler for performing cleanup, e.g. stopping our loading indicators, as they are not needed anymore, no matter what the outcome is.

Like this:

```javascript
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve/reject */
})
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
  .then(result => show result, err => show error)
It’s not exactly an alias of then(f,f) though. There are several important differences:
```

A `finally` handler has no arguments. In finally we don’t know whether the promise is successful or not. That’s all right, as our task is usually to perform “general” finalizing procedures.

A `finally` handler passes through results and errors to the next handler.

For instance, here the result is passed through finally to then:

```javascript
new Promise((resolve, reject) => {
  setTimeout(() => resolve('result'), 2000)
})
  .finally(() => alert('Promise ready'))
  .then(result => alert(result)) // <-- .then handles the result
```

And here there’s an error in the promise, passed through finally to catch:

```javascript
new Promise((resolve, reject) => {
  throw new Error('error')
})
  .finally(() => alert('Promise ready'))
  .catch(err => alert(err)) // <-- .catch handles the error object
```

That’s very convenient because `finally` is not meant to process a `promise` result. So it passes it through.

# References

- [JavaScript Promises for Dummies ― Scotch.io](https://scotch.io/tutorials/javascript-promises-for-dummies)
- [Promise](https://javascript.info/promise-basics)
- [Master the JavaScript Interview: What is a Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
- [Async/await](https://javascript.info/async-await)
- [Promises in JavaScript explained whimsically](https://medium.com/@kevinyckim33/what-are-promises-in-javascript-f1a5fc5b34bf)
