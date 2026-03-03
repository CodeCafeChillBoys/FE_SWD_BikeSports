function StatusTabs({ current, onChange, counts }) {
    const tabs = [
        { key: "all",      label: `Tất cả (${counts.all ?? 0})` },
        { key: "active",   label: `Đang hiển thị (${counts.active ?? 0})` },
        { key: "pending",  label: `Chờ duyệt (${counts.pending ?? 0})` },
        { key: "rejected", label: `Từ chối (${counts.rejected ?? 0})` },
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