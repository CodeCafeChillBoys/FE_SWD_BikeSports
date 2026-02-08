import React, { useState } from 'react'
import ConversationList from '../conversation/ConversationList'
import ChatWindow from '../conversation/ChatWindow'
import chatData from '../../../mock/chatData'

function ChatPage() {
    const [selectedConversation, setSelectedConversation] = useState(null)
    const currentUserId = 'u1'
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Tin nhắn</h1>
            </div>
            <div className="flex h-[600px] border rounded-xl bg-white">

                {/* Cột trái */}
                <ConversationList
                    chatData={chatData}
                    onSelect={setSelectedConversation}
                    selectedId={selectedConversation?.id}
                    currentUserId={currentUserId}
                />
                {/* Cột phải */}
                <ChatWindow
                    conversation={selectedConversation}
                    chatData={chatData}
                    currentUserId={currentUserId}
                />

            </div>
        </div>
    )
}

export default ChatPage