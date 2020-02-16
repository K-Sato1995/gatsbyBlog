---
title: "Postgres cheat sheet"
slug: postgres-cheat-sheet
date: 2019-09-04
language: english
cover: ./cover.png
generate-card: false
tags:
description: "Here is a list of frequently used Postgres commands."
---
# Frequently used commands

```
$ sudo -u postgres createuser <username> : 新しいユーザーを作成する。
$ psql -c "ALTER USER davide WITH PASSWORD 'hu8jmn3';"
$ sudo -u <username> psql :対話モードにする。
$ psql <database_name>：データベースを直接参照可能になる。 
$ Rails db：データベースを直接参照可能になる
```

```
\l : DBの一覧を表示する。
\d：テーブル一覧を表示する。
\d テーブル名：指定したテーブルの情報を確認する。
\du : ユーザーの一覧を表示する。
\?: 使用可能なコマンド一覧を表示する。
\q：対話モードをやめて、元の画面に戻る。
\td: DBの構図を映し出す。
```

```
$ gem install pg : pgをインストールする。
$ rails new myapp -d postgresql: アプリを作成する際にはこれで作成する。
```
## References 
- [Creating user, database and adding access on PostgreSQL](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)
- [17 Practical psql Commands That You Don't Want To Miss](http://www.postgresqltutorial.com/psql-commands/)
- [PostgreSQL: Documentation: 8.0: CREATE USER](https://www.postgresql.org/docs/8.0/sql-createuser.html)
- [13.10 - Postgres password authentication fails](https://askubuntu.com/questions/413585/postgres-password-authentication-fails)
