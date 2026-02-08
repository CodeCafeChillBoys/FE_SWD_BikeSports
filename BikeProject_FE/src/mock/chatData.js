const chatData = {
    users: {
        u1: {
            id: "u1",
            name: "Nguyễn Văn An",
            role: "buyer",
            avatar: "https://i.pravatar.cc/100?img=12",
        },
        u2: {
            id: "u2",
            name: "Seller Bike",
            role: "seller",
            avatar: "https://i.pravatar.cc/100?img=32",
        },
    },

    orders: [
        {
            id: "o1",
            bikeId: "b1",
            buyerId: "u1",
            sellerId: "u2",
            title: "Giant Talon 29er - Xe đạp địa hình cao cấp",
            status: "Đang chờ",
            orderDate: "02/02/2026",
            total: 12500000,
            conversationId: "c1",
        },
    ],

    conversations: [
        {
            id: "c1",
            orderId: "o1",
            buyerId: "u1",
            sellerId: "u2",
            lastMessage: "Vâng, tôi muốn xem. Có thể hẹn gặp vào...",
            lastTime: "10:10 02-02",
            unreadBySeller: true,
        },
    ],

    messages: [
        {
            id: "m1",
            conversationId: "c1",
            senderId: "u2",
            content: "Dạ xe vẫn còn ạ. Bạn có muốn xem xe không?",
            time: "10:05 02-02",
        },
        {
            id: "m2",
            conversationId: "c1",
            senderId: "u1",
            content: "Vâng, tôi muốn xem. Có thể hẹn gặp vào chiều nay được không?",
            time: "10:10 02-02",
        },
    ],
}

export default chatData
