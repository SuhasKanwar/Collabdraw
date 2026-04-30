import { z } from 'zod';

export const CreateUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
});

export const SignInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
});

export const CreateRoomSchema = z.object({
    slug: z.string().min(1, 'Room name is required').max(50, 'Room name must be at most 50 characters long'),
    title: z.string().min(1, 'Room title is required').max(100, 'Room title must be at most 100 characters long'),
    description: z.string().optional(),
    icon: z.string().optional()
});