export type Chat = {
    id: number;
    roomId: string;
    userId: string;
    message: string;
    createdAt: Date;
    user: {
        name: string;
    }
}