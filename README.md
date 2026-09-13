# ポートフォリオサイト

Astro製の静的サイト。ビルドすると`dist/`に純粋なHTML/CSSが出力され、Cloudflare Pagesにデプロイする想定。

## 開発コマンド

```sh
npm install       # 依存パッケージのインストール(初回・package.json変更時)
npm run dev       # 開発サーバー起動 (http://localhost:4321、保存すると即時反映)
npm run build     # 本番ビルド (dist/に出力。draft:trueの下書きは自動的に除外される)
npm run preview   # ビルド済みのdist/をローカルで確認
```

devサーバーをバックグラウンドで動かしたい場合は`npx astro dev --background`（停止は`npx astro dev stop`、状態確認は`npx astro dev status`）。

## ファイル構成 - どこに何が書いてあるか

```
astro.config.mjs          Astro全体の設定
tsconfig.json              型チェックの設定
package.json               依存パッケージとnpmコマンドの定義

src/
├── content.config.ts      「作品」「記事」の項目定義(スキーマ)。frontmatterのルールを決める
├── data/
│   └── profile.ts         プロフィール(名前・肩書き・自己紹介・スキル・SNSリンク)
├── layouts/
│   └── Layout.astro       全ページ共通のヘッダーナビ・<head>
├── styles/
│   └── global.css         全ページ共通のスタイル(色・余白・カードの見た目など)
├── content/
│   ├── works/*.md          制作物1件 = 1ファイル。frontmatter + 本文(4見出し構成)
│   └── articles/*.md       記事1件 = 1ファイル。frontmatter + 本文(サイト内公開する場合のみ)
└── pages/
    ├── index.astro         トップページ(/) — プロフィール・記事抜粋・制作物抜粋
    ├── works/
    │   ├── index.astro      制作物一覧ページ(/works)
    │   └── [id].astro       制作物詳細ページ(/works/<ファイル名>)。works/*.mdから自動生成
    └── articles/
        ├── index.astro      記事一覧ページ(/articles)
        └── [id].astro       記事詳細ページ(/articles/<ファイル名>)。サイト内公開の記事のみ生成
```

### 設定ファイル

| ファイル | 役割 |
|---|---|
| `astro.config.mjs` | Astro自体の設定。現状は空(デフォルト設定のまま) |
| `tsconfig.json` | TypeScriptの型チェック設定。Astro公式のstrict設定を継承 |
| `package.json` | `npm run dev`等のコマンド定義と、依存パッケージ(Astro本体)のバージョン指定。JSON形式のためコメントは書けない |

### データ層 - 内容(文言)はここを編集する

| ファイル | 役割 |
|---|---|
| `src/data/profile.ts` | プロフィールの中身。ここを書き換えるとトップページ・ヘッダーの表示が変わる |
| `src/content.config.ts` | 「作品」「記事」のMarkdownに書けるfrontmatter項目(title, summary, draftなど)を定義。ここに無い項目を書くとビルドエラーになる |
| `src/content/works/*.md` | 制作物1件ごとのファイル。frontmatterで title/summary/stack/github/date/draft などを指定し、本文に「なぜ作ったか/何を検証したか/どう設計したか/運用をどう考えたか」を書く |
| `src/content/articles/*.md` | 記事1件ごとのファイル。frontmatterに`externalUrl`があればZennなど外部サイトへのリンクカードになり、無ければこのサイト内の記事詳細ページが生成される |

### 見た目・ページ構造 - レイアウトを変えたい時はここを編集する

| ファイル | 役割 |
|---|---|
| `src/layouts/Layout.astro` | 全ページ共通の`<head>`とヘッダーナビ。ナビの文言・リンク先はここに直接書かれている |
| `src/styles/global.css` | 色・フォント・カードの見た目などのスタイル |
| `src/pages/index.astro` | トップページの3セクション(プロフィール/記事抜粋/制作物抜粋)の並びと文言 |
| `src/pages/works/index.astro` | 制作物一覧ページの文言・並び方 |
| `src/pages/works/[id].astro` | 制作物詳細ページの構成(タグ・リンク・本文の表示順) |
| `src/pages/articles/index.astro` | 記事一覧ページの文言・並び方 |
| `src/pages/articles/[id].astro` | 記事詳細ページの構成 |

## よくある作業

**プロフィールを実際の内容に変える**
→ `src/data/profile.ts` を編集する

**制作物を1件追加する**
→ `src/content/works/` に新しい`.md`ファイルを追加する(`sample-cognito-api.md`をコピーして書き換えるのが早い)。`works/index.html`のような一覧ファイルは無く、`src/pages/works/index.astro`が`src/content/works/`の中身を自動的に読みに行くので、一覧への追記作業は不要

**記事を1件追加する**
→ `src/content/articles/` に新しい`.md`ファイルを追加する。Zennにリンクするだけなら`externalUrl`を書く(`sample-zenn-link.md`参照)、このサイト内で読めるようにするなら`externalUrl`を書かずに本文を書く(`sample-local-article.md`参照)

**ヘッダーのナビや見出しの文言を変える**
→ `src/layouts/Layout.astro`(ナビ)、または該当する`src/pages/*.astro`(見出し・案内文)を直接編集する

**下書きを本番に出したくない**
→ frontmatterの`draft: true`のまま。`npm run build`では自動的に除外され、`npm run dev`(開発中)だけ確認できる
