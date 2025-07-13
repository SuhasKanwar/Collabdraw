import Loading from "@/app/loading";
import { useSocket } from "@/hooks/useSocket";
import { Chat } from "@/types/chat";
import { getChats } from "@/utils/chats";
import { useEffect, useState } from "react";

export default function ChatBox({ roomId }: { roomId: string }) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [message, setMessage] = useState("");
    const { loading, socket } = useSocket(roomId);

    useEffect(() => {
        async function fetchChats() {
            const fetchedChats = await getChats(roomId);
            setChats(fetchedChats);
        }
        fetchChats();
    }, [roomId]);

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "chat" && data.roomId === roomId) {
                    setChats((prevChats) => [...prevChats, data]);
                }
            };
        }
        return () => {
            if (socket) {
                socket.onmessage = null;
            }
        };
    }, [socket, roomId]);

    const handleSendMessage = () => {
        if (message.trim() && socket) {
            socket.send(JSON.stringify({
                type: "chat",
                roomId: roomId,
                message: message
            }));
            setMessage("");
        }
    };

    if (loading || !socket) return <Loading />;

    return (
        <div className="fixed top-0 right-0 w-1/3 h-full bg-gray-600 p-4 shadow-lg">
            <div className="text-black">
                {chats.map(chat => (
                    <div key={chat.id} className="text-sm mb-2">
                        <strong>{chat.user.name}:</strong> {chat.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}