import {
    LayoutDashboard,
    Bike,
    Package,
    LogOut,
    ShoppingBag
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { logout } from "../../utils/auth"
import { useEffect, useState } from "react";

export default function Header() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Lấy thông tin user từ localStorage
        const userData = localStorage.getItem("user")
        const fullName = localStorage.getItem("fullName")

        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                setUser({ name: fullName || "User" })
            }
        } else if (fullName) {
            setUser({ name: fullName })
        }
    }, [])


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
                            <MenuItem
                                to="/seller"
                                icon={<LayoutDashboard size={16} />}
                                label="Dashboard"
                            />
                            <MenuItem
                                to="/seller/listings"
                                icon={<Bike size={16} />}
                                label="Tin đăng"
                            />
                            <MenuItem
                                to="/seller/products"
                                icon={<ShoppingBag size={16} />}
                                label="Sản phẩm"
                            />
                            <MenuItem
                                to="/seller/orders"
                                icon={<Package size={16} />}
                                label="Đơn hàng"
                            />
                        </nav>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                        <img
                            src={user?.avatar || "https://i.pravatar.cc/40"}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-700">{user?.name || "User"}</span>
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
            </div>
        </header>
    )
}

function MenuItem({ icon, label, to }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
                ${isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"}`
            }
        >
            {icon}
            {label}
        </NavLink>
    )
}
