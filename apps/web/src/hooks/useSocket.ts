import { WS_BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";

export function useSocket() {
    const [loading, setLoading] = useState<boolean>(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_BACKEND_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWUyZTc2MS1iNGQzLTQ0NjAtOTliNS0wMjI3NWI0N2NjMDkiLCJpYXQiOjE3NDk2NTI5NDR9.CfKN2lSmKhAN2x5CRMcT1LvJxI1qI_mwpsEoaKZ5vVg`);

        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return { loading, socket };
}