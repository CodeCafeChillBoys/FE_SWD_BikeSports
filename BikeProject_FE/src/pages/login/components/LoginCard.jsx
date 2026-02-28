import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authAPI from "../../../services/authAPI"
import { getRoleRoute } from "../../../utils/auth"

export default function LoginCard() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await authAPI.login({ email, password })

            // Store token and user info
            localStorage.setItem("accessToken", response.token)
            localStorage.setItem("access_token", response.token) // For API interceptor
            localStorage.setItem("email", response.email)
            localStorage.setItem("role", String(response.role))
            localStorage.setItem("userId", response.userId || "")
            localStorage.setItem("fullName", response.fullName || "")

            // Redirect to appropriate dashboard
            const redirectPath = getRoleRoute(response.role)
            navigate(redirectPath, { replace: true })

        } catch (err) {
            console.error("Login error:", err)
            setError(err.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">

            <div className="w-[420px] bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">

                {/* Logo */}
                <div className="text-center mb-6 space-y-2">
                    <div className="text-4xl">🚴</div>
                    <h1 className="text-xl font-semibold">
                        BikeMarket Vietnam
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Nền tảng mua bán xe đạp uy tín
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
                            {error}
                        </div>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2.5 rounded-xl hover:opacity-90 transition font-medium disabled:opacity-50"
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>



                </form>
            </div>
        </div>
    )
}