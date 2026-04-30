import Loading from "@/app/loading";
import { useSocket } from "@/hooks/useSocket";
import { Chat } from "@/types/chat";
import { getChats } from "@/utils/chats";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export default function ChatBox({ 
    roomId,
    isOpen
}: { 
    roomId: string;
    isOpen: boolean;
}) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [message, setMessage] = useState("");
    const { loading, socket } = useSocket(roomId);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

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

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chats]);

    const handleSendMessage = () => {
        if (message.trim() && socket) {
            setChats((prevChats) => {
                const newChat: Chat = {
                    id: Number(Date.now().toString()),
                    user: { name: "You" },
                    message: message.trim(),
                    roomId: roomId,
                    userId: user.id,
                    createdAt: new Date()
                };
                return [...prevChats, newChat];
            });
            socket.send(JSON.stringify({
                type: "chat",
                roomId: roomId,
                message: message
            }));
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatDate = (date: Date) => {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString();
    };

    if (loading || !socket) return <Loading />;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{
                            type: "spring",
                            duration: 0.3,
                            bounce: 0.1
                        }}
                        className="fixed top-20 right-6 z-50 w-[26rem] h-[36rem] bg-neutral-900 rounded-2xl border border-neutral-700 shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="p-4 border-b border-neutral-700 bg-neutral-800 flex items-center justify-between">
                            <h3 className="text-white font-medium">Room Chat</h3>
                        </div>

                        <div 
                            ref={chatContainerRef}
                            className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin"
                        >
                            {chats.length === 0 ? (
                                <div className="text-neutral-400 text-sm text-center">
                                    No messages yet. Start the conversation!
                                </div>
                            ) : (
                                chats.map((chat, index) => (
                                    <motion.div 
                                        key={chat.id || `chat-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-neutral-800 rounded-lg p-3"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="text-xs text-neutral-400 font-medium">
                                                {
                                                    chat.userId === user?.id ? "You" : chat.user.name
                                                }
                                            </div>
                                            <div className="text-xs text-neutral-500">
                                                {formatDate(chat.createdAt)}
                                            </div>
                                        </div>
                                        <div className="text-white text-sm">
                                            {chat.message}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-neutral-700 bg-neutral-800">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-neutral-700 text-white placeholder-neutral-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
                                />
                                <button 
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-600 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 transition-colors flex items-center justify-center"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}