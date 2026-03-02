import { Bike, LayoutDashboard, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useEffect, useState } from "react";


export default function Header() {
    const navigate = useNavigate();
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
        <header className="h-16 bg-white border-b border-gray-200">
            <div className="px-6 h-full flex items-center justify-between">

                {/* LEFT: Logo + Role */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 font-bold">
                        <Bike className="w-6 h-6 text-blue-600" />
                        <span className="text-xl">BikeMarket</span>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                        Kiểm định viên
                    </span>
                </div>

                {/* CENTER: Nav */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate("/inspector")}
                        className="flex items-center gap-2 
                                   bg-black text-white
                                   px-4 py-2
                                   rounded-lg
                                   text-sm font-medium
                                   hover:bg-gray-800
                                   transition-all duration-200"
                    >
                        <LayoutDashboard size={16} />
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/inspector/listings")}
                        className="flex items-center gap-2 
                                   text-sm font-medium
                                   text-gray-600
                                   hover:text-black
                                   px-4 py-2
                                   rounded-lg
                                   hover:bg-gray-50
                                   transition"
                    >
                        <Plus size={16} />
                        Danh sách Sản Phẩm
                    </button>
                </div>

                {/* RIGHT: User + Logout */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                        <img
                            src={user?.avatar || "https://i.pravatar.cc/40"}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-700">{user?.name || "User"}</span>
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition text-sm font-medium"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}
