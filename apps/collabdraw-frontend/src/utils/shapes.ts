import { HTTP_BACKEND_URL } from "@/config";
import { Shape } from "@/types/shapes";
import axios from "axios";

export async function getExistingShapes(roomId: string): Promise<Shape[]> {
    try {
        const response = await axios.get(`${HTTP_BACKEND_URL}/api/room/shapes/${roomId}`);
        const messages = response.data.chats;
    
        const shapes = messages.map((message: { message: string }) => {
            const messageData = JSON.parse(message.message);
            return messageData;
        });
    
        return shapes;
    }
    catch (error) {
        console.error("Error fetching existing shapes:", error);
        return [];
    }
}