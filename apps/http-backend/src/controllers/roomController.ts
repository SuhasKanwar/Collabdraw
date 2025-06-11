import { Request, Response } from "express";
import { CreateRoomSchema } from "@repo/common/schema";
import { prismaClient } from "@repo/db/client";

export const createRoomHandler = async (req: Request, res: Response): Promise<void> => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: parsedData.error.errors });
        return;
    }
    try {
        const userId = req?.userId;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.slug,
                adminId: userId
            }
        });

        res.status(201).json({
            message: 'Room created successfully',
            room: {
                id: room.id,
                slug: room.slug,
                adminId: room.adminId
            }
        });
        return;
    }
    catch (e) {
        if (e instanceof Error && e.message.includes('Unique constraint failed')) {
            res.status(409).json({ error: 'Room already exists' });
            return;
        }
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}

export const getChatsHandler = async (req: Request, res: Response): Promise<void> => {
    const roomId = Number(req.params.roomId);
    if (!roomId) {
        res.status(400).json({ error: 'Room ID is required' });
        return;
    }
    try {
        const chats = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                createdAt: 'asc'
            },
            take: 100
        });

        res.status(200).json({
            message: 'Chats fetched successfully',
            chats: chats
        });
        return;
    }
    catch (e) {
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}