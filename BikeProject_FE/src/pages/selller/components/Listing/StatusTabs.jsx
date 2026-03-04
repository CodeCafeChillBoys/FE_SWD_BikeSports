function StatusTabs({ current, onChange, counts }) {
    const tabs = [
        { key: "all", label: `Tất cả (${counts.all ?? 0})` },
        { key: 1, label: `Đang hiển thị (${counts[1] ?? 0})` },
        { key: 2, label: `Chờ duyệt (${counts[2] ?? 0})` },
        { key: 3, label: `Từ chối (${counts[3] ?? 0})` },
        { key: 4, label: `Đã xóa (${counts[4] ?? 0})` },
    ]

    return (
        <div className="inline-flex bg-gray-100 rounded-full p-1 mb-6 flex-wrap gap-1">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition
            ${current === tab.key
                            ? "bg-white shadow text-black"
                            : "text-gray-600 hover:text-black"}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
export default StatusTabs