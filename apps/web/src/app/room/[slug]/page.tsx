import axios from "axios";
import { HTTP_BACKEND_URL } from "@/config";
import { ChatRoom } from "@/components/ChatRoom";

async function getRoom(slug: string) {
    try {
        const response = await axios.get(`${HTTP_BACKEND_URL}/api/room/${slug}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching room:", error);
        throw new Error("Failed to fetch room data");
    }
}

export default async function ChatPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const roomId = (await getRoom(slug)).room.id;

    return <ChatRoom id={roomId}>
    </ChatRoom>;
}