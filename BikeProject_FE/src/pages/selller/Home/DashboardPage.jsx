import { Bike, DollarSign, Eye, MessageCircle, Package, Star, Plus } from "lucide-react"
import { quickActions, recentListings, sellerStats } from "../../../mock/sellerDashboard"
import QuickAction from "../components/DashBoard/QuickAction"
import RecentItem from "../components/DashBoard/RecentItem"
import StatCard from "../components/DashBoard/StatCard"
import { useNavigate } from "react-router-dom"

export default function DashboardPage() {
    const navigate = useNavigate()

    const statsConfig = [
        { label: "Tin đăng đang bán", value: sellerStats.activeListings, icon: <Bike /> },
        { label: "Tổng lượt xem", value: sellerStats.totalViews, icon: <Eye /> },
        { label: "Đơn hàng chờ xử lý", value: sellerStats.pendingOrders, icon: <Package /> },
        { label: "Doanh thu", value: `${sellerStats.revenue}tr`, icon: <DollarSign /> },
        { label: "Đánh giá trung bình", value: `${sellerStats.avgRating}/5`, icon: <Star /> },
        { label: "Số lượt đánh giá", value: sellerStats.totalReviews, icon: <MessageCircle /> }
    ]

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* ===== HEADER (PHẦN BẠN ĐANG THIẾU) ===== */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard Người bán</h1>
                    <p className="text-gray-500 mt-1">
                        Chào mừng trở lại, Trần Thị Bình!
                    </p>
                </div>

                <button
                    onClick={() => navigate("/seller/listings/new")}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                    <Plus size={18} />
                    Đăng tin mới
                </button>
            </div>

            {/* ===== STATS ===== */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                {statsConfig.map((item, i) => (
                    <StatCard key={i} {...item} />
                ))}
            </div>

            {/* ===== QUICK ACTIONS ===== */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
                {quickActions.map((action) => (
                    <QuickAction key={action.id} label={action.label} />
                ))}
            </div>

            {/* ===== RECENT LISTINGS ===== */}
            <div className="bg-white rounded-xl border p-5">
                <h2 className="font-semibold mb-4">Tin đăng gần đây</h2>

                {recentListings.map((bike) => (
                    <RecentItem key={bike.id} bike={bike} />
                ))}
            </div>
        </div>
    )
}
