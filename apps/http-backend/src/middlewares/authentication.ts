import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-utils/config';

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token ?? "";
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if(decoded.userId) {
            req.userId = decoded.userId;
            req.name = decoded.name;
        }
        else {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}