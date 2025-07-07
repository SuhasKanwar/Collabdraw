import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-utils/config';
import { CreateUserSchema, SignInSchema } from '@repo/common/schema';
import { prismaClient } from "@repo/db/client"
import bcrypt from 'bcryptjs';

export const signupHandler = async (req: Request, res: Response): Promise<void> => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: parsedData.error.errors});
        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.email,
                password: hashedPassword,
                name: parsedData.data.name
            }
        });
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
        return;
    }
    catch (e) {
        if (e instanceof Error && e.message.includes('Unique constraint failed')) {
            res.status(409).json({ error: 'User already exists' });
            return;
        }
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}

export const signinHandler = async (req: Request, res: Response): Promise<void> => {
    const parsedData = SignInSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: parsedData.error.errors });
        return;
    }
    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }

        const token = jwt.sign({
            userId: user?.id,
        }, JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // TODO: for production, set this to true
            sameSite: 'lax',
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'User signed in successfully',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
        return;
    }
    catch (e) {
        res.status(500).json({ error: 'Internal server error' , e: e instanceof Error ? e.message : 'Unknown error' });
        return;
    }
}

export const logoutHandler = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // TODO: for production, set this to true
        sameSite: 'lax',
    });
    res.status(200).json({ message: 'User logged out successfully' });
};