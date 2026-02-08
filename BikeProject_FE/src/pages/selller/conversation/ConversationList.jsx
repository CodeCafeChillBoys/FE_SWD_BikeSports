function ConversationList({
    chatData,
    currentUserId,
    onSelect,
    selectedId,
}) {
    const { conversations, users } = chatData

    return (
        <div className="w-1/3 border-r">
            <h2 className="p-4 font-bold">Hội thoại</h2>

            {conversations.map((c) => {
                // xác định người đang chat với mình
                const otherUserId =
                    c.buyerId === currentUserId ? c.sellerId : c.buyerId

                const otherUser = users[otherUserId]

                return (
                    <div
                        key={c.id}
                        onClick={() => onSelect(c)}
                        className={`flex gap-3 p-4 cursor-pointer hover:bg-gray-100
              ${selectedId === c.id ? "bg-blue-50" : ""}
            `}
                    >
                        <img
                            src={otherUser.avatar}
                            alt={otherUser.name}
                            className="w-10 h-10 rounded-full"
                        />

                        <div className="flex-1">
                            <div className="flex justify-between">
                                <p className="font-semibold">{otherUser.name}</p>
                                <span className="text-xs text-gray-400">
                                    {c.lastTime}
                                </span>
                            </div>

                            <p className="text-sm text-gray-500 truncate">
                                {c.lastMessage}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ConversationList
