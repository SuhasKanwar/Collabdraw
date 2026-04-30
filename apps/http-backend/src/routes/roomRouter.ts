import { Router } from "express";

const router: Router = Router();

import { createRoomHandler, joinRoomHandler, getChatsHandler, getRoomHandler, getShapesHandler, getAllRoomsHandler } from "../controllers/roomController";

router.get("/rooms", getAllRoomsHandler);
router.post("/create", createRoomHandler);
router.post("/join", joinRoomHandler);
router.get("/chats/:roomId", getChatsHandler);
router.get("/shapes/:roomId", getShapesHandler);
router.get("/:slug", getRoomHandler);

export default router;