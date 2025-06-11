import { z } from 'zod';

export const CreateUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    username: z.string().min(1, 'Username is required').max(20, 'Username must be at most 20 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
});

export const SignInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
});

export const CreateRoomSchema = z.object({
    slug: z.string().min(1, 'Room name is required').max(50, 'Room name must be at most 50 characters long')
});