---
title: 'Golang Tips (2)'
slug: go-tips-2
date: 2020-12-05
language: english
category: Programming
tags:
  - Go
  - Tips
published: true
description: 'List of Golang tips(2)'
---

If you want to read more about Golang tips, check out [Go tips(1)](https://k-sato-0130.com/go-tips/)!

# Append()

```jsx
append(slice, newElement)
```

- [A Tour of Go](https://tour.golang.org/moretypes/15)

# Naked Return

When you have a named return value (err here):

```jsx
func  Insert(docs ...interface{}) (err error) {}
```

This creates a function-local variable by that name, and if you just call `return` with no parameters, it returns the local variable. So in this function,

```
return
```

Is the same as, and implies,

```
return err
```

- [Empty return in func with return value in golang](https://stackoverflow.com/questions/45239409/empty-return-in-func-with-return-value-in-golang)

- [Functions and Naked Returns In Go](https://www.ardanlabs.com/blog/2013/10/functions-and-naked-returns-in-go.html)

# Go debug with delve

```jsx
runtime.Breakpoint()
```

- [How can I set breakpoints by the sourcefile line number in Delve?](https://stackoverflow.com/questions/35856911/how-can-i-set-breakpoints-by-the-sourcefile-line-number-in-delve)

- [Debugging Go Programs using Delve - golangbot.com](https://golangbot.com/debugging-go-delve/)

# Check if a property was set in a struct

```jsx
package main

import "fmt"

type MyStruct struct {
    Property string
}

func main() {
    s1 := MyStruct{
        Property: "hey",
    }

    s2 := MyStruct{}

    if s1.Property != "" {
        fmt.Println("s1.Property has been set")
    }

    if s2.Property == "" {
        fmt.Println("s2.Property has not been set")
    }
}
```

- [How check if a property was set in a struct](https://stackoverflow.com/questions/20554175/how-check-if-a-property-was-set-in-a-struct)

# Go Name conventions

## Directory/File/Code

- Directory name: lowercase
- File name: snake_case
- In Code: camelCase/CamelCase

- [他言語プログラマが最低限、気にすべきGoのネーミングルール](https://zenn.dev/keitakn/articles/go-naming-rules)

## Functions

- function that returns a boolean value: yes-no question (ex: IsRetrievable, CanRetrieve, IsValid)

- [Naming Conventions: What to name a method that returns a boolean?](https://stackoverflow.com/questions/1370840/naming-conventions-what-to-name-a-method-that-returns-a-boolean)

# Interfaces

- [Interfaces Explained](https://www.alexedwards.net/blog/interfaces-explained)

# Clear slice

```jsx
func main() {
	slice := - []string { "StringA", "StringB" } //=> - [StringA StringB]
	fmt.Println(slice)
	
	slice = nil 
	fmt.Println(slice) //=> - []
}
```

- [How to best clear a slice: empty vs. nil](https://yourbasic.org/golang/clear-slice/)


# Check element Exist in a slice

```go
func Find(slice - []string, val string) (int, bool) {
    for i, item := range slice {
        if item == val {
            return i, true
        }
    }
    return -1, false
}
```

- [Check Element Exists in a Slice - GolangCode](https://golangcode.com/check-if-element-exists-in-slice/)

# API Testing

- [Mocking HTTP Requests in Golang](https://www.thegreatcodeadventure.com/mocking-http-requests-in-golang/)

# Copy(Type Casting?) struct

```jsx
type Foo struct {
    Id    string
    Name  string
    Extra Common
}

type Bar struct {
    Id    string
    Name  string
    Extra Common
}

foo := Foo{Id: "123", Name: "Joe"}
bar := Bar(foo)
```

- [Copy one struct to another where structs have same members and different types](https://stackoverflow.com/questions/37246473/copy-one-struct-to-another-where-structs-have-same-members-and-different-types)

- [The Go Programming Language Specification](https://golang.org/ref/spec#Conversions)

# If with short statement

```go
if value, err := hogeFunc(); err! = nil {
  // only gets excuted if err is not nil 
}
```

- [When Should I Use One Liner if...else Statements in Go? - Calhoun.io](https://www.calhoun.io/one-liner-if-statements-with-errors/)

# Go API Examples

- [MichaelMure/git-bug](https://github.com/MichaelMure/git-bug)

- [flipped-aurora/gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)

- [snowlyg/IrisAdminApi](https://github.com/snowlyg/IrisAdminApi)

# Go Graphql server examples

- [MichaelMure/git-bug](https://github.com/MichaelMure/git-bug)

- [fwojciec/gqlgen-sqlc-example](https://github.com/fwojciec/gqlgen-sqlc-example/tree/part1)

- [cmelgarejo/go-gql-server](https://github.com/cmelgarejo/go-gql-server)

- [Let's Build a GraphQL Server in Go, Part 1](https://w11i.me/graphql-server-go-part1)

# Go Clean Arch examples

- [muroon/memo_sample](https://github.com/muroon/memo_sample)

- [Applying The Clean Architecture to Go applications * Manuel Kiessling](https://manuel.kiessling.net/2012/09/28/applying-the-clean-architecture-to-go-applications/)

- [manuelkiessling/go-cleanarchitecture](https://github.com/ManuelKiessling/go-cleanarchitecture)

- [bxcodec/go-clean-arch](https://github.com/bxcodec/go-clean-arch)

- [Clean ArchitectureでAPI Serverを構築してみる - Qiita](https://qiita.com/hirotakan/items/698c1f5773a3cca6193e#use-cases%E3%83%AC%E3%82%A4%E3%83%A4%E3%83%BC)

- [Introducing Clean Architecture by refactoring a Go project](https://threedots.tech/post/introducing-clean-architecture/)

- [caohoangnam/go-clean-architecture](https://github.com/caohoangnam/go-clean-architecture)

# Update child records with GORM

- [How to update the nested tables in sql using gorm?](https://stackoverflow.com/questions/52109279/how-to-update-the-nested-tables-in-sql-using-gorm)