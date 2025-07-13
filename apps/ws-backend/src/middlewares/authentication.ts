import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-utils/config";

interface DecodedToken {
    userId: string;
    name: string;
}

export default function authenticate(token: string): DecodedToken | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
    
        if(typeof decoded == "string" || !decoded || !decoded.userId) {
            return null;
        }
    
        return {
            userId: decoded.userId,
            name: decoded.name || "Unknown User"
        };
    }
    catch (error) {
        console.error("Authentication error:", error);
        return null;
    }
}