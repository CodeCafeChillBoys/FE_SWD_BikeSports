import React, { useState } from 'react'
import conversations from '../../../mock/conversations'
import ConversationList from '../components/conversation/ConversationList'
import ChatWindow from '../components/conversation/ChatWindow'

function ChatPage() {
    const [selectedConversation, setSelectedConversation] = useState(null)


    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Tin nhắn</h1>
            </div>
            <div className="flex h-[600px] border rounded-xl bg-white">
                {/* Cột trái */}
                <ConversationList
                    conversations={conversations}
                    onSelect={setSelectedConversation}
                    selectedId={selectedConversation?.id}
                />
                {/* Cột phải */}
                <ChatWindow conversation={selectedConversation} />
            </div>
        </div>
    )
}

export default ChatPage