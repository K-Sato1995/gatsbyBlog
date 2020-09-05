---
title: 'オブジェクト指向設計実践ガイド'
slug: practical-object-oriented-design
date: 2020-04-13
language: japanese
category: BookReport
tags:
  - Book Review
published: true
description: 'オブジェクト指向設計実践ガイドの日本語版を読んだので、読んだ際に取ったメモ(本の内容で大切かなと自分で思った箇所のまとめ)'
---

# オブジェクト思考設計

#### 内容簡単まとめ

- オブジェクト思考が失敗する原因は一見コーディングテクニックにあるように見える。しかし、実際は視点の置き方に失敗していることにある。
- オブジェクト思考設計とは「依存関係を管理すること」。
- 今後の変更も受け入れられる物を作るらねばならない。

# 単一責任クラスを設計する

## クラスに属するものを決める

クラスはソフトウェアにおける仮想の世界を定義する。この仮想世界が以降の工程に関する全員の想像力に制約を課す。  
設計はアプリケーションの可変性を保つために技巧を凝らすことであり、完璧を目指すための行為ではない。

### 変更が簡単なようにコードを組成する

**変更が簡単なコードとは**

- 変更は副作用を伴わない
- 要件の変更が小さければ、コードの変更も相応して小さい
- 既存のコードは簡単に再利用できる
- 最も簡単な変更方法はコードの追加である

**良いコードの性質**

- 見通しが良い(Transparent): 変更するコードにおいてもそのコードに依存する別の場所のコードにおいても変更がもたらす影響が明白である。
- 合理性(Reasonalble): どんな変更であってもかかるコストは変更がもたらす利益にふさわしい。
- 利用性が高い(Usable): 新しい環境、予期していなかった環境でも再利用できる。
- 模範的(Exemplary): コードに変更を加える人が、上記の品質を自然と保つようなコードになっている。

## 単一の責任をもつクラスを作る

クラスはできる限り最小で有用な事をすべき。つまり単一の責任をもつべき。
変更が簡単なアプリケーションは再利用が簡単なクラスから構成される。2 つ以上の責任をもつクラスは簡単には再利用できない。

1 文でクラスを説明してみる。考え付く限り短い説明に「それと」が含まれていれば、クラスは 2 つ以上の責任を負っていると判断ができる。「または」が含まれる場合はクラスの責任は 2 つ以上あるだけでなく、互いにあまり関連もしない責任を負っていることがわかる。

## 変更を歓迎するコードを書く

**インスタンス変数の隠蔽**

インスタンス変数は常にアクセサメソッドで包み、直接参照しないようにする。(隠蔽することによって、予期せぬ変更がコードに影響を与える事を防ぐ)

```ruby
class Gear
  attr_reader :chainring, :cog

  def initialize(chainring, cog)
    @chainring = chainring
    @cog = cog
  end
end
```

**データ構造の隠蔽**

複雑な構造の直接の参照はデータが本当はどんなものかをわかりにくくする為、混乱を招く。
複雑なデータ構造の詳細は複数で管理されるべきでなく、一箇所で管理すべきである。

**悪い例**

data メソッドは単に配列を返すだけである。
有用な事をするには data メッセージの送り手それぞれが、なんのデータが配列のどのインデックスにあるかを完全に把握する必要がある。

```ruby
class ObscuringReferences
  attr_reader :data
  def initialize(data)
    @data = data
  end

  def diameters
    # 配列の0はリム、1はタイヤ：複雑なデータ構造の詳細
    data.collect { |cell| cell[0] + (cell[1] * 2 )}
  end
end

# リムとタイヤのサイズ (ここではミリメートル!) の2次元配列
@data = [[622, 20], [622, 23], [559, 30], [559, 40]]
```

**良い例**

下記の diameters メソッドは配列の内部構造に関して何も知らない。
diameters が知っているのは、wheels メッセージが何か列挙できるものを返し、その列挙されるもの 1 つ 1 つが rim と tire に応答するということだけ。

```ruby
class ObscuringReferences
  attr_reader :data
  def initialize(data)
    @data = wheelify(data)
  end

  def diameters
    wheels.collect { |wheel| wheel.rim + (wheel.tire *2*) }
  end

  wheel = Struct.new(:rim, :tire)
  def wheelify(data)
     data.collect { |cell| Wheel.new(cell[0], cell[1]) }
  end
end
```

## あらゆる箇所を単一責任にする

メソッドはクラスのように単一の責任をもつべき。理由は同じで単一責任であることで、メソッドの変更も再利用も簡単になる為。

**現在**

Wheels を繰り返し処理する事＋それぞれの wheel の直径を計算している事と 2 つの責任をもつ。

```ruby
def diameters
  wheels.collect { |wheel| wheel.rim + (wheel.tire *2*) }
end
```

**改良後**

```ruby
def diameters
  wheels.collect { |wheel| diameter(wheel) }
end

def diameter(wheel)
  wheel.rim + (wheel.tire * 2)
end
```

このようなリファクタリングはたとえ最終的な設計がわからない段階でも施すべきである。
むしろ、設計が明確でないからこそすべきである。

## 最終的な Wheel の実装

Wheel を Gear から独立したクラスに分離。
1 つのことに専念するクラスは、その 1 つのことをアプリケーションのほかの部位から「隔離」する。
この隔離によって、悪影響を及ぼすことのない変更と、重複のない 再利用が可能となる。

Gear の gear_inches の中で Wheel のインスタンスを作成しないことで、Gear はあくまでも、`@wheelはdiameterに応答するオブジェクト`だけ。
よって、2 つのクラスの結合を切り離す事ができる。

```ruby
class Gear
  attr_reader :chainring, :cog, :wheel

  def initialize(chainring, cog, wheel=nil)
    @chainring = chainring
  end

  def ratio
    chainring / cog.to_f
  end

  def gear_inches
    ratio * wheel.diameter
  end
end


class Wheel
  attr_reader :rim, :tire

  def initialize(rim, tire)
    @rim       = rim
    @tire      = tire
  end

  def diameter
  rim + (tire * 2)
  end

  def circumference
   diameter * Math::PI
  end
end

@wheel = Wheel.new(26, 1.5)
puts @wheel.circumference
# -> 91.106186954104
puts Gear.new(52, 11, @wheel).gear_inches
# -> 137.090909090909
puts Gear.new(52, 11).ratio
# -> 4.72727272727273
```

# 依存関係を理解する

適切に設計されたオブジェクトは単一の責任を持つ。
そのため、適切に設計されたオブジェクトは、本質的に、複雑な問題を解決するためには共同作業をする必要がある。
しかし「知っている」というのは同時に依存もつくり出してしまう。
慎重に管理しないと、これらの依存関係は次第にアプリケーションを縛り苦しめることになる。

Wheel がどうしても Gear 内に必要な場合、下記のように Wheel のインスタンス作成を、せめて Gear クラス内で分離するべき。
これにより、 `gear_inches`メソッドはきれいになり、依存は initialize メソッドにて公開されることになる。

```ruby
class Gear
  attr_reader :chainring, :cog, :rim, :tire
  def initialize(chainring, cog, rim, tire)
    @chainring = chainring
    @cog       = cog
    @wheel     = Wheel.new(rim, tire)
  end

  def gear_inches
    ratio * wheel.diameter
  end
end
```

### 引数の順番への依存を取り除く

**初期化の際に hash を使用する**

- 引数の順番に対する依存 がすべて取り除かれる。
- ハッシュ内の「キー」名が、引数に関する明示的なドキュメン トとなっている。

```ruby
class Gear
  attr_reader :chinring, :cog, :wheel

  def initialize(args)
    @chainring = args[:chainring]
    @cog = args[:cog]
    @wheel = args[:wheel]
  end
end

Gear.new(:chainring => 52, :cog => 11, :wheel => Wheel.new(26, 1.5))
```

### 明示的にデフォルト値を設置する

```ruby
def initialize(args)
  @chainring = args[:chainring] || 40
  @cog = args[:cog] || 18
  @wheel = args[:wheel]
end
```

真偽値を引数に取ったり、もしくは、引数の false と nil の区別が必要な のであれば、デフォルト値の設定には`fetch`をしようした方が良い。
fetch メソッドが || に勝る点は、対象のキーを見つけるのに失敗 しても、自動的に nil を返さないこと。
下記の例では`:chainring`キーが args ハッシュにない場合のみ、デフォルト値の`40`が`@chainring`に設定される。

```ruby
def initialize(args)
 @chainring = args.fetch(:chainring, 40)
 @cog = args.fetch(:cog, 18)
 @wheel = args[:wheel]
end
```

### 複数のパラメーターを用いた初期化を隔離する

Gear が外部のフレームワークの１部等で初期化のメソッドが固定順と仮定する。
その場合、外部のインターフェースを包み隠すメソッドを定義してあげる。

```ruby
module SomeFramework
  class Gear
    attr_reader :chianring, :cog, :wheel

    def initialize(chainring, cog, wheel)
      @chainring = chainring
      @cog = cog
      @wheel = wheel
    end
  end
end

# 外部のインターフェースをラップし、自身から変更を守る。

module GearWrapper
  def self.gear(args)
    SomeFramework::Gear.new(args[:chainring], args[:cog], args[:wheel])
  end
end

GearWrapper.new(:chainring => 52, :cog => 11, wheel => Wheel.new(26, 1))
```

- `GearWrapper`はあくまでも module である為、GearWrapper のインスタンスを作ることを意図していないことを主張する。
- `GearWrapper`の唯一の目的が他のクラスのインスタンスの作成である(ファクトリー)。

## 依存方向の管理

依存関係の方向に関する決断は、将来にわたる影響を及ぼし、その影響はアプリケーションの寿命として現れる。

極論、「自分より変更されないものに依存しなさい」

それは、下記を基準に依存方向を決めていく。

- あるクラスは、ほかのクラスよりも要件が変わりやすい
- 具象クラスは、抽象クラスよりも変わる可能性が高い
- 多くのところから依存されたクラスを変更すると、広範囲に影響が及ぶ

![image](https://user-images.githubusercontent.com/32632542/78015936-10ec7d00-7385-11ea-80ea-61301e0ccf83.png)

# 柔軟なインターフェースを作る

## パブリックインターフェース

- クラスの主要な責任を明らかにする
- 外部から実行されることが想定される
- 気まぐれに変更されない
- 他者がそこに依存しても安全
- テストで完全に文書化されている

## プライベートインターフェース

- 実装の詳細に関わる
- ほかのオブジェクトから送られてくることは想定されていない ・ どんな理由でも変更され得る
- 他者がそこに依存するのは危険
- テストでは、言及さえされないこともある

## デメテルの法則

デメテルは、3 つ目のオブジェクトにメッセージを送る際に、異なる型の 2 つ目のオブジェクトを介すことを禁する。
デメテルの法則は、「`直接の隣人にのみ話しかけよう`」や、「`ドットは1つしか使わないようにしよう`」などの言い方がされる場合もある。

# ダックタイピングでコストを削減する

ダックタイプはいかなる特定のクラスとも結びつかないパブリックインターフェース。
クラスをまたぐインターフェースは、アプリケーションに大きな柔軟性をもたらす。

クラスは、オブジェクトがパブリックインターフェースを獲得するための 1 つの方法でしかない。
**重要なのは、オブジェクトが何で「ある」かではなく、何を「する」かである。**

### ダックを見逃す

下記のような書き方をすると依存を爆発的に増やし、メンテナンスの出来ないコードになる。

**具象的なコード**

```ruby
class Trip
  attr_reader :bicycles, :customers, :vehicle
  def prepare(preparers)
    preparers.each {|preparer|
      case preparer
      when Mechanic
        preparer.prepare_bicycles(bicycles)
      when TripCoordinator
        preparer.buy_food(customers)
      when Driver
        preparer.gas_up(vehicle)
        preparer.fill_water_tank(vehicle)
      end
    }
  end
end
```

### ダックを見つける

依存を取り除くための鍵となるのは、
「Trip の prepare メソッドは単一の目的を果たすためにあるので、その引数も単一の目的を共に達成するために渡されてくるということを認識すること。」

`prepare_trip` を実装するオブジェクトは、`Preparer`。
逆に言えば、`Preparer` と相互作用するオブジェクトに必要なのは、それが `Preparer` のインターフェースを実装していると信頼することだけ。

**ダックタイピングを使用した抽象的なコード**

```ruby
class Trip
  attr_reader :bicycles, :customers, :vehicle
  def prepare(preparers)
    preparers.each { |preparer| preparer.prepare_trip(self) }
  end
end

# すべての準備者(Preparer)は
# 'prepare_trip' に応答するダック
class Mechanic
  def prepare_trip(trip)
    trip.bicycles.each { |bicycle| prepare_bicycle(bicycle) }
  end
end

class TripCoordinator
  def prepare_trip(trip)
    buy_food(trip.customers)
  end
end

class Driver
  def prepare_trip(trip)
    vehicle = trip.vehicle
    gas_up(vehicle)
    fill_water_tank(vehicle)
  end
end
```

※ポリーモフィズム: オブジェクト指向プログラミングでのポリモーフィズムは、多岐にわたるオブジェクトが、同じメッ セージに応答できる能力を指す。

## ダックを信頼するコードを書く

ダックタイプをどれだけ活用できるかは、クラスをまたぐインターフェースによって利益を享受できる箇所を見つける能力にかかっている。
ダックタイプの実装は比較的かんたん。設計上で難しいことは、ダックタイプが必要であることに気づくことと、そのインターフェースを 抽象化することである。

### ダックタイプを見つける為にたどる道筋

下記のものはダックタイピングで置き換えられる

- クラスで分岐する case 文  
  上記の`prepare`の例。case 文ないでクラス名を元に分岐させている。

- kind_of?と is_a?
  下記のコードのように、`kind_of`等を使用し、クラスで分岐させている。

```ruby
if preparer.kind_of?(Mechanic)
  preparer.prepare_bicycles(bicycle)
elsif preparer.kind_of?(TripCoordinator)
  preparer.buy_food(customers)
elsif preparer.kind_of?(Driver)
  preparer.gas_up(vehicle)
  preparer.fill_water_tank(vehicle)
end
```

- responds_to?
  上記 2 つと似ている形。依然として他のクラスに強く結びついている。

```ruby
if preparer.responds_to?(:prepare_bicycles)
  preparer.prepare_bicycles(bicycle)
elsif preparer.responds_to?(:buy_food)
  preparer.buy_food(customers)
elsif preparer.responds_to?(:gas_up)
  preparer.gas_up(vehicle)
  preparer.fill_water_tank(vehicle)
end
```

# 継承によって振る舞いを獲得する

## クラスによる継承を理解する

継承とは、根本的に「メッセージの自動委譲」の仕組みである。

## 継承を使うべき箇所を識別する

### 具象クラスからはじめる

ロードバイクを作成する為の Bicycle クラスがある。

```ruby
class Bicycle
  attr_reader :size, :tape_color

  def initialize(args)
    @size = args[:size]
    @tape_color = args[:tape_color]
  end

  # すべての自転車は、デフォルト値として
  # 同じタイヤサイズとチェーンサイズを持つ
  def spares
    {
      chain: '10-speed',
      tire_size: '23',
      tape_color: tape_color
    }
  end
# ほかにもメソッドがたくさん...
end

bike = Bicycle.new(size: 'M', tape_color: 'red')
bike.size # -> 'M'
bike.spares
#=> {
      :tire_size => "23",
      :chain => "10-speed",
      :tape_color => "red"
    }
```

### 複数の型を埋め込む

マウンテンバイクの作成も必要。
↑ の Bicycle クラスがすでに必要な要素をほぼ揃えている。
マウンテンバイクに必要な要素を追加する。

Bicycle の責任は、いまや 1 つに止まらない。
さまざまな理由によって変更が起こる可能性 があるものを含んでいて、そのまま再利用することはできない。
(下記も含めてここまでの例はアンチパターン)

```ruby
class Bicycle
  attr_reader :style, :size, :tape_color,
              :front_shock, :rear_shock
  def initialize(args)
    @style        = args[:style]
    @size        = args[:size]
    @tape_color  = args[:tape_color]
    @front_shock = args[:front_shock]
    @rear_shock  = args[:rear_shock]
  end

  # !!!!!styleでの条件分岐は危険な道を進む第一歩!!!!!
  def spares
    if style == :road
      {
        chain: '10-speed',
        tire_size: '23',
        tape_color: tape_color
      }
    else
     {
        chain: '10-speed',
        tire_size: '2.1',
        rear_shock: rear_shock
      }
    end
  end
end
```

### 埋め込まれた型を見つける

上記の style 変数は、Bicycle のインスタンスを実質的に 2 種類に分ける。
これらの 2 つのものは、 振る舞いの大部分を共有するが、style という面では異なる。

## 継承を不適切に適応する

下記は悪いコード
Bicycle が持つ振る舞いには、MountainBike に合っているものも あれば、間違っているもの、さらには適用すらできないものもある。
したがって、Bicycle は MountainBike のスーパークラスの役割を努めるべきではない。

```ruby
class MountainBike < Bicycle
  attr_reader :front_shock, :rear_shock

  def initialize(args)
    @front_shock = args[:front_shock]
    @rear_shock  = args[:rear_shock]
    super(args)
  end

  def spares
    super.merge(rear_shock: rear_shock)
  end
end
```

## 抽象を見つける

サブクラスはそのスーパークラスを「特化したもの」。

下記が継承のルール。

- (1) モデル化しているオブジェクトが`一般 > 特殊`の関係をしっかりと持っていること。
- (2) 正しいコーディングテクニックを使っていること。

### 抽象的なスーパークラスを作る

新しいバージョンの Bicycle が、完全な自転車を定義することはない。
定義するのはすべての自転車が共有するもののみとなる。
Bicycle クラスに new メッセージを送ることは到底考えられない。Bicycle はもう、完全な自転車を表さなく、抽象的な存在となった(抽象クラス)。

注意点として、サブクラスをたった 1 つだけ持つ抽象的なスーパークラスをつくることは無駄である。

```ruby
class Bicycle
# このクラスはもはや空となった。
# コードはすべて RoadBike に移された。
end

class RoadBike < Bicycle
# いまは Bicycle のサブクラス。
# かつての Bicycle クラスからのコードをすべて含む。
end

class MountainBike < Bicycle
# Bicycle のサブクラスのまま(Bicycle は現在空になっている)。 # コードは何も変更されていない。
end
```

上記では振る舞いを持ちす ぎなくなった代わりに、Bicycle は今度はまったく何も持たなくなった。

## 抽象的な振る舞いを昇格する

size と spares メソッドはすべての自転車に共通します。この振る舞いは Bicycle のパブリックインターフェースに属す。

一般に、新たな継承の階層構造へとリファクタリングをする際は、抽象を昇格できるようにコードを構成すべきであり、具象を降格するような構成にはすべきではない。(具象的な振る舞いの一部を誤って置き去りにしてしまう恐れがある為。)

```ruby
class Bicycle
 attr_reader :size # <- RoadBikeから昇格した

 def initialize(args={})
   @size = args[:size] # <- RoadBikeから昇格した
 end
end

class RoadBike < Bicycle
  attr_reader :tape_color

  def initialize(args)
    @tape_color = args[:tape_color]
    super(args) # <- RoadBikeは'super'を必ず呼ばなければならなくなった
  end
 # ...
end
```

### 具象から抽象を分ける

RoadBike と MountainBike は attr*reader の定義を Bicycle から継承するうえ、どちらも initialize メソッド内で super を送る。
これで、すべての自転車が size、chain、tire* size を理解するようになった。

```ruby
class Bicycle
  attr_reader :size, :chain, :tire_size
  def initialize(args={})
    @size       = args[:size]
    @chain      = args[:chain]
    @tire_size  = args[:tire_size]
  end
# ... .
end
```

## スーパークラスとサブクラスの結合度合いを管理する

結合度を管理することは重要。
強固に結合されたクラス同士は互いに結着し、おそらくそれぞれを独立に変更することは 不可能。

### 結合度を理解する

このクラス階層構造は動作するので、もしかしたらもうここで終わりたくなる。
しかし、取り除いたほうがよいブービートラップは、まだ含まれている。
それはサブクラスで super を必ず呼ばなければならない事だ。サブクラスで呼び忘れたら予期せぬエラーになる。
この階層構造でのコードのパターンでは、サブクラスは自身が行うことだけでなく、スーパー クラスとどのように関わるかまで知っておくことが要求される。(つまりサブクラスはこの知識に依存している。)

```ruby
class Bicyle
  attr_reader :size, :chain, :tire_size

  def initialize(args={})
    @size = args[:size]
    @chain = args[:chain] || default_chain
    @tire_size = args[:tire_size] || default_tire_size
  end

  def default_chain
    '10-speed'
  end

  def default_tire_size
    raise NotImplementedError
  end
end

class RoadBike < Bicycle
  attr_reader :tape_color

  def initialize(args)
    @tape_color = args[:tape_color]
    super(args)
  end

  def spares
    super.merge({ tape_color: tape_color})
  end

  def default_tire_size
    '23'
  end
end


class MountainBike < Bicycle
  attr_reader :front_shock, :rear_shock

  def initialize(args)
    @front_shock = args[:front_shock]
    @rear_shock =  args[:rear_shock]
    super(args)
  end

  def spares
    super.merge({rear_shock: rear_shock})
  end

  def default_tire_size
    '2.1'
  end
end
```

### フックメッセージを使ってサブクラスを疎結合にする

サブクラスに アルゴリズムを知ることを許し、super を送るよう求めるのではなく、スーパークラスが代わり に「フック」メッセージを送るようにする。
フックメッセージは、サブクラスがそれに合致するメソッドを実装することによって情報を提供できるようにするための専門のメソッド。

```ruby
class Bicycle
  def initialize(args={})
    @size       = args[:size]
    @chain      = args[:chain]     || default_chain
    @tire_size  = args[:tire_size] || default_tire_size
    post_initialize(args) # Bicycleでは送信と...
  end

  def post_initialize(args) # ...実装の両方を行う nil
  end
  # ...
end

class RoadBike < Bicycle
  def post_initialize(args) # RoadBikeは任意でオーバライドできる
    @tape_color = args[:tape_color]
  end
# ...
end
```

この変更では、super の送信を RoadBike の initialize メソッドから取り除いただけでなく、 initialize メソッドそのものをすっかり取り除いた。
RoadBike は、自身が「何を」初期化する必要があるかについての責任をまだ負っている。
しかし、「いつ」初期化が行われるかには責任がない。

次の例では Bicycle の spares メソッドに変更を加え、local_spares を送るようにしている。
Bicycle は空のハッシュを返すデフォルトの実装を提供する。
RoadBike はこのフックを活用し、オーバーライドすることで独自化した local_spares を返すようにする。

```ruby
class Bicycle
 # ...
 def spares
   { tire_size: tire_size,
     chain: chain}.merge(local_spares)
 end

# サブクラスがオーバーライドするためのフック
 def local_spares
  {}
 end
end

class RoadBike < Bicycle
 # ...
 def local_spares
   {tape_color: tape_color}
 end
end
```

# モジュールでロールの振る舞いを共有する

## ロールを理解する

問題によっては、以前には関連のなかったオブジェクト同士に共通の振る舞いを持たせなけれ
ばならない。
この共通の振る舞いはクラスと直交する。これが、オブジェクトが担う「ロール (役割)」である。

### ロールを見つける

「第 5 章 ダックタイピングでコストを削減する」で登場した Preparer ダックタイプはロールである。Preparer のインターフェースを実装するオブジェクトが Preparer ロールを担う。
Preparer ロールの存在が示唆するのは、対応する Preparable ロールの存在。

## 抽象を抽出する

```ruby
module Schedulable
 attr_writer :schedule

 def schedule
   @schedule ||= ::Schedule.new
 end

 def schedulable?(start_date, end_date)
  !scheduled?(start_date - lead_days, end_date)
 end

 def scheduled?(start_date, end_date)
  schedule.scheduled?(self, start_date, end_date)
 end

 # 必要に応じてインクルードする側で置き換える
 def lead_days
   0
 end
end

class Bicycle
  def lead_days
    1
  end
  #...
end

class Vehicle
  include Schedulable 3
  def lead_days
    53
  end
 # ...
end

class Mechanic
  include Schedulable
  def lead_days
    4
  end
end
```

## 継承可能なコードを書く

継承の階層構造とモジュールの利用性とメンテナンス性は、そのままコードの質となります。

### アンチパターン

- オブジェクトが type や category という変数名を使い、どんなメッセージを self に送るかを決めている。
- メッセージを受け取るオブジェクトのクラスを確認してから、どのメッセージを送る かをオブジェクトが決めているパターンです。

### 抽象に固執する

抽象スーパークラス内のコードを使わないサブクラスがあってはならない。
すべてのサブクラスでは使わないけれど一部のサブクラスでは使うというようなコードは、スーパークラスに置くべきではない。

### 契約を守る

サブクラスは「契約」に同意する。
スーパークラスと置換できることを約束する。

### 前もって疎結合にする

継承する側で super を呼び出すようなコードを書くのは避けるべき。
代わりにフックメッセージを利用する。
そうすれば、抽象クラスのアルゴリズムを知っておく責任からは解放されながらも、アルゴリズムに加わることは可能である。

### 階層構造は浅くする

階層構造のかたちは、全体の幅と深さで決まり、このかたちによって使いやすさ・メンテナンス性・拡張性が決まる。
浅く狭い階層構造はかんたんに理解可能。
浅く広い階層構造はそれよりは若干複雑。
深く狭い階層構造はもう少し難しくなり、残念ながら幅も自然と広くなりがち。

# コンポジションでオブジェクトを組み合わせる

コンポジションとは、組み合わされた全体が、単なる部品の集合以上となるように、個別の部品 を複雑な全体へと組み合わせる(コンポーズする)行為。

## Bicycle をパーツからコンポーズする

### Bicycle クラスを更新する

Bicycle クラスは、現在、継承の階層構造における抽象スーパークラスです。これを、コンポジションを使うように変更する。

Bicycle が Parts からコンポーズされるようにする。
これで Bicycle の責任は 3 つになった。

- (1) size を知っておくこと、
- (2) 自身の Parts を保持すること
- (3) spares に応えることです。

```ruby
class Bicycle
  attr_reader :size, :parts

  def initialize(args={})
    @size
    @parts
  end

  def spares
    parts.spares
  end
end
```

### Parts 階層構造をつくる

![image](https://user-images.githubusercontent.com/32632542/78670810-4ced8800-7919-11ea-994d-bed99fa87735.png)

```ruby
class Parts
  attr_reader :chain, :tire_size
  def initialize(args={})
    @chain      = args[:chain]     || default_chain
    @tire_size  = args[:tire_size] || default_tire_size
    post_initialize(args)
  end

  def spares
    { tire_size: tire_size,
      chain:     chain}.merge(local_spares)
  end

  def default_tire_size
    raise NotImplementedError
  end
  # subclasses may override
  def post_initialize(args)
    nil
  end

  def local_spares
    {}
  end

  def default_chain
    '10-speed'
  end
end

class RoadBikeParts < Parts
  attr_reader :tape_color

  def post_initialize(args)
    @tape_color = args[:tape_color]
  end

  def local_spares
    {tape_color: tape_color}
  end

  def default_tire_size
    '23'
  end
end

class MountainBikeParts < Parts
  attr_reader :front_shock, :rear_shock

  def post_initialize(args)
    @front_shock = args[:front_shock]
    @rear_shock =  args[:rear_shock]
  end

  def local_spares
    {rear_shock:  rear_shock}
  end

  def default_tire_size
    '2.1'
  end
end


road_bike = Bicycle.new( size:  'L',parts: RoadBikeParts.new(tape_color: 'red'))
```

## Parts オブジェクトをコンポーズする

### Part をつくる

Part 付近の「1..\*」という表記は、Parts は Part オブ ジェクトを、1 つ以上持つことを示す。

Part オブジェクトを新たに導入したことにより、既存の Parts クラスは簡潔化され Part オブジェクトの配列を包む簡潔なラッパーとなった。

![image](https://user-images.githubusercontent.com/32632542/78730718-a20cb680-7978-11ea-84d6-78c49bfecb96.png)

Part オブジェクトは、Parts オブジェクトにひとまとめにしてグループ化できる。
ロードバイクの Part オブジェクトを組み合わせ、ロードバイクに最適な Parts にしている。

```ruby
class Bicycle
  attr_reader :size, :parts

  def initialize(args={})
    @size       = args[:size]
    @parts      = args[:parts]
  end

  def spares
    parts.spares
  end
end

class Parts
  attr_reader :parts

  def initialize(parts)
    @parts = parts
  end

  def spares
    parts.select {|part| part.needs_spare}
  end
end

class Part
  attr_reader :name, :description, :needs_spare

  def initialize(args)
    @name         = args[:name]
    @description  = args[:description]
    @needs_spare  = args.fetch(:needs_spare, true)
  end
end


chain = Part.new(name: 'chain', description: '10-speed')
road_tire = Part.new(name: 'tire_size',  description: '23')
tape = Part.new(name: 'tape_color', description: 'red')

road_bike_parts = Parts.new([chain, road_tire, tape])

# Or

road_bike = Bicycle.new(size:  'L', parts: Parts.new([chain, road_tire, tape]))
```

### Parts オブジェクトをもっと配列のようにする

走査と検索のための共通のメソッドを得るために、Enumerable をインクルードする。

```ruby
require 'forwardable'

class Parts
  extend Forwardable

  def_delegators :@parts, :size, :each

  include Enumerable

  def initialize(parts)
    @parts = parts
  end

  def spares
    select {|part| part.needs_spare}
  end
end
```

## Parts を製造する

### PartsFactory をつくる

既に学習したが、ほかのオブジェクトを製造するオブジェク トはファクトリーと呼ばれる。
(=オブジェクト指向の設計者が、ほかのオブジェクトをつくるオブジェクト、という概念を簡潔に共有するために用いている語句)

```ruby
module PartsFactory
 def self.build(config, part_class  = Part, parts_class = Parts)
    parts_class.new(
      config.collect {|part_config|
        part_class.new(
          name:         part_config[0],
          description:  part_config[1],
          needs_spare:  part_config.fetch(2, true))})
  end
end

# PartsFactoryの役割は下記のような配列を1つとって、Partsオブジェクトを製造すること。
road_config = [ ['chain', '10-speed'], ['tire_size', '2.1'],
 ['tape_color', 'red'] ]
```

config の構造に関する知識をファクトリー 内に置くことによってもたらされる影響

- (1) config をとても短く簡潔に表現できる
- (2) Parts オブジェクトをつくるときは「常に」この ファクトリーを使うことが当然になる

つまり、PartsFactory は、設定用の配列と組み合わされ、有効な Parts をつくるために必要な知識を隔離する。

### PartsFactory を活用する

Part から不必要な箇所を取り除くと、下記になる。

```ruby
class Part
  attr_reader :name, :description, :needs_spare
  def initialize(args)
    @name         = args[:name]
    @description  = args[:description]
    @needs_spare  = args.fetch(:needs_spare, true)
  end
end
```

ここまでくると、Part クラス全体は、単純な OpenStruct で置き換えられる。

```ruby
require 'ostruct'

module PartsFactory
  def self.build(config, parts_class = Parts)
    parts_class.new(
     config.collect {|part_config|
        create_part(part_config)})
  end

  def self.create_part(part_config)
    OpenStruct.new(
      name:        part_config[0],
      description: part_config[1],
      needs_spare: part_config.fetch(2, true))
  end
end
```

### コンポーズされた Bicycle

```ruby
class Bicycle
  attr_reader :size, :parts

  def initialize(args={})
    @size = args[:size]
    @parts = args[:parts]
  end

  def spares
    parts.spares
  end
end

require 'forwardable'

class Part
  extend Forwardable
  def_delegators :@parts, :size, :each
  include Enumerable

  def initialize(parts)
    @parts = parts
  end

  def spares
    select {|part| part.needs_spare}
  end
end

require 'ostruct'

module PartsFactory
  def self.build(config, parts_class = Parts)
    parts_class.new(
      config.collect {|part_config|
        create_part(part_config)})
  end

  def self.create_part(part_config)
      OpenStruct.new(
        name: part_config[0]
        description: part_config[1]
        needs_spare: part_config.fetch(2, true)
      )
   end
end

road_config = [ ['chain','10-speed'], ['tire_size','23'], ['tape_color','red'] ]

road_bike = Bicycle.new(size: 'L', parts: PartsFactory.build(road_config))
```

## コンポジションと継承の選択

### 継承による影響を認める

◉ 継承の利点

- 合理的である事
- 利用性が高い事
- 模範的である事

◉ 継承のコスト

- 継承が適さない問題に対して、誤って継承を選択してしまう事
- 問題に対して継承の適用が妥当であったとしても、自分が書いているコードがほかの プログラマーによって、まったく予期していなかった目的のために使われるかもしれない事

### コンポジションの影響を認める

◉ コンポジションの利点

- 見通しが良い
- 合理的である事
- 利用性が高い事

◉ コンポジションのコスト

- コンポーズされたオブジェクトは、多くのパーツに依存する事

### 関係の選択

- 継承が最も適しているのは、過去のコードの大部分を使いつつ、新たなコードの追加が比較的 少量のときに、既存のクラスに機能を追加する場合
- 振る舞いが、それを構成するパーツの総和を上回るのなら、コンポジションを使う

# 費用対効果の高いテスト設計をする

変更可能なコードを書くことに必要な 3 つのスキル

- オブジェクト思考設計の理解
- コードのリファクタリングに長けている事
- 価値の高いテストを書く能力

効果 的なテストは、変更されたコードが継続して正しく振る舞うことを、全体のコストを上げることなく証明する。

## 意図を持ったテスト

テストをすることの真の目的は、設計の真の目的がまさにそうであるように、コストの削減である。

### テストの意図を知る

- バグを見つける
  バグの初期段階での修正は、いつでもコス トの削減になる。
- 仕様書となる
  テストは、唯一信用できる設計の仕様書となる。
- 設計の決定を遅らせる
  意図的にイ ンターフェースに依存することによって、テストを使い、設計の決定を安全に、かつ代償もなく、遅らせることができる。
- 抽象を支える
  テストは、あらゆる抽象のインターフェースを記録するものであり、したがっ て、背後を守ってくれる壁のようなもの。
- 設計の欠点を明らかにする

### 何をテストするかを知る

ほとんどのプログラマーはテストを書きすぎている。
テストからより良い価値を得るための 1 つの単純な方法は、より少ないテストを書くこと。
テストから重複を取り除くことで、アプリケーションの変更に伴うテストの変更コストが下がる。
また、テストを適切な場所に配置することで、間違いなく必要なときにのみ、テストが変更されることが保証される。
オブジェクトを、オブジェクトが応答するメッセージそのもの、かつそれだけであるかのように 扱うことで、変更可能なアプリケーションを設計することができる。

**テストは、オブジェクトの境界に入ってくる(受信する)か、出ていく(送信する)メッセージに 集中すべきです。**

送信コマンドメッセージ(DB 更新等の副作用)は、送られたことがテストされるべき。
送信クエリメッセージは、テストするべきでない。

### いつテストするかを知る

初級の設計者 はテストファーストでコードを書くことが最も有益。
最も複雑なコードは、たいてい最もスキルのない人によって書かれている。

## 受信メッセージをテストする

![image](https://user-images.githubusercontent.com/32632542/78856371-90eba480-7a61-11ea-9e4b-54f813e2bebe.png)

### パブリックインターフェースを証明する

受信メッセージは、その実行によって戻される値や状態を表明することでテストされる。
受信メッセージをテストするにあたり、第一に求められることは、考えられ得るすべての状況にお いて正しい値を返すことを証明すること。

```ruby
class WheelTest < MiniTest::Unit::TestCase
   def test_calculates_diameter
     wheel = Wheel.new(26, 1.5)
     assert_in_delta(29,wheel.diameter,0.01)
   end
end
```

Gear の gear_inches の実装は無条件に別のオブジェクト(Wheel)をつくり、それを使うようになっている。
つまり、Gear は Wheel と結合している。(Wheel が大きく、不安定なオブジェクトだと破綻を起こしかねない。)

```ruby
class GearTest < MiniTest::Unit::TestCase
  def test_calculates_gear_inches
    gear =  Gear.new(chainring: 52, cog: 11, rim: 26, tire: 1.5 )
    assert_in_delta(137.1, gear.gear_inches, 0.01)
  end
end
```

### ロールとして依存オブジェクトを注入する

◉ テストダブルをつくる

```ruby
# 'Diameterizable'ロールの担い手をつくる
class DiameterDouble
  def diameter
    10
  end
end

class GearTest < MiniTest::Unit::TestCase
  def test_calculates_gear_inches
    gear = Gear.new(chainring: 52, cog: 11, wheel: DiameterDouble.new)
    assert_in_delta(47.27, gear.gear_inches, 0.01)
  end
end
```

◉ テストを使ってロールを文書化する

ロールの可視性を高める方法の 1 つは、Wheel がそれを担うことを表明すること。
下記ではロールに対するテストという案を導入してはいるが、完全に満足のいく解決法ではない。

```ruby
class WheelTest < MiniTest::Unit::TestCase
 def setup
   @wheel = Wheel.new(26, 1.5)
 end

 def test_implements_the_diameterizable_interface
   assert_respond_to(@wheel, :diameter)
 end

 def test_calculates_diameter
   wheel = Wheel.new(26, 1.5)
   assert_in_delta(29, wheel.diameter, 0.01)
 end
end
```

## プリベートメソッドをテストする

### テスト中ではプライベートメソッドを無視する

プライベートメソッドをテストしない理由

- テストが冗長になる(private methods はすでにテストされている public mthods の中で使われるから)
- プライベートメソッドは不安定
- プライベートメソッドのテストをすることで、ほかのメソッドがそれらを間違って 使ってしまうことになりかねない

### テスト対象クラスからプライベートメソッドを取り除く

テスト対象クラスからプライベートメソッド自体もつくらないようにする。

### プライベートメソッドのテストをするという選択

プライベートメソッドは決して書かないこと。
書くとすれば、絶対にそれらのテストをしないこと。
ただし、当然のことながら、そうすることに意味がある場合を除く。

## 送信メッセージをテストする

送信メッセージは「クエリ」か「コマンド」の どちらである。

クエリメッセージは、それらを送るオブジェクトにのみ問題となる。
コマンドメッセージは、アプリケーション内のほかのオブジェクトから見える影響を及ぼす。

### クエリメッセージを無視する

副作用のないクエリメッセージの例

Gear の唯一の責任は、 gear_inches が正しく動くことの証明である。
単純に gear_inches がいつも適切な値を返 すことをテストすればおしまい。

```ruby
class Gear
  # ...
  def gear_inches
  ratio * wheel.diameter
  end
end
```

### コマンドメッセージを証明する

下記では Gear に新しい責任が増えている。コグやチェーンリングが変わったときは、必ず observer に 通知する必要がある。
observer.changed の戻り値は受け手でのテストで証明すべきである。
重複を避けるには、戻り値の確認をせずとも Gear が changed を observer に送ることを証明する方法が必要。

```ruby
class Gear
  attr_reader :chainring, :cog, :wheel, :observer
  def initialize(args)
# ...
    @observer  = args[:observer]
  end
# ...
  def set_cog(new_cog)
    @cog = new_cog
    changed
  end

  def set_chainring(new_chainring)
    @chainring = new_chainring
    changed
  end

  def changed
    observer.changed(chainring, cog)
  end
end
```

ここで「モック」が必要となる。
状態のテストとは対照的に、モックは、振る舞いのテストである。
メッセージが**何を戻すかの表明をする**のではなく、**メッセージが送られる**という期待を定義します。
モックはメッセージが送られたことを証明するためのものであり、結果を返すのはテストの進行に必要なときのみ。

```ruby
class GearTest < MiniTest::Unit::TestCase
  def setup
    @observer = MiniTest::Mock.new
    @gear = Gear.new(chainring: 52, cog: 11, observer:  @observer)
  end

  def test_notifies_observers_when_cogs_change
    @observer.expect(:changed, true, [52, 27])
    @gear.set_cog(27)
    @observer.verify
  end

  def test_notifies_observers_when_chainrings_change
      @observer.expect(:changed, true, [42, 11])
      @gear.set_chainring(42)
      @observer.verify
  end
end
```

Gear の唯一の責任は該当のメッセージを送ることだけ。
したがって、このテストは Gear がそうすることを証明するだけにとどまるべき。

## ダックタイプをテストする

### ロールをテストする

```ruby
module PreparerInterfaceTest
  def test_implements_the_preparer_interface
    assert_respond_to(@object, :prepare_trip)
  end
end
```

```ruby
class MechanicTest < MiniTest::Unit::TestCase
  include PreparerInterfaceTest
  def setup
    @mechanic = @object = Mechanic.new
  end
end
# @mechanic に依存するほかのテスト
```
