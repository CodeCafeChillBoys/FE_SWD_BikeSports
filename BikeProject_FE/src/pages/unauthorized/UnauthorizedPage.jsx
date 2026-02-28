import { useNavigate } from "react-router-dom"
import { ShieldX } from "lucide-react"
import { logout } from "../../utils/auth"

export default function UnauthorizedPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md px-6">
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <ShieldX className="w-10 h-10 text-red-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Không có quyền truy cập
                </h1>

                <p className="text-gray-600 mb-8">
                    Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập với tài khoản phù hợp.
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        Quay lại
                    </button>

                    <button
                        onClick={logout}
                        className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Đăng nhập lại
                    </button>
                </div>
            </div>
        </div>
    )
}
