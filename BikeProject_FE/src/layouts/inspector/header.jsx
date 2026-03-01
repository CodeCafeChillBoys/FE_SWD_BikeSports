import { Bike, LayoutDashboard, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";


export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="h-16 bg-white border-b">
            <div className="px-8 h-full flex  justify-between items-center">

                {/* Left */}   {/* Logo */}
                <div className="flex items-center gap-2">
                    <Bike className="w-6 h-6 text-blue-600" />
                    <span className="text-lg font-bold">BikeMarket</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full ">Kiểm định viên</span>
                </div>

                {/* CENTER */}
                <div className="flex items-center gap-6" >

                    {/* Dashboard Button */}
                    <button
                        onClick={() => navigate("/inspector")}
                        className="flex items-center gap-2 
                                   bg-slate-900 text-white
                                   px-6 py-2.5
                                   rounded-2xl
                                   text-sm font-medium
                                   hover:bg-slate-800
                                   transition-all duration-200"
                    >
                        <LayoutDashboard size={16} />
                        Dashboard
                    </button>

                    {/* Create Inspection */}
                    <button
                        onClick={() => navigate("/inspector/listings")}
                        className="flex items-center gap-2 
                                   text-sm font-medium
                                   text-gray-700
                                   hover:text-black
                                   transition"
                    >
                        <Plus size={16} />
                        Tạo kiểm định
                    </button>

                </div>


                {/* Right */}
                <div className="flex items-center gap-3 ">
                    <img src=" https://i.pravatar.cc/40" alt="avatar"
                        className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium">Trần Thị Bình</span>
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
        </header >
    )
}
