---
title: 'Redux 入門 '
slug: redux
date: 2018-12-16
language: japanese
category: React
tags:
  - Redux
  - React
  - Tutorial
published: true
description: 'ReactJSが扱うUIのstate(状態)を管理をするためのフレームワークです。この記事ではReduxの基本概念を実際にどの様に用いられるのかコードと共に紹介・説明します。また、Reactと共に用いる方法も紹介します。'
---

# Introduction

## 基本概念

Redux は以下の３で成り立つ。

### State

`state` はセッターのないモデルのようなもの。

### Action

`action`を使用する事のみで`state`の内容を変更できる。
`action`はただの JavaScript のオブジェクト。

### Reducer

`reducer`は`action`と`state`を結びつけるもの。
`reducer`は`state` `action`を引数に取り、次の`state`の状態を返す単なるファンクション。

## 3 つの原則

### Single source of truth

アプリのすべての`state`は１つの`store`に集約する。

### State is read-only

`state`は単純なオブジェクトである`action`を使用してのみでしか変更を行わない。

### Changes are made with pure functions

`reducer`は純粋なファンクションであり、与えられた値を変更するのではなく、必ず新しい値を返す。

# Basics

## Actions

`action`は、アプリケーションから`store`にデータを送信する情報のペイロードです。`store.dispatch()`で`store`に送ることが可能。

todo にアイテムを加えるアクションの例

```JS
{
  type: ADD_TODO
  text: 'Build my first Redux app'
}
```

`actions`は JS の単純なオブジェクトで,必ず使用される`action`を示す`type`プロパティをもつ。

## Action Creators

`Action Creators`はその名の通り、`action`を作り出す関数である。
Redux では`Action Creators`は`action`オブジェクトを返す。

```JS
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

### その他の actionsCreators と VisibilityFilters

```JS
export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
```

## Reducers

### Reducers 基本

`Reducers`は`store`に送られた`action`に応じて`state`がどのように変更するのかを示す。

`reducer`は`state` `action`を引数に取り、次の`state`の状態を返す単なるファンクション。

```JS
(previousState, action) => newState
```

`state`の構造の例

- The currently selected visibility filter
- The actual list of todos.

```JS
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
```

`Reducer`が純粋は関数であることは重要であり、下記の事はしてはならない。

- Mutate its arguments.
- Perform side effects like API calls and routing transitions.
- Call non-pure functions(e.g. Date.now() or Math.random().)

### `Reducer`を作成する

最初の `state` を作成し、`reducer`に与える。
引数の値は変更せずに`object.assign(target, ...sources)`を利用する事でコピーを作成し、新しいオブジェクトを返すようにする。または２つ目の例のように[Object Spread Operator](https://redux.js.org/recipes/usingobjectspreadoperator)を使用する事で同様の事を行える。

`default`では元の`state`を返すように設定する事で、不明な`action`に対しては元の状態を返す。

```JS
const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return object.assign({}, state, {
        visibilityFilter: action.fiter
      })
    default:
      return state
  }
}

//上の関数と同様だがObject Spread Operatorを使用
function todoApp(state = initialState, action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: action.filter
      }
    default:
      return state
  }
}
```

やってることとしては以下のように`...state`で開いて中身の値に新しい要素を加えて新しい値として返してるだけ。

```JS
const initialState = {
  todos: [1,2,3]
}

console.log(...initialState.todos, 4)
```

### 更に actions を付け加える

```JS
function todoApp(state = initialState, action) {
  switch(action.type){
    case SET_VISIBILITY_FLITER:
      return {
        ...state,
        visibilityFilter: action.filter
      }
    case ADD_TODO:
      return {
        ...state.todos,
        {
          text: action.text,
          completed: false
        }
      }
    default:
      return state
  }
}
```

## Store

`store`は以下の為に存在する。

- Holds application state;
- Allows access to state via `getState()`;
- Allows state to be updated via `dispatch(action)`;
- Registers listeners via `subscribe(listener)`;
- Handles unregistering of listeners via the function returned by `subscribe(listener)`
  1 つの Redux アプリに関して 1 つの`store`だけが存在する。
  様々なデータを扱う際には`reducer`を細分化する事で対応する。

`reducer`があればの`store`の作成は簡単で、以下のようにできる。

```JS
import { createStore } from 'redux'
import todoApp from './reducers'

const store = createStore(todoApp)
```

### アクションを送る。

以下のようにアプリの`state`の値を獲得したり、変更したりできる。

```JS
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions'

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// Stop listening to state updates
unsubscribe()
```

# Usage with React

## Installing React-Redux

以下のように `react-redux` をインストールする。

```console
$ npm install --save react-redux
```

## Presentational and Container Componensts

`React`は view を扱うライブラリであり`Redux`が有する`store`や`Action`の情報と疎結合になっていることが好ましい。

### Container Components

`Redux`の`store`や`Action`を受け取り`React`コンポーネントの`Props`として渡す役割を担う。(= React と Redux の橋渡し。JSX は使用しない。)

### Presentational Components

`Redux`依存のない純粋な React コンポーネント。
