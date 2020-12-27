---
title: 'Clean Architectureを理解する '
slug: understand-clean-arch
date: 2020-12-18
language: japanese
category: BookReport
tags:
  - Book
published: true
description: '自分なりにClean Archを可能な限りシンプルにまとめた'
---

# 達成する事

関心の分離

# 関心の分離により良い事

## フレームワーク非依存

アーキテクチャは、機能満載のソフトウェアのライブラリに依存していない。これにより、システムをフレームワークの制約で縛るのではなく、フレームワークをツールとして使用できる。

## テスト可能

ビジネスルールは、UI、データベース、ウェブサーバー、その他の外部要素がなくてもテストできる。

## **UI**非依存

UIは、システムのほかの部分を変更することなく、簡単に変更できる。たとえば、ビジネ

スルールを変更することなく、ウェブUIをコンソールUIに置き換えることができる。

## データベース非依存

OracleやSQL ServerをMongo、BigTable、CouchDBなどに置き換えることができる。ビジネスルールはデータベースに束縛されていない。

## 外部エージェント非依存

ビジネスルールは、外界のインターフェイスについて何も知らない。

# 概要

依存関係は内側一方向のみで、外側のルールを、内側に持ち込んではいけない

![https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/28464/11d18689-9a99-5bc0-39dc-e48623f1d11c.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/28464/11d18689-9a99-5bc0-39dc-e48623f1d11c.jpeg)

# 各レイヤーごとに解説

## エンタープライズビジネスルール(Entities)

- 企業全体の最重要ビジネスルールをカプセル化したもの

## アプリケーションビジネスルール(Use Cases)

- アプリケーション固有のビジネスルールを記述する
- エンタープライズビジネスルールをいつ・どのように呼び出すかを規定したルール が含まれている

## インターフェースアダプター(Controllers/Presenters/Gateways)

- 外部からの情報を内側で使用できる形式にデータを変換するアダプター

## フレームワークとドライバー(UI/Web/Devices/DB/External Interfaces)

- フレームワークやツールで構成されている(DB, Webフレームワーク等)

# 参考

- [Clean Coder Blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [実装クリーンアーキテクチャ - Qiita](https://qiita.com/nrslib/items/a5f902c4defc83bd46b8#usecase)
- [Trying Clean Architecture on Golang](https://medium.com/hackernoon/golang-clean-archithecture-efd6d7c43047)
- [クリーンアーキテクチャ完全に理解した](https://gist.github.com/mpppk/609d592f25cab9312654b39f1b357c60)
- [Clean ArchitectureでAPI Serverを構築してみる - Qiita](https://qiita.com/hirotakan/items/698c1f5773a3cca6193e#use-cases%E3%83%AC%E3%82%A4%E3%83%A4%E3%83%BC)
- [図解クリーンアーキテクチャ - Qiita](https://qiita.com/kz_12/items/bc79102247b86626fc72)