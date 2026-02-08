import { useNavigate } from "react-router-dom"

function QuickAction({ label, to }) {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate(to)}
            className="bg-white border rounded-xl py-4 text-sm font-medium hover:bg-gray-50"
        >
            {label}
        </button>
    )
}

export default QuickAction
