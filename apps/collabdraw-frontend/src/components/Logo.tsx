import { Pencil } from "lucide-react";

export default function Logo() {
  return (
    <span className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg flex items-center justify-center border border-gray-600/30 shadow-md">
      <Pencil className="w-6 h-6 text-gray-300" />
    </span>
  );
}