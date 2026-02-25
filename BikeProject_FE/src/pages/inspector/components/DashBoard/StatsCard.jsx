export default function StatsCard({ title, value, icon, bgColor, iconColor }) {
    return (
        <div className="flex items-center justify-between border border-gray-200
                        rounded-2xl
                        px-6 py-5
                        w-full">
            <div>
                <p className="text-sm text-gray-500 mb-2">{title}</p>
                <p className="text-xl font-semibold text-gray-900">{value}</p>
            </div>

            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor}`}>
                <div className={iconColor}>
                    {icon}
                </div>
            </div>
        </div>
    )
}