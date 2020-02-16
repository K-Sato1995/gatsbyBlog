---
title: 'React tips'
slug: react-tips
date: 2019-11-04
language: english
tags:
  - React
  - Tips
published: true
description: 'Here are some tips about React.js'
---

# Adding Custom Environment Variables

Note: this feature is available with react-scripts@0.5.0 and higher.

To define permanent environment variables, create a file called `.env` in the root of your project:

```
REACT_APP_NOT_SECRET_CODE=abcdef
```

Note: You must create custom environment variables beginning with REACT*APP*.

- [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env)

# Add the second arg to useEffect

```js
const [todos, updateTodos] = useState([])
// Only execute on mount
useEffect(() => {
  window.localStorage.setItem(‘todos’, JSON.stringify(todos))
}, [])

// Execute when there’s been a change in our todos list (componentDidUpdate):
useEffect(() => {
  window.localStorage.setItem(‘todos’, JSON.stringify(todos))
}, [todos])

// Execute clean up function on unmount
useEffect(() => {
  return () => { console.log(‘Clean up function’) }
}, [])
```

- [useEffect Explained](https://k-sato1995.github.io/blog/the-useeffect-hook-explained)

# Write types in filename.d.ts

When you are creating an app with React in TypeScript, Write all the types you use in the app in `.d.ts` file.

```ts
interface AccessToken {
  'access-token': string
  client: string
  uid: string
}
```

# Follow ECSS methodology

Structure your directory like the example below:

```
- Component
  - view.jsx
  - logic.ts
  - design.css
```

You can put all the functionalities, logics and designs you need for a component into one directory.

- [Architect CSS and scale CSS with the ECSS CSS methodology](https://ecss.io/)

# Use utilities for shared logic

Create `utilities.ts/js` to store functions used in multiple files.
