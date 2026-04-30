"use client";

import { Calendar, ArrowRight, Crown, Edit3, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { iconMap } from "@/types/icons";
import ConfirmationModal from "./ConfirmationModal";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface RoomCardProps {
  id: number;
  slug: string;
  title: string;
  description?: string;
  createdAt: string;
  joinedAt: string;
  adminId: number;
  currentUserId?: number | null;
  icon?: string;
}

export default function RoomCard(props: RoomCardProps) {
  const {
    slug,
    id,
    title,
    description,
    createdAt,
    joinedAt,
    adminId,
    currentUserId,
    icon,
  } = props;

  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const isAdmin = currentUserId === adminId;
  const isRecentlyJoined =
    new Date(joinedAt).getTime() > new Date(createdAt).getTime();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getLastActivity = () => {
    if (isRecentlyJoined) {
      return {
        text: `Joined ${formatDate(joinedAt)}`,
        time: formatTime(joinedAt),
        icon: Edit3,
        color: "text-green-400",
      };
    }
    return {
      text: `Created ${formatDate(createdAt)}`,
      time: formatTime(createdAt),
      icon: Calendar,
      color: "text-gray-500",
    };
  };

  const activity = getLastActivity();

  const getIcon = (iconName?: string) => {
    const IconComponent = iconName
      ? iconMap[iconName.toLowerCase()] || Home
      : Home;
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmEnter = async () => {
    const response = await api.post("/api/room/join", {
      slug: slug
    });
    if (response.status === 200) {
      router.push(`/canvas/${id}`);
      setShowConfirmation(false);
      toast.success(`Entered room "${slug}" successfully!`);
      return;
    } else {
      toast.error(`Failed to enter room "${slug}": ${response.data.error}`);
      setShowConfirmation(false);
      return;
    }
  };

  return (
    <>
      <div onClick={handleCardClick} className="group block cursor-pointer">
        <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-gray-600 hover:bg-gray-900/90 hover:shadow-2xl hover:shadow-gray-500/10 transform hover:-translate-y-1">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {isAdmin && (
              <div className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full text-xs font-medium">
                <Crown className="w-3 h-3" />
                <span>Admin</span>
              </div>
            )}
            {isRecentlyJoined && (
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>

          <div className="flex items-start justify-between mb-4 pr-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                {getIcon(icon)}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed min-h-[2.5rem]">
              {description || "No description provided."}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <activity.icon className={`w-3 h-3 ${activity.color}`} />
              <span className={activity.color}>{activity.text}</span>
              <span className="text-gray-600">at {activity.time}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
              <div className="text-xs text-gray-600 font-mono">
                #{id.toString().padStart(4, "0")}
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {isAdmin ? "Manage Room" : "Join Room"}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 to-gray-600/0 group-hover:from-gray-600/5 group-hover:to-gray-600/5 rounded-2xl transition-all duration-300 pointer-events-none" />

          {isAdmin && (
            <div className="absolute inset-0 border-2 border-amber-500/20 rounded-2xl pointer-events-none" />
          )}
        </div>
      </div>

      <ConfirmationModal
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        title="Enter Room"
        description={`Are you sure you want to enter "${title}"? You'll join the collaborative canvas and can start drawing with others in real-time.`}
        confirmText="Enter Room"
        cancelText="Cancel"
        onConfirm={handleConfirmEnter}
      />
    </>
  );
}
