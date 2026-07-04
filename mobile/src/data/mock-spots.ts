export type Spot = {
  id: number;
  name: string;
  description: string;
  photo_url: string | null;
  lat: number;
  lng: number;
  created_at: string;
};

export type Stamp = {
  id: number;
  user_id: string;
  spot_id: number;
  photo_url: string;
  reaction: string;
  stamped_at: string;
};

export const mockSpots: Spot[] = [
  {
    id: 1,
    name: "裏路地の猫カフェ",
    description: "川崎駅東口の雑居ビル3階。看板が無いから地元民しか知らない。看板猫のミケが出迎えてくれる。",
    photo_url: "https://placehold.co/400x400",
    lat: 35.5312,
    lng: 139.6991,
    created_at: "2026-06-28T10:00:00Z",
  },
  {
    id: 2,
    name: "地元民御用達の立ち飲み屋",
    description: "仲見世通りの裏手にある。17時から開く。ハイボール300円、焼き鳥1本100円。大将に話しかけると裏メニューが出てくる。",
    photo_url: "https://placehold.co/400x400",
    lat: 35.5325,
    lng: 139.7008,
    created_at: "2026-06-28T15:30:00Z",
  },
  {
    id: 3,
    name: "夕日が最高の屋上",
    description: "川崎モアーズ裏のビルの非常階段から上がれる。多摩川方面の夕日が一望できる。17時〜18時がゴールデンタイム。",
    photo_url: "https://placehold.co/400x400",
    lat: 35.5298,
    lng: 139.6975,
    created_at: "2026-06-29T18:00:00Z",
  },
  {
    id: 4,
    name: "多摩川の秘密の散歩道",
    description: "多摩川河川敷から一本入った遊歩道。春は桜、夏は風が気持ちいい。GoogleMapにも載ってない。",
    photo_url: "https://placehold.co/400x400",
    lat: 35.5350,
    lng: 139.6940,
    created_at: "2026-06-29T09:00:00Z",
  },
  {
    id: 5,
    name: "おばあちゃんの手作りコロッケ",
    description: "銀柳街の端にある精肉店の片隅で揚げたてコロッケを売ってる。1個80円。15時に揚がるけど16時には売り切れる。",
    photo_url: "https://placehold.co/400x400",
    lat: 35.5305,
    lng: 139.7020,
    created_at: "2026-06-30T14:00:00Z",
  },
  {
    id: 6,
    name: "穴場の古本屋",
    description: "川崎大師方面の住宅街にひっそりある。店主のセレクトが独特で、絶版本が100円で見つかることも。水曜定休。",
    photo_url: "https://placehold.co/400x400",
    lat: 35.5370,
    lng: 139.7055,
    created_at: "2026-06-30T11:00:00Z",
  },
  {
    id: 7,
    name: "高架下のストリートアート",
    description: "京急川崎駅の高架下に地元アーティストの壁画が並んでる。SNS映えするけど場所が分かりにくいからいつも空いてる。",
    photo_url: "https://placehold.co/400x400",
    lat: 35.5335,
    lng: 139.6965,
    created_at: "2026-07-01T08:00:00Z",
  },
  {
    id: 8,
    name: "深夜のたこ焼き屋台",
    description: "金土の23時〜2時だけ稲毛公園の入口付近に出現する屋台。ネギマヨが絶品。現金のみ。",
    photo_url: "https://placehold.co/400x400",
    lat: 35.5280,
    lng: 139.7045,
    created_at: "2026-07-01T00:30:00Z",
  },
];

export const reactions = [
  "静かでよかった！",
  "美味しかった！",
  "景色が良かった！",
  "また来たい！",
  "穴場すぎる！",
];
