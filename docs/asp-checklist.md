# ASP申請チェックリスト

コンテンツ要件なしで今すぐ着手できるASPの申請手順と、Amazon Associatesを申請する
タイミングの条件をまとめたもの。実際のアカウント作成(本人確認・銀行口座・PayPal
登録など)はユーザー本人が行う必要があり、Claude Codeセッションが代行することは
できない。申請ページのURLは調査時点(2026年8月)のもの。各社の仕様は変わりうるので、
リンク切れの場合は各社公式サイトの「Affiliate / Partner Program」ページを検索して
確認すること。

## 今すぐ着手できるもの(コンテンツ件数の要件なし)

### 1. 楽天アフィリエイト・楽天トラベル

- 費用: 無料、審査なし
- 手順:
  1. 楽天会員登録が済んでいなければ [rakuten.co.jp](https://www.rakuten.co.jp/) で無料登録
  2. 「楽天アフィリエイト」の公式ポータルに楽天IDでログイン(審査不要、即利用可)
  3. 「メディア登録」で運営サイトのURLを登録(現状は
     `https://kkss0212.github.io/affiliate-blog` — カスタムドメイン決定後は
     忘れず更新すること)
  4. 楽天トラベルの商品リンク作成ツールで宿泊施設・ツアーのアフィリエイトリンクを生成
  5. `src/content/prefectures/*.md` の `experiences` に `provider: "rakuten-travel"`
     として埋め込む
  6. 報酬は楽天キャッシュで受領(1円から)

### 2. Viator

- 費用: 無料。トラフィック/フォロワー要件の明記はないが、サイト内容の審査はある
- 手順:
  1. [partners.viator.com/signup](https://partners.viator.com/signup?program=affiliate)
     から申請フォームへ(サイトURL・想定読者層などを入力)
  2. 審査結果はメールで通知
  3. 承認後 [partners.viator.com/login](https://partners.viator.com/login) から
     ダッシュボードにログインしリンクを生成
  4. 支払い方法(銀行振込等)を設定

### 3. Klook / GetYourGuide(Travelpayouts経由)

- 費用: 無料(Travelpayoutsは登録費・維持費ともに無料)
- Awin経由だと$1〜5の返金前提デポジットが発生するため、完全無料にしたい場合は
  **Travelpayouts経由**で申請すること
- 手順:
  1. [travelpayouts.com](https://www.travelpayouts.com/) でパブリッシャー登録(無料)
  2. ダッシュボード内でKlook・GetYourGuideそれぞれのプログラムページから参加申請
     (1つのダッシュボードで両方申請できる)
  3. 承認後、各プログラムのリンクジェネレーターでアフィリエイトURLを発行
  4. 支払い方法(PayPalまたは銀行振込)を設定

### 4. Japan Trend Shop

- 費用: 無料。ただし報酬受け取りに**PayPalアカウントが必要**
- 手順:
  1. PayPalアカウントが無ければ無料で作成
  2. [affiliates.japantrendshop.com](https://affiliates.japantrendshop.com/affiliate/affiliates/)
     から申請フォームに入力(サイトURL、PayPalメールアドレスなど)
  3. 承認後、商品ページのアフィリエイトリンク生成機能でURLを発行

## Amazon Associates(Amazon.co.jp)は保留中

- **申請条件**: オリジナルコンテンツの記事が最低10件、公開済み(`draft: false`)
  であること。サインアップ後180日以内に3件の適格販売がないと本審査に進めない。
- **現状(2026-08-28時点)**: 公開記事0件(`kyoto.md`も`draft: true`の構造サンプル
  のみ)。この条件を満たすまで申請しない。
- **TODO**: `src/content/prefectures/` 配下で `draft: false` の記事が10件に達したら、
  次にこのプロジェクトを扱うセッションはAmazon Associatesの申請を案内すること。
  (ユーザーからの明示的な依頼: 「10件記事作ったら案内して」)
