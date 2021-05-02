---
title: 'CSS設計完全ガイド読書メモ'
slug: css-structure-perfect-guide
date: 2001-05-02
language: japanese
category: Memo
tags:
  - Peformance
published: true
description: 'CSS設計完全ガイドをを読んだのでその読書メモ'
---

# CSS設計の基本と実践

## セレクターの種類

### 単純セレクター

- 要素型セレクター(タイプセレクター): `p{}` など
- 全称セレクター: `*{}` など
- 属性セレクター:`a[href="http://www.w3.org/"] {}` など
- クラスセレクター:`.my-class {}`など
- ID セレクター: `#my-id {}`など
- 疑似クラス:`a:visited {}`など

### 擬似要素

- `::before`, `::after`など

### 結合子

- 子孫結合子: `div p`など
- 子結合子: `div > p`など
- 兄弟結合子: `div + p(隣接兄弟セレクター),` `div ~ p(一般兄弟セレクター)`など

## カスケーディングの基礎

下記の優先度で適用するスタイルが決まる

### (1)重要度

```css
p {
  font-size: 1rem !important; /* 1. 重要度によりこちらが適用される */
}

.my-class {
 font-size: 2rem;
}
```

### (2)詳細度

```css
.my-class {
	font-size: 2rem; /* 2. 詳細度によりこちらが適用される */
}

p {
	font-size: 1rem
}
```

詳細度は下記の優先度順に管理されている

1. IDセレクター
2. クラスセレクター・属性セレクター・擬似クラス
3. 要素型セレクター

### (3)コードの順序

```css
.my-class {
	font-size: 2rem;
}

.my-class {
  font-size: 3rem; /* 3. コードの順序によりこちらが適用される */
}
```

## 良いCSS設計が目指す4つのゴール

1. 予測できる(スタイリングが期待通りに振る舞う+スタイリングの影響範囲が予測可能)
2. 再利用できる
3. 保守できる
4. 拡張できる

## 設計をする上でのポイント

### 特定に応じてCSSを分類する

モジュール自体にレイアウトに関する下記のような指定は行わないようにする。

モジュールは、そのモジュール 自体のあしらい、及び子要素のスタイリングのみに関心を持つべきで、配置される場所等はレイアウトグループに任せるべきである。

- position(static, relativeを除く)
- z-index
- top / right / bottom / left
- float
- width
- margin

### HTMLと疎結合である

要素型セレクター(h1, p...)をCSSでは使用しない事によりHTMLとスタイリングの結びつきを弱める事ができる。

## モジュールの粒度を考える

最小モジュール: ボタンやラベル、タイトルなどのシンプルな要素

最大モジュール: いくつかの子要素を持つ、ひとかたまりの要素

# CSSの様々な設計手法

## OOCSS(Object Oriented CSS)

### OOCSSの特徴

OOCSS(Object Oriented CSS)オブジェクト指向CSS。

下記のような特徴を持つ。

- レゴのように自由に組み合わせが可能なモジュールの集まりを作ろう
- そのモジュールの組み合わせでページを作成しよう
- そのため新規ページを作るときも、基本的に追加のCSSを書く必要はない

具体的な手段として下記の原則に従う。

- ストラクチャーとスキンの分離
- コンテナとコンテンツの分離

### ストラクチャーとスキンの分離

1つの要素はストラクチャーとスキンによって成り立っているという考え。

ストラクチャー部分をオブジェクトとして切り出す事で使い回しできるようにする。

ストラクチャー

- width
- heigth
- padding
- margin

スキン

- color
- font
- background
- box-shadow
- text-shadow

```css
#main .btn {
	display: inline-block;
	width: 300px;
	max-width: 100%;
	padding: 20px 10px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, .16); font-size: 18px;
	line-height: 1.5;
	text-align: center;
} 

/* スキン */
#main .general { 
	background-color: #e25c00;
} color: #fff;

#main .warning { 
	background-color: #f1de00;
  color: #222
} 
```

### コンテナとコンテンツの分離

ここでコンテナとは「エリア」、コンテンツはそれぞれの「モジュール」を指す。

コンテナとコンテンツの分離はモジュールをなるべく特定のエリアに依存させない方針を指す。

上記のコードでは`btn`は`#main`に依存していたので、下記のように修正する。

```css
.btn {
	display: inline-block;
	width: 300px;
	max-width: 100%;
	padding: 20px 10px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, .16); font-size: 18px;
	line-height: 1.5;
	text-align: center;
} 

/* スキン */
.general { 
	background-color: #e25c00;
} color: #fff;

.warning { 
	background-color: #f1de00;
  color: #222
} 
```

## SMACSS(Scalable and Modular Architecture for CSS)

拡張可能でモジュール的なCSSの意味。

CSSのコードを役割に応じて下記の5つのカテゴリに分類する。

- ベース
- レイアウト
- モジュール
- ステート
- テーマ

### ベースルール

プロジェクトにおける標準のスタイルを定義する。

プロジェクト内において、各要素が標準としてどのように振る舞うかを定義する。(SMACSS ではリセット CSSもベースルールとして含む)

- 主要セレクター(body{}など)
- 子セレクター(a > img {} など)
- 子孫セレクター(ul li {} など)
- 疑似クラス(a:hover {} など)
- 属性セレクター(a[href] {} など)
- 隣接兄弟セレクター(h2 + p {} など)
- 一般兄弟セレクター(h2 ~ p {} など)

```css
/* 要素型セレクターの例 */
body {
	background-color: #fff;
}

/* 子セレクターの例 */
a > img {
	transition: .25s;
} 

/* 子孫セレクターの例 */
ul li {
	margin-bottom: 10px;
}

/* 疑似クラスの例 */
a:hover {
	text-decoration: underline;
}
```

### レイアウトルール

ヘッダーやメインエリア、サイドバー、フッターなどの Web サ イトの大枠を構成する大きなモジュールに対するルール。

```css
#header {
	width: 1080px; 
	margin-right: auto; 
	margin-left: auto;
	background-color: #fff;
}

#main {
	width: 1080px; 
	margin-right: auto; 
	margin-left: auto;
} 
```

特定の状況でレイアウトが変更になる場合、SMACSS では子孫セレ クターを利用したレイアウトモジュールのスタイルの上書きが認められている。

```css
.l-narrow #header { 
	width: 960px;
} 
```

### モジュールルール

モジュールは上記のレイアウトモジュールないに配置されるもの。

下記を意識する

- なるべく要素型のセレクターを使用しない(要素型を使用する場合は小セレクターを使用する)
- 特定のコンテキストに依存しない

### ステートルール

既存のスタイルをを上書き・拡張するために使用される。

- 状態スタイルはレイアウトやモジュールに割り当てることができる
- 状態スタイルは JavaScriptに依存するという意味を持つ

ステートルールの状態スタイルのクラス名はすべて「i s -」の接頭辞が付き、また既存 のスタイルをすべて上書きして状態スタイルが反映される。

```css
.inputtext {
	border: 1px solid #aaa; 
	border-radius: 3px;
}

.is-error {
	border-color: #D40152;
} 

.is-error::placeholder {
	color: #D40152;
}
```

### テーマルール

テーマルールはサイト内のレイアウトや色、テキスト処理などを一定の法則に従い上書きするもので、既存のあらゆるスタイリングが上書きの対象となる。

```html
<head>
	 <!-- 標準状態では black.css が読み込まれている -->
	 <link rel="stylesheet" href="black.css" />
	 <!-- ユーザーが右上の白ボタンをクリックすると、JavaScript などで white.css に 切り替わる -->
	 <link rel="stylesheet" href="white.css" /> 
</head>
```

## BEM(Block, Element, Modifier)

モジュールを下記の単位で分割し、これらをまとめてBEMエンティティと呼ぶ。

- Block
- Element
- Modifier

### BEMの基本

- 要素型セレクターやIDセレクターは使用せず、クラスセレクターを使用する。
- クラス名には半角英数字の小文字を使用する。(ex: global-nav)
- ネストされた命名を避け、詳細度を均一に保つ。

### Blockの基本

- 特定のコンテキストに依存してい ない、どこでも使い回せるパーツの事
- 周りに影響を与えないためにレイアウトに関するスタイリング(position, float, margin..)をしてはいけない
- クラス名はそれが何なのかを表すようにする(ex: menu)

### Elementの基本

- Blockを構成し、Blockの外では独立して使用できない物(=Elementは必ずBlockないに記載する)
- Elementのクラス名はBlockの名前を継承し、アンダースコア(_)２つの後にを記述する。(ex: block__element、menu__list-item)

```html
<ul class="menu">
	 	<li class="menu__item">
			<a class="menu__link" href="tab1/">Tab 1</a>
		</li>
</ul>
```

- BEM では Element の中に Element が ネストされた命名を推奨していない(ex: menu__item__link)
- CSSのセレクターに置いても子(孫)セレクターは使用せず、詳細どを均一に保つ

```css
/* × Element の詳細度が高い */
.menu {...}
.menu .menu__item {...}
.menu .menu__item .menu__link {...}

/* ○ Element も含めて詳細度が均一 */
.menu {...} 
.menu__item {...} 
.menu__link {...}
```

- Block内の全ての要素をElementとする必要はなくBlockをネストして使用する事が可能

### Modifierの基本

- BlockもしくはElementの見た目や状態・振る舞いを定義するもの(= Modifierを単独で使用する事はできない）
- Block か Element のクラス名がある状態で、ふたつ目以降のクラス名として Modifier を付ける

```html
<a class="tab active" href="#"> ボタン </a>
```

- 特定のBlockやElementのmodifierの場合、アンダースコア(_)を1つ挟む(ex: menu__item_active)

```html
<ul class="menu"> 
	<li class="menu__item menu__item_active">Tab 3</li>
</ul>
```

Modifierには下記のようなパターンがある

1. 見た目：どんなサイズか？どの色か？どのテーマに属するか？(ex: size_s, theme_caution
2. 状態：他のBlockと比べて何が違か？(ex: disabled, focused, actived)
3. 振る舞い：それがどのように振舞うか(ex directions_right-to-left, position-bototm-right)

### Blockのネスト(MIX)

Blockは他のあらゆるBlockの中にネストして使用する事が可能。

その際にBlock同士の配置を記述したいケースがある。それをMixで対応する。

Mixをする事で下記が達成される

- コードを複製する事なく、複数のBEMエンティティの振る舞いやスタイルを組み合わせる
- 既存のBEMエンティティから新しいモジュールを作る

例として、下記のようなコードがあった場合、Mixを使用する場合は、下記のようにBlockの名前をつなげたようなクラス名にする。

```html
<header class="head">
	<div class="menu head__menu">...</div>
</header>
```

また、CSSを書く際には子要素・孫要素は詳細度を高めないように使用しない。

```css
/* × .logo にスタイリングをしている */
.head .logo {
	margin-right: 30px;
} 

/* ○ .head__logo にスタイリングをしている */
.head__logo {
	margin-right: 30px;
}
```

# レイアウトの設計

レイアウトに関すること は、レイアウト用のクラスに任せる。