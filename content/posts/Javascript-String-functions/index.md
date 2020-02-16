---
title: "Javascript String functions"
slug: javascript-string-functions
date: 2019-06-27
language: english
cover: ./cover.png
generate-card: false
tags:
  - Javascript
description: "Here are the basic string functions in Javascript

"
---
# String functions

Here are some of the most fundamental JS string functions.

Assume the code below is declared at the top level in the following examples.

```JS
var string = "string"
```

# Changing the case

## toLowerCase()

Converts a string to lowercase letters.

```JS
let s6 = "STRING".toLowerCase();
console.log(s6); //=> "string"
```

## toUpperCase()

Converts a string to uppercase letters.

```JS
let s7 = string.toUpperCase();
console.log(s7); //=> "STRING"
```

# Searching for a substring

## indexOf(subst, pos)

It looks for the substr in a string, starting from the given position pos.

```JS
console.log(string.indexOf('i')) //=> 3

let string2 = 'string string'

console.log(string2.indexOf('string', 2)) //=> 7
```

## includes()

Checks whether a string contains the specified string/characters.

```JS
console.log(string.includes("s")); //=> true
```

## match()

Searches a string for a match against a regular expression, and returns the matches.

```JS
const regex = /\w/g;
let s4 = string.match(regex);
console.log(s4); //=> ["s", "t", "r", "i", "n", "g"]
```

# Getting a substring

## slice()

Extracts a part of a string and returns a new string.

```JS
let s2 = string.slice(0, 3); ///=> str
console.log(s2);
```

## substring()
Extracts a part of a string and returns a new string.

```JS
let s2 = string.substring(0, 3); ///=> str
console.log(s2);
```
# Transforming a string

## split()

Splits a string into an array of substrings.

```JS
let s1 = string.split("");
console.log(s1); //=> ["s", "t", "r", "i", "n", "g"]
```

## concat()

Joins two or more strings, and returns a new joined strings.

```JS
let s3 = string.concat("string");
console.log(s3); //=> stringstring
```

## replace()

Searches a string for a specified value, or a regular expression, and returns a new string where the specified values are replaced.

```JS
let s5 = string.replace(/s/, "S");
console.log(s5); //=> String
```

## trim()

Removes whitespace from both ends of a string.

```JS
let s8 = " strn g   ".trim();
console.log(s8); //=> strn g

let s9 = "  string  ".trimLeft();
console.log(s9); //=> "string  "

let s10 = "  string    ".trimRight();
console.log(s10); //=> "  string"
```

## References

- [w3schools.com](https://www.w3schools.com/jsref/jsref_obj_string.asp)
