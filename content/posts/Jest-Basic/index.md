---
title: 'Jest Basic'
slug: jest-basic
date: 2019-06-21
language: english
category: Javascript
tags:
  - Test
  - Jest
published: true
description: 'This is an introduction of Jest.'
---

# Jest Basic

Jest is a JavaScript unit testing framework built by Facebook.

# Directory Structure

```
- myProgram.js
- __tests__
   - myProgram-test.js
```

# Basic Syntax

Each test file looks something like this:

```javascript
const MathModule = require('../myMath') // 1

describe('my math module', () => {
  // 2
  it('adds two numbers', () => {
    // 3
    // Your testing code goes here
  })
})
```

- `describe` defines a set of tests.
- `it` defines a single test.

You can run the test with `jest` command.

```
$ jest
```

# Assertions

```javascript
expect(value).toBe(something)
```

## Useful matchers

- `toBe`: compare 2 values using `===` operator.

```javascript
expect(2).toBe(2) // OK
```

- `toEqual`: recursively compares two values.

```javascript
expect({}).toEqual({}) // OK
```

- `toContain`: makes sure the array has the given item.

```javascript
expect([1, 2, 3]).toContain(1) // OK
```

- `toThrow`: checks if the given function throws an error.

```javascript
expect(() => {
  undefined()
}).toThrow() // OK
```

- `not`: useful to inverse the expectation.

```javascript
expect(2).not.toBe(4) // OK
```

You can see other matchers [here](https://jestjs.io/docs/en/api).

# Async tests

JavaScript relies on callbacks in many cases and Jest supports testing asynchronous code.

```javascript
describe('my async module', () => {
  it('supports promises', () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    })
  });

  it('supports async/await', async () => {
    await saveUser({...});
  });
});
```

# LifeCycle

If you need to add some setup/teardown logic, use `beforeEach`/`afterEach` and `beforeAll`/`afterAll`:

```javascript
describe('my math module', () => {
  beforeAll(() => {
    console.log('This is executed before the test suite')
  })

  beforeEach(() => {
    console.log('This is executed before each testcase')
  })

  it('adds two numbers', () => {
    expect(() => {
      undefined()
    }).toThrow()
  })
})
```

# Create mock functions

`jest.fn` creates a mock function.

```
const add = jest.fn() //=> returns an empty function

const num = jest.fn(() => 3) //=> returns 3
```

# Jest commands

## Run one file

```
$ ./node_modules/.bin/jest --watch
```

press `p` and put the file.

```
src/components/__tests__/main/index.js
```

- [javascript - Run only ONE test with Jest - Stack Overflow](https://stackoverflow.com/questions/44446626/run-only-one-test-with-jest)

## Run all tests

```
$ ./node_modules/.bin/jest
```

## Create Coverage Report

```
$ ./node_modules/.bin/jest --coverage
```

## Display individual test results

```
$ ./node_modules/.bin/jest --verbose
```

# Test with Enzyme

`Enzyme` is a JavaScript Testing utility for React that makes it easier to test your React Components' output.

## Set up

```
npm install --save-dev enzyme enzyme-adapter-react-16 react-test-renderer
```

create `src/setupTests.js` file.
If you don't create this file, you have to define the code below in each test file.

```javascript
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
```

You also have to create `.babelrc` and paste the code below.

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": "commonjs"
      }
    ],
    "@babel/preset-react"
  ]
}
```

## Shallow()

if you want to test the `<App />` component, you can extend our `App.test.js` file by adding the following.
The `shallow()` will test the provided component and ignores any child components that may be present in the component tree thereafter. if we had a `<Header />` and `<Footer />` component within `<App />` for example, they would be ignored in this test.

```
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<App />);
    });
});
```

## Find nodes

You can find a class called `headerComponet` from shallow copied `Header` like the code below.

```
describe("Header Component", () => {
  it("should render without errors", () => {
    const component = shallow(<Header />);
    const wrapper = component.find(".headerComponent");

    expect(wrapper.length).toBe(1);
  });
});
```

## Debug components

You can use `debug()` like the code below.

```
configure({ adapter: new Adapter() });

describe("It should render without errors", () => {
  it("should render without errors", () => {
    const component = shallow(<Header />);
    const wrapper = component.find(".headerComponent");

    console.log(component.debug());
  });
});
```

The output would be something like this.

```
<header className="headerComponent">
     <h1>
        Header!!
     </h1>
</header>
```

## beforeEach and setUp function

The code below is referenced from [here](https://github.com/K-Sato1995/jest-react-practice/blob/master/src/components/__tests__/Footer/index.js)

```
import React from "react";
import { shallow } from "enzyme";
import Footer from "../../Footer";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// props = {} means that the empty {} would be passed to props if nothing is passed to props.

const setUp = (props = {}) => {
  const component = shallow(<Footer {...props} />);
  return component;
};

describe("Footer Component", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should render without errors", () => {
    const wrapper = component.find(".footerComponent");
    expect(wrapper.length).toBe(1);
  });
});
```

## Simulate events

You can simulate events using `simulate` like the code below.

```
describe("Button Component", () => {
  it("should simulate click event", () => {
    const component = setUp();
    expect(component.find(".click-0").length).toBe(0);
    // simulate click event and increment the number!!!
    component.find("a").simulate("click");
    expect(component.find(".clicks-1").length).toBe(1);
  });
});
```

More about this topic, check [here](https://airbnb.io/enzyme/docs/api/ReactWrapper/simulate.html).

# References

- [jest + React test example created by me](https://github.com/K-Sato1995/jest-react-practice)
- [jestbasics](http://frantic.im/jestbasics/)
- [Jest](https://jestjs.io/docs/en/getting-started.html)
- [Enzyme](https://airbnb.io/enzyme/)
- [Testing in React with Jest and Enzyme: An Introduction](https://medium.com/@rossbulat/testing-in-react-with-jest-and-enzyme-an-introduction-99ce047dfcf8)
- [React Unit Testing Using Enzyme and Jest | Toptal](https://www.toptal.com/react/tdd-react-unit-testing-enzyme-jest)
- [Jest + React Video turtorial](https://www.youtube.com/watch?v=tYMLXpOJtng)
