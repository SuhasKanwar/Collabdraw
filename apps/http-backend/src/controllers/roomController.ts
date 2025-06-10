import { Request, Response } from "express";
import { CreateRoomSchema } from "@repo/common/schema";

export const createRoomHandler = async (req: Request, res: Response): Promise<void> => {
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error.errors });
        return;
    }
}