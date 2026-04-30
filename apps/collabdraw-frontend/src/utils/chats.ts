import { api } from "@/lib/api";
import { Chat } from "@/types/chat";

export async function getChats(roomId: string): Promise<Chat[]> {
    try {
        const response = await api.get(`/api/room/chats/${roomId}`);
        const chats = response.data.chats;
        return chats.map((chat: Chat) => ({
            id: chat.id,
            message: chat.message,
            roomId: chat.roomId,
            userId: chat.userId,
            user: {
                name: chat.user.name
            },
            createdAt: chat.createdAt
        }));
    } catch (error) {
        console.error("Error fetching chats:", error);
        return [];
    }
}