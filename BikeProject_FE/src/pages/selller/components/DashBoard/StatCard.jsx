function StatCard({ label, value, icon }) {
    return (
        <div className="bg-white border rounded-xl p-4 flex justify-between">
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-xl font-semibold mt-1">{value}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                {icon}
            </div>
        </div>
    )
}
export default StatCard