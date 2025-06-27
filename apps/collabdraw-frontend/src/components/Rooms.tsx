"use client";

import { Room } from "@/types/room";
import RoomCard from "./RoomCard";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

async function getRooms() {
  try {
    const response = await api.get("/api/room/rooms");
    if (response.status == 200) {
      return response.data.rooms;
    } else {
      return [];
    }
  } catch (error: any) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    getRooms()
      .then(setRooms)
      .catch(() => {
        toast.error("Failed to fetch rooms");
      });
  }, [rooms]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Rooms</h1>
      <p className="text-lg">Welcome to your rooms!</p>
      {rooms ? (
        <ul className="list-disc list-inside mt-4">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
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