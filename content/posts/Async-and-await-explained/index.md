---
title: 'Async and await explained'
slug: async-and-await-explained
date: 2019-11-02
language: english
category: Programming
tags:
  - JavaScript
published: true
description: 'A simple explanation about async and await in JavaScript.'
---

# Async

Using `async` simply implies that function returns a promise.

## Example

```js
async function myAsync() {
  return 27
}

myAsync().then(response => {
  console.log(response)
})
//=> 27
```

# Await

The `await` operator is used to wait for a `promise`. It can be used inside an `async` block only. The keyword `await` makes JavaScript wait until the `promise` returns a result.

## Example

```js
async function myAsync() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 1000)
  })

  let result = await promise // wait until the promise resolves

  alert(result) // "done!"
}

myAsync()
```

## Exmple of fetching data

### Example1

```js
const request = async () => {
  const response = await fetch('endpoint_url')
  const json = await response.json()
  return json
}
```

### Example2

```js
const fetchData = async () => {
  const response = await axios.post('endpoint_url').catch(error => {
    alert(error)
  })
  if (response) {
    return response
  }
}
```

## Example3

```js
async function getUserAsync(name) {
  let response = await fetch(`https://api.github.com/users/${name}`)
  let data = await response.json()
  return data
}
```

# References

- [Async/await](https://javascript.info/async-await)
- ["Synchronous" fetch with async/await - DEV Community 👩‍💻👨‍💻](https://dev.to/johnpaulada/synchronous-fetch-with-asyncawait)
