---
title: React in TypeScript
description: Things I should keep in mind when I'm creating react apps in Typescript.
slug: react-in-typescript
date: 2019-07-20
language: english
cover: ./cover.png
tags: 
  - TypeScript
  - React
---
# Types or Interfaces?
`Interfaces` are different from `types` in TypeScript, but they can be used for very similar things as far as common React uses cases are concerned. Here's a helpful rule of thumb:

- always use interface for public API's definition when authoring a library or 3rd party ambient type definitions.
- consider using type for your React Component Props and State, because it is more constrained.

- [Types or Interfaces?](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#types-or-interfaces)

# Hooks

## UseState
Many hooks are initialized with null-ish default values, and you may wonder how to provide types. Explicitly declare the type, and use a union type.

```ts
const [user, setUser] = React.useState<IUser | null>(null);
```

- [React TypeScript Cheet Sheet Hooks](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#hooks)
- [React Hooks in TypeScript - James Ravenscroft - Medium](https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d)

# Define types in one file 
Make a file called `file_name.d.ts` and defines all the types there.

- [Example](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-router-dom)

# Add types to props

```tsx
import React from 'react'; // we need this to make JSX compile

type CardProps = {
  title: string,
  paragraph: string
}

export const Card = ({ title, paragraph }: CardProps) => (
<aside>
  <h2>{ title }</h2>
  <p>
    { paragraph }
  </p>
</aside>
)
const el = <Card title="Welcome!" paragraph="To this example" />
```

## Pass an array

```tsx
interface cardProps {
  issues: {
    id: string;
    paragraph: string
  }[];
}
```

## Make properties optional
If you want to make some properties optional, do that in the respective Props type:

```
type CardProps = {
  title: string,
  paragraph?: string  // the paragraph is optional
}
```

# Use a hook in map function 

When you get the error below, remember the code!

```
./src/components/molecules/messageClient/Item/index.tsx
  Line 21:  React Hook "useDeactivateTokenMutation" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function  react-hooks/rules-of-hooks

Search for the keywords to learn more about each error.
```

```tsx
import React from "react";
import { useDeleteMutation } from "../../../../generated/graphql";

interface Props {
  name: string;
  tokens: string[];
}

const Item = ({ name, tokens }: Props) => {
  const DeleteMutation =  useDeleteMutation();
  return (
    <div>
      <div>
        {name}
        <ul>
          {tokens.map(token => (
            <li>
              {token}
              <button
                onClick={() => {
                   DeleteMutation({ variables: { token } });
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Item;
```

# Typing Functions in TypeScript

## Method Signatures
The method signature syntax is probably the most straightforward to use. When defining an object type, its methods can easily be described by providing signatures as follows:

```ts
interface Date {
  toString(): string;
  setTime(time: number): number;
  // ...
}
```

## Function Type Literals

Function type literals are another way to declare the type of a function. They're typically used in the signature of a higher-order function, that is, a function which accepts functions as parameters or which returns a function:

```ts
interface Array<T> {
  sort(compareFn?: (a: T, b: T) => number): this;
  // ...
}
```
- [Typing Functions in TypeScript — Marius Schulz](https://mariusschulz.com/blog/typing-functions-in-typescript)

# TypeScript and React: Events
You either need to be specific with e.g. React.MouseEvent or import the MouseEvent typing right from the React module:

```tsx
import React, { Component, MouseEvent } from 'react';

export class Button extends Component {
  handleClick(event: MouseEvent) {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }
  
  render() {
    return <button onClick={this.handleClick}>
      {this.props.children}
    </button>
  }
}
```

Events supported are: AnimationEvent, ChangeEvent, ClipboardEvent, CompositionEvent, DragEvent, FocusEvent, FormEvent, KeyboardEvent, MouseEvent, PointerEvent, TouchEvent, TransitionEvent, WheelEvent. As well as SyntheticEvent, for all other events.

## Form example

```tsx
import React, { useContext, MouseEvent } from 'react'

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
}

const CreateUser = () => {
  const handleSubmit = (e: MouseEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { email } = e.currentTarget.elements as FormElements
    createUser({ email: email.value })
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          required
          label="Email Address"
          name="email"
          type="email"
        />
        <Button
          type="submit"
        >
          Create a New User
        </Button>
      </form>
    </>
  )
}

export default CreateUser
```

- [TypeScript and React: Events](https://fettblog.eu/typescript-react/events/)

# References 
- [GitHub - typescript-cheatsheets/react-typescript-cheatsheet: Cheatsheets for experienced React developers getting started with TypeScript](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#section-1-setup)
- [From zero to hero with React and TypeScript: Let's build another to-do app! \| Jordy's Blog](https://www.jordy.app/from-zero-to-hero-with-
- [TypeScript and React: Components](https://fettblog.eu/typescript-react/components/)
- [Do's and Don'ts · TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [useTypescript — A Complete Guide to React Hooks and TypeScript](https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c)
- [Typed useState with TypeScript - Carl's Blog](https://www.carlrippon.com/typed-usestate-with-typescript/)
- [React Hooks in TypeScript - James Ravenscroft - Medium](https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d)
