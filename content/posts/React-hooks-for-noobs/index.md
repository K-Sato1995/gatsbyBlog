---
title: "React hooks for noobs"
slug: react-hooks-for-noobs
date: 2019-03-07
language: english
cover: ./cover.png
generate-card: false
tags:
  - React
  - Hooks
description: "React16.8 introduced a new feature called hooks.  Hooks would change how you build react applications rather drastically. Here is my take to explain what they are."
---
# Introduction
`Hooks` are a new feature introduced in React16.8.
I'll try to explain what they are in the following order.

- What are Hooks?
- Rules of Hooks
- State Hook
- Effect Hook
- Custom Hook

# What are Hooks?
According to the official React documentation, 

> Hooks let you use state and other React features without writing a class.

Yup. That's exactly it!.  
Now you can use some React features such as `state` in functional components thanks to `hooks`!!

I'll introduce 3 following hooks in this post.
 
- (1)__State Hook__: It lets you use `state` and `setState` in functional components.
- (2)__Effect Hook__: It lets you perform side effects such as data fetching in functional components.
- (3)__Custom Hooks__: Building your custom hooks lets you extract component logic into reusable functions.

# Rules of Hooks
There are 2 ground rules you have to follow to use hooks safely.

__(1) Only Call Hooks at the Top Level!!__
Don’t call Hooks inside loops, conditions, or nested functions.

__(2) Only Call Hooks from React Functions!!__
Don’t call Hooks from regular JavaScript functions.

# State Hook
You can use `state` and `setState` in functional components by using a hook called `useState`.

Let's see how to use `useState` through comparing  a `functional component`using `useState` to the equivalent `class component`.

### Equivalent Class Component
It does the following 2 things.

- (1) Define the `count` state and its initialState `0`.
- (2) Add 1 to `count` each time setState is called.


```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked{this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click Me
        </button>
      </div>
    );
  }
}
```

### Functional Component with State Hook
Now it's time to create a functional component using `useState` which does the same thing as the class component above.

The basic syntax of `useState` looks like this!

```jsx
const [state, setState] = useState(initialState);
```
It's like you define the `state`, `setState` and `initialState` all together.

If you want to define the same state as the one in the class component above, it would look like this.

```jsx
import React, { useState } from  'react';

function Counter() {
  const [count, setCount] = useState(0)
}
```

Notice 3 things in the code above!
- (1) `count` is the equivalent of`this.state={count:0}` in the class component.
- (2) `setCount` is the equivalent of `setState` part in the class component.
- (3) `0` is the initial state of `count`.

While you are writing up the rest of the code, keep these 2 things in mind.

- (1) You can use `count` directory!(no need to do  `this.count`.)
- (2) You can update the state by using `setCount`.

```jsx
import React, { useState } from  'react';

function Counter() {
  const [count, setCount] = useState(0)

  return(
    <div>
      // (1) You can use count directory!
      <p>You clicked {count} times</p>
      
      // (2) You can update the state by using setCount.
      <button onClick={() => setCount(count + 1)}> Click me</button> 
    </div>
  )
}

export default Counter;
```

As a side note, you can define multiple `states` like the code below.

```jsx
import React, { useState } from  'react';

function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return(
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> Click me</button>
      <p>My name is {name}.</p>
      <button onClick={() => setName('テスト太郎')}>Show my name</button>
    </div>
  )
}

export default Counter;
```

# Effect Hook
You can perform side effects in functional components by using a hook called `useEffect`!

Let's see how to use `useEffec` through comparing a `functional component`using `useEffect` to the equivalent `class component`.


### Example Class Component
In class components, we perform side effects such as fetching data and changing the DOM in  `componentDidMount`  `componentDidUpdate`.

Here, it outputs `It did mount` in the console after a component is mounted and outputs `It did get updated` after updating occurs.

```jsx
import React from  'react';

class Effect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    console.log('It did mount.')
  }

  componentDidUpdate() {
    console.log('It did get updated.')
  }

  render() {
    return (
      <div>
        <h1>You clicked {this.state.count} times</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

### Example Functional Component using useEffect

The `useEffect` hook is like a combination of `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`.  
It runs after __every render__ including the first render.   
When you are building react applications with `hooks` this is where you perform side effects.

```jsx
import React, { useState, useEffect } from 'react'

function Effect() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('It got rendered')
  })

  return(
    <div>
      <h1>You clicked {count} times</h1>
      <button onClick={() => setCount(count + 1)}> Click me</button>
    </div>
  );
}
```

# Custom Hooks
As I mentioned above, building your custom hooks lets you extract component logic into reusable functions.

Let's suppose there are two components like below.

- (1) A component called `Status` which returns `Logged in` if it receives `id = 1`.
- (2)  A component called `Message` which returns `Welocme Back` if it receives `id = 1`.


```jsx
export default function Status(props){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleStateChange = (id) => {
    if(id === 1){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    handleStateChange(props.user.id)
  })

 const status = isLoggedIn ? 'Logged in' : 'Sign up'

  return (
    <>
      <h1>Status: {status}</h1>
    </>
  )
}
```

```jsx
export default function Message(props){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleStateChange = (id) => {
    if(id === 1){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    handleStateChange(props.user.id)
  })

 const message = isLoggedIn ? 'Welcome Back' : 'Who are you??'

  return (
    <>
      <h1>Message: {message}</h1>
    </>
  )
}
```

As you probably noticed, it's very redundant. 
You can build a `custom hook` to extract the same logic exists in both components into one reusable function.

※It is very important that you name your custom hook starting with `use`.   
In this case, I named my custom hook `useLogIn`.

```jsx
import { useState, useEffect } from 'react';

export default function useLogIn(userId){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // The login you want to reuse.
  const handleStateChange = (id) => {
    if(id === 1){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
  }
  
  // Perform side effects in useEffect.
  useEffect(() => {
    handleStateChange(userId)
  })

  return isLoggedIn;
}
```

Using `useLogIn`, we can simplify `Status` and `Message` components.

```jsx
import React from 'react';
import useLogIn from './useLogIn';

export default function Status(props){
  const status = useLogIn(props.user.id) ? 'Logged in' : 'Sign up'
  return (
    <>
      <h1>Status: {status}</h1>
    </>
  )
}
```

```jsx
import React from 'react';
import useLogIn from './useLogIn';

export default function Message(props){
  const message = useLogIn(props.user.id) ? 'Welcome Back' : 'Who are you??'
  return (
    <>
      <h1>Message: {message}</h1>
    </>
  )
}
```

The `custom hooks` can be used for other cool stuff, check out the official document about [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html).

# Resources
- [Introducing Hooks – React](https://reactjs.org/docs/hooks-intro.html)
- [A Complete Guide to useEffect — Overreacted](https://overreacted.io/a-complete-guide-to-useeffect/)
