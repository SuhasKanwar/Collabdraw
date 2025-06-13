import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated
} : {
    icon: ReactNode;
    onClick: () => void;
    activated: boolean;
}) {
    return (
        <button
            className={`p-2 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer ${activated ? "text-red-600" : "text-white"} hover:text-black`}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}