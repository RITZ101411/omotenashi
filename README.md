# 「表無し」〜地元民だけが知る裏スポット案内アプリ〜

「おもてなし」を「表無し」と読み替え、表向きの観光地ではない、地元民しか知らない裏スポットを共有するプラットフォーム。

## ドキュメント

- [コンセプト](./docs/concept.md) — 設計思想・動機付け・ターゲット・差別化
- [画面仕様](./docs/screens.md) — 各画面の表示要素・動作・API
- [サークル＆足あとUI](./docs/circle-ui.md) — 地図上のサークル・ピン・アニメーション仕様
- [DBスキーマ](./docs/schema.md) — テーブル定義・API型・SQL

## 技術スタック

### フロントエンド
- React / Tailwind CSS / Vite
- MapLibre GL JS + OpenFreeMap

### バックエンド
- FastAPI (Python) / SQLModel
- OpenAPI / Swagger UI

### インフラ
- Cloudflare Pages（フロント）
- Railway（バックエンド）
- Supabase（Auth / DB / Storage）

## ローカル環境構築

### フロントエンド

```bash
cd frontend
npm install
npm run dev
```

### バックエンド

```bash
cd backend
cp .env.example .env
# .envにDATABASE_URLを設定
uv sync
uv run uvicorn src.main:app --reload --port 8000
```

or Docker:

```bash
cd backend
docker compose up
```

## デプロイ

- フロント: mainにpushで Cloudflare Pages に自動デプロイ
- バックエンド: mainにpushで Railway に自動デプロイ（Dockerfile）
