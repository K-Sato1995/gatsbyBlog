---
title: 'Joins・Preload・Eager load・Includes in Rails'
slug: joins-preload-eagerload-includes-in-rails
date: 2020-03-26
language: english
category: Programming
tags:
  - ActiveRecord
published: true
description: 'I wrote this post to undersand the differences between joins, preload, eager_load and includes in Rails.'
---

# Joins

- Uses `LEFT INNER JOIN`.
- Is used to filter results(not accessing records from a relationship).
- Dose not load data into memory. Thus, won't stop N+1 queries.

```ruby
Post.joins(:comments)
=>
Post Load (21.3ms)  SELECT  "posts".* FROM "posts" INNER JOIN "comments" ON "comments"."post_id" = "posts"."id"
```

# Preload

- Loads the data in multiple queries.
- You can't use any condition like `where` with it.

```ruby
Post.preload(:comments).map { |post| post.comments }
=>
Post Load (0.7ms)  SELECT "posts".* FROM "posts"
Comment Load (17.7ms)  SELECT "comments".* FROM "comments" WHERE "comments"."post_id" IN ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
```

## With `where` clause

```ruby
Post.preload(:comments).where("comments.id=1")
=>
ActiveRecord::StatementInvalid (PG::UndefinedTable: ERROR:  missing FROM-clause entry for table "comments")
```

# Eager_Load

- Loads all associated data in single quer using `LEFT OUTER JOIN`.

```ruby
Post.eager_load(:comments)
=>
SELECT  DISTINCT "posts"."id" FROM "posts" LEFT OUTER JOIN "comments" ON "comments"."post_id" = "posts"."id" LIMIT $1  [["LIMIT", 11]]
SELECT "posts"."id" AS t0_r0, "posts"."title" AS t0_r1, "posts"."description" AS t0_r2, "posts"."user_id" AS t0_r3, "posts"."created_at" AS t0_r4, "posts"."updated_at" AS t0_r5, "posts"."status" AS t0_r6, "comments"."id" AS t1_r0, "comments"."content" AS t1_r1, "comments"."post_id" AS t1_r2, "comments"."created_at" AS t1_r3, "comments"."updated_at" AS t1_r4 FROM "posts" LEFT OUTER JOIN "comments" ON "comments"."post_id" = "posts"."id" WHERE "posts"."id" IN ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)  [["id", 1], ["id", 2], ["id", 3], ["id", 4], ["id", 5], ["id", 6], ["id", 7], ["id", 8], ["id", 9], ["id", 10], ["id", 11]]
```

# Includes

The `includes` method works like `eager_load` if you have a `where` or `order` clause that references a relationship. Otherwise, it works like `preload`.

```ruby
Post.includes(:comments)
=>
Post Load (4.1ms)  SELECT  "posts".* FROM "posts" LIMIT $1  [["LIMIT", 11]]
Comment Load (0.5ms)  SELECT "comments".* FROM "comments" WHERE "comments"."post_id" IN ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
```

# 参考

- [Making sense of ActiveRecord joins, includes, preload, and eager_load \| Scout APM Blog](https://scoutapm.com/blog/activerecord-includes-vs-joins-vs-preload-vs-eager_load-when-and-where)
- [Preload, Eager Load, Includes and Joins in Ruby on Rails](https://www.railscarma.com/blog/technical-articles/preload-eager-load-includes-and-joins-in-ruby-on-rails/?__cf_chl_jschl_tk__=649af04b5c86210af8d2f1913e4a55acaaa7c115-1585016990-0-AWbeQB8KGhsRqnlJ85EVVo5VSC5DQP8xbuQAEjLTRLjo0An62MrJA6uTEEEdsLsa6WRgvIWLi8zcSvynppMh-CifdmeVZFHQG83j7kghl4ZzVI5oUINL_8WmQ5BvsBy_wYt5Mb8rmuyCybwE_eTtDf9UjyA6Rdnn-6wmv0pTu7sqSrsXFNr6TO34qbVUYEz3Z0N8f-kTuminhovNefW3XEkTcHIcTk-QRIyKDe3h3GugAtt17TZfHBvC_1laVTRlJXtWBa8azT0Hk3zYDmdcrS1aY3n5QEUVdu9nGPS_qJVuzM3XHxb0O4Djs1lRjP0KmZWwp4ffWSADsCyQjmkLydrjadmUJK_1NVq8N8iOuGEBIoIamHm2GisA2b2MJasdgg)
- [ActiveRecord の includes, preload, eager_load の個人的な使い分け \| Money Forward Engineers' Blog](https://moneyforward.com/engineers_blog/2019/04/02/activerecord-includes-preload-eagerload/)
- [ActiveRecord の joins と preload と includes と eager_load の違い - Qiita](https://qiita.com/k0kubun/items/80c5a5494f53bb88dc58)
- [Rails: JOIN すべきかどうか、それが問題だ — #includes の振舞いを理解する（翻訳）｜ TechRacho（テックラッチョ）〜エンジニアの「？」を「！」に〜｜ BPS 株式会社](https://techracho.bpsinc.jp/hachi8833/2017_09_25/45650)
