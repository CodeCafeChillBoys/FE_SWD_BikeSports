import React, { useMemo, useState } from 'react'
import users from '../../../../mock/user';

function UserTab() {
    const [active, setActive] = useState("all");
    const counts = useMemo(() => {
        return {
            all: users.lenght,
            buyer: users.filter(u => u.role === "buyer").length,
            seller: users.filter(u => u.role === "seller").length,
            inspector: users.filter(u => u.role === "inspector").length,
        }
    }, [users]);

    const tabs = [
        { key: "all", label: "Tất cả" },
        { key: "buyer", label: "Người mua" },
        { key: "seller", label: "Người bán" },
        { key: "inspector", label: "Kiểm định viên" },
    ]

    return (
        <div className=''>
            <div className='flex gap-2 bg-gray-100 p-1 rounded-xl w-fit'>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActive(tab.key)}
                        className={`
              px-4 py-1.5 rounded-lg text-sm font-medium transition-all
              ${active === tab.key
                                ? "bg-white shadow text-black"
                                : "text-gray-500 hover:text-black"}
            `}
                    >
                        {tab.label} ({counts[tab.key]})
                    </button>

                ))}
            </div>
        </div>
    )
}

export default UserTab