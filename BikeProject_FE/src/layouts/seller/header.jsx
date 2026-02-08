import {
    LayoutDashboard,
    Bike,
    Package,
    MessageCircle,
    Star
} from "lucide-react"

export default function Header() {
    return (
        <header className="w-full bg-white border-b">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">

                    {/* Left */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Bike className="w-6 h-6 text-blue-600" />
                            <span className="text-lg font-bold">BikeMarket</span>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                                Người bán
                            </span>
                        </div>

                        {/* Menu */}
                        <nav className="flex items-center gap-2">
                            <MenuItem active icon={<LayoutDashboard size={16} />} label="Dashboard" />
                            <MenuItem icon={<Bike size={16} />} label="Tin đăng" />
                            <MenuItem icon={<Package size={16} />} label="Đơn hàng" />
                            <MenuItem icon={<MessageCircle size={16} />} label="Tin nhắn" />
                            <MenuItem icon={<Star size={16} />} label="Đánh giá" />
                        </nav>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">Trần Thị Bình</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

function MenuItem({ icon, label, active }) {
    return (
        <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
        ${active
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"}
      `}
        >
            {icon}
            {label}
        </button>
    )
}
