export const WS_SERVER_PORT: number = parseInt(process.env.WS_SERVER_PORT || "8080", 10);
export const JWT_SECRET: string = process.env.JWT_SECRET as string;