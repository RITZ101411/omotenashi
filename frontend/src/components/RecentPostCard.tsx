function RecentPostCard() {

    return (

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">

            <img

                src="https://placehold.co/600x400"

                className="h-52 w-full object-cover"

            />

            <div className="p-4">

                <h3 className="font-bold text-lg">

                    裏路地の猫カフェ

                </h3>

                <p className="mt-2 text-sm text-slate-500">

                    地元民しか知らない穴場スポット

                </p>

                <div className="mt-4 flex items-center justify-between">

                    <span className="text-yellow-500">

                        ★4.8

                    </span>

                    <span>

                        📍 川崎市

                    </span>

                </div>

            </div>

        </div>

    );

}

export default RecentPostCard;