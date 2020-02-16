---
title: Javascript Array functions
description: Here are the basic array functions
slug: javascript-array-functions
date: 2019-06-21
language: english
cover: ./cover.png
tags: 
  - Javascript
---
# Introduction
Here are some of the most fundamental JS array functions.
Assume the code below was declared at the top level in the following examples.

```JS
var arr = [1, 2, 3, 4, 5];
```

# Add or Remove items

## pop()/push()

`pop()`: Removes the last element of an array, and returns that element.
`push()`: Adds new elements to the end of an array, and returns the new length.

```JS
arr.push(6);
console.log(arr); //=> [1, 2, 3, 4, 5, 6]

arr.pop(6);
console.log(arr); //=>  [1, 2, 3, 4, 5]
```

## shift()/unshift()

`shift()`: Removes the first element of an array, and returns that element.
`unshift()`: Adds new elements to the beginning of an array, and returns the new length.

```JS
arr.unshift(0);
console.log(arr); //=> [0, 1, 2, 3, 4, 5]

arr.shift();
console.log(arr); //=>  [1, 2, 3, 4, 5]
```

## slice()

Selects a part of an array, and returns the new array.

```JS
let a4 = arr.slice(0, 3);
console.log(a4); //=>  [1, 2, 3]
```

## splice()

Adds/Removes elements from an array.

```JS
var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at 1st index position
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

months.splice(4, 1, 'May');
// replaces 1 element at 4th index
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']
```

- [JavaScript - Array splice() Method - Tutorialspoint](https://www.tutorialspoint.com/javascript/array_splice.htm)

## concat()

Joins two or more arrays, and returns a copy of the joined arrays.

```JS
let a1 = arr.concat([6, 7]);
console.log(a1); //=> [1, 2, 3, 4, 5, 6, 7]
```

# Iterate items

## forEach()

Calls a function for each array element.

```JS
function repeat(ele) {
  console.log(ele);
}
arr.forEach(repeat); //=> 1 2 3 4 5
```

# Search in array

## indexOf()

Looks for item starting from index from, and returns the index where it was found, otherwise -1.

```JS
console.log(arr.indexOf(0)) //=> 1
console.log(arr.indexOf(10)) //=> -1
```

## find()/findIndex()

Returns the value of the first element in an array that pass a test.

```JS
console.log(arr.find(num => num > 2)); //=> 3
console.log(arr.findIndex(num => num > 2)); //=> 2
```

## includes()

Check if an array contains the specified element.

```JS
console.log(arr.includes(2)); //=> true
```

## filter()

Creates a new array with every element in an array that pass a test.

```JS
let a2 = arr.filter(num => num > 3);
console.log(a2); //=> [4, 5]
```

# Transform array

## map()

Creates a new array with the result of calling a function for each array element.

```JS
a3 = arr.map(ele => ele - 1);
console.log(a3); //=> [0, 1, 2, 3, 4]
```

## sort()

Sorts the elements of an array.

```JS
let array = [4, 2, 3, 4, 5, 6, 7];
console.log(array.sort()); //=> [2, 3, 4, 4, 5, 6, 7]
```

## reverse()

The method arr.reverse reverses the order of elements in arr.

```JS
console.log(arr.reverse()) //=> [5, 4, 3, 2, 1];
```

## reduce()

The `reduce()` method reduces the array to a single value.

The `reduce()` method executes a provided function for each value of the array (from left-to-right).

Here is the basic syntax.

```JS
let value = arr.reduce(function(previousValue, item, index, array) {
  // ...
}, initial);
```

- `item` – is the current array item.
- `index` – is its position.
- `array` – is the array.
- `previousValue` – is the result of the previous function call, initial for the first call.

```JS
let result = arr.reduce((sum, current) => sum + current, 0);

console.log(result); //=> 15
```

# references

- [w3schools.com](https://www.w3schools.com/jsref/jsref_obj_array.asp)
- [javascript.info](https://javascript.info/array-methods#searching-in-array)
