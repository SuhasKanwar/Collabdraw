"use client";

import { Room } from "@/types/room";
import RoomCard from "./RoomCard";
import CreateRoomDialog from "./CreateRoomDialog";
import JoinRoomDialog from "./JoinRoomDialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Plus, Palette, Crown, Users, Search, Filter, TrendingUp, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function getRooms() {
  try {
    const response = await api.get("/api/room/rooms");
    if (response.status == 200) {
      return {
        rooms: response.data.rooms,
        currentUserId: response.data.currentUserId
      };
    } else {
      return {
        rooms: [],
        currentUserId: null
      };
    }
  } catch (error: any) {
    throw new Error("Failed to fetch rooms");
  }
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "owned" | "recent">("all");

  useEffect(() => {
    getRooms()
      .then((data) => {
        setRooms(data.rooms);
        setCurrentUserId(data.currentUserId);
      })
      .catch(() => {
        toast.error("Failed to fetch rooms");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRoomCreated = (newRoom: Room) => {
    setRooms(prevRooms => [...prevRooms, newRoom]);
  };

  const handleRoomJoined = (newRoom: Room) => {
    setRooms(prevRooms => [...prevRooms, newRoom]);
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = (room.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (room.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    switch (filterType) {
      case "owned":
        return matchesSearch && room.adminId === currentUserId;
      case "recent":
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return matchesSearch && new Date(room.joinedAt || room.createdAt) > weekAgo;
      default:
        return matchesSearch;
    }
  });

  const getStats = () => {
    const ownedRooms = rooms.filter(room => room.adminId === currentUserId);
    const recentlyUpdated = rooms.filter(room => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(room.joinedAt || room.createdAt) > weekAgo;
    });

    return {
      total: rooms.length,
      owned: ownedRooms.length,
      recent: recentlyUpdated.length
    };
  };

  const stats = getStats();

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Your Rooms
            </h1>
            <p className="text-lg text-gray-400">
              Collaborate and create together in real-time
            </p>
          </div>
        </div>

        {!loading && rooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{stats.total}</div>
                  <div className="text-sm text-gray-400">Total Rooms</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{stats.owned}</div>
                  <div className="text-sm text-gray-400">Owned by You</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{stats.recent}</div>
                  <div className="text-sm text-gray-400">Recent Activity</div>
                </div>
              </div>
            </div>
            
            <CreateRoomDialog onRoomCreated={handleRoomCreated} />
            <JoinRoomDialog onRoomJoined={handleRoomJoined} />
        </div>
        )}
        
        {!loading && rooms.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/60 border-gray-700 text-white placeholder-gray-400 w-full sm:w-64"
                />
              </div>
              
              <div className="flex gap-2">
                {[
                  { key: "all", label: "All Rooms", count: stats.total },
                  { key: "owned", label: "Owned", count: stats.owned },
                  { key: "recent", label: "Recent", count: stats.recent }
                ].map(filter => (
                  <Button
                    key={filter.key}
                    variant={filterType === filter.key ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setFilterType(filter.key as any)}
                    className={filterType === filter.key ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}
                  >
                    {filter.label} ({filter.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-700 rounded mb-4"></div>
              <div className="h-3 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3 mb-4"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredRooms.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-400">
              Showing {filteredRooms.length} of {rooms.length} rooms
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                id={room.id}
                slug={room.slug}
                title={room.title}
                description={room.description}
                createdAt={room.createdAt}
                joinedAt={room.joinedAt || room.createdAt}
                adminId={room.adminId}
                currentUserId={currentUserId}
                icon={room.icon}
              />
            ))}
          </div>
        </>
      ) : rooms.length > 0 ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No rooms found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
              }}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Clear filters
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Palette className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No rooms yet
            </h3>
            <p className="text-gray-400 mb-8">
              Get started by creating your first collaborative room or join an existing one with a room slug.
            </p>
            <div className="flex gap-4 justify-center">
              <CreateRoomDialog 
                onRoomCreated={handleRoomCreated}
                trigger={
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-5 h-5" />
                    Create Room
                  </Button>
                }
              />
              
              <JoinRoomDialog 
                onRoomJoined={handleRoomJoined}
                trigger={
                  <Button variant="outline" className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-800">
                    <UserPlus className="w-5 h-5" />
                    Join Room
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}