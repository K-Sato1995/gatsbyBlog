---
title: 'How to use React icons'
slug: how-to-use-react-icons
date: 2020-04-12
language: english
category: Programming
tags:
  - React
  - Icons
published: true
description: 'How to use the react-icons package.'
---

# Install

Install `react-icons` on your project.

```bash
$ npm install react-icons
```

or

```bash
$ yarn add reeact-icons
```

# Usage

If you want to use a font-awesome icon, you can do so like the code below.

```tsx
import { FaBeer } from 'react-icons/fa'

const Comp = () => {
  return <FaBeer />
}
```

The `react-icons` package offers other types of icons as well.
You can import them by changing the path from `react-icons/fa` to whatever the type of icons you want to use.
For instance, if you want to import a material-design icon, you can do so like the code below.

```tsx
import { ICON_NAME } from 'react-icons/md'
```

You can search available icons [here](https://react-icons.netlify.com/).

# Styling

You can style an icon like the code below.

```tsx
import { FaBeer } from 'react-icons/fa'

const iconStyle = {
  position: 'relative',
  float: 'right',
}

const Comp = () => {
  return <FaBeer style={iconStyle} />
}
```
