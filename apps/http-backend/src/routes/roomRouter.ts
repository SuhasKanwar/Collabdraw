import { Router } from "express";

const router: Router = Router();

import { createRoomHandler, getChatsHandler, getRoomHandler, getShapesHandler } from "../controllers/roomController";

router.post("/create", createRoomHandler);
router.get("/chats/:roomId", getChatsHandler);
router.get("/shapes/:roomId", getShapesHandler);
router.get("/:slug", getRoomHandler);

export default router;