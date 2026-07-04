import { useState } from "react";
import {
  MapPin, Plus, User, ArrowLeft, Star, Award,
  ChevronRight, Navigation, Camera, X, ArrowRight, Check, Footprints,
} from "lucide-react";

// ─── Shared data ──────────────────────────────────────────────
const SPOTS = [
  { id: 1, name: "隠れ家的昭和銭湯", category: "温泉・銭湯", area: "北区", rating: 4.8, stamps: 32, desc: "地元のお年寄りしか知らない創業60年の銭湯。富士山のタイル絵が圧巻。" },
  { id: 2, name: "廃線跡の桜並木", category: "自然・景観", area: "西区", rating: 4.9, stamps: 58, desc: "廃線になった旧鉄道跡に自然発生した桜並木。地図に載っていない絶景。" },
  { id: 3, name: "漁師のまかない食堂", category: "グルメ", area: "港区", rating: 4.7, stamps: 45, desc: "朝4時から開く漁師向け食堂。水揚げされたての魚定食が破格の値段。" },
];

const MY_POSTS = [
  { id: 5, name: "路地裏のレコード屋", category: "ショップ", area: "中区" },
  { id: 6, name: "夜明けの漁港", category: "自然・景観", area: "港区" },
];

// ─── Phone shell ──────────────────────────────────────────────
function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0">
      <span
        className="text-[11px] font-bold tracking-widest uppercase text-[#888]"
        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
      >
        {label}
      </span>
      <div
        className="relative bg-white shadow-xl flex flex-col"
        style={{
          width: 240,
          height: 520,
          borderRadius: 32,
          border: "3px solid #111",
          fontFamily: "'Noto Sans JP', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Dynamic island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[70px] h-[18px] bg-black rounded-full z-10" />
        {/* Status bar (overlay) */}
        <div className="absolute top-2 left-0 right-0 flex items-center justify-between px-5 z-10 pointer-events-none">
          <span className="text-[8px] font-bold">9:41</span>
          <div className="flex gap-1 items-center">
            <div className="w-[10px] h-[5px] border border-black rounded-[1px] flex items-center px-[1px]">
              <div className="w-[6px] h-[3px] bg-black rounded-[1px]" />
            </div>
          </div>
        </div>
        {/* Content — fills remaining height, padding top for status bar */}
        <div className="flex-1 min-h-0 flex flex-col pt-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Arrow connector ──────────────────────────────────────────
function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 flex-shrink-0 self-center">
      {label && (
        <span
          className="text-[10px] text-[#888] font-medium whitespace-nowrap"
          style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          {label}
        </span>
      )}
      <ArrowRight size={28} strokeWidth={1.5} className="text-[#555]" />
    </div>
  );
}

// ─── Screen contents (scaled to 240×520) ─────────────────────

function LoginContent() {
  return (
    <div className="flex flex-col flex-1 min-h-0 items-center justify-center px-4 pb-8">
      <div className="text-center mb-5">
        <h1 className="text-[34px] font-bold leading-none">表無し</h1>
        <p className="text-[9px] font-bold mt-1 leading-snug">〜地元民だけが知る裏スポット案内アプリ〜</p>
      </div>
      <div className="w-full bg-white border-[3px] border-black rounded-[20px] px-3 pt-3 pb-4">
        <h2 className="text-[15px] font-bold text-center mb-3">ログイン</h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-[2px]">
            <span className="text-[8px] font-medium pl-1">メールアドレス :</span>
            <div className="h-[28px] bg-[#d9d9d9] border-[2px] border-black rounded-full px-3 flex items-center">
              <span className="text-[8px] text-[#aaa]">example@mail.com</span>
            </div>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-[8px] font-medium pl-1">パスワード :</span>
            <div className="h-[28px] bg-[#d9d9d9] border-[2px] border-black rounded-full px-3 flex items-center">
              <span className="text-[11px] text-[#666] tracking-widest">••••••••</span>
            </div>
          </div>
          <button className="w-full h-[28px] bg-black border-[2px] border-black rounded-full text-white text-[11px] font-bold mt-1">
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ active, onNavigate }: { active: "map" | "post" | "mypage"; onNavigate?: (screen: string) => void }) {
  return (
    <div className="relative px-3 pb-3 pt-0">
      <div className="relative bg-white border-[2px] border-black rounded-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.08)] flex items-center px-2 py-2">
        {/* 左タブ: 地図 */}
        <div
          onClick={() => onNavigate?.("map")}
          className={`flex-1 flex flex-col items-center gap-[2px] py-1 cursor-pointer ${active === "map" ? "text-black" : "text-[#aaa]"}`}
        >
          <MapPin size={14} fill={active === "map" ? "black" : "none"} />
          <span className={`text-[7px] ${active === "map" ? "font-bold" : ""}`}>地図</span>
        </div>

        {/* 中央FAB: 投稿（枠内に収まる丸ボタン） */}
        <div
          onClick={() => onNavigate?.("post")}
          className="w-9 h-9 bg-black rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        >
          <Plus size={18} color="white" strokeWidth={2.5} />
        </div>

        {/* 右タブ: マイページ */}
        <div
          onClick={() => onNavigate?.("mypage")}
          className={`flex-1 flex flex-col items-center gap-[2px] py-1 cursor-pointer ${active === "mypage" ? "text-black" : "text-[#aaa]"}`}
        >
          <User size={14} fill={active === "mypage" ? "black" : "none"} />
          <span className={`text-[7px] ${active === "mypage" ? "font-bold" : ""}`}>マイページ</span>
        </div>
      </div>
    </div>
  );
}

function MapContent() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Map */}
      <div className="relative flex-1 bg-[#e8e8e8] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-25">
          {[...Array(12)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 28} x2="300" y2={i * 28} stroke="#888" strokeWidth="1" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`v${i}`} x1={i * 28} y1="0" x2={i * 28} y2="400" stroke="#888" strokeWidth="1" />
          ))}
        </svg>
        <svg className="absolute inset-0 w-full h-full opacity-40">
          <rect x="50" y="0" width="18" height="300" fill="#ccc" />
          <rect x="130" y="0" width="12" height="300" fill="#ccc" />
          <rect x="0" y="80" width="300" height="14" fill="#ccc" />
          <rect x="0" y="160" width="300" height="10" fill="#ccc" />
        </svg>

        {/* サークル（半径20m） */}
        <div className="absolute" style={{ left: 115, top: 140, transform: "translate(-50%,-50%)" }}>
          <div className="w-[120px] h-[120px] rounded-full border-[2px] border-blue-400 bg-blue-400/15" />
        </div>

        {/* サークル外（通常） */}
        <div className="absolute" style={{ left: 60, top: 55, transform: "translate(-50%,-50%)" }}>
          <div className="w-[32px] h-[32px] bg-[#d9d9d9] border-[2px] border-black rounded-[4px] flex items-center justify-center shadow-md">
            <Camera size={10} className="text-[#888]" />
          </div>
        </div>

        {/* サークル内（到達可能 - フローティング＋拡大） */}
        <div className="absolute" style={{ left: 130, top: 130, animation: "floating 2s ease-in-out infinite" }}>
          <div className="w-[38px] h-[38px] bg-[#d9d9d9] border-[2.5px] border-black rounded-[4px] flex items-center justify-center shadow-lg">
            <Camera size={12} className="text-[#888]" />
          </div>
        </div>

        {/* 足あと済み */}
        <div className="absolute" style={{ left: 100, top: 160, transform: "translate(-50%,-50%)" }}>
          <div className="relative w-[32px] h-[32px] bg-[#d9d9d9] border-[2px] border-black rounded-[4px] flex items-center justify-center shadow-md">
            <Camera size={10} className="text-[#888]" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[2px]">
              <Footprints size={14} className="text-white rotate-[-15deg]" />
            </div>
          </div>
        </div>

        {/* 現在地 */}
        <div className="absolute" style={{ left: 115, top: 140, transform: "translate(-50%,-50%)" }}>
          <div className="w-[14px] h-[14px] bg-blue-500 border-[2.5px] border-white rounded-full shadow-lg relative z-10" />
          <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav active="map" />
    </div>
  );
}

function DetailContent() {
  return (
    <div className="flex flex-col flex-1 min-h-0 mt-3 bg-white rounded-t-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] overflow-hidden overflow-y-auto">
      {/* 正方形画像 */}
      <div className="aspect-square bg-[#d9d9d9] flex items-center justify-center flex-shrink-0">
        <Camera size={22} className="text-[#aaa]" />
      </div>
      {/* コンテンツ */}
      <div className="px-3 pt-2">
        <div className="inline-flex border-[1.5px] border-black rounded-full px-2 py-[1px] mb-1">
          <span className="text-[7px] font-bold">自然・景観</span>
        </div>
        <h2 className="text-[14px] font-bold leading-tight">廃線跡の桜並木</h2>
        <div className="flex items-center gap-2 mt-1 mb-2">
          <div className="flex items-center gap-[2px]">
            <Star size={9} fill="black" />
            <span className="text-[8px] font-bold">4.9</span>
          </div>
          <div className="flex items-center gap-[2px]">
            <Footprints size={9} />
            <span className="text-[8px]">58足あと</span>
          </div>
          <div className="flex items-center gap-[2px]">
            <MapPin size={8} />
            <span className="text-[8px] text-[#666]">西区</span>
          </div>
        </div>
        <div className="border-t-[1.5px] border-black pt-2 mb-2">
          <p className="text-[8px] leading-relaxed text-[#444]">廃線になった旧鉄道跡に自然発生した桜並木。地図に載っていない絶景。</p>
        </div>
      </div>
      <div className="px-3 pb-5 pt-2">
        <button className="w-full h-[30px] bg-black rounded-full border-[2px] border-black text-white text-[10px] font-bold flex items-center justify-center gap-1">
          <Footprints size={11} />
          足あとを残す
        </button>
      </div>
    </div>
  );
}

function AwardContent() {
  const reactions = ["静かでよかった！", "美味しかった！", "景色が良かった！", "また来たい！", "穴場すぎる！"];
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center gap-2 px-3 pt-7 pb-2">
        <div className="w-6 h-6 border-[1.5px] border-black rounded-full flex items-center justify-center">
          <X size={10} />
        </div>
        <span className="text-[12px] font-bold flex-1">足あとを残す</span>
      </div>
      <div className="flex-1 overflow-hidden px-3 pt-3 flex flex-col gap-4">
        {/* 写真撮影 - メイン要素 */}
        <div className="border-[2px] border-dashed border-black rounded-xl h-[140px] flex flex-col items-center justify-center gap-2 bg-[#f8f8f8]">
          <Camera size={28} className="text-[#666]" />
          <span className="text-[10px] font-bold">写真を撮る</span>
        </div>
        {/* リアクション選択 */}
        <div className="flex flex-col gap-2">
          <label className="text-[9px] font-bold">どうだった？</label>
          <div className="flex flex-wrap gap-[6px]">
            {reactions.map((r, i) => (
              <div key={r} className={`px-2 py-[4px] border-[1.5px] border-black rounded-full text-[8px] font-medium ${i === 1 ? "bg-black text-white" : ""}`}>{r}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-3 pb-5 pt-3 border-t-[2px] border-black">
        <button className="w-full h-[34px] bg-black rounded-full border-[2px] border-black text-white text-[11px] font-bold flex items-center justify-center gap-1">
          <Footprints size={12} />
          確定する
        </button>
        <p className="text-[7px] text-[#888] text-center mt-2">📬 投稿主に匿名で届きます</p>
      </div>
    </div>
  );
}

function NotificationContent() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* 地図背景 */}
      <div className="relative flex-1 bg-[#e8e8e8] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-25">
          {[...Array(12)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 28} x2="300" y2={i * 28} stroke="#888" strokeWidth="1" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`v${i}`} x1={i * 28} y1="0" x2={i * 28} y2="400" stroke="#888" strokeWidth="1" />
          ))}
        </svg>
        {/* サークル */}
        <div className="absolute" style={{ left: 120, top: 180, transform: "translate(-50%,-50%)" }}>
          <div className="w-[120px] h-[120px] rounded-full border-[2px] border-blue-400 bg-blue-400/15" />
        </div>
        {/* スポットピン（サークル内 - フローティング） */}
        <div className="absolute flex flex-col items-center" style={{ left: 145, top: 150, animation: "floating 2s ease-in-out infinite" }}>
          <div className="bg-black text-white text-[6px] font-bold px-1 py-[1px] rounded mb-[2px] whitespace-nowrap">昭和銭湯</div>
          <MapPin size={13} fill="black" color="white" />
        </div>
        {/* 現在地 */}
        <div className="absolute" style={{ left: 120, top: 180, transform: "translate(-50%,-50%)" }}>
          <div className="w-[14px] h-[14px] bg-blue-500 border-[2.5px] border-white rounded-full shadow-lg relative z-10" />
          <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-pulse" />
        </div>
        {/* 通知バナー */}
        <div className="absolute top-6 left-3 right-3 bg-white border-[2px] border-black rounded-2xl p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
              <Navigation size={12} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-bold">裏スポットが近い！</p>
              <p className="text-[7px] text-[#888]">「隠れ家的昭和銭湯」まで50m</p>
            </div>
          </div>
        </div>
      </div>
      {/* ボトムナビ */}
      <BottomNav active="map" />
    </div>
  );
}

function PostContent() {
  const categories = ["グルメ", "自然・景観", "温泉・銭湯", "歴史・文化", "ショップ"];
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center gap-2 px-3 pt-7 pb-2">
        <div className="w-6 h-6 border-[1.5px] border-black rounded-full flex items-center justify-center">
          <X size={10} />
        </div>
        <span className="text-[12px] font-bold flex-1">裏スポットを投稿</span>
        <div className="bg-black text-white text-[8px] font-bold px-2 py-1 rounded-full">投稿する</div>
      </div>
      <div className="flex-1 overflow-hidden px-3 pt-3 flex flex-col gap-3">
        <div className="border-[1.5px] border-dashed border-black rounded-xl h-[70px] flex flex-col items-center justify-center gap-1 bg-[#f8f8f8]">
          <Camera size={18} className="text-[#888]" />
          <span className="text-[8px] text-[#888]">写真を追加</span>
        </div>
        <div className="flex flex-col gap-[3px]">
          <label className="text-[8px] font-bold">スポット名 *</label>
          <div className="h-[26px] bg-[#d9d9d9] border-[1.5px] border-black rounded-full px-3 flex items-center">
            <span className="text-[8px] text-[#aaa]">例：隠れ家カフェ</span>
          </div>
        </div>
        <div className="flex flex-col gap-[3px]">
          <label className="text-[8px] font-bold">カテゴリ *</label>
          <div className="flex flex-wrap gap-1">
            {categories.map((c, i) => (
              <div key={c} className={`px-2 py-[2px] border-[1.5px] border-black rounded-full text-[7px] font-medium ${i === 0 ? "bg-black text-white" : ""}`}>{c}</div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[3px]">
          <label className="text-[8px] font-bold">場所・エリア *</label>
          <div className="h-[26px] bg-[#d9d9d9] border-[1.5px] border-black rounded-full px-3 flex items-center justify-between">
            <span className="text-[8px] text-[#aaa]">地図から選択</span>
            <MapPin size={10} className="text-[#666]" />
          </div>
        </div>
        <div className="flex flex-col gap-[3px]">
          <label className="text-[8px] font-bold">おすすめポイント *</label>
          <div className="bg-[#d9d9d9] border-[1.5px] border-black rounded-xl px-3 py-2 h-[52px] flex items-start">
            <span className="text-[7px] text-[#aaa]">地元民だけが知るポイントを書いてください</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MypageContent() {
  const exploration = 68;
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center gap-2 px-3 pt-7 pb-2">
        <div className="w-6 h-6 border-[1.5px] border-black rounded-full flex items-center justify-center">
          <ArrowLeft size={10} />
        </div>
        <span className="text-[13px] font-bold">マイページ</span>
      </div>
      <div className="flex-1 overflow-hidden px-3 pt-3 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#d9d9d9] border-[2px] border-black rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <div>
            <p className="text-[13px] font-bold">地元たろう</p>
            <div className="inline-flex items-center gap-[2px] border-[1.5px] border-black rounded-full px-2 py-[1px]">
              <Star size={7} fill="black" />
              <span className="text-[7px] font-bold">マスターガイド</span>
            </div>
          </div>
        </div>
        <div className="border-[2px] border-black rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold">探索度</span>
            <span className="text-[14px] font-bold">{exploration}%</span>
          </div>
          <div className="w-full h-[8px] bg-[#d9d9d9] border-[1.5px] border-black rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full" style={{ width: `${exploration}%` }} />
          </div>
          <p className="text-[7px] text-[#888] mt-1">次の称号まで：あと32%</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ l: "投稿数", v: "12" }, { l: "足あと", v: "48" }, { l: "訪問地", v: "7" }].map((s) => (
            <div key={s.l} className="border-[1.5px] border-black rounded-xl p-2 text-center">
              <p className="text-[14px] font-bold">{s.v}</p>
              <p className="text-[7px] text-[#888]">{s.l}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold">投稿したスポット</span>
            <span className="text-[7px] text-[#888]">{MY_POSTS.length}件</span>
          </div>
          <div className="flex flex-col gap-1">
            {MY_POSTS.map((p) => (
              <div key={p.id} className="flex items-center gap-2 border-[1.5px] border-black rounded-xl p-2">
                <div className="w-8 h-8 bg-[#d9d9d9] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera size={10} className="text-[#888]" />
                </div>
                <div className="flex-1">
                  <p className="text-[8px] font-bold">{p.name}</p>
                  <p className="text-[7px] text-[#888]">{p.category} · {p.area}</p>
                </div>
                <ChevronRight size={10} className="text-[#888]" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="mypage" />
    </div>
  );
}

// ─── Interactive Demo ─────────────────────────────────────────
function InteractiveDemo() {
  const [screen, setScreen] = useState("login");

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center"
      style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
    >
      <div style={{ transform: "scale(1.5)", transformOrigin: "center center" }}>
      <Phone label="">
        {screen === "login" && (
          <div className="flex flex-col flex-1 min-h-0 items-center justify-center px-4 pb-8">
            <div className="text-center mb-5">
              <h1 className="text-[34px] font-bold leading-none">表無し</h1>
              <p className="text-[9px] font-bold mt-1 leading-snug">〜地元民だけが知る裏スポット案内アプリ〜</p>
            </div>
            <div className="w-full bg-white border-[3px] border-black rounded-[20px] px-3 pt-3 pb-4">
              <h2 className="text-[15px] font-bold text-center mb-3">ログイン</h2>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[8px] font-medium pl-1">メールアドレス :</span>
                  <div className="h-[28px] bg-[#d9d9d9] border-[2px] border-black rounded-full px-3 flex items-center">
                    <span className="text-[8px] text-[#aaa]">example@mail.com</span>
                  </div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[8px] font-medium pl-1">パスワード :</span>
                  <div className="h-[28px] bg-[#d9d9d9] border-[2px] border-black rounded-full px-3 flex items-center">
                    <span className="text-[11px] text-[#666] tracking-widest">••••••••</span>
                  </div>
                </div>
                <button onClick={() => setScreen("map")} className="w-full h-[28px] bg-black border-[2px] border-black rounded-full text-white text-[11px] font-bold mt-1 cursor-pointer active:bg-[#333]">
                  ログイン
                </button>
              </div>
            </div>
          </div>
        )}

        {screen === "map" && (
          <div className="flex flex-col flex-1 min-h-0 -mt-5">
            <div className="relative flex-1 bg-[#e8e8e8] overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-25">
                {[...Array(12)].map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 28} x2="300" y2={i * 28} stroke="#888" strokeWidth="1" />
                ))}
                {[...Array(10)].map((_, i) => (
                  <line key={`v${i}`} x1={i * 28} y1="0" x2={i * 28} y2="400" stroke="#888" strokeWidth="1" />
                ))}
              </svg>

              {/* サークル（半径20m） */}
              <div className="absolute" style={{ left: 120, top: 200, transform: "translate(-50%,-50%)" }}>
                <div className="w-[130px] h-[130px] rounded-full border-[2px] border-blue-400 bg-blue-400/15" />
              </div>

              {/* サークル外（通常） */}
              <div onClick={() => setScreen("detail-out")} className="absolute cursor-pointer" style={{ left: 60, top: 55, transform: "translate(-50%,-50%)" }}>
                <div className="w-[32px] h-[32px] bg-[#d9d9d9] border-[2px] border-black rounded-[4px] flex items-center justify-center shadow-md">
                  <Camera size={10} className="text-[#888]" />
                </div>
              </div>

              {/* サークル内（到達可能 - フローティング＋拡大） */}
              <div onClick={() => setScreen("detail")} className="absolute cursor-pointer" style={{ left: 148, top: 190, animation: "floating 2s ease-in-out infinite" }}>
                <div className="w-[38px] h-[38px] bg-[#d9d9d9] border-[2.5px] border-black rounded-[4px] flex items-center justify-center shadow-lg">
                  <Camera size={12} className="text-[#888]" />
                </div>
              </div>

              {/* 足あと済み */}
              <div onClick={() => setScreen("detail-visited")} className="absolute cursor-pointer" style={{ left: 85, top: 220, transform: "translate(-50%,-50%)" }}>
                <div className="relative w-[32px] h-[32px] bg-[#d9d9d9] border-[2px] border-black rounded-[4px] flex items-center justify-center shadow-md">
                  <Camera size={10} className="text-[#888]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[2px]">
                    <Footprints size={14} className="text-white rotate-[-15deg]" />
                  </div>
                </div>
              </div>

              {/* 現在地 */}
              <div className="absolute" style={{ left: 120, top: 200, transform: "translate(-50%,-50%)" }}>
                <div className="w-[14px] h-[14px] bg-blue-500 border-[2.5px] border-white rounded-full shadow-lg relative z-10" />
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-pulse" />
              </div>
            </div>
            <BottomNav active="map" onNavigate={(s) => setScreen(s)} />
          </div>
        )}


        {/* ── 詳細画面: サークル内 ── */}
        {screen === "detail" && (
          <div className="flex flex-col flex-1 min-h-0 mt-3 bg-white rounded-t-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] overflow-hidden overflow-y-auto">
            {/* ヘッダー画像（角丸上端まで埋める） */}
            <div onClick={() => setScreen("map")} className="aspect-square bg-[#d9d9d9] flex items-center justify-center flex-shrink-0 cursor-pointer">
              <Camera size={22} className="text-[#aaa]" />
            </div>
            {/* コンテンツ */}
            <div className="flex-1 overflow-hidden px-3 pt-2">
              <div className="inline-flex border-[1.5px] border-black rounded-full px-2 py-[1px] mb-1">
                <span className="text-[7px] font-bold">自然・景観</span>
              </div>
              <h2 className="text-[14px] font-bold leading-tight">廃線跡の桜並木</h2>
              <div className="flex items-center gap-2 mt-1 mb-2">
                <div className="flex items-center gap-[2px]">
                  <Star size={9} fill="black" />
                  <span className="text-[8px] font-bold">4.9</span>
                </div>
                <div className="flex items-center gap-[2px]">
                  <Footprints size={9} />
                  <span className="text-[8px]">58足あと</span>
                </div>
              </div>
              <div className="border-t-[1.5px] border-black pt-2 mb-2">
                <p className="text-[8px] leading-relaxed text-[#444]">廃線になった旧鉄道跡に自然発生した桜並木。地図に載っていない絶景。春には満開の桜のトンネルを独り占めできます。</p>
              </div>
              <div className="border-[1.5px] border-black rounded-xl p-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#d9d9d9] rounded-full border-[1.5px] border-black flex items-center justify-center">
                    <User size={10} />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold">投稿者 : 地元たろう</p>
                    <p className="text-[7px] text-[#888]">マスターガイド ★</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 pb-5 pt-2">
              <button onClick={() => setScreen("camera")} className="w-full h-[30px] bg-black rounded-full border-[2px] border-black text-white text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer active:bg-[#333]">
                <Footprints size={11} />
                足あとを残す
              </button>
            </div>
          </div>
        )}

        {/* ── 詳細画面フル展開: サークル外 ── */}
        {screen === "detail-out" && (
          <div className="flex flex-col flex-1 min-h-0 mt-3 bg-white rounded-t-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] overflow-hidden overflow-y-auto">
            <div onClick={() => setScreen("map")} className="aspect-square bg-[#d9d9d9] flex items-center justify-center flex-shrink-0 cursor-pointer">
              <Camera size={22} className="text-[#aaa]" />
            </div>
            <div className="flex-1 overflow-hidden px-3 pt-2">
              <div className="inline-flex border-[1.5px] border-black rounded-full px-2 py-[1px] mb-1">
                <span className="text-[7px] font-bold">温泉・銭湯</span>
              </div>
              <h2 className="text-[14px] font-bold leading-tight">隠れ家的昭和銭湯</h2>
              <div className="flex items-center gap-2 mt-1 mb-2">
                <div className="flex items-center gap-[2px]">
                  <Star size={9} fill="black" />
                  <span className="text-[8px] font-bold">4.8</span>
                </div>
                <div className="flex items-center gap-[2px]">
                  <Footprints size={9} />
                  <span className="text-[8px]">32足あと</span>
                </div>
              </div>
              <div className="border-t-[1.5px] border-black pt-2 mb-2">
                <p className="text-[8px] leading-relaxed text-[#444]">地元のお年寄りしか知らない創業60年の銭湯。富士山のタイル絵が圧巻。昔ながらの番台があり、常連さんと話せるのも魅力。</p>
              </div>
              <div className="border-[1.5px] border-black rounded-xl p-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#d9d9d9] rounded-full border-[1.5px] border-black flex items-center justify-center">
                    <User size={10} />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold">投稿者 : 銭湯マニア</p>
                    <p className="text-[7px] text-[#888]">ローカルガイド</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 pb-5 pt-2">
              <button className="w-full h-[30px] bg-[#ccc] rounded-full border-[2px] border-[#ccc] text-white text-[10px] font-bold flex items-center justify-center gap-1 cursor-not-allowed">
                <Footprints size={11} />
                足あとを残す
              </button>
              <p className="text-[7px] text-[#888] text-center mt-1">近づくと足あとを残せます</p>
            </div>
          </div>
        )}

        {/* ── 詳細画面フル展開: 足あと済み ── */}
        {screen === "detail-visited" && (
          <div className="flex flex-col flex-1 min-h-0 mt-3 bg-white rounded-t-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] overflow-hidden overflow-y-auto">
            <div onClick={() => setScreen("map")} className="relative aspect-square bg-[#d9d9d9] flex items-center justify-center flex-shrink-0 cursor-pointer">
              <Camera size={22} className="text-[#aaa]" />
              {/* 足あとスタンプ */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center rotate-[-15deg]">
                  <Footprints size={32} className="text-white" />
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden px-3 pt-2">
              <div className="inline-flex border-[1.5px] border-black rounded-full px-2 py-[1px] mb-1">
                <span className="text-[7px] font-bold">グルメ</span>
              </div>
              <h2 className="text-[14px] font-bold leading-tight">漁師のまかない食堂</h2>
              <div className="flex items-center gap-2 mt-1 mb-2">
                <div className="flex items-center gap-[2px]">
                  <Star size={9} fill="black" />
                  <span className="text-[8px] font-bold">4.7</span>
                </div>
                <div className="flex items-center gap-[2px]">
                  <Footprints size={9} />
                  <span className="text-[8px]">45足あと</span>
                </div>
              </div>
              <div className="border-t-[1.5px] border-black pt-2 mb-2">
                <p className="text-[8px] leading-relaxed text-[#444]">朝4時から開く漁師向け食堂。水揚げされたての魚定食が破格の値段。新鮮な刺身定食は必食。</p>
              </div>
              <div className="border-[1.5px] border-black rounded-xl p-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#d9d9d9] rounded-full border-[1.5px] border-black flex items-center justify-center">
                    <User size={10} />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold">投稿者 : 港のけんじ</p>
                    <p className="text-[7px] text-[#888]">グルメガイド</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "notification" && (
          <div className="flex flex-col flex-1 min-h-0">
            <div className="relative h-[110px] bg-[#d9d9d9] flex items-center justify-center flex-shrink-0">
              <Camera size={22} className="text-[#aaa]" />
              <div onClick={() => setScreen("map")} className="absolute top-7 left-2 w-6 h-6 bg-white border-[2px] border-black rounded-full flex items-center justify-center cursor-pointer">
                <ArrowLeft size={10} />
              </div>
            </div>
            <div className="flex-1 overflow-hidden px-3 pt-2">
              <div className="border-[1.5px] border-black rounded-xl p-2 mb-3 bg-[#f8f8f8]">
                <p className="text-[9px] font-bold">📍 隠れ家的昭和銭湯</p>
                <p className="text-[7px] text-[#888]">50m以内に接近しました</p>
              </div>
              <h2 className="text-[14px] font-bold leading-tight">隠れ家的昭和銭湯</h2>
              <div className="border-t-[1.5px] border-black pt-2 mt-2 mb-2">
                <p className="text-[8px] leading-relaxed text-[#444]">地元のお年寄りしか知らない創業60年の銭湯。富士山のタイル絵が圧巻。</p>
              </div>
            </div>
            <div className="px-3 pb-5 pt-2 border-t-[2px] border-black">
              <button onClick={() => setScreen("camera")} className="w-full h-[30px] bg-black rounded-full border-[2px] border-black text-white text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer active:bg-[#333]">
                <Footprints size={11} />
                写真を撮って足あとを残す
              </button>
            </div>
          </div>
        )}

        {screen === "camera" && (
          <div className="flex flex-col flex-1 min-h-0 bg-black -mt-5">
            <div className="flex-1 relative bg-[#222] flex items-center justify-center">
              <div onClick={() => setScreen("detail")} className="absolute top-7 left-3 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center cursor-pointer">
                <X size={12} className="text-white" />
              </div>
              <div className="border-[2px] border-white/30 rounded-[8px] w-[180px] h-[180px] flex items-center justify-center">
                <span className="text-[10px] text-white/50">1:1</span>
              </div>
              <p className="absolute bottom-16 text-[9px] text-white/70 text-center">スポットの写真を撮影</p>
            </div>
            <div className="flex items-center justify-center py-5 bg-black">
              <div onClick={() => setScreen("reaction")} className="w-14 h-14 rounded-full border-[4px] border-white flex items-center justify-center cursor-pointer active:scale-95">
                <div className="w-10 h-10 bg-white rounded-full" />
              </div>
            </div>
          </div>
        )}

        {screen === "reaction" && (
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center gap-2 px-3 pt-7 pb-2">
              <div onClick={() => setScreen("camera")} className="w-6 h-6 border-[1.5px] border-black rounded-full flex items-center justify-center cursor-pointer">
                <ArrowLeft size={10} />
              </div>
              <span className="text-[12px] font-bold flex-1">リアクション</span>
            </div>
            <div className="mx-3 mt-3 aspect-square bg-[#d9d9d9] rounded-[8px] flex items-center justify-center">
              <Camera size={20} className="text-[#888]" />
            </div>
            <div className="flex-1 overflow-hidden px-3 pt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold">どうだった？</label>
                <div className="flex flex-wrap gap-[6px]">
                  {["静かでよかった！", "美味しかった！", "景色が良かった！", "また来たい！", "穴場すぎる！"].map((r, i) => (
                    <div key={r} className={`px-2 py-[4px] border-[1.5px] border-black rounded-full text-[8px] font-medium cursor-pointer ${i === 1 ? "bg-black text-white" : "active:bg-[#eee]"}`}>{r}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-3 pb-5 pt-3 border-t-[2px] border-black">
              <button onClick={() => setScreen("complete")} className="w-full h-[34px] bg-black rounded-full border-[2px] border-black text-white text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer active:bg-[#333]">
                <Footprints size={12} />
                確定する
              </button>
              <p className="text-[7px] text-[#888] text-center mt-2">📬 投稿主に匿名で届きます</p>
            </div>
          </div>
        )}

        {screen === "complete" && (
          <div className="flex flex-col flex-1 min-h-0 items-center justify-center px-4 pb-8">
            <div className="text-center">
              {/* 撮った写真 + 踏みつけアニメーション */}
              <div className="relative w-[140px] h-[140px] mx-auto mb-4">
                {/* 写真 */}
                <div className="absolute inset-0 bg-[#d9d9d9] rounded-[8px] flex items-center justify-center" style={{ animation: "stamp-squish 0.6s ease-out forwards" }}>
                  <Camera size={28} className="text-[#888]" />
                </div>
                {/* 足あとスタンプ（上から踏みつける） */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ animation: "stamp-drop 0.6s ease-out forwards" }}>
                  <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center rotate-[-15deg]">
                    <Footprints size={32} className="text-white" />
                  </div>
                </div>
              </div>
              <h2 className="text-[18px] font-bold mb-2">足あとを残しました！</h2>
              <p className="text-[9px] text-[#666] mb-6">「廃線跡の桜並木」を訪問しました</p>
              <button onClick={() => setScreen("map")} className="w-full h-[30px] bg-black rounded-full border-[2px] border-black text-white text-[10px] font-bold cursor-pointer active:bg-[#333]">
                地図に戻る
              </button>
            </div>
          </div>
        )}

        {screen === "post" && (
          <div className="flex flex-col flex-1 min-h-0 -mt-5">
            <div className="relative flex-1 bg-[#e8e8e8] overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-20">
                {[...Array(20)].map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 20} x2="300" y2={i * 20} stroke="#888" strokeWidth="1" />
                ))}
                {[...Array(15)].map((_, i) => (
                  <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="500" stroke="#888" strokeWidth="1" />
                ))}
              </svg>
              {/* 閉じるボタン（オーバーレイ） */}
              <div onClick={() => setScreen("map")} className="absolute top-8 left-3 w-7 h-7 bg-white border-[2px] border-black rounded-full flex items-center justify-center cursor-pointer shadow-md z-10">
                <X size={12} />
              </div>
              {/* ラベル（オーバーレイ） */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/90 border-[1.5px] border-black rounded-full px-3 py-1 shadow-md z-10">
                <span className="text-[9px] font-bold">ピンを設置</span>
              </div>
              {/* 中央のピン（設置位置） */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                <MapPin size={24} fill="black" color="white" />
                <div className="w-2 h-2 bg-black/30 rounded-full mt-[-2px]" />
              </div>
              {/* 現在地 */}
              <div className="absolute" style={{ left: 80, top: 250, transform: "translate(-50%,-50%)" }}>
                <div className="w-[10px] h-[10px] bg-blue-500 border-2 border-white rounded-full" />
              </div>
              {/* ヒント */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 border-[1.5px] border-black rounded-xl px-3 py-2 text-center">
                <span className="text-[8px] font-medium">地図を動かしてピンの位置を決めてください</span>
              </div>
            </div>
            <div className="px-3 py-3 border-t-[2px] border-black">
              <button onClick={() => setScreen("post-detail")} className="w-full h-[30px] bg-black rounded-full border-[2px] border-black text-white text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer active:bg-[#333]">
                この場所に決定
              </button>
            </div>
          </div>
        )}

        {screen === "post-detail" && (
          <div className="flex flex-col flex-1 min-h-0 -mt-5">
            {/* ヘッダー */}
            <div className="flex items-center gap-2 px-3 pt-7 pb-2">
              <div onClick={() => setScreen("post")} className="w-6 h-6 border-[1.5px] border-black rounded-full flex items-center justify-center cursor-pointer">
                <ArrowLeft size={10} />
              </div>
              <span className="text-[11px] font-bold">スポット情報を入力</span>
            </div>
            {/* コンテンツ */}
            <div className="flex-1 overflow-y-auto px-3 pt-3 flex flex-col gap-3">
              {/* 写真選択エリア */}
              <div className="aspect-square border-[1.5px] border-dashed border-black rounded-[8px] flex flex-col items-center justify-center gap-3 bg-[#f8f8f8] flex-shrink-0">
                <Camera size={20} className="text-[#888]" />
                <div className="flex gap-2">
                  <div onClick={() => setScreen("post-camera")} className="px-3 py-[6px] bg-black text-white text-[8px] font-bold rounded-full cursor-pointer active:bg-[#333]">
                    撮影する
                  </div>
                  <div onClick={() => setScreen("post-crop")} className="px-3 py-[6px] border-[1.5px] border-black text-[8px] font-bold rounded-full cursor-pointer active:bg-[#eee]">
                    ライブラリ
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[3px]">
                <label className="text-[8px] font-bold">スポット名 *</label>
                <div className="h-[26px] bg-[#d9d9d9] border-[1.5px] border-black rounded-full px-3 flex items-center">
                  <span className="text-[8px] text-[#aaa]">例：隠れ家カフェ</span>
                </div>
              </div>
              <div className="flex flex-col gap-[3px]">
                <label className="text-[8px] font-bold">おすすめポイント *</label>
                <div className="bg-[#d9d9d9] border-[1.5px] border-black rounded-xl px-3 py-2 h-[52px] flex items-start">
                  <span className="text-[7px] text-[#aaa]">地元民だけが知るポイントを書いてください</span>
                </div>
              </div>
            </div>
            <div className="px-3 pb-5 pt-3 border-t-[2px] border-black flex-shrink-0">
              <button onClick={() => setScreen("post-complete")} className="w-full h-[30px] bg-black rounded-full border-[2px] border-black text-white text-[10px] font-bold flex items-center justify-center cursor-pointer active:bg-[#333]">
                投稿する
              </button>
            </div>
          </div>
        )}

        {/* 投稿用カメラ */}
        {screen === "post-camera" && (
          <div className="flex flex-col flex-1 min-h-0 bg-black -mt-5">
            <div className="flex-1 relative bg-[#222] flex items-center justify-center">
              <div onClick={() => setScreen("post-detail")} className="absolute top-7 left-3 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center cursor-pointer">
                <X size={12} className="text-white" />
              </div>
              <div className="border-[2px] border-white/30 rounded-[8px] w-[180px] h-[180px] flex items-center justify-center">
                <span className="text-[10px] text-white/50">1:1</span>
              </div>
              <p className="absolute bottom-16 text-[9px] text-white/70 text-center">スポットの写真を撮影</p>
            </div>
            <div className="flex items-center justify-center py-5 bg-black">
              <div onClick={() => setScreen("post-detail")} className="w-14 h-14 rounded-full border-[4px] border-white flex items-center justify-center cursor-pointer active:scale-95">
                <div className="w-10 h-10 bg-white rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* ライブラリ選択 → 正方形クロップ */}
        {screen === "post-crop" && (
          <div className="flex flex-col flex-1 min-h-0 bg-black -mt-5">
            {/* ヘッダー */}
            <div className="flex items-center justify-between px-3 pt-7 pb-2">
              <div onClick={() => setScreen("post-detail")} className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center cursor-pointer">
                <X size={12} className="text-white" />
              </div>
              <div onClick={() => setScreen("post-detail")} className="px-3 py-[5px] bg-white text-black text-[9px] font-bold rounded-full cursor-pointer active:bg-[#ddd]">
                完了
              </div>
            </div>
            {/* 画像 + クロップ枠 */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
              {/* 元画像（横長） */}
              <div className="w-full h-[200px] bg-[#333] flex items-center justify-center">
                <Camera size={28} className="text-[#666]" />
              </div>
              {/* 上下のオーバーレイ */}
              <div className="absolute top-0 left-0 right-0 h-[60px] bg-black/60" />
              <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-black/60" />
              {/* 正方形クロップ枠 */}
              <div className="absolute w-[200px] h-[200px] border-[2px] border-white/80">
                {/* グリッド線 */}
                <div className="absolute top-1/3 left-0 right-0 border-t border-white/30" />
                <div className="absolute top-2/3 left-0 right-0 border-t border-white/30" />
                <div className="absolute left-1/3 top-0 bottom-0 border-l border-white/30" />
                <div className="absolute left-2/3 top-0 bottom-0 border-l border-white/30" />
                {/* コーナー */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-[3px] border-l-[3px] border-white" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-[3px] border-r-[3px] border-white" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[3px] border-l-[3px] border-white" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[3px] border-r-[3px] border-white" />
              </div>
            </div>
            {/* 下部ヒント */}
            <div className="py-4 text-center">
              <p className="text-[9px] text-white/60">ピンチで拡大・ドラッグで位置調整</p>
            </div>
          </div>
        )}

        {screen === "post-complete" && (
          <div className="flex flex-col flex-1 min-h-0 items-center justify-center px-4 pb-8">
            <div className="text-center">
              {/* 投稿した写真 + ピンが刺さるアニメーション */}
              <div className="relative w-[140px] h-[140px] mx-auto mb-4">
                <div className="absolute inset-0 bg-[#d9d9d9] rounded-[8px] flex items-center justify-center border-[2px] border-black">
                  <Camera size={28} className="text-[#888]" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2" style={{ animation: "stamp-drop 0.6s ease-out forwards" }}>
                  <MapPin size={28} fill="black" color="white" />
                </div>
              </div>
              <h2 className="text-[18px] font-bold mb-2">投稿しました！</h2>
              <p className="text-[9px] text-[#666] mb-6">裏スポットが地図に追加されました</p>
              <button onClick={() => setScreen("map")} className="w-full h-[30px] bg-black rounded-full border-[2px] border-black text-white text-[10px] font-bold cursor-pointer active:bg-[#333]">
                地図に戻る
              </button>
            </div>
          </div>
        )}

        {screen === "mypage" && (
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center gap-2 px-3 pt-7 pb-2">
              <span className="text-[13px] font-bold">マイページ</span>
            </div>
            <div className="flex-1 overflow-hidden px-3 pt-3 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d9d9d9] border-[2px] border-black rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-[13px] font-bold">地元たろう</p>
                  <div className="inline-flex items-center gap-[2px] border-[1.5px] border-black rounded-full px-2 py-[1px]">
                    <Star size={7} fill="black" />
                    <span className="text-[7px] font-bold">マスターガイド</span>
                  </div>
                </div>
              </div>
              <div className="border-[2px] border-black rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold">探索度</span>
                  <span className="text-[14px] font-bold">68%</span>
                </div>
                <div className="w-full h-[8px] bg-[#d9d9d9] border-[1.5px] border-black rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full" style={{ width: "68%" }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[{ l: "投稿数", v: "12" }, { l: "足あと", v: "48" }, { l: "訪問地", v: "7" }].map((s) => (
                  <div key={s.l} className="border-[1.5px] border-black rounded-xl p-2 text-center">
                    <p className="text-[14px] font-bold">{s.v}</p>
                    <p className="text-[7px] text-[#888]">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <BottomNav active="mypage" onNavigate={(s) => setScreen(s)} />
          </div>
        )}
      </Phone>
      </div>

      {/* 画面名表示 */}
      <div className="fixed top-6 left-6 bg-white border-2 border-black rounded-xl px-3 py-2">
        <p className="text-[10px] font-bold">{screen}</p>
      </div>
    </div>
  );
}

// ─── Flow layout ──────────────────────────────────────────────
//
//  [ログイン] → [地図] → [スポット詳細]
//                ↓
//             [投稿]  [マイページ]

export default function App() {
  return <InteractiveDemo />;
}
