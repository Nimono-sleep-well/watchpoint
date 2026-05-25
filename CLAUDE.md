# Watchpoint

Overwatch プロシーン向けプレイヤーデータベース（vlr.gg の Overwatch版）。

## セットアップ

```bash
cp .env.example .env  # 環境変数を設定
npx prisma migrate dev
npm run sync          # 初回データ取得
npm run dev
```

## 主要コマンド

- `npm run dev` — 開発サーバー起動
- `npm run sync` — Liquipedia からデータ同期
- `npm run db:migrate` — DBマイグレーション実行
- `npm run db:generate` — Prismaクライアント生成

## ディレクトリ構成

- `src/app/` — Next.js App Router ページ・API
- `src/components/` — Reactコンポーネント（SearchBar, PlayerCard, PlayerProfile）
- `src/lib/` — ユーティリティ（prisma.ts, liquipedia.ts）
- `scripts/sync.ts` — Liquipedia同期バッチ
- `prisma/schema.prisma` — DBスキーマ

## 環境変数

- `DATABASE_URL` — PostgreSQL接続URL（Supabase推奨）
- `LIQUIPEDIA_API_KEY` — Liquipedia APIキー
- `NEXT_PUBLIC_SITE_URL` — サイトのURL

## アーキテクチャ

- フロントエンド/バックエンド: Next.js 15 App Router
- DB: PostgreSQL (Supabase) + Prisma ORM
- 同期バッチ: GitHub Actions（1時間ごとに実行）
- データソース: Liquipedia API (CC-BY-SA 3.0)
