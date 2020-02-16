---
title: "The useEffect Hook Explained"
slug: the-useeffect-hook-explained
date: 2019-11-03
language: english
cover: ./cover.png
generate-card: false
tags:
  - hooks
description: "The simplest explanation about the second argument of useEfffect."
---
# The first argument
The useEffect hook takes two arguments, the first is a function that executes (or gets called) after every render. This function will run when the component mounts, as well as when it updates. 

# The second argument 
You can optionally provide an array of inputs. If so, the effect will __only run after renders where those inputs have changed__. 
Something important to note is that if you do not provide this second argument, the function (or the effect) in our first argument will run after __every render of the component__. 
The other option with this second argument is to provide an `empty array`, which means to only run __on mount and unmount__.

```jsx
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

# Conclusion 

In a nutshell, 


- No second argument => Runs every render of the component.
- Pass `[]` as the second argument => Runs only on the mount and unmount renders.
- Provide some value as the second argument => Only runs after renders where those inputs have changed and the first mount.

Pretty cool huh?
