function SpotPostForm() {
    return (
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
            <h1 className="mb-2 text-3xl font-bold text-slate-800 text-center">
                裏スポット投稿
            </h1>

            <p className="mb-8 text-slate-500 text-center">
                あなたが知る地元の穴場スポットを共有しましょう
            </p>

            {/* スポット名 */}
            <div className="mb-5">
                <label className="mb-2 block font-semibold">
                    📍スポット名
                </label>

                <input
                    type="text"
                    placeholder="例：地元民御用達の立ち飲み屋"
                    className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* 説明 */}
            <div className="mb-5">
                <label className="mb-2 block font-semibold">
                    📝説明
                </label>

                <textarea
                    rows={5}
                    placeholder="このスポットの魅力を書いてください"
                    className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* 写真URL */}
            <div className="mb-5">
                <label className="mb-2 block font-semibold">
                    🖼写真URL
                </label>

                <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* 緯度 */}
                <div className="mb-5">
                    <label className="mb-2 block font-semibold">
                        🌍緯度
                    </label>

                    <input
                        type="number"
                        placeholder="35.5325"
                        className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* 経度 */}
                <div className="mb-8">
                    <label className="mb-2 block font-semibold">
                        🌍経度
                    </label>

                    <input
                        type="number"
                        placeholder="139.7008"
                        className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <button
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-95">
                投稿する
            </button>

        </div>
    );
}

export default SpotPostForm;