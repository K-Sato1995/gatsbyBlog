---
title: RailsとJWTで認証を行う
description: RailsでJWTを使用したトークンベース認証の方法のまとめ。
slug: rails-jwt
date: 2019-10-31
language: japanese
cover: ./cover.png
tags: 
  - JWT
---
# 方法1 ruby jwt gemを使用して実装

最終的にSign In用のエンドポイントを作成する実装が楽かと考えている。

## 参照
- Railsとjwtでのスクラッチ: https://www.thegreatcodeadventure.com/jwt-auth-in-rails-from-scratch/
- 自分の例(リファクタが必要): https://github.com/K-Sato1995/GraphqlApi
- JWTのgem: https://github.com/jwt/ruby-jwt
- JWTの使い回しの例: http://blog.naoshihoshi.com/entry/2018/05/14/153000
- JWTの実装: https://nebulab.it/blog/authentication-with-rails-jwt-and-react/
- How to GraphQLの例(SignInのエンドポイントをわけないで行う): https://www.howtographql.com/graphql-ruby/4-authentication/
​
## 実装流れ
- CreateUserでユーザーを作成
- SignInUserでユーザーの存在を確かめて、あればトークンを作成して渡す(ruby-jwtでToken作成)(別のエンドポイントを作成)。
- フロントエンドでlocalStorageでトークンを保管してリクエストするたびにHeadersにセット
- リクエスト受け取ってトークン検証(ruby-jwt)してcontextにユーザーセットしてgraphql実行して結果をフロントに渡す。
​
# 方法2 下記のようにknock(JWTを用いた認証)を使用して実装

## 参照
- https://www.thegreatcodeadventure.com/jwt-authentication-with-rails-ember-part-i-rails-knock/
- https://codebrains.io/rails-jwt-authentication-with-knock/
- https://ericlondon.com/2018/03/18/rails-5-api-and-react-frontend-jwt-token-authentication.html
​
※最終更新は2か月前で使用数も2.2kと多めだが、現在は正式なmintainerがおらず、しっかりと維持されていない状態。
※ knockとgraphql-rubyを併用する質問
https://github.com/nsarno/knock/issues/194
​
# 方法3 下記のようにdeviseを使用して実装

## 参照 
- 概要: https://engineering.doximity.com/articles/token-authentication-with-rails-vue-graphql-and-devise
- 実装例: https://github.com/zauberware/rails-devise-graphql/blob/master/app/models/user.rb
- devise-jwt例: https://medium.com/@mazik.wyry/rails-5-api-jwt-setup-in-minutes-using-devise-71670fd4ed03
​
※ DeviseだとJWTを使うgem(使用されている数は少ない。)
- https://github.com/waiting-for-dev/devise-jwt
