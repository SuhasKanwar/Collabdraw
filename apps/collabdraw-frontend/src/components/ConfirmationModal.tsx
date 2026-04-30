"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void;
  loading?: boolean;
}

export default function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  loading = false,
}: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              variant === "destructive" ? "bg-red-500/20" : "bg-blue-500/20"
            }`}>
              <AlertTriangle className={`w-5 h-5 ${
                variant === "destructive" ? "text-red-400" : "text-blue-400"
              }`} />
            </div>
            <DialogTitle className="text-lg">{title}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 text-white border-gray-600/50 hover:text-white hover:bg-gray-700/70 hover:border-gray-500 bg-transparent"
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            variant={variant === "destructive" ? "destructive" : "default"}
            className={`flex-1 ${
              variant === "destructive"
                ? ""
                : "bg-gray-700 hover:bg-gray-600 text-white px-6 cursor-pointer border border-gray-600/50"
            }`}
          >
            {loading ? "Processing..." : confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}