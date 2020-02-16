---
title: "Error Handling in Javascript"
slug: error-handling-in-javascript
date: 2019-06-21
language: english
cover: ./cover.png
generate-card: false
tags: 
  - Javascript
  - Exception
description: Simple introduction of Error Handling in Javascript.
---
# Basic Syntax

The `try/catch/finally` statement handles some or all of the errors that may occur in a block of code, while still running code.
Errors can be coding errors made by the programmer, errors due to wrong input, and other unforeseeable things.
The `try` statement allows you to define a block of code to be tested for errors while it is being executed.
The `catch` statement allows you to define a block of code to be executed, if an error occurs in the try block.
The `finally` statement lets you execute code, after try and catch, regardless of the result.
You can raise an error with `throw()`.

```JS
try {
  tryCode - Block of code to try
}
catch(err) {
  catchCode - Block of code to handle errors
}
finally {
  finallyCode - Block of code to be executed regardless of the try / catch result
}

throw("Raise an error");
```

# Example

```JS
let v = "";

try {
  if (v == "") throw "The value is empty";
}
catch (err) {
  console.log(`Message: ${err}`); //=> Message: The value is empty
}
finally {
  console.log("Everything is done!"); //=> Everything is done!
}
```
