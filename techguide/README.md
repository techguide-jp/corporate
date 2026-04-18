# Tech Guide - SvelteKit Landing Page

参考スクリーンショットの雰囲気をベースに、SvelteKit でそのまま組みやすい形に落とし込んだ実装です。

## セットアップ

```bash
npm install
npm run dev
```

## ファイル構成

```text
tech-guide-sveltekit/
├─ src/
│  ├─ lib/
│  │  ├─ components/
│  │  │  ├─ layout/
│  │  │  ├─ sections/
│  │  │  └─ ui/
│  │  ├─ data/site.ts
│  │  └─ types/content.ts
│  ├─ routes/
│  │  ├─ +layout.svelte
│  │  └─ +page.svelte
│  ├─ app.css
│  └─ app.html
├─ static/
│  └─ images/
│     ├─ hero/
│     └─ works/
├─ package.json
├─ svelte.config.js
├─ tsconfig.json
└─ vite.config.ts
```

## 実装メモ

- デザインのトーンは `DESIGN.md` の配色とタイポグラフィ方針に合わせています。
- ヒーロー背景と Works 画像は、提供されたスクリーンショットをもとに切り出し・整形した仮アセットです。
- サービス / プロダクトのアイコンは、あとから差し替えやすいように `CardIcon.svelte` に寄せています。
- 文言やリンク先は仮置きなので、そのまま本番利用する場合は差し替えてください。
- お問い合わせボタンは `mailto:hello@example.com` にしているので、実運用時は `.env` か CMS 側の設定に寄せるのがおすすめです。

## 次に差し替えるとよいもの

1. 会社ロゴの正式データ
2. ヒーロー写真の元画像
3. 実績画像の元画像
4. 各セクションの正式テキスト
5. お問い合わせ先のメールアドレスやフォーム URL
