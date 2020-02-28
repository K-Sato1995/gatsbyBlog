---
title: '【TypeScript】Genericsを理解する'
slug: typescript-generics
date: 2020-01-30
language: japanese
category: Javascript
tags:
  - TypeScript
published: true
description: 'TypeScript におけるGeneric(ジェネリック)とは何かサンプルコードと共に簡単にまとめました。'
---

# Generics とは？

まず、`C#`や`Java`といった言語も Generics を搭載しており、TypeScript に限った機能ではありません。

Generics は抽象的な型引数を使用して、実際に利用されるまで型が確定しない`クラス`・`関数`・`インターフェイス`を実現する為に使用されます。
これだけだとイメージが湧きづらいと思いますので、実際にサンプルコードを交えて理解していきます。

# Generics の簡単な具体例(関数編)

下記のように同じようなコードを別の型で繰り返す場合があるとします。

```ts
// number型
function test(arg: number): number {
  return arg
}

// string型
function test2(arg: string): string {
  return arg
}

test(1) //=> 1
test2('文字列') //=> 文字列
```

これを Generics を使用する事で下記のように書く事が可能です。
`test<string>`の引数は string 型だけ、また`test<number>`の引数は number 型だけが許されるようになります。

```ts
function test<T>(arg: T): T {
  return arg
}

test<number>(1) //=> 1
test<string>('文字列') //=> 文字列

//※ Genericsでも型推論ができるので、引数から型が明示的にわかる場合は省略が可能
test('文字列２') //=> "文字列２"
```

つまり、上記では抽象的な型引数`<T>`を関数に与え、実際に利用されるまで型が確定しない関数を作成しています。

## 複数の型引数を定義する

複数の型引数を使用することも可能です。
型引数の名前に特に決まりはありませんが、慣習的に`T`, `U`等の大文字のアルファベットが使用される事が多いです。また、`T1`, `T2`なども見かけます。

```ts
function test<T, U, P>(arg1: T, arg2: U, arg3: P): P {
  return arg3
}

//※ Genericsでも型推論ができるので、引数から型が明示的にわかる場合は省略が可能
test('文字列', true, 4) //=> 4
```

# Generics の簡単な具体例(クラス編)

Generic 関数の様に型引数を渡す事で、クラスもジェネリック化する事が可能です。
型引数`T`はメソッドの返り値の型や、引数の型として、クラスを通して使用されている事が見てとれます。

```ts
class Klass<T> {
  item: T

  constructor(item: T) {
    this.item = item
  }

  getItem(): T {
    return this.item
  }
}

let strObj = new Klass<string>('文字列１')
strObj.getItem() //=> "文字列１"

let numObj = new Klass<number>(5)
strObj.getItem() //=> 5
```

# Generics の簡単な具体例(インターフェイス編)

こちらも上記の Generic 関数・クラスと同じ要領で Generic インターフェイスを作成する事が可能です。

```ts
interface KeyValue<T, U> {
  key: T
  value: U
}

let obj: KeyValue<string, number> = { key: '文字列', value: 2 } //= {key: "文字列", value: 2}
```

# 型引数に制約を付ける

ここまで紹介した Generic の型引数はどんな型の引数も受け入れてきました。
しかし、引数で受け入れる値を特定の型のみに制限したい場合もあります。

例えば下記の例では`arg`の`name`というプロパティを取得しようとしていますが、全ての型が`name`を持つ訳ではないので、コンパイラが警告を出しています。

```ts
function getName<T>(arg: T): string {
  return arg.name // Property 'name' does not exist on type 'T'.
}
// argの型はこの時点でnameを持つか不明なので、コンパイラは警告を出す。
```

その様な場合、下記の様に書くことで、`T`は`extends`で指定したインタフェースを満たす型でなければならないということを指定する事ができます。
これにより、実装時にコンパイラエラーも起こりません。
また、関数を呼び出す際に制約に違反する引数を渡した場合にはエラーを出してくれます。

```ts
interface argTypes {
  name: string
}

function getName<T extends argTypes>(arg: T): string {
  return arg.name
}

getName({ name: '鈴木一郎' })
```

# 参考

- [Generics · TypeScript](https://www.typescriptlang.org/docs/handbook/generics.html)
- [Generics in TypeScript ← Alligator.io](https://alligator.io/typescript/generics-in-typescript/)
