---
title: "Rails Associations"
slug: rails-associations
date: 2019-01-21
language: japanese
tags:
  - Rails
  - Associations
published: true
description: "Ruby on Railsでよく使用される5つのアソーシエーションに関してまとめました。各アソーシエーション毎に何を意味するのか、また、どんなメソッドを使用する事で関連した要素を作成出来るのかまとめました。"
---
# Associations

# 本記事で扱うAssociations
- One to One
- One to Many
- Many to Many(has_many_through)
- Many to Many (has_and_belongs_to_many)
- Plymorphic One to Many

# One to One

`One to One`はモデル同士に「１対１」関係がある事を示す。  
モデルAの１つのレコードがモデルBの１つのインスタンスを丸ごと所有している。

例えば、１人のユーザーが１つのプロファイルを持つ場合。

### 各テーブルのカラム
```ruby
# CreateUsers
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.timestamps
    end
  end
end

# CreateProfiles
class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.string :name
      t.references :user
      t.timestamps
    end
  end
end
```

### 各モデル
```ruby
# app/models/user.rb
class User < ApplicationRecord
  has_one :profile
end

# app/models/profile.rb
class Profile < ApplicationRecord
  belongs_to :user
end
```

### One to Oneで頻繁に使用されるメソッド

```ruby
user.profile :該当ユーザーのプロファイル情報を取得
user.build_profile :該当ユーザーのプロファイルを作成(DBに保存しない)
user.create_profile :該当ユーザーのプロファイルを作成(DBに保存する)
```

# One to Many

`One-to-Many`は他のモデルとの間に「１対多」の関係がある事を示す。  
モデルAの１つのレコードが０個以上のモデルBのインスタンスを所有している。


例えば、１人のユーザー(`user`)が複数の投稿(`post`)を持つ場合。

### 各テーブルのカラム
```ruby
# CreateUsers
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.timestamps
    end
  end
end

# CreatePosts
class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.references :user
      t.timestamps
    end
  end
end
```

### 各モデル
```ruby
# app/models/user.rb
class User < ApplicationRecord
  has_many :posts
end


# app/models/profile.rb
class Post < ApplicationRecord
  belongs_to :user
end
```

### One to Manyで頻繁に使用されるメソッド

```ruby
user.posts :該当ユーザーの全ての投稿を取得。
user.posts << post :新しい関係を作成する。
user.posts.build({}) :該当ユーザーの投稿を作成する。(DBに保存しない)
user.posts.create({}) :該当ユーザーの投稿を作成する。(DBに保存する)
post.build_user :ユーザー作成。(DBに保存しない)
post.create_user :ユーザー作成。(DBに保存する)
```

# Many to Many(has_many_through)
`Many-to-Many`は他のモデルとの間に「多対多」の関係がある事を示す。  
モデルAとモデルB共に相互の複数のインスタンスを所有している。  
`has_many_through`の方式ではモデルC(結合モデル)がモデルAとモデルBを
繋ぐ。

例えば、複数の投稿(`post`)が複数のタグ(`tag`)を持つ場合。

### 各テーブルのカラム
```ruby
# CreatePosts(モデルA)
class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.timestamps
    end
  end
end

# CreateTags(モデルB)
class CreateTags < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.string :name
      t.timestamps
    end
  end
end

# CreateTaggings(モデルC)
class CreateTaggings < ActiveRecord::Migration[5.1]
  def change
    create_table :taggings do |t|
      t.references :tag
      t.references :post
      t.timestamps
    end
  end
end
```

### 各モデル
```ruby
# app/models/post.rb
class Post < ApplicationRecord
  has_many :taggins
  has_many :tags, through: :taggings
end

# app/models/tag.rb
class Tag < ApplicationRecord
  has_many :taggins
  has_many :posts, through: :taggings
end

# app/models/tagging.rb
class Tagging < ApplicationRecord
  belongs_to :tag
  belongs_to :post
end
```

### Many to Many(has_many_through)で頻繁に使用されるメソッド

```ruby
post.tags :該当投稿の全てのタグを取得。
post.tags << tag :新しい関係を作成する。
post.tags << [tag1, tag2] :新しい関係を作成する。
post.tag_ids :該当投稿のタグのIDを全て取得する。
post.tags.destroy(tag) :該当投稿からtagを消去する。
post.taggings :該当投稿の全てのtaggingsを取得。
post.taggings.build(tag_id: tag.id) :投稿とtagの関係を作成する。(DBに保存しない)
post.taggings.create(tag_id: tag.id) :投稿とtagの関係を作成する。(DBに保存する)
post.tags.build({}) :該当投稿と結合モデル(tagging)で結びつくタグを作成する。(DBに保存しない)
post.tags.create({}) :該当投稿と結合モデル(tagging)で結びつくタグを作成する。(DBに保存する)
tag.posts.build({}) :該当タグと結合モデル(tagging)で結びつく投稿を作成する。(DBに保存しない)
tag.posts.create({}) :該当タグと結合モデル(tagging)で結びつく投稿を作成する。(DBに保存する)
```

# Many to Many(has_and_belongs_to_many)
`Many-to-Many`は他のモデルとの間に「多対多」の関係がある事を示す。  
モデルAとモデルB共に相互の複数のインスタンスを所有している。  
`has_and_belongs_to_many`の方式では１つのJOINテーブルを介してモデルAとモデルBが互いのインスタンスを多数所有し合う。。

例えば、複数の投稿(`post`)が複数のタグ(`tag`)を持つ場合。

### 各テーブルのカラム
```ruby
# CreateUsers(モデルA)
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.timestamps
    end
  end
end

# CreateRoles(モデルB)
class CreateRoles < ActiveRecord::Migration[5.1]
  def change
    create_table :roles do |t|
      t.string :name
      t.timestamps
    end
  end
end

# CreateRolesUsers
class CreateRolesUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :roles_users, id: false do |t|
      t.references :user, foreign_key: true
      t.references :role, foreign_key: true
    end
  end
end
```

### 各モデル
```ruby
# app/models/user.rb
class User < ApplicationRecord
  has_and_belongs_to_many :roles
end


# app/models/tag.rb
class Role < ApplicationRecord
  has_and_belongs_to_many :users
end
```

### Many-to-Many(has_and_belongs_to_many)で頻繁に使用されるメソッド
`Many-to-Many(has_many_through)`で頻繁に使用されるメソッドを参照。

# Polymorphic
`Polymorphic`であるモデルAが他の複数のモデル(B,C,D)に属していることを、1つの関連付けだけで表現することが可能。

例えば、コメント(`picture`)が投稿(`post`)がとユーザー(`user`)に所属している場合。

### 各テーブルのカラム
```ruby
# CreateUsers(モデルA)
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.timestamps
    end
  end
end

# CreatePosts(モデルB)
class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.references :user
      t.timestamps
    end
  end
end

# Createpictures(モデルC)
class Createpictures < ActiveRecord::Migration[5.1]
  def change
    create_table :pictures do |t|
      t.string :body
      t.integer :imageable_id
      t.string :imageable_type
      t.timestamps
    end
  add_index :pictures, [:imageable_type, :imageable_id]
  end
end

以下のようにreferencesを使用してより簡潔に書くことも可能。
# Createpictures(モデルC)
class Createpictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.text :body
      t.references :imageable, polymorphic: true, index: true
      t.timestamps
    end
  end
end
```

### 各モデル
```ruby
# app/models/user.rb
class User < ApplicationRecord
  has_many :posts
   has_many :pictures, as: :imageable
end

# app/models/post.rb
class Post < ApplicationRecord
  belongs_to :user
  has_many :pictures, as: :imageable
end

# app/models/picture.rb
class picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true
end
```

### Polymorphicで頻繁に使用されるメソッド

```ruby
post.pictures :該当投稿の全てコメントを取得。
user.pictures :該当ユーザーの全てコメントを取得。
post.pictures.build :該当投稿に結びつくコメントを作成。(DBに保存しない)
post.pictures.create :該当投稿に結びつくコメントを作成。(DBに保存する)
user.pictures.build :該当ユーザーに結びつくコメントを作成。(DBに保存しない)
user.pictures.create :該当ユーザーに結びつくコメントを作成。(DBに保存する)
post.pictures << picture.new({}) :該当ポストにコメントを関連づけ。
user.pictures << picture.new({}) :該当ユーザーにコメントを関連づけ。
```

以下のようなImageができるイメージ。

```ruby
[
  {id: 1, name: "ss", imageable_id: 1, imageable_type: "Post"},
  {id: 2, name: "ss", imageable_id: 1, imageable_type: "User"}
  ]
```

# References 
- [Everything There Is to Know About Associations in Rails - DEV Community 👩‍💻👨‍💻](https://dev.to/neshaz/everything-there-is-to-know-about-associations-in-rails-52ii)
- [Brush up Your Knowledge of Rails Associations — SitePoint](https://www.sitepoint.com/brush-up-your-knowledge-of-rails-associations/)
- [Active Record Associations — Ruby on Rails Guides](https://guides.rubyonrails.org/association_basics.html)
- [Using build with a has_one association in rails - Stack Overflow](https://stackoverflow.com/questions/2472982/using-build-with-a-has-one-association-in-rails)
