import { Room } from "@/types/room";
import RoomCard from "./RoomCard";
import axios from "axios";
import { HTTP_BACKEND_URL } from "@/config";

async function getRooms() {
    try {
        const response = await axios.get(`${HTTP_BACKEND_URL}/api/room/rooms`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZjczOTJhMS00YTllLTQwYWEtYjFkYy1kYzZkMThkNzY3YTIiLCJpYXQiOjE3NTA4OTM4NzR9.0RLw_z5BrAaqnZAZkgiOyaa3eq_zz3EQhI4-_222oDM",
            }
        });
        console.log("Response from getRooms:", response);
        if (response.status == 200) {
            return response.data.rooms;
        } else {
            return [];
        }
    }
    catch (error: any) {
        console.error("Error fetching rooms:", error);
        console.log("Error details:", error.response ? error.response.data : error.message);
        return [];
    }
}

export default async function Rooms() {
    const rooms: Room[] = await getRooms();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Rooms</h1>
            <p className="text-lg">Welcome to your rooms!</p>
            {rooms ? (
                <ul className="list-disc list-inside mt-4">
                    {rooms.map((room) => (
                        <RoomCard
                            slug={room.slug}
                            title={room.title}
                            description={room.title}
                            createdAt={room.createdAt}
                        />
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 mt-2">Loading rooms...</p>
            )}
        </div>
    );
}