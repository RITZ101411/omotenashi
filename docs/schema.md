# 「表無し」データベーススキーマ

## spots テーブル

| カラム | 型 | 制約 | 説明 |
|--------|------|------|------|
| id | SERIAL | PRIMARY KEY | スポットID |
| user_id | UUID | NULLABLE (FK → auth.users) | 投稿者ID（認証実装後に使用） |
| name | VARCHAR(100) | NOT NULL | スポット名 |
| description | TEXT | NOT NULL | 説明文 |
| photo_url | TEXT | NULLABLE | 写真URL |
| lat | DOUBLE PRECISION | NOT NULL | 緯度 |
| lng | DOUBLE PRECISION | NOT NULL | 経度 |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT now() | 投稿日時 |

---

## API レスポンス型

### GET /spots

```json
[
  {
    "id": 1,
    "name": "裏路地の猫カフェ",
    "description": "川崎駅東口の雑居ビル3階。看板が無いから地元民しか知らない。",
    "photo_url": "https://placehold.co/400x300",
    "lat": 35.5312,
    "lng": 139.6991,
    "created_at": "2026-06-30T10:00:00Z"
  }
]
```

### GET /spots/{id}

```json
{
  "id": 1,
  "name": "裏路地の猫カフェ",
  "description": "川崎駅東口の雑居ビル3階。看板が無いから地元民しか知らない。",
  "photo_url": "https://placehold.co/400x300",
  "lat": 35.5312,
  "lng": 139.6991,
  "created_at": "2026-06-30T10:00:00Z"
}
```

### POST /spots

リクエストボディ:

```json
{
  "name": "スポット名",
  "description": "説明文",
  "photo_url": "https://example.com/photo.jpg",
  "lat": 35.5308,
  "lng": 139.7030
}
```