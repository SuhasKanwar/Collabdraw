export interface Room {
    id: number;
    slug: string;
    title: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    adminId: number;
}