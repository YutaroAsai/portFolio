// Content Collections(コンテンツコレクション)の定義ファイル。
// src/content/ 配下のMarkdownファイルが「どんなfrontmatter(冒頭の---で囲まれた部分)を
// 持つべきか」をスキーマとして定義し、ビルド時・dev時に自動で型チェック・バリデーションする。
// ここに書いたスキーマと合わないfrontmatnterを書くとビルドエラーになる。
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 「制作物」コレクション。1ファイル = src/content/works/*.md が1作品に対応する。
const works = defineCollection({
  // loader: どのファイルを、どこから読み込むか
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  // schema: frontmatterの各項目の型と必須/任意
  schema: z.object({
    title: z.string(),                                   // 作品タイトル
    summary: z.string(),                                 // 一覧カードに出る1〜2行の要約
    stack: z.array(z.string()).default([]),              // 使用技術タグ。省略時は空配列
    thumbnail: z.string().optional(),                    // サムネイル画像パス。省略可
    github: z.string().url().optional(),                 // 個別リポジトリへのリンク。省略可
    zennArticle: z.string().url().optional(),            // 関連するZenn記事へのリンク。省略可
    date: z.coerce.date(),                                // 公開日。並び替えに使う
    draft: z.boolean().default(false),                   // trueなら本番ビルドで非表示(下記参照)
  }),
});

// 「記事」コレクション。1ファイル = src/content/articles/*.md が1記事に対応する。
// externalUrlの有無で2パターンに分岐する:
//   ・externalUrlあり → 一覧カードからZennなど外部サイトへ直接リンク(本文は使わない)
//   ・externalUrlなし → このサイト内の記事詳細ページ(/articles/<id>)に本文を表示
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    externalUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

// draft:true の記事/作品は、開発サーバー(npm run dev)では表示されるが、
// 本番ビルド(npm run build)では各pages/*.astro内の isDev || !data.draft という
// フィルタによって除外される。「下書きを試しに見たいがデプロイはしたくない」を実現する仕組み。
export const collections = { works, articles };
