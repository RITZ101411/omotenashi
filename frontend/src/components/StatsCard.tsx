type Props = {
    icon: string;
    title: string;
    value: string;
};

function StatsCard({
    icon,
    title,
    value,
}: Props) {
    return (
        <div className="rounded-3xl bg-white p-6 shadow-lg">

            <div className="flex items-center gap-3">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-3xl">
                    {icon}
                </div>

                <div>

                    <p className="text-slate-500">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold text-emerald-600">
                        {value}
                    </h2>

                </div>

            </div>

        </div>
    );
}

export default StatsCard;