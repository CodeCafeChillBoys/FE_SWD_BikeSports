import React from 'react'
import { FileText, Users, Bike, LogOut } from 'lucide-react'
import { logout } from '../../utils/auth'   // chỉnh lại path nếu cần

export default function Header() {

    const fullName = localStorage.getItem("fullName") || "User"

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
                <nav className="flex items-center gap-6">
                    <NavItem icon={<Users size={18} />} label="Người dùng" />
                    <NavItem icon={<FileText size={18} />} label="Tin đăng" />
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

function NavItem({ icon, label }) {
    return (
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition text-sm font-medium">
            {icon}
            {label}
        </button>
    )
}