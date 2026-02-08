function ChatWindow({ conversation, chatData, currentUserId }) {
    if (!conversation) {
        return (
            <div className="w-2/3 flex items-center justify-center text-gray-400">
                Chọn một hội thoại để bắt đầu
            </div>
        )
    }

    const { users, messages } = chatData

    // xác định người đang chat với mình
    const otherUserId =
        conversation.buyerId === currentUserId
            ? conversation.sellerId
            : conversation.buyerId

    const otherUser = users[otherUserId]

    // lọc tin nhắn theo conversation
    const conversationMessages = messages.filter(
        (m) => m.conversationId === conversation.id
    )

    return (
        <div className="w-2/3 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b font-semibold flex items-center gap-3">
                <img
                    src={otherUser.avatar}
                    className="w-8 h-8 rounded-full"
                />
                <div>
                    <div>{otherUser.name}</div>
                    <div className="text-xs text-gray-400">
                        {otherUser.role}
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {conversationMessages.map((msg) => {
                    const isMe = msg.senderId === currentUserId

                    return (
                        <div
                            key={msg.id}
                            className={`max-w-[70%] px-4 py-2 rounded-lg text-sm
                ${isMe
                                    ? 'ml-auto bg-blue-500 text-white'
                                    : 'bg-gray-200'}
              `}
                        >
                            {msg.content}
                            <div className="text-xs opacity-70 mt-1">
                                {msg.time}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Input */}
            <div className="p-3 border-t">
                <input
                    placeholder="Nhập tin nhắn..."
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>
        </div>
    )
}

export default ChatWindow
