import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if(decoded.userId) {
        req.userId = decoded.userId;
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
}