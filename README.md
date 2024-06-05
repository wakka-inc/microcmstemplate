このプロジェクトは[Next.js](https://nextjs.org/)の[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)で動作します。


## はじめかた

はじめに、開発環境を起動します:

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

http://localhost:3000](http://localhost:3000)をブラウザで開くと、結果が表示されます。

app/page.tsx`を修正することでページの編集を開始できます。ファイルを編集すると、ページは自動的に更新されます。

このプロジェクトでは、[`next/font`](https://nextjs.org/docs/basic-features/font-optimization)を使用して、カスタムGoogleフォントであるInterを自動的に最適化して読み込んでいます。

## 詳細はこちら

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

## Vercelでデプロイする

Next.jsアプリをデプロイする最も簡単な方法は、[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を利用します。
詳しくは[Next.js デプロイドキュメント](https://nextjs.org/docs/deployment)をご覧ください。


***

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Screen Preview Settings

From the microCMS administration screen, click the "API Settings" button for each API to configure settings.
API Settings > Screen Preview

Enter the URL in the input field, including the {CONTENT_ID} and {DRAFT_KEY} attributes.
Tentatively set the domain to "http/localhost:3000/".

Example, for blogsAPI:
`http://localhost:3000/{CONTENT_ID}?draftKey={DRAFT_KEY}`

If you have procured a public domain yourself, please change it accordingly.

Note that "バナー設定 / Advertisement" cannot be previewed by itself.
If you select the banner you wish to post in the sidebar settings, you will see it appear in the sidebar in the screen preview of each content.

## Deploy with Vercel

The easiest way to deploy your Next.js app is to go to [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create- next-app&utm_campaign=create-next-app-readme).

See [Next.js Deployment Document](https://nextjs.org/docs/deployment) for more information.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
