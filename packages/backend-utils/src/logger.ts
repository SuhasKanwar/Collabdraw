import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

export function logger(filePath: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const logMessage = `${new Date().toISOString()} - ${req.ip} - ${req.originalUrl} - ${req.ip}\n`;
        
        fs.appendFile(filePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
        next();
    }
}