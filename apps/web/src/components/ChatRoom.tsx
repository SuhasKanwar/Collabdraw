import axios from "axios";
import { HTTP_BACKEND_URL } from "@/config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
    const response = await axios.get(`${HTTP_BACKEND_URL}/api/room/chats/${roomId}`);
    return response.data.chats;
}

export async function ChatRoom({ id }: { id: string }) {
    const chats = await getChats(id);

    return <ChatRoomClient messages={chats} roomId={id} />;
}