import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import vnpayAPI from "../../../services/vnpayAPI"

export default function VnPayReturn() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [status, setStatus] = useState("loading") // loading | success | failed

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // Đọc kết quả từ query params VnPay
                const vnpResponseCode = searchParams.get("vnp_ResponseCode")
                const vnpTransactionNo = searchParams.get("vnp_TransactionNo")
                const vnpAmount = searchParams.get("vnp_Amount")
                const vnpOrderInfo = searchParams.get("vnp_OrderInfo")

                console.log("🔔 VnPay Return Params:", {
                    vnpResponseCode,
                    vnpTransactionNo,
                    vnpAmount,
                    vnpOrderInfo,
                })

                // Gọi backend để xác nhận callback
                const queryString = globalThis.location.search.substring(1)
                const backendResponse = await Promise.resolve(vnpayAPI.verifyCallback(queryString))

                console.log("✅ Backend Callback Response:", backendResponse)
                const isSuccess = backendResponse?.success === true || backendResponse?.data?.success === true
                console.log("✅ Success Value:", isSuccess)

                if (isSuccess) {
                    console.log("✅ Payment verified successfully!")
                    setStatus("success")
                } else {
                    console.log("❌ Payment verification failed")
                    setStatus("failed")
                }
            } catch (error) {
                console.error("❌ Verify Payment Error:", error)
                setStatus("failed")
            }
        }

        verifyPayment()
    }, [searchParams, navigate])

    useEffect(() => {
        if (status === "loading") return

        const timeoutId = setTimeout(() => {
            navigate("/buyer/orders", { replace: true })
        }, 2500)

        return () => clearTimeout(timeoutId)
    }, [status, navigate])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center space-y-4">

                {status === "loading" && (
                    <>
                        <Loader2 size={64} className="animate-spin text-blue-500 mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-700">
                            Đang xử lý thanh toán...
                        </h2>
                    </>
                )}

                {status === "success" && (
                    <>
                        <CheckCircle size={64} className="text-green-500 mx-auto" />
                        <h2 className="text-xl font-semibold text-green-700">
                            Thanh toán thành công!
                        </h2>
                        <p className="text-gray-500">
                            Mã giao dịch: {searchParams.get("vnp_TransactionNo")}
                        </p>
                        <p className="text-gray-500">
                            Số tiền: {(Number(searchParams.get("vnp_Amount")) / 100)?.toLocaleString("vi-VN")} đ
                        </p>
                        <p className="text-sm text-gray-400">
                            Hệ thống sẽ tự chuyển về trang đơn hàng...
                        </p>
                    </>
                )}

                {status === "failed" && (
                    <>
                        <XCircle size={64} className="text-red-500 mx-auto" />
                        <h2 className="text-xl font-semibold text-red-700">
                            Thanh toán thất bại!
                        </h2>
                        <p className="text-gray-500">
                            Mã lỗi: {searchParams.get("vnp_ResponseCode")}
                        </p>
                        <p className="text-sm text-gray-400">
                            Hệ thống sẽ tự chuyển về trang đơn hàng...
                        </p>
                    </>
                )}

                <button
                    onClick={() => navigate("/buyer/orders", { replace: true })}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Về trang đơn hàng
                </button>
            </div>
        </div>
    )
}
