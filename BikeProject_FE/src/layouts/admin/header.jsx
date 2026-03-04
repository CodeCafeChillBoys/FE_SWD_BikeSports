import React from 'react'
import { FileText, Users, Bike, LogOut } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../../utils/auth'

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const fullName = localStorage.getItem("fullName") || "User"

    const navItems = [
        { path: "/admin", label: "Người dùng", icon: <Users size={18} /> },
        { path: "/admin/listings", label: "Tin đăng", icon: <FileText size={18} /> },
    ]

    const isActive = (path) => {
        if (path === "/admin") return location.pathname === "/admin"
        return location.pathname.startsWith(path)
    }

    return (
        <header className='h-16 bg-white border-b'>
            <div className='px-8 h-full justify-between items-center flex'>

                {/* LEFT */}
                <div className='flex items-center gap-2'>
                    <Bike className="w-6 h-6 text-blue-600" />
                    <span className="text-lg font-bold">BikeMarket</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                        Quản trị viên
                    </span>
                </div>

                {/* CENTER */}
                <nav className="flex items-center gap-1">
                    {navItems.map(item => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer
                                ${isActive(item.path)
                                    ? "bg-gray-100 text-blue-600"
                                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"}
                            `}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">
                            {fullName}
                        </span>
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 transition text-sm cursor-pointer"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>

            </div>
        </header>
    )
}