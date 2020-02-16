---
title: "How to create your own npm packages"
description: This is a simple guide about how to create your own npm packages.
slug: how-to-create-your-own-npm-packages
date: 2019-06-07
language: english
cover: ./cover.png
tags: 
  - npm
  - package
---
# Introduction

# Creating your package

Simply Follow the code below.

```
# Create the project directory
mkdir samplePackage

# Change into the project directory
cd samplePackage

# Initialise an NPM package(It would create th package.json for you)
npm init

# Create the entry point
touch index.js
```
# Write some code

Whatever you put in `module.exports` is what would be available for importing when others install the package.

```js
const Test = "Test";
function Sum(a, b) {
  return a + b;
}

module.exports = { Test, Sum };
```

# Publish it

Simply, run 

```
npm publish
```

# Extra stuff

Get  badges at [Shields.io: Quality metadata badges for open source projects](https://shields.io/)

# Test your package locally
 
```shell
npm install /absolute/path/yourPackage
```

Or you can create `index.html` like below and test it out there.

```
<!DOCTYPE html>
<html>
  <head>
    <script src="index.js"></script>
  </head>
  <body>
    <h1>Test HTML FILE</h1>
  </body>
</html>
```

# Creating react components as a package
Use `create-react-library`.

- [GitHub - transitive-bullshit/create-react-library: ⚡CLI for easily creating reusable react libraries.](https://github.com/transitive-bullshit/create-react-library/)

**Make sure to add a `.gitignore` file like below**

```
.gitignore
/node_modules
/example/node_modules
```
# Passing props
You can pass props like the code below.

```
  static propTypes = {
    markdownText: PropTypes.string,
    test: PropTypes.boolean
  }

// To access the defined porps.
this.props.markdownText
```
# References

- [How to make a beautiful, tiny npm package and publish it](https://www.freecodecamp.org/news/how-to-make-a-beautiful-tiny-npm-package-and-publish-it-2881d4307f78/)
- [Build and publish your first NPM package – The Andela Way – Medium](https://medium.com/the-andela-way/build-and-publish-your-first-npm-package-a4daf0e2431)
- [ Node.js — How to test your new NPM module without publishing it every 5 minutes](https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be)
