import { Heart, LogOut, MessageSquare, Search, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { logout } from "../../utils/auth";

export default function Header() {
    return (
        <header className="h-16 bg-white border-b">
            <div className="px-6 h-full flex items-center justify-between">

                {/* LEFT: Logo + Role */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 font-bold">
                        <span className="text-3xl leading-none">🚲</span>
                        <span className="text-xl">BikeMarket</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                        Người mua
                    </span>
                </div>

                <nav className="flex items-center gap-2">
                    <NavItem
                        icon={<Search size={16} />}
                        label="Tìm xe"
                        to="/buyer"
                    />

                    <NavItem
                        icon={<ShoppingCart size={16} />}
                        label="Đơn hàng"
                        to="/buyer/orders"
                    />

                    <NavItem
                        icon={<MessageSquare size={16} />}
                        label="Tin nhắn"
                        to="/buyer/messages"
                    />

                    <NavItem
                        icon={<Heart size={16} />}
                        label="Yêu thích"
                        to="/buyer/favorites"
                    />
                </nav>

                {/* RIGHT: User */}
                <div className="flex items-center gap-3 ">
                    <img src=" https://i.pravatar.cc/40" alt="avatar"
                        className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium">Đăng Bùi</span>
                </div>

                {/* 🔥 Logout */}
                <button
                    onClick={logout}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 transition text-sm"
                >
                    <LogOut size={16} />
                    Logout
                </button>


            </div>
        </header>
    );
}

/* ---------- Sub component ---------- */
function NavItem({ icon, label, to }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md text-sm
        ${isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"}`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    )
}



