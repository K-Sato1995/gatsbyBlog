---
title: 'Clean Coder読書メモ'
slug: clean-coder-memo
date: 2020-08-30
language: japanese
category: BookReport
tags:
  - Book
published: true
description: 'Clean Coderを読んだので、その読書メモ'
---

# プロ意識

## プロになる前に注意したい事

- プロは自分で後始末をする。
- プロ意識というのは自分で責任を取ることに他ならない。

## 責任を取る

- バグのないソフトウェアを作るのが難しいからといって、開発者に責任がないわけではない。
- 間違いが避けられないとしても、それでも責任を取るのがプロである。
- テストは全てのコードをカバーする。プロは全てのコードが正常どおりに動いている事を把握していなければならない。
- テストしにくいコードはテストしにくい設計になっているのが問題なので、テストしやすい設計に変更する。
- プロは構造を犠牲にして機能を届けるのはバカのやる事であると考える。
- ソフトウェアは適切なコストで変更できなければいけない。

## 労働論理

- 自身のキャリアの責任は自分自身にある。(自分のキャリアを雇用主に任せてはならない。)
- プロは自分の専門知識の手入れにも時間をかけるもの。(プロは自発的に学習して常に技術力を向上する。)

## 自分の専門分野を知る

- 下記はソフトウェアのプロが備えるべき最低限の事項。

```tsx
- デザインパターン: GOFの24のパターンについて説明できる。POSAのパターンを実際に使える知識がある。
- 設計原則: SOLID原則を知っている。コンポーネントの原則を熟知している。
- 方法論: XP・スクラム・リーン・カンバン・ウォーターフォール・構造化分析・構造化設計を理解している。
- 規律: TDD・オブジェクト思考設計・構造化プログラミング・継続的インテグレーション・ペアプログラミングを実践している。
- 成果物: UML・DFD・構造チャート・ペトリネット・状態遷移図・状態遷移表・フローチャート・ディシジョンテーブルの使い方を知っている。
```

- 業界の変化は激しい。ソフトウェア開発者は継続的に学習しなければならない。
- ビジネス(ドメイン知識)を理解せずに仕様からコードを書いているのはプロとしては最低である。仕様の間違いを発見・指摘できる様にドメインを理解しなければならない。
- 雇用主の立場に立って、開発する機能が雇用主の要望にかなっているかを確認しなければならない。

# ノーと言う

- 不可能な要望にはノーと言えなくてはならない。
- 奴隷はノーという事はできない。労働者はノーと言う事をためらう。だがプロはノーという事を期待されている。

## 反対者の役割

- プロであれば自分の目的をできる限り積極的に追い求めて、必ず達成する。
- マネージャーの言う事を全て聞くのではなく、お互いの最善の結果を生み出す事を目標とする。(不可能な締め切りに問題ないとは言わず、何ができて何ができないのか明確に伝える。)
- 「なぜ」よりも「事実」を伝える。(何かが不可能であれば、まずは不可能であると言う事実を伝える。)

## 試しにやってみる

- 試しにやってみると言うのは力を温存していた事を認めることになる。試しにやってみると言うのは温存していた力を使えば目標が達成できると認めることである。

## コードの実現不可能性

- プロはヒーローになることがある。それはヒーローになろうとしたからではない。プロは納期・予算どおりに仕事を成し遂げた時にヒーローになる。
- プロの規律を失ってまで(テストを書かない、コピペするなど)、イエスと言うのは問題を解決する方法ではない。

# イエスと言う

プロは頼まれた全ての作業にイエスという必要はない。しかしイエスと言える様な創造的な方法を懸命に探さなればならない。プロがイエスという時には確実に約束したとわかる様な約束言葉を使っている。

- 約束できるのは自分で完全に制御できるものだけ。
- 時間に間に合わない場合はできるだけ早く相手の期待を変更する。
- 著者の経験によると、規律(テスト、リファクタ等の作業)を破ると遅くなる。

# コーディング

## 準備

- コーディング中は下記の要因を同時に意識しなければならない。

```tsx
- コードは正しく動かなければならない。
- コードは開発者にかわって、顧客の問題を可決しなければならない。
- コードは既存のシステムに適合しなければならない。
- コードは他のプログラマが読み安いものでなければならない。
```

- 疲労時や注意散漫の時にはコードを書いてはならない。
- 献身やプロ意識は労働時間ではなく、規律を守っているかどうかである。睡眠・健康・生活様式を調整して１日に８時間で満足のいく時間を作らなければならない。

## 不安なコード

- 心配事があり集中できない時はコードを書く時間ではない。その心配事を解決せねばならない。
- 心配事を作り出している事柄に時間を決めて取り組んでみる。
- プロの開発者はオフィスでの生産性をできるだけ高める様に、自分の時間をうまく分配している。つまり、オフィスで悩まない様に、家で心配事を落ち着かせる時間を作っている。

## 音楽

- 音楽を聞いている時はうまくコードがかけない。音楽は集中力を向上させはくれない。(人それぞれでは？？)

## 書きたいのに書けない

- コードが全く浮かばない時がある。その様な場合は別の仕事をする。

## デバッグの時間

- デバッグは避けられない生理的現象の様なもの。
- デバッグの時間をゼロに近づけるのはプロとしての義務である。
- バグの多いソフトウェア開発者はプロではない。

## 去り際を知る

- 夜中に働かない脳を酷使して何時間も問題を解決しようとしてもただ疲れるだけだ。
- 疲れてどうしようもなくなったら、しばらく離れると良い。

## 遅れ

- 遅れは誰にでも起きうることである。
- 最悪なのはずっと間に合うと言い続け、最後に期待を裏切る事。
- 定期的に進歩を管理して、事実に基づいた(最早終了日・通常の終了日・最遅い終了日)を求める。この際に願望を含めてはいけない。

## 緊急対応

- マネージャが特定の期日に間に合わせる様に言ってきても、自分の見積もりを死守する。
- 上司にはその選択肢も検討したが、予定を前倒しするにはスコープを削るしかない事を伝える。
- 緊急対応は無理だ。速くコードを書くことはできない。速く問題を解決することはできない。やってみようとしても、遅くなるだけである。ぐちゃぐちゃになると他の人の分まで遅くなってしまう。

## 残業

- 残業でうまくいくこともある。時には残業も必要だろう。だが、それは非常に危険だ。時間を 20%増やしたからと言って、仕事が 20%多くできることは確実になり。また、2~3 週間ほど続けていれば残業は機能しなくなる。

下記の基準がない場合は残業に同意してはしてはならない。

```tsx
(1) 個人的に余裕がある場合。
(2) ２週間以内などの短い期間の場合。
(3) 残業しても間に合わない時の次善策を上司が持っている場合。
```

## 嘘の伝達

- 最もプロとして相応しく無い行為が、作業が終わっていないのに終わったと嘘をつくこと。
- 自分勝手に「完了」の定義を作り、充分にやったと勝手に納得して、次の作業に移る開発者がいる。残った作業は空いた時間に対応しようなどと自分を正当化するのだ。この様な行為は他の開発者に伝染し、マネージャがすべて上手くいっていると勘違いしてしまう。

# テスト駆動開発(TDD)

## TDD の３大原則

1. 失敗するユニットテストを書くまで、プロダクションコードを書いてはいけない。
2. テストを失敗させる目的以外でユニットテストを書いてはいけない。
3. 失敗しているユニットテストが成功するまで、他のプロダクションコードを書いてはいけない。

上記の原則に従うと、下記の様なサイクルを辿るようになる。

```tsx
最初に小さなユニットテストを書く。
↓
存在しないクラスや関数を使用しなければならないので、ユニットテストは失敗する。
↓
テストが成功するまでプロダクションコードを書かなければならない。
```

## TDD の利点

### 1. 確実性

TDD を採用していれば、大量のテストを書くことになる。

カバレッジが 90%ほどのテストが存在し、そのテスト全てが通っていればある程度の確信を持ってデプロイすることができる。

### 2. 欠陥混入率

TDD を使用することで、デプロイ後の欠陥混入率が低下する。

### 3. 勇気

信頼できるテストがあれば、コードを変更することは怖く無い。

コードをリファクタしていく事で、着実に改善の道を歩んでいける。

### 4. ドキュメント

TDD の３原則に沿って書かれたユニットテストはシステムの使い方を説明したサンプルコードにもなっている。

ユニットテストはドキュメントである。低レベルのシステム設計を説明したものだ。明確で正確で理解できる言語で書かれていれ、おまけに実行もできる。

### 5. 設計

テストを書くにはその関数を他から切り離す方法を考えなければいけない。つまり、テストファーストをするには優れた設計について考えなければならない。

あとで書くテストはコードを書いた人や問題の解決方法を知っている人が書くものだ。こうしたテストは、先に書くテストほど鋭いものでは無い。

# 受け入れテスト

## 早すぎる詳細化

- 紙に書かれていたものと、実際に動くシステムが異なることが問題。仕様通りに実装されたシステムを見ると、ビジネスは自分の欲しかったものでは無いと言う。要求が実際に動いているのを見ると、もっと良いアイデアが浮かんでくる。
- 早すぎる詳細化の解決策は詳細化を出来るだけ遅らせること。プロの開発者は開発に着手するまで要求を詳細化しない。
- プロの開発者は要求から曖昧性を確実に排除しなければならない。

## 受け入れテスト

- ここでは要求の完了を定義する為にステークホルダーとプログラマが協力して書くテストの事を刺す。
- プロの開発者はこれから何を作るのかステークホルダーやテスターにもわかるように、一緒に話し合う責任がある。

## 自動化

- 受け入れテストは常に自動化しなければいけない。ソフトウェアには手動のテストが必要なところもあるが、このようなテストは手動でやってはいけない。理由は単純でコストがかかるから。
- プロの開発者は受け入れテストを自動化するのも自分の責任と考える。

## 受け入れテストとユニットテスト

- ユニットテストはプログラマがプログラマの為に書くもの。コードの低レベルの構造や振る舞いを定式化した設計文書であり、読み手はプログラマであり、ビジネスでは無い。
- 受け入れテストはビジネスの観点からシステムの動作を定式化した要求文書である。読み手はビジネスとプログラマ。

# 時間管理

## 会議

- プロは会議のコストが高いことに気づいている。また、時間が貴重であることにも気づいている。
- どの会議に参加してどの会議に参加しないかを注意深く選ばなければならない。

## 優先順位の逆転

- プロは個人的な感情を抜きにして、作業の優先順位を決定し、その順番に作業をこなしていく。
- 袋小路にハマったらすぐに引き返す勇気が必要。

# 見積もり

## コミットメント

- ある日までにないかを達成するとコミットメントすれば、その日までに何かを達成しなければならない。
- プロは自分ができるとわかるまでコミットメントはしない。

## 見積もり

- 見積もりは予測である。コミットメントではない。約束でもない。見積もりが外れても恥ずべきことではない
