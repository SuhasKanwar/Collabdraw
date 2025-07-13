import { api } from "@/lib/api";
import { Shape } from "@/types/shapes";

export async function getExistingShapes(roomId: string): Promise<Shape[]> {
    try {
        const response = await api.get(`/api/room/shapes/${roomId}`);
        const shapes = response.data.shapes;
        return shapes.map((s: { data: any }) => s.data as Shape);
    }
    catch (error) {
        console.error("Error fetching existing shapes:", error);
        return [];
    }
}