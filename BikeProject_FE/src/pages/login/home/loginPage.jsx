import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import authAPI from "../../../services/authAPI"
import {
    getRoleRoute,
    isAuthenticated,
    getRoleId,
    logout
} from "../../../utils/auth"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // Auto redirect nếu đã login
    useEffect(() => {
        if (isAuthenticated()) {
            const roleId = getRoleId()
            navigate(getRoleRoute(roleId))
        }
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")

        try {
            setLoading(true)

            const response = await authAPI.login({
                email,
                password
            })

            localStorage.setItem("accessToken", response.token)
            localStorage.setItem("userId", response.userId || "")
            localStorage.setItem("fullName", response.fullName || "")
            localStorage.setItem("role", String(response.role))
            localStorage.setItem("access_token", response.token)

            const roleRoute = getRoleRoute(response.role)
            navigate(roleRoute, { replace: true })

        } catch (err) {
            console.error("Login error:", err)
            setError("Email hoặc mật khẩu không đúng.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">

            <div className="w-[430px] bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

                {/* 🔥 Logout nếu đã login */}
                {isAuthenticated() && (
                    <div className="text-right mb-3">
                        <button
                            onClick={logout}
                            className="text-sm text-red-500 hover:underline"
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="text-4xl">🚴</div>
                    <h1 className="text-xl font-semibold">
                        BikeMarket Vietnam
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Nền tảng mua bán xe đạp uy tín
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2.5 rounded-xl hover:opacity-90 transition font-medium"
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                <div className="text-center text-xs text-gray-400 mt-6">
                    © 2026 BikeMarket Vietnam
                </div>
            </div>
        </div>
    )
}