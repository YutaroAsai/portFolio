# 開発メモ

このプロジェクトはビルドツールを使わない素のHTML/CSSサイトです。npm・node_modules・devサーバーは存在しません。

## 確認方法

```sh
python3 -m http.server 8000
```

`http://localhost:8000/` を開く。ルート絶対パス(`/css/style.css`など)を使っているため、`file://`で直接開くとCSSが読み込まれない点に注意。

## ページの追加方法

`README.md` の「ページの追加方法」を参照。
