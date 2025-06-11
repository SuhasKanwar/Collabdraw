"use client";

import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

export function ChatRoomClient({ messages, roomId }: { messages: { message: string }[]; roomId: string;}) {
    const { loading, socket } = useSocket();
    const [chats, setChats] = useState<{ message: string }[]>(messages);
    const [currentMessage, setCurrentMessage] = useState<string>("");

    useEffect(() => {
        if(socket && !loading) {
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: roomId
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if(parsedData.type === "chat") {
                    setChats((prevChats) => [...prevChats, { message: parsedData.message} ]);
                }
            }
        }

        return () => {
            if(socket) {
                socket.close();
            }
        };
    }, [socket, loading, roomId]);

    return(
        <div className="flex flex-col gap-4">
            {chats.map((chat, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded-md text-black">
                    {chat.message}
                </div>
            ))}

            <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Type your message..."
            />

            <button
                onClick={() => {
                    if(socket && currentMessage.trim()) {
                        socket.send(JSON.stringify({
                            type: "chat",
                            roomId: roomId,
                            message: currentMessage
                        }));
                        setCurrentMessage("");
                    }
                }}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Send Message
            </button>
        </div>
    );
}