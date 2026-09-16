---
title: "ファイアーエムブレム 支援環検索"
summary: "ファイアーエムブレムシリーズの「支援環」(最高効率で支援を組める組み合わせ)を、作品・人数条件を指定して検索できるツール。"
stack: ["C++", "Flask", "JavaScript"]
thumbnail: "/images/works/fire-emblem-support-ring-suggest/top.png"
date: 2026-09-16
draft: false
---

## 概要

ファイアーエムブレムシリーズには、支援レベルをA→B→A→B→…と最高効率で組めるキャラクターの組み合わせ(支援環)がある。
このツールは、作品(封印の剣/烈火の剣/聖魔の光石)と人数(4人/6人/8人)を選ぶと、該当する支援環の組み合わせを一覧表示する。
支援環の組み合わせ検索には、C++で作成したツールを使用した。
Webアプリ側はすでに発見された組み合わせのCSVの中から、画面で選択されたキャラクターを含むものを画面に表示する。

## 今後の課題

Flaskを使ったWebアプリとして作成したが、込み入った処理も少ないため、純粋なhtml+javascriptにリファクタリングすることを検討中。
Web公開することも検討している。

## スクリーンショット

![TOPページ](/images/works/fire-emblem-support-ring-suggest/top.png)

![支援環検索画面](/images/works/fire-emblem-support-ring-suggest/search.png)
