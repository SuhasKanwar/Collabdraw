import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-utils/config';
import { CreateUserSchema, SignInSchema } from '@repo/common/schema'

export const signupHandler = async (req: Request, res: Response): Promise<void> => {
    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error.errors });
        return;
    }
}

export const signinHandler = async (req: Request, res: Response): Promise<void> => {
    const data = SignInSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error.errors });
        return;
    }
}

export const signoutHandler = async (req: Request, res: Response): Promise<void> => {
}