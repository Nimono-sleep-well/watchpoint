# システム設計書

**プロジェクト名**: Watchpoint  
**作成日**: 2026-05-26  
**対象フェーズ**: MVP

---

## 1. アーキテクチャ概要

```
┌──────────────────────────────────────────────────────┐
│                    訪問者（ブラウザ）                  │
└───────────────────────────┬──────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼──────────────────────────┐
│              Next.js (App Router)                    │
│   ・フロントエンド（React コンポーネント）            │
│   ・API Routes（検索・プレイヤー詳細）                │
│              [Vercel にデプロイ]                      │
└───────────────────────────┬──────────────────────────┘
                            │ Prisma Client
┌───────────────────────────▼──────────────────────────┐
│                  PostgreSQL                          │
│         [Supabase（無料枠）にホスト]                  │
└───────────────────────────┬──────────────────────────┘
                            │ 定期書き込み
┌───────────────────────────▼──────────────────────────┐
│              同期バッチ（Node.js スクリプト）          │
│   ・15〜30分ごとに実行                               │
│   ・Liquipedia API からデータ取得→差分更新            │
│              [GitHub Actions にホスト]               │
└───────────────────────────┬──────────────────────────┘
                            │ REST (60req/時間)
┌───────────────────────────▼──────────────────────────┐
│              Liquipedia API                          │
│        https://api.liquipedia.net/api/v3/            │
└──────────────────────────────────────────────────────┘
```

---

## 2. 技術スタック

| レイヤー | 技術 | バージョン | 採用理由 |
|---|---|---|---|
| フロントエンド | Next.js (App Router) | 15.x | SSR/SSGでSEO対応、フロントと統合 |
| 言語 | TypeScript | 5.x | 型安全性、Prismaとの親和性 |
| スタイリング | Tailwind CSS | 3.x | 手軽・コンポーネントと親和性高い |
| ORM | Prisma | 5.x | TypeScript型生成、マイグレーション管理 |
| DB | PostgreSQL | 16.x | 統計クエリに強い、Supabase対応 |
| 同期バッチ | Node.js + tsx | - | TypeScriptで統一、別プロセスで実行 |
| ホスティング（FE） | Vercel | - | Next.js公式、無料枠あり |
| ホスティング（DB） | Supabase | - | PostgreSQL、無料枠あり |
| CI / バッチ実行 | GitHub Actions | - | 定期実行（cron）、無料枠あり |

---

## 3. データベーススキーマ

### 3.1 MVP対象テーブル

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  TANK
  DPS
  SUPPORT
  FLEX
}

model Player {
  id            String       @id @default(cuid())
  liquipediaId  String       @unique   // Liquipedia上の識別子
  handle        String                 // ゲーム内名（ハンドルネーム）
  realName      String?                // 本名
  country       String?                // 国籍コード (ISO 3166-1 alpha-2)
  birthDate     DateTime?
  role          Role?
  liquipediaUrl String?                // Liquipediaページへのリンク

  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  rosters       TeamRoster[]
  transfers     Transfer[]

  @@index([handle])
}

model Team {
  id            String       @id @default(cuid())
  liquipediaId  String       @unique
  name          String
  shortName     String?                // 略称（例: "ATL" for Atlanta Reign）
  region        String?                // NA / EMEA / APAC / KR 等
  liquipediaUrl String?

  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  rosters       TeamRoster[]
  transfersFrom Transfer[]   @relation("fromTeam")
  transfersTo   Transfer[]   @relation("toTeam")
}

model TeamRoster {
  id         String    @id @default(cuid())
  playerId   String
  teamId     String
  joinDate   DateTime?
  leaveDate  DateTime?          // null = 現在も在籍
  isActive   Boolean   @default(false)

  player     Player    @relation(fields: [playerId], references: [id])
  team       Team      @relation(fields: [teamId], references: [id])

  @@index([playerId])
  @@index([teamId])
}

model Transfer {
  id           String    @id @default(cuid())
  playerId     String
  fromTeamId   String?            // null = フリーエージェントから
  toTeamId     String?            // null = フリーエージェントへ
  date         DateTime
  note         String?            // "loan", "release" 等

  player       Player    @relation(fields: [playerId], references: [id])
  fromTeam     Team?     @relation("fromTeam", fields: [fromTeamId], references: [id])
  toTeam       Team?     @relation("toTeam", fields: [toTeamId], references: [id])

  @@index([playerId])
}
```

### 3.2 将来追加予定テーブル（フェーズ2以降）

```
Tournament   大会情報
Match        試合（どのトーナメントの、どのチーム同士か）
MapResult    1試合内の各マップ結果
PlayerMatchStat  マップごとの選手スタッツ（ヒーロー・KDA・ダメージ等）
```

---

## 4. API設計

### 4.1 エンドポイント一覧（MVP）

| メソッド | パス | 説明 |
|---|---|---|
| `GET` | `/api/players/search?q={query}` | プレイヤー名で検索 |
| `GET` | `/api/players/[id]` | プレイヤー詳細取得 |

### 4.2 `/api/players/search`

**リクエスト**

```
GET /api/players/search?q=profit&limit=10
```

**レスポンス**

```json
{
  "players": [
    {
      "id": "clx...",
      "handle": "profit",
      "realName": "Park Joon-yeong",
      "country": "KR",
      "role": "DPS",
      "currentTeam": {
        "id": "clx...",
        "name": "Seoul Infernal",
        "shortName": "SEI"
      }
    }
  ],
  "total": 1
}
```

**クエリロジック**

```sql
SELECT p.*, t.*
FROM players p
LEFT JOIN team_rosters tr ON tr.player_id = p.id AND tr.is_active = true
LEFT JOIN teams t ON t.id = tr.team_id
WHERE LOWER(p.handle) LIKE LOWER('%{query}%')
ORDER BY p.handle ASC
LIMIT {limit}
```

### 4.3 `/api/players/[id]`

**レスポンス**

```json
{
  "id": "clx...",
  "handle": "profit",
  "realName": "Park Joon-yeong",
  "country": "KR",
  "birthDate": "1997-07-06",
  "role": "DPS",
  "liquipediaUrl": "https://liquipedia.net/overwatch/Profit",
  "currentTeam": { "id": "...", "name": "Seoul Infernal" },
  "rosters": [
    {
      "team": { "id": "...", "name": "Seoul Dynasty" },
      "joinDate": "2018-01-01",
      "leaveDate": "2023-12-31",
      "isActive": false
    }
  ],
  "transfers": [
    {
      "date": "2024-01-15",
      "fromTeam": { "name": "Seoul Dynasty" },
      "toTeam": { "name": "Seoul Infernal" }
    }
  ]
}
```

---

## 5. Liquipedia 同期設計

### 5.1 使用するAPIエンドポイント

ベースURL: `https://api.liquipedia.net/api/v3/`

| データ | エンドポイント |
|---|---|
| プレイヤー一覧 | `GET /player?wiki=overwatch` |
| チーム一覧 | `GET /team?wiki=overwatch` |
| 移籍情報 | `GET /transfer?wiki=overwatch` |
| スクワッド（在籍） | `GET /squadplayer?wiki=overwatch` |

**必須ヘッダー**

```
Authorization: Apikey {LIQUIPEDIA_API_KEY}
User-Agent: Watchpoint/1.0 (https://github.com/{username}/watchpoint; {email})
Accept: application/json
```

### 5.2 同期フロー

```
1. /team エンドポイントからチーム一覧を取得・upsert
2. /player エンドポイントからプレイヤー一覧を取得・upsert
3. /squadplayer から現在のロスターを取得・TeamRosterを更新
4. /transfer から移籍記録を取得・upsert
```

### 5.3 レート制限対応

- 60リクエスト/時間 = 1リクエスト/分 が安全なペース
- 同期バッチは全件を1回で取得するのではなく、ページネーションで分割
- GitHub Actions cron で1時間ごとに実行（差分更新）

### 5.4 GitHub Actions 設定例

```yaml
# .github/workflows/sync.yml
name: Sync Liquipedia Data

on:
  schedule:
    - cron: '0 * * * *'   # 1時間ごと
  workflow_dispatch:        # 手動実行も可

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run sync
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          LIQUIPEDIA_API_KEY: ${{ secrets.LIQUIPEDIA_API_KEY }}
```

---

## 6. デプロイ構成

### 6.1 本番環境

| コンポーネント | サービス | 無料枠 |
|---|---|---|
| Next.js アプリ | Vercel | 100GB帯域/月 |
| PostgreSQL | Supabase | 500MB DB、50MB ファイル |
| 同期バッチ | GitHub Actions | 2,000分/月 |

### 6.2 環境変数

```env
# .env.local（ローカル開発）/ Vercel 環境変数（本番）

DATABASE_URL="postgresql://user:password@host:5432/watchpoint"
LIQUIPEDIA_API_KEY="your_api_key_here"
NEXT_PUBLIC_SITE_URL="https://your-domain.vercel.app"
```

### 6.3 セルフホスト

`docker-compose.yml` を提供し、以下のコマンドで起動できるようにする：

```bash
cp .env.example .env   # APIキー等を設定
docker compose up -d
npm run sync           # 初回データ取得
```

---

## 7. ディレクトリ構成

```
watchpoint/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── page.tsx               # 検索ページ（トップ）
│   │   ├── players/
│   │   │   └── [id]/
│   │   │       └── page.tsx       # プレイヤープロフィール
│   │   └── api/
│   │       └── players/
│   │           ├── search/
│   │           │   └── route.ts   # GET /api/players/search
│   │           └── [id]/
│   │               └── route.ts   # GET /api/players/[id]
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── PlayerCard.tsx
│   │   └── PlayerProfile.tsx
│   └── lib/
│       ├── prisma.ts              # Prismaクライアントのシングルトン
│       └── liquipedia.ts          # Liquipedia API クライアント
├── scripts/
│   └── sync.ts                    # 同期バッチ本体
├── .github/
│   └── workflows/
│       └── sync.yml
├── docker-compose.yml
└── .env.example
```
