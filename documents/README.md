# Watchpoint — 設計ドキュメント

Overwatch プロシーン向け Esports データベースサイト（vlr.gg の Overwatch 版）

## ドキュメント一覧

| ファイル | 内容 |
|---|---|
| [01_requirements.md](./01_requirements.md) | 要件定義書（機能要件・非機能要件・制約条件） |
| [02_system_design.md](./02_system_design.md) | システム設計書（アーキテクチャ・DBスキーマ・API・同期設計） |
| [03_screen_design.md](./03_screen_design.md) | 画面設計書（レイアウト・コンポーネント・デザイン方針） |

## 現在のフェーズ

**MVP**: プレイヤー検索 + プロフィール閲覧のみ

## 技術スタック

- **フロントエンド/バックエンド**: Next.js 15 (App Router) + TypeScript
- **DB**: PostgreSQL + Prisma
- **データソース**: Liquipedia API (CC-BY-SA 3.0)
- **ホスティング**: Vercel (FE) + Supabase (DB) + GitHub Actions (同期バッチ)
