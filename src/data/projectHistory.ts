// SESなどで携わった案件の経歴。プロフィールページの「経験技術」の下に表示される。
// 所属・常駐先の企業ごとにグループ化し、その中に案件を複数持てる構造にしている。
// 表示は逆編年順(新しいものが上)なので、配列も新しい順に並べること。
// 配列が空の間は「準備中です」という枠だけが表示される(src/pages/index.astro参照)。

export type ProjectEntry = {
  period: string; // 期間(例: "2021.04 - 2022.03")
  title: string; // 案件名・概要
  description: string; // 担当内容・学んだこと。Enterで改行すればそのまま複数行表示される
};

export type ProjectHistoryGroup = {
  organization: string; // 所属・常駐先の企業名
  note?: string; // 補足(例: "客先常駐での勤務")。無ければ省略可
  projects: ProjectEntry[]; // 新しい案件から先に書く
};

export const projectHistory: ProjectHistoryGroup[] = [
  {
    organization: "バイトブーム株式会社",
    note: "客先常駐での勤務",
    projects: [
      {
        period: "2024.07 - 現在",
        title: "自動車メーカーシステムの保守開発案件(フルリモート)",
        description: `インフラ管理、開発、各種テストを担当。
サーバーのOS更新や新規機能開発を実施。これまでの経験を活かして、設計やプロセスの改善を提案している。`,
      },
      {
        period: "2023.02 - 2024.06",
        title: "航空会社システムの開発案件(週4回リモート)",
        description: `実装、テストコード作成、結合テストを担当。
Spring Boot、GitHub、AWSなど、モダンな技術を使った環境で経験を積むことができた。開発環境構築手順書の作成や、データ投入ツールの開発を実施して業務効率化に貢献できた。`,
      },
    ],
  },
  {
    organization: "株式会社コンサルティング・ファーム",
    projects: [
      {
        period: "2022.04 - 2022.12",
        title: "通信会社の請求書管理システムの開発案件",
        description: `基本設計、詳細設計を担当。
経験は不足していたものの、幸運にも基本設計から携わる機会を得た。この経験を通じて、機能に適切な名前を付ける重要性や、作業開始前に認識をすり合わせることの大切さを学んだ。`,
      },
      {
        period: "2021.11 - 2022.03",
        title: "電力会社システムの保守開発案件",
        description: `実装、単体テスト、本番環境の保守作業を担当。
職業訓練で学んだことを活かしつつ、Linuxの扱い方や実際のシステム開発のノウハウを学ぶことができた。`,
      },
    ],
  },
  {
    organization: "職業訓練校 HITスクール",
    projects: [
      {
        period: "2021.05 - 2021.10",
        title: "職業訓練",
        description: `・HTML、CSSを用いたWebページ制作
・Javaを用いたWebアプリ制作
・Unityを用いたゲーム制作
・Pythonを用いたプログラム制作`,
      },
    ],
  },
];
