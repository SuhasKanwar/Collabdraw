"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { iconOptions } from "@/types/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Room } from "@/types/room";

interface CreateRoomDialogProps {
  onRoomCreated: (room: Room) => void;
  trigger?: React.ReactNode;
}

export default function CreateRoomDialog({ onRoomCreated, trigger }: CreateRoomDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    slug: "",
    icon: "home"
  });
  const [submitting, setSubmitting] = useState(false);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await api.post("/api/room/create", createForm);
      if (response.status === 201) {
        toast.success("Room created successfully!");
        setShowDialog(false);
        setCreateForm({ title: "", description: "", slug: "", icon: "home" });
        onRoomCreated(response.data.room);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create room");
    } finally {
      setSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button
        className="flex items-center justify-center gap-2 text-white border-gray-600/50 hover:text-white hover:bg-gray-700/70 hover:border-gray-500 cursor-pointer bg-transparent"
        variant="outline"
    >
      <Plus className="w-5 h-5" />
      Create Room
    </Button>
  );

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-gray-300">Room Title</Label>
            <Input
              id="title"
              type="text"
              value={createForm.title}
              onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              placeholder="Enter room title"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="slug" className="text-gray-300">Room Slug</Label>
            <Input
              id="slug"
              type="text"
              value={createForm.slug}
              onChange={(e) => setCreateForm({ ...createForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              placeholder="room-slug"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={createForm.description}
              onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              placeholder="Room description (optional)"
              rows={3}
            />
          </div>
          
          <div>
            <Label className="text-gray-300">Icon</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {iconOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setCreateForm({ ...createForm, icon: option.value })}
                  className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                    createForm.icon === option.value
                      ? 'border-gray-500 bg-gray-500/20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <option.icon className="w-4 h-4 text-white" />
                  <span className="text-xs text-gray-300">{option.label}</span>
                </button>
              ))}
            </div>
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
              className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800"
            >
              {submitting ? "Creating..." : "Create Room"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
