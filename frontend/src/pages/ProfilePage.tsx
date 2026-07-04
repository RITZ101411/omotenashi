import ProfileHeader from "../components/ProfileHeader";
import ExplorationCard from "../components/ExplorationCard";
import StatsCard from "../components/StatsCard";
import RecentPostCard from "../components/RecentPostCard";

function ProfilePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-cyan-50 to-white">

            <ProfileHeader />

            <div className="mx-auto max-w-5xl p-6">

                <ExplorationCard />

                <div className="mb-8 grid grid-cols-2 gap-4">

                    <StatsCard
                        icon="📍"
                        title="投稿スポット"
                        value="15"
                    />

                    <StatsCard
                        icon="👣"
                        title="訪問スポット"
                        value="48"
                    />

                </div>

                <h2 className="mb-4 text-2xl font-bold">
                    最近の投稿
                </h2>

                <div className="grid gap-6 md:grid-cols-3">

                    <RecentPostCard />
                    <RecentPostCard />
                    <RecentPostCard />

                </div>

            </div>

        </div>
    );
}

export default ProfilePage;