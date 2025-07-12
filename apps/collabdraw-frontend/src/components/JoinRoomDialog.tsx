"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Room } from "@/types/room";

interface JoinRoomDialogProps {
  onRoomJoined: (room: Room) => void;
  trigger?: React.ReactNode;
}

export default function JoinRoomDialog({ onRoomJoined, trigger }: JoinRoomDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [joinForm, setJoinForm] = useState({ slug: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await api.post("/api/room/join", joinForm);
      if (response.status === 200) {
        toast.success("Joined room successfully!");
        setShowDialog(false);
        setJoinForm({ slug: "" });
        onRoomJoined(response.data.room);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to join room");
    } finally {
      setSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white px-6 cursor-pointer border border-green-600/50">
      <UserPlus className="w-5 h-5" />
      Join Room
    </Button>
  );

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Join Room</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleJoinRoom} className="space-y-4">
          <div>
            <Label htmlFor="joinSlug" className="text-gray-300">Room Slug</Label>
            <Input
              id="joinSlug"
              type="text"
              value={joinForm.slug}
              onChange={(e) => setJoinForm({ slug: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              placeholder="Enter room slug"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Ask the room admin for the room slug
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800"
            >
              {submitting ? "Joining..." : "Join Room"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
