// プロフィール情報。ここを書き換えるだけでトップページ・ヘッダーの表示が変わる。
// (このファイルはcontent collectionsではなく、単なる定数を書いたTypeScriptファイル)

// 開発経験を始めた年月日。ここだけ書き換えれば、下のcalculateYearsOfExperienceの結果が
// 自動で計算し直される。ビルド時(index.astroのフロントマター)だけでなく、
// ページ表示時にもブラウザ上のJavaScriptで再計算しているので、
// サイトを再ビルドしなくても、訪問者が見た瞬間の日付を基準にした正しい年数が表示される。
export const careerStartDate = "2021-11-01";

// 開始日から「満年数」を計算する。誕生日と同じ考え方で、
// その年の「開始日と同じ月日」を迎えていなければ1年減らす。
// index.astroのフロントマター(ビルド時)と<script>(ブラウザでの表示時)の
// 両方からこの同じ関数を呼び出して、計算ロジックを1箇所にまとめている。
export function calculateYearsOfExperience(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const hasAnniversaryPassedThisYear =
    now.getMonth() > start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());
  if (!hasAnniversaryPassedThisYear) years -= 1;
  return years;
}

export const profile = {
  name: "浅井 佑太郎",          // トップページの見出し、ヘッダーのリンク文字にも使われる
  role: "フルスタックエンジニア", // 肩書き

  // 自己紹介文。バッククォート(`)で囲んだテンプレートリテラルなので、
  // ソース上でEnterキーを押して改行すれば、そのままの見た目で表示される
  // (index.astro側で white-space: pre-line を指定しているため)。
  // 文中の "{years}" は開発経験年数(自動計算・ブラウザ側で常に最新化)に置き換わる
  // (index.astroが置換処理をしている)。使わなくてもよい(その場合はただの文字列として表示される)。
  // 2行目を足したい場合は、下のようにEnterで改行するだけでよい。例:
  // `業務システム開発経験{years}年のシステムエンジニア。
  // Java/Spring Bootでのバックエンド開発を中心に担当。`
  summary: 
  `業務システム開発経験{years}年のシステムエンジニア。
  [実装、設計、テスト]の工程、[画面、API、AWS]の領域で、幅広い分野での経験がある。
  CI/CDの構成やテストコード作成、ドキュメント作成などが得意。
  業務外では、ClaudeCodeを用いた開発に挑戦中。`,

  // 技術要素は「経験の裏付けの強さ」でグループ分けする。
  // production(実務経験) > personal(個人開発) > learning(学習中) の順で表示され、
  // 見た目も production が一番目立ち、learning が一番控えめになる(src/styles/global.cssの.skills--*参照)。
  // 配列を空にするとそのグループごと表示されなくなる(例: learningを使わないなら空配列のままでよい)。
  skills: {
    production: [                                    // 実務で使用経験あり
      "Java",
      "Spring Boot",
      "javascript",
      "AWS (ECS, EC2 ,SQS, S3, CloudWatch)",
      "PostgreSQL",
      "Oracle",
      "GitHub Actions",
      "CircleCI",
    ],
    personal: [                        // 個人開発で使用経験あり
      "ClaudeCode",
      "C++",
      "Python",
      "astro",
      "Notion",
      "Obsidian"
    ],
    learning: [] as string[],                        // 学習中・キャッチアップ中
  },

  links: {                      // トップページのプロフィール欄に出る外部リンク
    github: "https://github.com/YutaroAsai",
    zenn: "https://zenn.dev/your-account",
  },
};
