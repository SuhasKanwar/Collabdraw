"use client";

import { Room } from "@/types/room";
import RoomCard from "./RoomCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

async function getRooms() {
  try {
    const response = await api.get("/api/room/rooms");
    if (response.status == 200) {
      return response.data.rooms;
    } else {
      return [];
    }
  } catch (error: any) {
    throw new Error("Failed to fetch rooms");
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
  }, []);

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
              description={room.description}
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