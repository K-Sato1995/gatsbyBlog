---
title: ' React context '
slug: react-context
date: 2019-10-23
language: english
category: Programming
tags:
  - Hooks
  - React
published: true
description: 'A simple explanation about how the context works in React and how to use context with useContext hook.'
---

# What is react context

The react context api is a way to pass data deeply throughout your app without having to manually pass props down through multiple levels.

# Comparison between the old class way and the useContext way

## The old class way

We have to wrap our content in a `NumberContext.Consumer` and use the render props pattern – passing a function as a child – to retrieve the value and display it.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

// Create a Context
const NumberContext = React.createContext()
// It returns an object with 2 values:
// { Provider, Consumer }

function App() {
  // Use the Provider to make a value available to all
  // children and grandchildren
  return (
    <NumberContext.Provider value={42}>
      <div>
        <Display />
      </div>
    </NumberContext.Provider>
  )
}

function Display() {
  // Use the Consumer to grab the value from context
  // Notice this component didn't get any props!
  return (
    <NumberContext.Consumer>
      {value => <div>The answer is {value}.</div>}
    </NumberContext.Consumer>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

## The useContext Way

Call useContext, pass in the context object you got from React.createContext, and out pops the value.

```tsx
// import useContext (or we could write React.useContext)
import React, { useContext } from 'react'
import ReactDOM from 'react-dom'

type NumberValues = {
  number: number
}

// Create a Context
const NumberContext = React.createContext<Partial<NumberValues>>({})
// It returns an object with 2 values:
// { Provider, Consumer }

function App() {
  // Use the Provider to make a value available to all
  // children and grandchildren
  return (
    <NumberContext.Provider value={{ number: 42 }}>
      <div>
        <Display />
      </div>
    </NumberContext.Provider>
  )
}

function Display() {
  const value = useContext(NumberContext)
  return <div>The answer is {value}.</div>
}
```

### Create a Hook for easier access to the value

```tsx
import React, { useContext } from 'react'

type NumberValues = {
  number: number
}

const NumberContext = React.createContext<Partial<NumberValues>>({})

const App = () => {
  return (
    <NumberContext.Provider value={{ number: 42 }}>
      <div>
        <Display />
      </div>
    </NumberContext.Provider>
  )
}

// Hook!
export const useNumber = () => {
  return useContext(NumberContext)
}

function Display() {
  const { number } = useNumber()
  return <div>The answer is {number}.</div>
}

export default App
```

# References

- [How the useContext Hook Works](https://daveceddia.com/usecontext-hook/)
- [useContext(): a React hook that's an obvious win – Frontend Armory](https://frontarm.com/james-k-nelson/usecontext-react-hook)
- [Make useContext Data More Discoverable with Typescript](https://www.fullstacklabs.co/blog/usecontext-data-discoverable-typescript)
