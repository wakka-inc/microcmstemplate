# テンプレート - Mag

このテンプレートは[Next.js](https://nextjs.org/)の[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)で動作します。

## 動作環境

Node.js v18.17以上

## 環境変数の設定

ルート直下に.envファイルを作成し、下記の情報を入力します。  

```
MICROCMS_API_KEY=xxxxxxxxxx
MICROCMS_SERVICE_DOMAIN=xxxxxxxxxx
BASE_URL=xxxxxxxxxx
DATA_REVALIDATE=0
```

`MICROCMS_API_KEY`  
microCMS 管理画面の「サービス設定 > API キー」から取得します。

`MICROCMS_SERVICE_DOMAIN`  
microCMS 管理画面の URL（https://xxxxxxxx.microcms.io）の xxxxxxxx の部分です。

`BASE_URL`  
デプロイ先の URL です。プロトコルから記載します。

SAMPLE :  
- Development: `http://localhost:3000/`
- Production: `https://your-site.com/`

`DATA_REVALIDATE=0`  
データ・キャッシュを消去し、最新のデータを再取得します。
オプションの記述なので、不要でしたら削除してください。

## はじめかた

※注意点※
最初にmicroCMS内のすべてのAPIにコンテンツを登録しておいてください。  
開発環境起動時にエラーとなります。

はじめに、開発環境を起動します:

1. パッケージのインストール

```bash
npm install
```

2. 開発環境の起動

```bash
npm run dev
```

3. 開発環境へのアクセス  

[http://localhost:3000](http://localhost:3000)をブラウザで開くと、結果が表示されます。

app/page.tsx`を修正することでページの編集を開始できます。ファイルを編集すると、ページは自動的に更新されます。

このテンプレートでは、[`next/font`](https://nextjs.org/docs/basic-features/font-optimization)を使用して、カスタムGoogleフォントであるInterを自動的に最適化して読み込んでいます。

Next.jsの詳細については、以下のリソースをご覧ください：

- [Next.js Documentation](https://nextjs.org/docs) - Next.jsのドキュメント
- [Learn Next.js](https://nextjs.org/learn) - Next.jsのチュートリアル
- [Next.jsのGitHubリポジトリ](https://github.com/vercel/next.js/)

## 画面プレビューの設定

microCMSの管理画面から、各APIで「API設定」のボタンをクリックして、設定を行います。
API設定 > 画面プレビュー

入力欄に{CONTENT_ID} と {DRAFT_KEY}　の属性を含めて、URLを入れます。
初期設定では仮でドメインを「http/localhost:3000/」にします。

例・blogsAPIの場合：
`http://localhost:3000/{CONTENT_ID}?draftKey={DRAFT_KEY}`

パブリックなドメインをご自身で調達した場合は、適宜変更してください。

なお、「バナー設定 / Advertisement」は単体ではプレビューができません。
サイドバー設定で掲載したいバナーを選択すると、各コンテンツの画面プレビューにおいて、サイドバーに表示されていることを確認できます。

## Vercelでデプロイ

Next.jsアプリをデプロイする最も簡単な方法は、[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を利用します。
詳しくは[Next.js デプロイドキュメント](https://nextjs.org/docs/deployment)をご覧ください。

このテンプレートには8つのAPIが含まれています。  
うち、5つのリスト形式API、3つのオブジェクト形式APIがあります。

- 記事 / Blogs
    + API: /blog (リスト形式)
    + 用途：記事データを収集します。

- カテゴリ / Categories
    + API: /category (リスト形式)
    + 用途：カテゴリデータを収集します。

- タグ / Tags
    + API: /tag (リスト形式)
    + 用途：タグデータを収集する

- 執筆者 / People
    + API: /people (リスト形式)
    + 用途：記事の著者や投稿者データを収集します。

- バナー設定 / Advertisement
    + API: /ads (リスト形式)
    + 用途：サイドバーの広告、バナーデータを収集します。

- メニュー / Menu
    + API: /menus (オブジェクト形式)
    + 用途：メニューデータを収集します。
        - メインメニュー：テンプレートのメインメニュー、デザインではカテゴリのメニューです。
        - その他のメニュー：サブメニュー
        - ヘッダー上のメニュー：ヘッダーバー内のメニュー

- サイドバー / Sidebar
    + API: /sidebar (オブジェクト形式)
    + 目的：サイドバーのプロパティを設定する。

- サイト共通設定 / Commons
    + API: /settings (オブジェクト形式)
    + 用途：tmeplateのプロパティや設定を収集する。
        - Site Name: テンプレートの名前
        - Site Title: テンプレートのタイトル。
        - Site Description: テンプレートの説明。
        - Logo Header: ヘッダーに表示されるロゴ。
        - Footer logo: フッターに表示されるロゴ。
        - Recent Post Number：TOPページに表示されている投稿数
        - Ranking Post：ランキングされた投稿を表示。手動で設定（自動では設定されません）。
        - Adsense - Sidebar Top：サイドバー上部に広告を表示。複数の広告を表示できます。
        - Adsense - Sidebar Bottom：サイドバー下部に広告を表示。複数の広告を表示することができます。
        - Social: サイトのソーシャルネットワークをメニューとフッターの下に表示します。10以上の主なSNSに対応しています。
        - Inquiries Footer：フッターにお問い合わせエリアを表示。タイトル、説明、ボタン要素を含んでいます。
        - コピーライト：フッターの下にコピーライトテキストを表示します。


***

# Templates - Mag

This template works with [next.js](https://nextjs.org/) [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app ).

## System Requirements

Node.js v18.17 or higher

## Setting environment variables

*Note*.
Please register your contents to all APIs in microCMS first.  
An error will occur when starting the development environment.

Create a .env file directly under root and enter the following information.  

````
MICROCMS_API_KEY=xxxxxxxxxxxxxx
MICROCMS_SERVICE_DOMAIN=xxxxxxxxxxxxxx
BASE_URL=xxxxxxxxxxxxxxxx
DATA_REVALIDATE=0
````

`MICROCMS_API_KEY`  
Obtained from "Service Settings > API Key" in the microCMS administration page.

`MICROCMS_SERVICE_DOMAIN`.  
The xxxxxxxxxx part of the microCMS administration page URL (https://xxxxxxxx.microcms.io).

`BASE_URL`.  
The URL to deploy to. It is described from the protocol.


SAMPLE :  
- Development: `http://localhost:3000/`
- Production: `https://your-site.com/`

`DATA_REVALIDATE=0`  
Clear the data cache and reacquire the latest data.
This is an optional statement, so delete it if you don't need it.

## Getting Started

First, start the development environment:  

1. Install the package

```bash
npm install
```

2. Start the development environment.

```bash
npm run dev
```

3. Access the development environment.  

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying ``app/page.tsx``. The page will automatically update as you edit the file.

This template uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google font.

For more information on Next.js, please see the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js documentation
- [Learn Next.js](https://nextjs.org/learn) - Next.js tutorial
- [GitHub repository of Next.js](https://github.com/vercel/next.js/)

## Setting up screen preview

From the microCMS admin page, click the "API Settings" button for each API to configure settings.
API Settings > Screen Preview

Enter the URL in the input field, including the {CONTENT_ID} and {DRAFT_KEY} attributes.
By default, the domain is temporarily set to "http/localhost:3000/".

Example, for blogsAPI:
`http://localhost:3000/{CONTENT_ID}?draftKey={DRAFT_KEY}`

If you have procured a public domain yourself, please change it accordingly.

Note that "Banner Settings / Advertisement" cannot be previewed by itself.
If you select the banner you wish to publish in the sidebar settings, you will see it appear in the sidebar in the screen preview of each content.

## Deploy with Vercel

The easiest way to deploy a Next.js app is to go to [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create- next-app&utm_campaign=create-next-app-readme).
See [Next.js Deployment Document](https://nextjs.org/docs/deployment) for more information.

## List of APIs

The template includes 8 api, with 5 api list format and 3 api object format.

- 記事 / Blogs
    + API: /blog (list)
    + Purpose: collection of articles

- カテゴリ / Categories
    + API: /category (list)
    + Purpose: to collect categories

- タグ / Tags
    + API: /tag (list)
    + Purpose: collect tags

- 執筆者 / People
    + API: /people (list)
    + Purpose: gathers the authors or contributors in the article

- バナー設定 / Advertisement
    + API: /ads (list)
    + Purpose: collects ads on the sidebar.

- メニュー / Menus
    + API: /menus (object)
    + Purpose: collect menus
        - Main menu: the main menu in the template, in the design is the menu of categories.
        - Other menu: sub menu
        - Menu on header: menus in the Header bar

- サイドバー / Sidebar
    + API: /sidebar (object)
    + Purpose: set properties on sidebar.

- サイト共通設定 / Commons
    + API: /settings (object)
    + Purpose: collect properties and settings in template.
        - Site Name: name of the template
        - Site Title: title of the template, used in metadata.
        - Site Description: description of the template, used in metadata.
        - Logo Header: logo displayed on the header.
        - Footer logo: logo displayed on the footer.
        - Recent Post Number: number of posts displayed on the TOP page
        - Related Post Number: number of related posts displayed in Detailed Posts.
        - Ranking Post: displays ranked posts. Set up manually (not set up automatically).
        - Adsense - Sidebar Top: displays ads in the top sidebar position. Multiple ads can be displayed
        - Adsense - Sidebar Bottom: displays ads in the bottom sidebar position. Multiple ads can be displayed
        - Social: the site's social network. displayed in the menu and below the footer. Supports 10+ popular social networks (icons)
        - Inquiries Footer: displays the Inquiries section in the footer. Includes title, description and buttons elements.
        - Copyright: displays copyright text below the footer.