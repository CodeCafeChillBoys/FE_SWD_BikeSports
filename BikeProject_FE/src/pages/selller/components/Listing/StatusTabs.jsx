function StatusTabs({ current, onChange, counts }) {
    const tabs = [
        { key: "active", label: `Đang bán (${counts.active})` },
        { key: "hidden", label: `Đã ẩn (${counts.hidden})` },
        { key: "sold", label: `Đã bán (${counts.sold})` }
    ]

    return (
        <div className="inline-flex bg-gray-100 rounded-full p-1 mb-6">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium
            ${current === tab.key
                            ? "bg-white shadow text-black"
                            : "text-gray-600"}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
export default StatusTabs