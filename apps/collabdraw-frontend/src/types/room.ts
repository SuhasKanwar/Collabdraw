export interface Room {
    id: number;
    slug: string;
    title: string;
    description?: string;
    createdAt: string;
    joinedAt: string;
    adminId: number;
    currentUserId?: number | null;
    icon?: string;
}