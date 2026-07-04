function ExplorationCard() {
    return (
        <div className="mb-8 flex items-center justify-between rounded-3xl bg-white p-6 shadow-lg">

            {/* 左側 */}
            <div className="flex-1">

                <p className="text-lg font-semibold text-slate-700">
                    🌍 探索度
                </p>

                <h2 className="mt-2 text-5xl font-bold text-emerald-600">
                    Lv.4
                </h2>

                <p className="mt-2 text-slate-600">
                    Explorer
                </p>

                {/* 横バー */}
                <div className="mt-5 h-3 w-full rounded-full bg-slate-200">

                    <div className="h-3 w-[72%] rounded-full bg-emerald-500" />

                </div>

                <p className="mt-3 font-semibold text-emerald-600">
                    72%
                </p>

            </div>

            {/* 円形プログレスバー */}
            <div className="ml-8 flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-emerald-500">

                <span className="text-3xl font-bold text-emerald-600">
                    72%
                </span>

            </div>

        </div>
    );
}

export default ExplorationCard;