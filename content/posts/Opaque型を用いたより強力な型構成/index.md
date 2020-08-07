---
title: 'Opaque型を用いたより強力な型構成'
slug: use-opaque-type-for-stronger-type-structure
date: 2019-02-19
language: japanese
category: TypeScript
tags:
  - TypeScript
  - OpaqueType
published: true
description: 'TypeScriptでOpaque型を作成してより強力な型構成を持たせる方法を記事にしました。'
---

# 概要

TypeScript では２つの型が構造的に同じであれば、互換性があると見なされます。
例えば下記の`name`と`password`は互換性があると言えます。

```ts
type name = string
type password = string
```

つまり、ユーザーから見た場合意味的には全く異なる上記の 2 つの型も TypeScript は同じものとして扱います。
しかし、`password`は 8 文字以上で大文字や小文字を含んでいなければならない等の条件を持った型を定義した場合どうすれば良いでしょうか？

上記のような例では TypeScript は型的な安全性を保証してはくれますが、`name`と`password`のような意味的に異なる情報の分別が出来ていません。
このようなケースで`Opaque型`を用いる事で、より強力な型構成をもたらす事が可能です。

# Opaque 型を使用しない例

まずは、Opaque 型を用いない例を確認します。
下記の例では`name`と`password`も string 型として扱われています。

```ts
type User = {
  name: string
  password: string
}

const user: User = { name: 'user1', password: '1234' }
console.log(user) // => { name: 'user1', password: '1234' }
```

# Opaque 型を使用した例

`password`は 8 文字以上の文字列である事を保証する型`Password` を定義します。
TypeScript はデフォルトでは`Opaque型`をサポートしていないので、`intersection型`を使用して、下記のように`Password型`は独自の型である事を明示的に定義していきます。

```ts
declare const validPassword: unique symbol
type Password = string & { validPassword: never }
```

上記のコードに関しては下記の記事を読んで頂けると理解がより深まるかと思います。

[公称型を TypeScript で実現するための基礎](https://qiita.com/suin/items/ae9ed911ebab48c98835)

上記で定義した`Password型`は通常の型と同様の使い方が可能です。

```tsx
type User = {
  name: string
  password: Password
}
```

こうしてあげる事で、TypeScript は`password`に`string型`の値が渡されると、エラーを出すようになります。

```tsx
const user1: User = { name: 'test', password: '1234' } // Error: Type 'string' is not assignable to type 'Password'.
```

次に、`password`が 8 文字以上である事を保証したいので、与えられた文字列が 8 文字以上であった場合、値を`Password型`として返す`validatePassword`を定義します。

```tsx
const validatePassword = (input: string) => {
  if (input.length < 8) {
    throw new Error('パスワードは8文字以上で入力してください。')
  }
  return input as Password
}
```

`User型`のオブジェクトの`password`には`Password型`の値を与えたいので、`validatePassword`を使用して、下記のようにオブジェクトを定義する事が可能です。

パスワードが 8 文字以下の場合はしっかりとエラーを発生させてくれるようにもなりました。

```tsx
const user1: User = { name: 'user1', password: validatePassword('1234') }
// => Error: パスワードは8文字以上で入力してください。
const user2: User = { name: 'user1', password: validatePassword('12345678') }
// => { name: "user1", password: "12345678" }
```

ここまでのコードをまとめると下記のようになります。

```tsx
declare const validPassword: unique symbol

type Password = string & { validPassword: never }

type User = {
  name: string
  password: Password
}

const validatePassword = (input: string) => {
  if (input.length < 8) {
    throw new Error('パスワードは8文字以上で入力してください。')
  }

  return input as Password
}

const user1: User = { name: 'user1', password: validatePassword('12345678') }
const user2: User = { name: 'user1', password: validatePassword('1234') }
```

# 参照

- [Stronger JavaScript with Opaque Types](https://codemix.com/opaque-types-in-javascript#:~:text=TypeScript%20does%20not%20have%20built,number)
- [Implementing an opaque type in typescript](https://evertpot.com/opaque-ts-types/)
- [TypeScript: 「電話番号型」という意味を持たせた特殊な string 型の作り方 - Qiita](https://qiita.com/suin/items/421ae4bf99d333ccfe0d)
