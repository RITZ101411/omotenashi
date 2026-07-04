function ProfileHeader() {
    return (
        <div className="relative h-[360px] overflow-hidden rounded-b-[40px]">

            {/* 背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 via-cyan-200 to-sky-100" />

            {/* 背景を少し暗くする */}
            <div className="absolute inset-0 bg-black/15" />

            {/* プロフィール */}
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-white">

                <img
                    src="https://placehold.co/150"
                    className="mb-4 h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl"
                />

                <h1 className="text-3xl font-bold">
                    ユーザー
                </h1>

                <p className="mt-1 flex items-center gap-1 text-lg">
                    📍 神奈川県 川崎市
                </p>

                <span className="mt-3 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold shadow">
                    🏅 地元民認定バッジ
                </span>

                <p className="mt-5 max-w-md text-center leading-7">
                    穴場巡りが大好きです！
                    <br />
                    カフェ巡りや自然スポットを探すのが趣味です☕
                </p>

            </div>

        </div>
    );
}

export default ProfileHeader;