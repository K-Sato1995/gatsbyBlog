---
title: '超速Webページ速度改善ガイド'
slug: improve-web-front-peformance
date: 2021-05-07
language: japanese
category: Memo
tags:
  - Peformance
published: true
description: '超速Webページ速度改善ガイドを読んだのでその読書メモ'
---

# Webページの速度

## Webページの速度とは?

Web フロントエンドエンジニアがWebページの速度を表現するには`ページロード`と`ランタイム`という観点がある。

- ページロードの速度(ページが表示されるまでの速度): ページが表示されるまでの一連の処理
- ランタイムの速度(ページ上での操作に対するUIの応答速度): 操作に対するUIの応答や画面の更新などのWebページの実行速度

## Webフロントエンド高速化のポイント

### Webページの速度はフロントエンドが一番重要

サーバサイドに期待できるのはリソース配信のみで劇的な速度改善は望めない。

クライアントはサーバ からどのようなリソースを取得し、どの程度の時間をかけてダウンロード できたかをすべて知っている。

### Webフロントエンドを高速化する3つのポイント

1. ネットワーク処理(各種リソースをブラウザがダ ウンロードする処理)
2. レンダリング処理
3. スクリプト処理

### Webフロントエンド高速化の取り組み方

- 推測するな計測せよ(計測→改善→計測→改善の流れで行う)
- 継続的な計測・改善を行う
- 不特定多数の環境で実行されることへの配慮を行う
- 開発者はハイスペックな環境で作業している事を自覚する
- エンジニアリングだけでは解決できない問題も存在する事を理解する(デザイン上多すぎるコンテンツ等)

計測には具体的に下記のRAILモデルを使用すると良い。

![https://i.gyazo.com/857e583dc611b6f9936f06d166cd97d4.png](https://i.gyazo.com/857e583dc611b6f9936f06d166cd97d4.png)

# ネットワーク処理の基礎知識

ネットワーク処理とはWebページを開いた時に発生するサーバからのファイル弾ロードに関わる部分を指す。

## ページロードの速度を左右するネットワーク処理

- ページロード時間の理想は1秒以内(なかなか難しい)

### ネットワーク処理の速度に影響を与える要素

1. **リソースの大きさ(= ファイルサイズ)** → テキストデータや画像データは事前処理をする事絵でリソースの大きさを最小限に抑える事が可能
2. **HTTPリクエストの数** → HTML, CSS, JSファイルや画像の取得
3. **ネットワークの通信距離**

## ネットワーク処理の基本

### ユーザーの待ち時間の大半はブラウザ上のネットワーク処理

よほど大きなファイルのダウンロードや複雑な処理が伴わない限り、サーバの処理は一般的にそれほど時間を要しない。

HTMLの記述 に応じて多量に発生するサブリソースの取得がページ表示を遅らせている ケースがほとんど。

### ネットワーク処理最適化の３原則

1. **データの転送量をなるべく小さくする事** → 配信するリソースは圧縮や最適化を施し、出来るだけ小さくする
2. **データの転送回数をなるべく少なくする事**
3. **データの転送距離をなるべく短くする事**

### ネットワークから取得するリソース

- **テキスト(HTML, CSS, JS, SVG)**: Webを構成する最も基本的な要素。配信前にツールなどを用いて最小化しておく事でブラウザの評価にかかる時間やメモリの消費量を抑える事ができる
- **画像(JPEG, PNG, GIF, WebP) :** ネットワーク処理でやり取りされる総ペイロード割合の50%を超える。
- **Webフォント(WOFF, TTF, OTF)**: フォントファイルを配信してCSSから参照する技術。デバイスにインストールされているフォントに依存せずに、好きなタ イプフェイスを Web ページで利用可能。文字1つ1つの形状データを保持する為ファイルサイズが大きくなりがち。

## クリティカルレンダリングパス

下記の処理は前の工程が終わらないと後の工程を始められないクリティカルな処理。

1. HTMLドキュメントのダウンロードと評価
2. サブリソースのダウンロードと評価
3. レンダーツリーの構築とレンダリング

# ネットワーク処理の調査と改善

## サイズの大きいリソースの調査と改善

まずはサイズの大きいリソースを特定する。

### 調査方法

DevToolsやPageSpeedInsightsでサイズの大きいリソースを特定する事が可能。

### 適切な最小化が行われていないテキストリソース

テキストリソースの大きさはダウンロード時間だけでなく、ブラウザがそれらを評価するコストや占有するメモリにも影響を与える。

**改善策** 

- テキストデータは、ツールを利用して、空行や スペース、コメントなどを取り除く最小化処理を適用(JavaScript であれば、変数やプロパティの命名を短い文字列に置き換えるなどの処理 も適用される)
- テキストリソースをサーバから配信するときは、圧縮プログラムでファ イルサイズをさらに小さくするべき(gzip という一般的な圧縮プログ ラムでテキストデータを圧縮すると、60~70%ほど削減可能)

### 不必要に大きいサイズの画像

画像は、ピクセルサイズが小さくても表示には関係ないメタデータがデ ータの大部分を占めていたり、未圧縮の状態では数 MB に及んだりするこ とも珍しくない。

**改善策** 

- 適切な画像形式を選び、最適化を実施する
- 適切なサイズの画像をロードさ せる

## 待機時間が長いリクエストの調査と改善

### 調査方法

DevTools の Timing タブを使用する。

### 改善策

- リソースへの事前接続をおこなう
- キャッシュによりリクエスト結果を再利用する
- CDNからリソースを配信する

## リクエスト数の調査と改善

### 調査方法

DevToolsのNetwork パネルを使用する。

### 改善方法

- 不要なリクエストの削除(全てのページで必要なわけではないCSSやJSファイル)
- 画像の遅延ロード(スクロールしないと見えない範囲にある画像ファイルは遅延ロードする)
- 静的リソースの結合(CSSやJSを配信前に結合する事でブラウザからのリクエスト数を減らす事が可能)

## クリティカルレンダリングパスの調査と改善

### 調査方法

レンダーツリーを構成する DOM ツリーと CSSOM ツリーの準備はそれ ぞれ、DevTools の Network パネルを駆使して構築状態が俯瞰可能。

### 改善方法

- サーバープログラムの最適化
- サブリソースロードの最適化
- コンテンツに影響しないスクリプトの非同期実行

## Webフォントに関わるリソースの調査と改善

フォントファイルは重ければ重いほどレンダリングに影響する。

### 調査方法

Web ページで Web フォントが利用されているかどうかは、DevTools の Network パネルに表示されるリクエストの一覧を Font でフィルタするとわかる。

### 改善方法

- フォントファイルへのキャッシュ適用
- フォントファイルの圧縮と適切なロード
- フォントファイルのサブセット化(フォントファイルをスタイルごとや、 Unicode のコードポイントで分割することで、ブラウザが必要なフォントファイルのみをロードすることを補助する)
- FontLoading APIによるWebフォントのロード(CSS の@font-face によるフォントの定義は宣言的で、フォントファイルのロードはブラウザに委ねられますが、Font Loading APIを使うと、
JavaScript のインタフェースから命令的にロード可能)

# レンダリング処理の基礎知識

## スムーズなUIとスムーズでないUIの違い

- 動きの滑らかさ(1フレームあたり10ミリ秒以内: RAILのAnimation)
- UIの応答速度(100ミリ秒以内: RAILのResponse)

## レンダリング処理の基本

レンダリング処理がスムーズに行われているかはFPSを基準とする。

FPSとは画面が 1 秒間に何回更新されるかの単位。(テレビ＝30FPS, 映画・アニメ=24FPS, WEB=60FPS)

### 1フレームの中の処理の内訳

スクリプト処理、スタイル評価、レイアウト算出、ペイント処理等が存在する。

![https://i.gyazo.com/1a737804c4f241edb3c5de13676540e1.png](https://i.gyazo.com/1a737804c4f241edb3c5de13676540e1.png)

### 常に変化するFPS

60FPSを常に維持するのは難しい。

細かく変化して 60FPS が完全に維持されていなくても、FPS がおお よそ高い水準で安定していれば問題ない。

### レンダリング処理最適化の基本指針

- １フレーム内の処理を軽減する(処理の中で不必要な物を取り除く)
- ブラウザの内部処理による最適化を活かすこと

## レンダリング処理のパイプライン

レンダリングに関する代表的な処理が下記

- スクリプトの処理
- スタイルの評価
- レイアウトの算出
- ペイントの実行

### スクリプトの処理

HTML 文字列の テンプレート処理や、イベントの発生をとらえて表示要素の状態を変化さ せる処理を行う。

スクリプト処理中はメインスレッドが占有され、他の処理は行われない。

### スタイルの評価

CSS で宣言されたスタイル情報を、ブラウザがセレクタにマッチする各 要素に適用する。

### レイアウトの算出

各要素に割り当てられたスタイル情報をもとに、それぞれの要素がどの ような位置関係で配置されるのかを決定するのがレイアウトの算出処理である。

### ペイントの実行

上記までの処理で何の要素をどのような見た目で、どこに配置すればよ いか決めた。

ここで、画像や文字情報はもちろん、CSS によって要素に割り当 てられたボーダーや影などのビジュアル表現も処理する。

## Webアニメーションの種類と特製

### DOMアニメーション(昔の主流)

DOM 要素の style 属性を JavaScript で連続的に更新することでアニメーショ ンさせる手法。

### CSS Transitions/Animations(現在の主流)

CSS の仕様として定義されていて、プロパティの値を CSS で連続的に変化させる、つまりCSS でアニメーションさせるための仕様。

### Web Animations(新しい)

CSS と SVG それぞれのアニメーション機能を統合 し、共通の抽象化されたJavaScript APIを提供する仕様。

## CompositingによるGPUアクセラレーション

GPU アクセラレーションは、レンダリングに関する処理を CPUから GPUに委譲することで効率化す ることを指す。

ブラウザの場合の GPU アクセラレーションでは、ある要素のテクスチャ を独立した合成レイヤ(Composite Layer)としてGPUに転送し、GPU命令によ ってテクスチャを操作したり描画データの合成をしたりすることで高速なレ ンダリングを実現する。

## レンダリング処理の調査と改善

### 調査方法

DevToolsのPerformanceパネルを使用する。

### スクロール時のレンダリングが遅い原因

スクロール中に 発生しているアクティビティを記録する。

アクティビティの記録が終わったら赤いマークが付いた時間(時間がかかっている処理)のかかっているフレームを選択する。

そのフレームに含まれるイベントを調査すれば、なにが ボトルネックになっているかを把握可能。

### Forced synchronous layoutとLayout Thrashing

レイアウト情報の参照と更新がループ処理やイベントハンドラ の断続的な呼び出しによって交互に繰り返されて、Forced synchronous layoutが過度に発生している状態をLayout Thrashingと呼ぶ。

このようなケースでは、Forced synchronous layoutによる過度なレイア ウト算出を減らしてLayout Thrashingを解消できれば、レンダリング処理の性能改善に繋がる。

## ペイント処理の調査と改善

### 調査方法

上記同様Performance パネルを使用する。

処理に時間がかかっているフレ ームの中から、緑色で示されるペイント処理の関連イベントで時間がかか っている箇所を探す。

グラデーショ ンの表現(linear-gradient や radial-gradient など)や、影の表現(box- shadow や text-shadow など)といった、CSS3 のころに強化されたビジュア ル効果のプロパティはレンダリングコストが高くボトルネックになる可能性がある。

# スクリプト処理の基礎知識

スクリプト処理とは、JavaScript の実行に関連する部分を指す。

## あらゆるブラウザ処理に関わるJSの実行

スクリプトの実行を含むさまざまなブラウザ処理はメインスレッドで行 われ、並列ではなく直列に実行されます。そのためスクリプトが実行されると、ほかの処理はブロックされ、ページロードやランタイムの遅延に直結する。

## スクリプト処理の基本

- UIブロッキングに繋がる長大な処理を避ける
- メリリーくを回避し、メモリを節約する

## スクリプト処理の調査と改善

### 調査方法

DevTools の Performance パ ネルと Memor y パネルを使う。