import { cn } from "@/lib/utils";
import {
  Users,
  Palette,
  MessageSquare,
  Zap,
  Shield,
  Clock,
  Share2,
  Globe,
} from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      title: "Real-time Collaboration",
      description:
        "Work together seamlessly with your team on the same canvas in real-time with live cursors and instant updates.",
      icon: <Users />,
    },
    {
      title: "Advanced Drawing Tools",
      description:
        "Professional-grade drawing tools including brushes, shapes, layers, and color palettes for creating stunning artwork.",
      icon: <Palette />,
    },
    {
      title: "Instant Communication",
      description:
        "Built-in chat and messaging system to discuss ideas and provide feedback without leaving the canvas.",
      icon: <MessageSquare />,
    },
    {
      title: "Lightning Fast Performance",
      description:
        "Optimized for speed with smooth drawing experience and instant synchronization across all devices.",
      icon: <Zap />,
    },
    {
      title: "Enterprise Security",
      description:
        "Your creative work is protected with end-to-end encryption and secure cloud storage solutions.",
      icon: <Shield />,
    },
    {
      title: "Version History",
      description:
        "Never lose your work with automatic saving and complete version history tracking for all your projects.",
      icon: <Clock />,
    },
    {
      title: "Easy Sharing & Export",
      description:
        "Share your collaborative artwork with team members and export in multiple formats for any use case.",
      icon: <Share2 />,
    },
    {
      title: "Cross-platform Access",
      description:
        "Access your projects from anywhere with cloud synchronization and support for all major platforms.",
      icon: <Globe />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-700",
        (index === 0 || index === 4) && "lg:border-l border-gray-700",
        index < 4 && "lg:border-b border-gray-700"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-gray-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-600 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-400 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};