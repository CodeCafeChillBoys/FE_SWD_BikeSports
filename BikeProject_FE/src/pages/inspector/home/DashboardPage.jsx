import { CheckCircle, Clock, Plus, ShieldCheck } from "lucide-react"
import { useNavigate } from "react-router-dom"
import StatsCard from "../components/DashBoard/StatsCard"
import ListingCard from "../components/Listing/listingCard"
import bikes from "../../../mock/bikes"


export default function DashboardPage() {
    const navigate = useNavigate()
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard Kiểm Định Viên </h1>
                    <p className="text-gray-500 mt-1">
                        Chào mừng trở lại, Trần Thị Bình!
                    </p>
                </div>
                <button onClick={() => navigate("inspector/listings/new")}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                    <Plus size={18} />
                    Tạo Báo Cáo Mới
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6">

                <StatsCard
                    title="Chờ kiểm định"
                    value="0"
                    icon={<Clock size={20} />}
                    bgColor="bg-orange-100"
                    iconColor="text-orange-500"
                />

                <StatsCard
                    title="Đã hoàn thành"
                    value="3"
                    icon={<CheckCircle size={20} />}
                    bgColor="bg-green-100"
                    iconColor="text-green-600"
                />

                <StatsCard
                    title="Tổng kiểm định"
                    value="3"
                    icon={<ShieldCheck size={20} />}
                    bgColor="bg-blue-100"
                    iconColor="text-blue-600"
                />
            </div>

            {/* Recent Listings */}
            <div className="mt-10 bg-white p-6 rounded-2xl border border-gray-100">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">
                        Kiểm định gần đây
                    </h2>
                    <button className="text-sm text-gray-500 hover:text-black">
                        Xem tất cả
                    </button>
                </div>

                <div className="space-y-4">
                    {bikes.map(item => (
                        <ListingCard key={item.id} item={item} />
                    ))}
                </div>

            </div>


        </div>
    )
}
