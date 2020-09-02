---
title: 'RailsとJWTで認証を行う'
slug: rails-jwt
date: 2019-10-31
language: japanese
category: Resources
tags:
  - JWT
published: true
description: 'RailsでJWTを使用したトークンベース認証の方法のまとめ。'
---

# 方法 1 ruby jwt gem を使用して実装

最終的に Sign In 用のエンドポイントを作成する実装が楽かと考えている。

## 参照

- Rails と jwt でのスクラッチ: https://www.thegreatcodeadventure.com/jwt-auth-in-rails-from-scratch/
- 自分の例(リファクタが必要): https://github.com/K-Sato1995/GraphqlApi
- JWT の gem: https://github.com/jwt/ruby-jwt
- JWT の使い回しの例: http://blog.naoshihoshi.com/entry/2018/05/14/153000
- JWT の実装: https://nebulab.it/blog/authentication-with-rails-jwt-and-react/
- How to GraphQL の例(SignIn のエンドポイントをわけないで行う): https://www.howtographql.com/graphql-ruby/4-authentication/
  ​

## 実装流れ

- CreateUser でユーザーを作成
- SignInUser でユーザーの存在を確かめて、あればトークンを作成して渡す(ruby-jwt で Token 作成)(別のエンドポイントを作成)。
- フロントエンドで localStorage でトークンを保管してリクエストするたびに Headers にセット
- リクエスト受け取ってトークン検証(ruby-jwt)して context にユーザーセットして graphql 実行して結果をフロントに渡す。
  ​

# 方法 2 下記のように knock(JWT を用いた認証)を使用して実装

## 参照

- https://www.thegreatcodeadventure.com/jwt-authentication-with-rails-ember-part-i-rails-knock/
- https://codebrains.io/rails-jwt-authentication-with-knock/
- https://ericlondon.com/2018/03/18/rails-5-api-and-react-frontend-jwt-token-authentication.html
  ​
  ※最終更新は 2 か月前で使用数も 2.2k と多めだが、現在は正式な mintainer がおらず、しっかりと維持されていない状態。
  ※ knock と graphql-ruby を併用する質問
  https://github.com/nsarno/knock/issues/194
  ​

# 方法 3 下記のように devise を使用して実装

## 参照

- 概要: https://engineering.doximity.com/articles/token-authentication-with-rails-vue-graphql-and-devise
- 実装例: https://github.com/zauberware/rails-devise-graphql/blob/master/app/models/user.rb
- devise-jwt 例: https://medium.com/@mazik.wyry/rails-5-api-jwt-setup-in-minutes-using-devise-71670fd4ed03
  ​
  ※ Devise だと JWT を使う gem(使用されている数は少ない。)
- https://github.com/waiting-for-dev/devise-jwt
