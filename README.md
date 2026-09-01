# ポートフォリオサイト

ビルドツール・依存パッケージなしの、素のHTML/CSSだけで作られた静的サイト。Cloudflare Pagesにそのままデプロイする想定。

## 構成

```
/
├── index.html            トップページ(プロフィール/記事/制作物)
├── works/
│   └── index.html         制作物一覧(個々の作品は works/<id>.html を追加していく)
├── articles/
│   └── index.html         記事一覧(サイト内記事は articles/<id>.html を追加していく)
├── css/style.css          全ページ共通スタイル
├── favicon.svg / favicon.ico
└── templates/              新しいページを作る時のコピー元
    ├── work-template.html
    └── article-template.html
```

## ページの追加方法

**制作物を追加する**
1. `templates/work-template.html` を `works/<わかりやすいID>.html` としてコピー
2. 中身(タイトル・タグ・GitHubリンク・4見出しの本文)を書き換える
3. `works/index.html` にカードを1つ追記(コメント内に書き方あり)
4. トップに載せたければ `index.html` の「制作物」セクションにも同じカードを追記

**記事を追加する**
- Zennに書いた記事にリンクするだけなら、`articles/index.html`(と`index.html`)にカードを1つ追記するだけでよい(コメント内に書き方あり)
- このサイト内で読める記事にしたい場合は、`templates/article-template.html` を `articles/<わかりやすいID>.html` としてコピーして本文を書き、一覧にカードを追記する

**ヘッダーのナビや共通文言を変える**
- 全ページの `<header>` 部分に同じHTMLが書かれている。変更する時は各HTMLファイルを個別に編集する(ページ数が少ないので手作業で十分)

## 確認方法

ビルド不要。ブラウザで`index.html`を直接開くか、ルート絶対パス(`/css/style.css`など)を正しく解決させたい場合は簡易サーバーを立てる。

```sh
python3 -m http.server 8000
```

その後 `http://localhost:8000/` を開く。

## デプロイ

Cloudflare Pagesにこのリポジトリを接続し、ビルドコマンドなし・出力ディレクトリをリポジトリルート(`/`)のまま設定する。
