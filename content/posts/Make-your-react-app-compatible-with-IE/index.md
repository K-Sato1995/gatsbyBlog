---
title: 'Make your react app compatible with IE'
slug: make-your-react-app-compatible-with-ie
date: 2020-01-28
language: english
tags:
  - React
published: true
description: 'Just a short post about how to install pollyfill in react apps.'
---

# Installation

```bash
npm install react-app-polyfill
```

or

```bash
yarn add react-app-polyfill
```

# Import entry points

Import the packages at the top of your `index.tsx`.

```
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
```

# Resources

- [react-app-polyfill](https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill)
