---
title: '自分なりにSOLIDの原則を理解する'
slug: solid
date: 2020-01-02
language: japanese
category: Programming
tags:
  - SOLID
published: true
description: '最低限のコードと共に自分なりのSOLIDの原則のまとめ'
---

# 概要

```
S(Single Responsibility Principle): 単一責任の原則
O(Open/Closed principle): 開放閉鎖の原則
L(Liskov substitution principle): リスコフの置換原則
I(Interface segregation principle): インターフェース分離の原則
D(Dependency inversion principle): 依存性逆転の原則
```

# S: 単一責任の原則

## 概要

モジュールは一つのアクターに対して責務を負うべきである。

## 単一責任原則に違反した具体例

下記は3つのメソッドがそれぞれ別のアクターに対する責務を負っており、SRPに違反している。
つまり、アクターの異なるコードは分割すべきである。

```tsx
class Employee {
    // 経理部門が規定する(報告先はCFO)
    calculatePay() {}

    // 人事部門が規定する(報告先はCOO)
    reportHours() {}

    // DB管理者が規定する(報告先はCTO)
    save() {}
}
```

## 解決策

共有データは一箇所にまとめて、アクターの異なる関数を別のクラスに移動する。

```tsx
// 共有データ
class Employee {
    id: number
    name: string 
    salary: number

    constructor(id: number, name: string, salary: number) {
        this.id = id
        this.name = name
        this.salary = salary
    }
}

// 経理部門が規定する(報告先はCFO)
class PayCalculator {
    employeeData: Employee

    constructor(employee: Employee) {
        this.employeeData = employee
    }

    calculatePay() {}
}

// 人事部門が規定する(報告先はCOO)
class HourReporter {
    employeeData: Employee

    constructor(employee: Employee) {
        this.employeeData = employee
    }

    reportHours() {}
}

// DB管理者が規定する(報告先はCTO)
class EmployeeSaver {
    employeeData: Employee

    constructor(employee: Employee) {
        this.employeeData = employee
    }

    save() {}  
}

```

## 参考

- [Understanding SOLID Principles in JavaScript | Hacker Noon](https://hackernoon.com/understanding-solid-principles-in-javascript-w1cx3yrv)
- [単一責任原則で無責任な多目的クラスを爆殺する - Qiita](https://qiita.com/MinoDriven/items/76307b1b066467cbfd6a)

# O: 開放閉鎖の原則

## 概要

クラス・モジュール・関数は拡張に対して開かれて、修正に対して閉じられていなければならない。(=変更の影響を受けずにシステムを拡張しやすくする)
システムをコンポーネントに分割して、コンポーネントの依存関係を階層構造にする。(= 上位コンポーネントが下位コンポーネントの変更の影響を受けないようにする)

## 開放閉鎖の原則に違反した具体例

`employeeInfo` の`names`データ構造を変更した場合、`printEmployeeInfo` の実装も変更する必要がある。

```tsx
interface EmployeeInfo {
    description: string
    names: string[]
}

const printEmployeeInfo = (employeeInfo: EmployeeInfo) => {
	console.log(employeeInfo.description)
  employeeInfo.names.forEach((name) => {
    console.log(name);
  })
}

const employeeInfo = {
		description: "従業員情報",
    names: ["Taro", "Jiro", "Saburo"]
}

printEmployeeInfo(employeeInfo)
//=> Taro Jiro Saburo
```

## 解決策

`employeeInfo` に`names` のイテレーション方法を持たせる。
`printEmployeeInfo` は`EmployeeInfo` インターフェースを満たしたオブジェクトに対しては自身の実装を変更せずに拡張可能となった。

```tsx
interface EmployeeInfo {
    description: string
    names: string[]
    printNames: () => void
}

const printEmployeeInfo = (employeeInfo: EmployeeInfo) => {
    console.log(employeeInfo.description)
    employeeInfo.printNames()
}

const employeeInfo = {
    description: "従業員情報",
    names: ["Taro", "Jiro", "Saburo"],
    printNames: function() {
        this.names.forEach((name: string) => {
          console.log(name)
        })
    },
}

printEmployeeInfo(employeeInfo)
//=> Taro Jiro Saburo
```

## 参考

- [Maintainable Code and the Open-Closed Principle](https://medium.com/@severinperez/maintainable-code-and-the-open-closed-principle-b088c737262)
- [SOLID Design Principles Explained: The Open/Closed Principle with Code Examples](https://stackify.com/solid-design-open-closed-principle/)

# L: リスコフの置換原則

## 概要

派生クラスはその元となったベースクラスと置換が可能でなければならない。

- 派生クラスでオーバーライドされたメソッドはベースクラスのメソッドと同じ数・型の引数ととらなければならない
- 派生クラスでオーバーライドされたメソッドの返り値の型はベースクラスのメソッドの返り値の型と同じでなければならない
- 派生クラスでオーバーライドされたメソッドの例外はベースクラスのメソッドの例外と同じ型でなければならない

## リスコフの置換原則に違反した具体例

下記のコードでは`Dog`はLSPに沿っているといえる。
しかし、`Sloth` は`Animal`と置き換えることができないので、LSPに違反しているといえる。

```tsx
class Animal { 
    run(speed: number) {
        return `running at ${speed} km/h`
    }
}

// OK
class Dog extends Animal {
    bark() {}

    run(speed: number) {
        return `running at ${speed} km/h`
    }
}

// LSPに違反
class Sloth extends Animal {
    run() {
         return new Error("Sorry, I'm too lazy to run");
    }
}
```

## 参考

- [Liskov Substitution Principle in JavaScript and TypeScript](https://carstenbehrens.com/liskov-substitution-principle/)

# I: インターフェース分離の原則

## 概念

クライアントは自身が使用しないメソッドへの依存を強制してはいけない。(= 不必要な依存関係ををなくす)

## インターフェース分離の原則に違反した具体例

下記コードで`Dog` は`Animal` interfaceを満たしており、問題ないといえる。
しかし、`Lizard` では`cry`に対して処理がなく、`Animal`に不必要に依存しており、インターフェース分離の原則に違反しているといえる。

```tsx
interface Animal {
	  run: () => void
    eat: () => void
    cry: () => void
}

// OK 
class Dog implements Animal {
    run() {
        console.log("RUN")
    }

    eat() {
        console.log("EAT")
    }

    cry() {
        console.log("CRY")
    }
}

// Cryに対して処理がなく、Animalに不必要に依存している
class Lizard implements Animal {
    run() {
        console.log("RUN")
    }

    eat() {
        console.log("EAT")
    }

    cry() {
        // Don't call this method
    }
}
```

## 解決策

下記のように共通部分だけを取り出して、より細かいインターフェースへ分離することで、不必要な依存をなくす事が可能。

```tsx
interface Animal {
	  run: () => void
    eat: () => void
}

// 個別のInterface
interface Mammal extends Animal {
    cry: () => void
}

// 個別のInterface
interface Reptile extends Animal {}

class Dog implements Mammal {
    run() {
        console.log("RUN")
    }

    eat() {
        console.log("EAT")
    }

    cry() {
        console.log("CRY")
    }
}

class Lizard implements Reptile {
    run() {
        console.log("RUN")
    }

    eat() {
        console.log("EAT")
    }
}
```

## 参考

- [Interface Segregation Principle in JavaScript and TypeScript](https://carstenbehrens.com/interface-segregation/)
- [SOLID JavaScript: The Interface Segregation Principle](http://aspiringcraftsman.com/2012/01/08/solid-javascript-the-interface-segregation-principle/)

# D: 依存性逆転の原則

## 概念

上位モジュールは下位モジュールに依存してはならず、両方とも抽象に依存すべきである。(= 下位モジュールの変更に上位モジュールが影響を受けないようにする)

抽象(Interfaces/Abstractionクラス)は実装の詳細(Class)に依存してはらず、実装の詳細が抽象に依存すべきである。

## 依存性逆転の原則に違反した具体例

下記のコードでは`WhetherProvider(上位モジュール)` が `CustomHTTPClient(下位モジュール)` に依存した状態であり、DIPの原則に反していると言える。

```tsx
DataProvider --(依存)--> DataFetchClient
```

```tsx
import DataFetchClient from "FetchHTTPClient"

class DataProvider {
  httpClient: typeof DataFetchClient

  constructor(httpClient = DataFetchClient) {
    this.httpClient = httpClient
  }

  getData() {
    return this.httpClient.get("")
  }
}
```

## 解決策

モジュールを抽象(Interface)に依存させるようにする。

```tsx
interface HttpClient {
	get(arg: string): Promise<HttpClient>
}

class DataProvider {
  httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  getData() {
    return this.httpClient.get("URL")
  }
}
```

## 参考
- [Dependency Inversion Principle in JavaScript and TypeScript](https://carstenbehrens.com/dependency-inversion-principle/)
- [依存関係逆転の原則(DIP)](http://harumi.sakura.ne.jp/wordpress/2019/07/04/%E4%BE%9D%E5%AD%98%E9%96%A2%E4%BF%82%E9%80%86%E8%BB%A2%E3%81%AE%E5%8E%9F%E5%89%87dip/)

## 参考

- [SOLID原則について簡単に書く - Qiita](https://qiita.com/yui_mop/items/93fef037a787318e7067)
- [開発者が知っておくべきSOLIDの原則](https://postd.cc/solid-principles-every-developer-should-know)
- [Understanding SOLID Principles in JavaScript | Hacker Noon](https://hackernoon.com/understanding-solid-principles-in-javascript-w1cx3yrv)
