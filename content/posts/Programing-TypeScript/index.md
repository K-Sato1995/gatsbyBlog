---
title: 'Programming TypeScriptまとめ'
slug: programming-typescript
date: 2021-02-04
language: japanese
category: Programming
tags:
  - TypeScript
published: true
description: 'Programming TypeScriptを読んですごく為になったので、基本的な箇所のまとめ'
---

# 全体像

## コンパイラー

多くのプログラミング言語は下記の手順で実行される。

1. プログラムがAST(抽象構文木)に変換される。
2. ASTがバイトコードにコンパイルされる。
3. バイトコードがランタイムによって評価される。

TypeScriptではバイトコードに変換する代わりにJavaScriptに変換して実行する。

つまり、TSでは下記のような順序で実行される

1. TSコードがASTに変換される
2. ASTが型チェッカーによってチャックされる。
3. TSのASTがJavaScriptのコードに変換される。
4. JSのASTがバイトコードに変換される。
5. バイトコードがランタイムで評価される。

# 型

## number

number型は整数、浮動少数点数、正数、負数、Infinity, NaN(非数)など、全ての数値の集まり。

```ts
// constを使用した場合、TSは値が特定のnumberであると推論する。
let num = 2 // number
const num1 = 3 // 3
```

## bigint

number型が表せる正数は2の53乗まで。bigintではそれより大きな正数も表すことが可能。

```ts
let a = 1234n // bigint
const b = 5678n // 5678n
var c = a + b // bigint
```

## symbol

オブジェクトやマップで文字列キーの代わりとして使用され、既知のキーが適切に使用され、うっかり誤った値が設定されていない事を強く確信したい場合等に用いられる。

```ts
const sym = Symbol('foo')

const obj: { sym: string } = {
    sym: 'title'
}

console.log(obj)
```

明示的にuniqueを付けることも可能。

```ts
const sym: unique symbol = Symbol('s')
```

Symbolは常に一意で他のシンボルと等しくはならない。

```ts
const a = Symbol('a')
const b = Symbol('a')

console.log(a === b) //=> false
```

[Symbols in JavaScript and TypeScript](https://fettblog.eu/symbols-in-javascript-and-typescript/)

## unknown

1. TypeScriptがannotationなしに何かをunknownと推論する事はない。
2. unknown型の値と他の型の値の比較は可能。
3. unknown型の変数が特定の型であることを想定した処理は行えない。

```ts
let a: unknown = 30 // unknown 
let b = a === 123 // boolean
let c = a + 10 // error

if(typeof a === "number") {
  let d = a + 10 // number
}
```

## リテラル型

ただ1つの値を表、それ以外の値は受け入れない型。

```ts
type value = true
type name = "K-Sato"
```

## オブジェクト型

いくつか定義方法が存在する。

1. objectを使用する方法。

(※objectはそれがオブジェクトである事だけを伝える。その為、下記の様にプロパティにアクセスしようとするとエラーになる。)

```ts
let hoge: object = { name: "taro" }
console.log(hoge.name) // Property 'name' does not exist on type 'object'.
```

2. オブジェクトリテラル表記を使用する方法。

```ts
const hoge = {
    name: 'taro',
    age: 23,
		intro?: '' // ?を使用する事で、任意のプロパティとして設定。
} 

// TSはJSのオブジェクトはミュータブルであると知っているので、
// nameは'taro'ではなくstring型、ageは23ではなくnumber型と推測している。
/** 
* { 
*   name: string, 
*   age: number, 
*   intro: string | undefined 
* }
**/
console.log(hoge.name) //=> taro
```

3. インデックスシグネチャを用いた方法 

```ts
// 値がnumber型である、stringプロパティを任意の数だけ持つ事を意味する。
type Hoge = {
    [key in string]: number
}

const hoge: Hoge = {
    age: 23,
    height: 170
}
```

## 型エイリアス

型の別名を示す型エイリアスを定義することが可能。

```ts
// Ageはただのnumberだが、これによって、Personの形状定義が理解しやすくなる。
type Age = number

type Person {
	age: Age
}
```

## Union型とIntersection型

union型(合併)は集合の和でintersection型(交差)は集合の積。

つまり、unionはA,Bまたはその両方に含まれる全てもの。

そして、intersectionはA,Bの両方に含まれる全てのものを表す。

```ts
type Cat = { name: string, purrs: boolean }
type Dog = { name: string, barks: boolean, wags: boolean }

type CatOrDogOrBoth = Cat | Dog
type CatAndDog = Cat & Dog

/* Union型
- It can be Cat
let a: CatOrDogOrBoth = {
	name: "test",
	purrs: true 
}
- It can be Dog
let a: CatOrDogOrBoth = {
	name: "test",
	barks: true,
	wags: true
}
- It can be both
let a: CatOrDogOrBoth = {
	name: "test",
	barks: true,
	purrs: false,
	wags: true
}
*/

/* Intersection型
- It has to be both
let a: CatAndDog = {
	name: "test",
	barks: true,
	purrs: false,
	wags: true
}
*/

```

## 配列

```ts
const hoge1 = [1,2,3] // number[]
const hoge2 = ['string', 'string'] // string[]
const hoge3 = [1, 'string'] // (string | number)[] stringとnumber型の値を含んだ配列。
let hoge4 = [] // any[]
```

## Tuple型

Tuple(タプル)型は配列のサブタイプ。Tuple型は固定長配列を型付けする為に使用される。

その配列の格インデックスでのあたいは特定の既知の型をもつ。

```ts
let a: [number] = [1]
let b: [string, string, number] = ["title", "name", 2]
```

Tuple型は省略可能な要素もサポートしている。

```ts
const arr: [number, number?] = [2]
```

 また、可変長の要素もサポートしている。

```ts
// 少なくとも1つの要素を持つ、文字列の配列。
let names: [string, ...string[]] =["name1", "name2", "name3"]

// 不均一のリスト
let list: [number, boolean, ...string[]] = [2, true, "name1", "name2"]
```

配列はTupleは下記の様に読み取り専用として定義することができる。(読み取り専用の配列を更新する場合は元の配列に変更を加える`.push`や`.splice`ではなく、`.concat`や`.slice`メソッドを使用する。)

```ts
const hoge: readonly number[] = [1,2,3]
const hoge2: Readonly<number[]> = [1,2,3]

hoge.push(1) // Property 'push' does not exist on type 'readonly number[]'.

const hoge3: number[] = hoge.concat(1)
console.log(hoge3) // [1,2,3,1]
```

## null, undefined, void, never

- `undefined`: あるものがまだ定義されていない事を意味する。
- `null`: 値が欠如している事を意味する。
- `void`: 明示的に何も返さない関数の戻り値の型。
- `never`: 決して戻ることのない関数の型。(例外をスローする関数や、永久に実行される関数など。)

```ts
// numberまたはnullを返す関数。
const hoge1 = (num: number): number | null => {
    if(typeof num === 'number') return num
    return null
}

// undefinedを返す関数。
const hoge2 = (): undefined => {
    return undefined
}

// voidを返す関数。
const hoge3 = ():void => {
    console.log("Void")
}

// neverを返す関数。
const hoge4 = (): never => {
    throw TypeError("Error")
}
```

## 列挙型(Enum)

列挙型(Enum)には２種類存在する。文字列から数値へとマッピングするもの(数値列挙)と、文字列から文字列にマッピングするもの(文字列列挙)です。

※列挙型の安全な使用には落とし穴が伴うため、列挙型の使用は控えた方が良い。

```ts
// 慣習により、列挙型の名前は大文字で始まる単数形。
enum Country {
    China, 
    Japan,
    Canada,
    France
}

console.log(Country.China) //=> 0
console.log(Country[0]) //=> China

enum Color {
    Red = "赤",
    Blue = "青",
    Green = "緑"
}

console.log(Color.Red) //=> 赤
```

# 関数

## 文脈的型付け

下記のコードではlogはLogとして宣言されていたので、messageの型がstringではなくてはないと推論できます。これは文脈的型付けと呼ばれます。

```ts
type Log = (message: string, userId?: string) => void

let log: Log = (
  message,
  userId = "Not Signed in"
) => {
  let time = new Date().toISOString
  console.log(time, message, userId)
}
```

## オーバーロードされた関数の型

オーバーロードされた関数とは複数の呼び出しシグネチャを持つ関数。

**ちょっと理解が足りてないので、学習を深める。**

```ts
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
}

let reserve: Reserve = (from: Date, toOrDestination: Date | string, destination?: string) => {
  if (toOrDestination instanceof Date && destination !== undefined) {
    // 宿泊旅行を予約する。
  } else if (typeof toOrDestination === 'string') {
    // 日帰り旅行を予約する。
  }
}
```

# クラス・インターフェース

## Constructorのparametersでprivate/protectedを定義する

`private` か`protected` をConstructorのparametersの中で書くと、thisをプロパティに自動で割り当ててくれる。

```ts
class Pet {
  public type: string

  constructor(type: string, private name: string) {
    this.type = type
  }
}
```

## 戻り値の型としてthisを使用する。

```ts
class Set {
	add(value: number):Set {
    ...
  }
}

class MutableSet extends Set {
	add(value: number):MutableSet {
    ...
  }
}
```

上記はthisを戻り値の型と使用することで、下記のようにできる。

```ts
class Set {
	add(value: number):this {
    ...
  }
}

class MutableSet extends Set {}
```

# 高度な型

## ユーザー定義型ガード

下記のようにstringが渡されたかどうか判断する関数があるとする。

```ts
const isString= (input: unkown): boolean=> {
    return typeof input === 'string'
}

console.log(isString(2)) // false
console.log(isString("S")) // true
```

上記の関数を下記のように使用すると、TypeScriptの型の絞り込みではスコープ内の型の判断しか出来ないので、エラーが発生する。

```ts
const isString= (input: unkown): boolean=> {
    return typeof input === 'string'
}

const parseInput = (input: string | number) => {
  if (isString(input)) {
    return input.toUpperCase
  }
}
// Property 'toUpperCase' does not exist on type 'string | number'.
//  Property 'toUpperCase' does not exist on type 'string'.
```

上記のようなケースでTypeScriptが判断できるのはisStringがbooleanを返す事のみ。

その為、isStringがbooleanを返すだけでなく、そのbooleanがtrueである場合はisStringに渡された引数がstringであることを型チェッカーに伝える必要がある。

```ts
const isString= (input: unkown): input is string=> {
    return typeof input === 'string'
}

const parseInput = (input: string | number) => {
  if (isString(input)) {
    return input.toUpperCase
  }
}
```

# エラー処理

## 例外をスローする

```ts
function parse(birthday: string): Date {
  let date = new Date(birthday);

  if (!isValid(date)) {
    throw new RangeError("Enter a date in the form YYYY/mm/dd");
  }
  return date;
}
```

上記のように例外をスローするコードを利用する時には例外を必ずキャッチするように注意する必要がある。

```ts
try {
  let date = parse(ask());
  console.info("Date is", date.toISOString());
} catch (e) {
  console.error(e.message);
}
```

## 例外を返す

TypeScriptでは下記のように起こりえる例外を型で定義することができる。

```ts
class InvalidDateFormatError extends RangeError {}
class DateIsTheFutureError extends RangeError {}

function parse(
  birthday: string
): Date | InvalidDateFormatError | DateIsTheFutureError {
  let date = new Date(birthday);

  if (!isValid(date)) {
    throw new InvalidDateFormatError("Enter a date in the form YYYY/mm/dd");
  }

  if (date.getTime() > Date.now()) {
    throw new DateIsTheFutureError("Are you a timelord?");
  }
  return date;
} 
```