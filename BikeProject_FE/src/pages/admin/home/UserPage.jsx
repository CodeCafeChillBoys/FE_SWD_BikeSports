import { useState } from "react"
import UserHeader from "../components/ListingUser/UserHeader"


function UserPage() {
    const [keyword, setKeyword] = useState("")

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <UserHeader onSearch={setKeyword} />

            {/* Debug xem search hoạt động */}
            <p className="mt-4 text-sm text-gray-500">
                Từ khóa: {keyword}
            </p>
        </div>
    )
}

export default UserPage