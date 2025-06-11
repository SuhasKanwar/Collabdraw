import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-utils/config";

export default function authenticate(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
    
        if(typeof decoded == "string" || !decoded || !decoded.userId) {
            return null;
        }
    
        return decoded.userId;
    }
    catch (error) {
        console.error("Authentication error:", error);
        return null;
    }
}