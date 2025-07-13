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
import ConfirmationModal from "./ConfirmationModal";

interface JoinRoomDialogProps {
  onRoomJoined: (room: Room) => void;
  trigger?: React.ReactNode;
}

export default function JoinRoomDialog({ onRoomJoined, trigger }: JoinRoomDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [joinForm, setJoinForm] = useState({ slug: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinForm.slug.trim()) return;
    setShowConfirmation(true);
  };

  const confirmJoinRoom = async () => {
    setSubmitting(true);
    try {
      const response = await api.post("/api/room/join", joinForm);
      if (response.status === 200) {
        toast.success("Joined room successfully!");
        setShowDialog(false);
        setShowConfirmation(false);
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
    <Button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 border border-gray-600/50">
      <UserPlus className="w-5 h-5" />
      Join Room
    </Button>
  );

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          {trigger || defaultTrigger}
        </DialogTrigger>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Join Room</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleJoinRoom} className="space-y-4">
            <div className="space-y-4">
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
                className="flex-1 text-white border-gray-600/50 hover:bg-gray-700/70 bg-transparent hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gray-600 hover:bg-gray-700"
              >
                Join Room
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        title="Join Room"
        description={`Are you sure you want to join the room "${joinForm.slug}"? You will be added as a collaborator and can participate in real-time drawing sessions.`}
        confirmText="Join Room"
        cancelText="Cancel"
        onConfirm={confirmJoinRoom}
        loading={submitting}
      />
    </>
  );
}