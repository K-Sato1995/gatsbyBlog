---
title: 'GraphQL認証・認可に関しての調査'
slug: graphql
date: 2019-12-10
language: japanese
category: Rails
tags:
  - GraphQL
published: true
description: 'GraphQL認証・認可に関しての調査で役立ったリンク集'
---

# 認証系

## Rails で GraphQL を使用しての実装

- [How to use graphql gem in Rails with ReactJS](http://jameshuynh.com/rails/reactjs/graphql/2018/05/06/how-to-use-graphql-gem-in-rails-with-reactjs/)
- [Rails・GraphQL 基礎 - データ更新 & 認証編 - Kei178's blog](https://kei178.me/programming/1527/)
- [Nuxt.js + GraphQL + Ruby on Rails で作ったアプリに JWT 認証を追加する方法 - Qiita](https://qiita.com/Y_uuu/items/96f85682625fb5f35760)
- [graphql-2.md · GitHub](https://gist.github.com/wayne5540/d3140186b68a1ba183e0b328a291e1f7)

## FireBase を使用しての実装

- [Rails+Firebase 認証のサンプルアプリ - Qiita](https://qiita.com/johnslith/items/6f8742b786b50f8dc0ac)
- [Firebase Authentication with GraphQL and React Client [JavaScript] \| No Programming, No Life!](https://blog.morizyun.com/javascript/typescript-tutorial-firebase-auth-graphql-react.html)
- [Firebase Auth を Nuxt + Rails の自前サービス に導入してみた](https://www.slideshare.net/TomoeTeshima/firebase-auth-nuxt-rails)
- [Using Firebase Authentication with knock for Rails · HAYDEN LUCKENBACH](https://haydenluckenbach.com/posts/firebase-knock/)
- [Firebase authentification with Ruby on Rails backend](https://medium.com/@Mpierrax/firebase-authentification-with-ruby-on-rails-backend-a9f7afc4d715)
- [How to Firebase Auth with Rails? - Stack Overflow](https://stackoverflow.com/questions/38884521/how-to-firebase-auth-with-rails)

## Device を使用する方法

- [Rails GraphQL Server Tips — Part 1, Authentication.](https://chunksofco.de/rails-graphql-server-tips-part-1-authentication-bced6cf7ac63)
- [Token Authentication with Rails, Vue, GraphQL and Devise](https://engineering.doximity.com/articles/token-authentication-with-rails-vue-graphql-and-devise)

# これに関して Firebase に関してのちょい知識

## IdToken の取り出し方法(フロント)

- [User \| JavaScript SDK  |  Firebase](https://firebase.google.com/docs/reference/js/firebase.User#get-idtoken)
- [firebase - How to get the ID token from FirebaseAuth - Stack Overflow](https://stackoverflow.com/questions/45563320/how-to-get-the-id-token-from-firebaseauth)

## Apollo の headers に token の付け方

- [Authentication - Client (React) - Apollo GraphQL Docs](https://www.apollographql.com/docs/react/networking/authentication/)

## Ruby で Firebase のトークンの検証する方法

- [Proper way to verify Firebase id tokens · Issue #216 · jwt/ruby-jwt · GitHub](https://github.com/jwt/ruby-jwt/issues/216)
- [Ruby で Firebase の id トークンを認証に使ってみる - Qiita](https://qiita.com/otakky/items/b7582202f5cde8f2dd21)
- [Firebase Auth から返ってくる JWT をゴニョゴニョする (2) - AllIsHackedOff](https://allishackedoff.hatenablog.com/entry/2017/05/18/173826)

## 主に Firebase の Custom Claims に関して

- [How to add extra fields to Firebase auth? Age & Gender - Stack Overflow](https://stackoverflow.com/questions/47300716/how-to-add-extra-fields-to-firebase-auth-age-gender)
- [android - Add extra User Information with firebase - Stack Overflow](https://stackoverflow.com/questions/39076988/add-extra-user-information-with-firebase)
- [Control Access with Custom Claims and Security Rules  \|  Firebase](https://firebase.google.com/docs/auth/admin/custom-claims)
- [Build a Role-based API with Firebase Authentication \| Toptal](https://www.toptal.com/firebase/role-based-firebase-authentication)
- [how do I implement role based access control in firebase - Stack Overflow](https://stackoverflow.com/questions/19520615/how-do-i-implement-role-based-access-control-in-firebase)
- [Controlling Data Access Using Firebase Auth Custom Claims (Firecasts)](https://www.youtube.com/watch?v=3hj_r_N0qMs)[Where Do I Put My Code In Rails (Updated)](http://codefol.io/posts/where-do-i-put-my-code-in-rails-updated/)
