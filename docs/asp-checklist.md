# ASP申請チェックリスト

コンテンツ要件なしで今すぐ着手できるASPの申請手順と、Amazon Associatesを申請する
タイミングの条件をまとめたもの。実際のアカウント作成(本人確認・銀行口座・PayPal
登録など)はユーザー本人が行う必要があり、Claude Codeセッションが代行することは
できない。申請ページのURLは調査時点(2026年8月)のもの。各社の仕様は変わりうるので、
リンク切れの場合は各社公式サイトの「Affiliate / Partner Program」ページを検索して
確認すること。

サイトURL(全ASP共通で使うもの): `https://kkss0212.github.io/japan-unpacked`
(カスタムドメイン決定後は各ASPの登録情報も忘れず更新すること)

## 今すぐ着手できるもの(コンテンツ件数の要件なし)

### 1. 楽天アフィリエイト・楽天トラベル

**進捗: 手順1〜3(ポータルログイン・商品リンク生成・楽天トラベルリンク生成)まで完了。**
残りは手順4(記事への埋め込み)・5(成果確認)。

- 費用: 無料、審査なし(メディア登録が終われば即利用可能)
- 報酬: 楽天市場の商品は紹介料率が商品ジャンルごとに設定(数%程度)、楽天トラベルは
  **利用金額の1%**(レンタカーを除く)。楽天キャッシュで受領、1円から換金可能
- メディア登録後の手順:
  1. 楽天アフィリエイトのポータル(https://affiliate.rakuten.co.jp/ )にログイン
  2. **物販(名産品)用**: 「商品リンク」作成ツールで楽天市場の商品を検索し、
     紹介したい商品のリンク(テキストリンクまたはバナー)を生成する
  3. **楽天トラベル用**: ポータル内の「楽天トラベル」カテゴリ、または無料の外部
     ツール「トマレバ」(https://tomareba.tsuku2.jp/ )でホテル・旅館・エリアを
     検索してアフィリエイトリンクを生成する(楽天トラベル用に別途登録し直す必要は
     なく、同じ楽天アフィリエイトのアカウントで完結する)
  4. 生成されたURLを、対応する記事の`experiences`(`provider: "rakuten-travel"`)
     または`products`に埋め込む
     — **注: 現状`draft: true`の構造サンプル(kyoto.md)しか無く、実記事がまだ
     無いため、この手順はまだ実行できない。**実際に紹介したい商品・宿泊施設が
     決まって記事を書く段階になったら、生成済みのリンクをこのタイミングで
     埋め込む
  5. 成果は楽天アフィリエイトの管理画面(レポート)で確認できる。即時ではなく、
     数日〜1ヶ月程度のラグがあるのが一般的なので、埋め込んだ直後に成果が0でも
     焦らなくてよい

### 2. Viator

**進捗: 申請フォーム送信+本人確認(ID写真・セルフィー)提出まで完了。
「Account verification in review」で審査中(最長72時間、2026-08-28提出)。**

- 費用: 無料。トラフィック/フォロワー要件の明記はないが、サイト内容の審査はある
- 必要な情報(申請フォームで聞かれる想定): サイトURL、サイトの想定読者層・
  コンテンツ内容の説明、月間訪問者数(現状ほぼ0でも申請自体は可能。正直に記入)
- 手順:
  1. [partners.viator.com/signup](https://partners.viator.com/signup?program=affiliate)
     から申請フォームへ
  2. 本人確認(ID写真+セルフィー)を提出 — 完了
  3. 審査結果はメール通知(最長72時間、公式アナウンス通り)
  4. 承認後 [partners.viator.com/login](https://partners.viator.com/login) から
     ダッシュボードにログイン
  5. ダッシュボード内のリンクジェネレーターでツアー・アクティビティを検索し、
     アフィリエイトリンクを生成
  5. 支払い方法(銀行振込等)を設定してから、生成したリンクを記事の`experiences`
     (`provider: "viator"`)に埋め込む

### 3. Klook / GetYourGuide(Travelpayouts経由)

- 費用: 無料(Travelpayoutsは登録費・維持費ともに無料)
- Awin経由だと$1〜5の返金前提デポジットが発生するため、完全無料にしたい場合は
  **Travelpayouts経由**で申請すること(Klook・GetYourGuideどちらも同じ
  Travelpayoutsアカウント1つで申請できる)
- 手順:
  1. [travelpayouts.com](https://www.travelpayouts.com/) でパブリッシャー登録
     (メールアドレス・サイトURLを入力するだけの無料登録)
  2. ログイン後のダッシュボードで「Programs」や「Marketplace」といった一覧から
     Klook・GetYourGuideをそれぞれ検索し、参加申請(Join/Apply)ボタンを押す
  3. 各プログラムの承認状況はダッシュボードで確認できる(即時承認されるものも
     多いが、プログラムによっては審査が入る)
  4. 承認後、各プログラムのページにあるリンクジェネレーターで実際のツアー・
     アクティビティを検索してアフィリエイトURLを発行
  5. 支払い方法(PayPalまたは銀行振込)をアカウント設定から登録
  6. 生成したリンクを記事の`experiences`(`provider: "klook"`または
     `"getyourguide"`)に埋め込む

### 4. Japan Trend Shop

- 費用: 無料。ただし報酬受け取りに**PayPalアカウントが必要**
- 手順:
  1. PayPalアカウントが無ければ https://www.paypal.com/ で無料作成
  2. [affiliates.japantrendshop.com](https://affiliates.japantrendshop.com/affiliate/affiliates/)
     から申請フォームに入力(サイトURL、PayPalメールアドレスなど)
  3. 承認後、管理画面にログインし、商品ページのアフィリエイトリンク生成機能で
     商品ごとのURLを発行(最大7%のコミッション)
  4. 生成したリンクを記事の`products`(`retailer: "japan-trend-shop"`)に埋め込む

## Amazon Associates(Amazon.co.jp)は保留中

- **申請条件**: オリジナルコンテンツの記事が最低10件、公開済み(`draft: false`)
  であること。サインアップ後180日以内に3件の適格販売がないと本審査に進めない。
- **現状(2026-08-28時点)**: 公開記事0件(`kyoto.md`・`uji.md`・`city-pop.md`・
  `one-piece.md`すべて`draft: true`の構造サンプルのみ)。この条件を満たすまで
  申請しない。
- **カウント対象**: `src/content/prefectures/`・`src/content/municipalities/`・
  `src/content/music/`・`src/content/manga/` の4ディレクトリ合計で10件
  (すべて同じサイト・同じAssociatesアカウントで運用するため)。
- **TODO**: 上記3ディレクトリ合計で `draft: false` の記事が10件に達したら、
  次にこのプロジェクトを扱うセッションはAmazon Associatesの申請を案内すること。
  (ユーザーからの明示的な依頼: 「10件記事作ったら案内して」)

## Amazon Associates承認後に追加でやること(新規ASP登録は不要)

音楽(Music)・漫画(Manga)セクションの収益化は、**Amazon Associatesのアカウントの中に
標準機能として用意されている「メンバー紹介プログラム」を使うだけ**なので、別途ASP登録は
不要です。Amazon Associates承認後、以下を行うこと。

- **Amazon Music Unlimitedメンバー紹介プログラム**: アソシエイト・セントラル
  (affiliate.amazon.co.jp)にログイン後、プログラム一覧から「Amazon Music Unlimited
  メンバー紹介プログラム」を探し、参加登録してリンクを生成(新規登録1件につき
  2026-08-28時点で¥1,000。金額はAmazon側で変わるので都度確認)
- **Kindle Unlimitedメンバー紹介プログラム**: 同様にアソシエイト・セントラルから
  「Kindle Unlimitedメンバー紹介プログラム」に参加登録してリンクを生成(新規登録1件
  につき2026-08-28時点で¥500)
- 生成したリンクを`src/content/music/*.md`・`src/content/manga/*.md`の
  `subscriptions`フィールドに埋め込む
- 個別のCD・Kindle単行本などは通常のAmazon商品リンク(`retailer: "amazon"`)として
  `products`に埋め込めばよい(標準の紹介料率が適用される)

**Spotify・LINE MUSICは現時点(2026-08-28)で正規ルートでの収益化手段が無い**
(以前はA8.netのアプリ専用ASP「A8app」経由で扱いがあったが終了しており、A8.net・
もしもアフィリエイトの通常プログラムにも公開されていない)。将来的に取り扱いが
復活していないか確認する価値はあるが、現状は保留。

## 全体の進捗チェックリスト

- [x] 楽天アフィリエイト: メディア登録
- [x] 楽天アフィリエイト: 商品リンク・楽天トラベルリンクの生成(ツールでの生成まで完了)
- [ ] 楽天アフィリエイト: 生成したリンクを実記事に埋め込み(下記「実記事が無いと進められない」を参照)
- [x] Viator: 申請フォーム送信+本人確認提出 → **審査中(最長72時間、2026-08-28提出)**
- [ ] Viator: 審査結果待ち → 承認後リンク生成
- [ ] Travelpayouts(Klook・GetYourGuide): 登録・両プログラム参加申請
- [ ] Japan Trend Shop: PayPal作成 + 申請
- [ ] Amazon Associates: 10記事公開後に申請(保留中)
- [ ] Amazon Music Unlimited / Kindle Unlimitedメンバー紹介プログラム: Amazon Associates承認後
